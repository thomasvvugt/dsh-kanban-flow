/**
 * Agent driver: turns human board actions into agent-session prompts, and
 * keeps board items and their task sessions in sync.
 *
 * Board views hand every fresh board snapshot to notifyBoard(); the driver
 * diffs the append-only activity log:
 *
 *   human moved -> todo                pickup (create task session) / requeue
 *   human moved review -> in_progress  "continue working" resume
 *   item_deleted with sessionId        archive the task session (both UI and
 *                                      agent deletions)
 *
 * Replies the human types in a task session are handled by the task agent
 * itself (it owns Review -> In Progress and Done -> In Progress reopen moves).
 * Sessions are created/renamed/prompted through the official sessions
 * service; item.sessionId is persisted via the HTTP API.
 */
import { callFlow } from "./api"
import type { Activity, Board, Item } from "./types"

interface Services {
  createSession(workspaceId: string): Promise<string>
  renameSession(sessionId: string, title: string): Promise<void>
  promptSession(sessionId: string, text: string): Promise<void>
  archiveSession(sessionId: string): Promise<void>
}

let services: Services | null = null
const seenActivities = new Set<string>() // activity ids already handled (bounded by host cap)
const initialized = new Set<string>() // workspaceIds whose existing history is pre-marked
const inFlight = new Set<string>() // item ids with a trigger being processed
const archivedSessions = new Set<string>() // session ids already archived (dedupe)

export function initAgentDriver(svc: Services) {
  services = svc
}

function confirmRulesLine(board: Board): string {
  return board.settings && board.settings.confirmRequired
    ? "This board REQUIRES human confirmation: never move the item to Done — finish via Review and let the human complete it."
    : "When the task is fully complete: move the item In Progress -> Done."
}

function replyLine(): string {
  return "If the human replies while the item is in Review or Done: move it back to In Progress (Review -> In Progress / Done -> In Progress) and address their message in the same turn."
}

function pickupPrompt(board: Board, item: Item): string {
  return [
    `Kanban pickup: item ${item.id} "${item.name}" was moved to To Do by the human.`,
    "",
    "Workflow:",
    `1. Read it with kanbanflow_get_item (id: ${item.id}).`,
    "2. Confirm pickup: move it To Do -> In Progress (kanbanflow_move_item).",
    "3. Do the work, narrating your progress and decisions in this conversation.",
    "4. If you need anything from the human: move the item In Progress -> Review and state your question in this conversation.",
    `5. ${confirmRulesLine(board)}`,
    "",
    replyLine(),
    `Always reference the item by id ${item.id}. Never modify other items.`,
  ].join("\n")
}

function requeuePrompt(board: Board, item: Item): string {
  return [
    `Kanban requeue: item ${item.id} "${item.name}" was moved back to To Do by the human.`,
    "Continue in this session's context: acknowledge in this conversation, move the item To Do -> In Progress, and address the human's feedback.",
    confirmRulesLine(board),
    "",
    replyLine(),
    `Always reference the item by id ${item.id}.`,
  ].join("\n")
}

function resumeInProgressPrompt(board: Board, item: Item): string {
  return [
    `Kanban: the human returned item ${item.id} "${item.name}" to In Progress.`,
    "Continue working on it: give a short status in this conversation, address any feedback, then proceed per the workflow.",
    confirmRulesLine(board),
    "",
    `Always reference the item by id ${item.id}.`,
  ].join("\n")
}

async function ensureSession(workspaceId: string, board: Board, item: Item): Promise<string | null> {
  if (item.sessionId) return item.sessionId
  if (!services) return null
  try {
    const sessionId = await services.createSession(workspaceId)
    await callFlow("setSession", { id: item.id, sessionId }, workspaceId)
    item.sessionId = sessionId // local mirror so subsequent prompts reuse it
    return sessionId
  } catch (err) {
    console.warn("dsh-kanban-flow: session create failed for " + item.id, err)
    return null
  }
}

async function drive(workspaceId: string, board: Board, item: Item, buildPrompt: (b: Board, i: Item) => string) {
  if (!services || inFlight.has(item.id)) return
  inFlight.add(item.id)
  try {
    const sessionId = await ensureSession(workspaceId, board, item)
    if (!sessionId) return
    const fresh = board.items.find((i) => i.id === item.id) ?? item
    await services.renameSession(sessionId, `${fresh.id} · ${fresh.name}`)
    await services.promptSession(sessionId, buildPrompt(board, fresh))
  } catch (err) {
    console.warn("dsh-kanban-flow: agent drive failed for " + item.id, err)
  } finally {
    inFlight.delete(item.id)
  }
}

async function archiveTaskSession(sessionId: string) {
  if (!services || archivedSessions.has(sessionId)) return
  archivedSessions.add(sessionId)
  try {
    await services.archiveSession(sessionId)
  } catch (err) {
    console.warn("dsh-kanban-flow: session archive failed for " + sessionId, err)
  }
}

/**
 * Hand a fresh board snapshot to the driver. The first snapshot per workspace
 * only marks history as seen (no retroactive triggers).
 */
export function notifyBoard(workspaceId: string, board: Board) {
  const activities: Activity[] = Array.isArray(board.activities) ? board.activities : []
  if (!initialized.has(workspaceId)) {
    initialized.add(workspaceId)
    for (const a of activities) seenActivities.add(a.id)
    return
  }
  for (const a of activities) {
    if (seenActivities.has(a.id)) continue
    seenActivities.add(a.id)
    // Any deletion of an item with a task session archives that session.
    if (a.type === "item_deleted" && a.sessionId) {
      void archiveTaskSession(a.sessionId)
      continue
    }
    if (a.source !== "human") continue
    const item = board.items.find((i) => i.id === a.itemId)
    if (!item) continue
    if (a.type === "item_moved") {
      if (a.to === "todo") {
        // human pickup (from backlog) or human requeue (from review / elsewhere)
        void drive(workspaceId, board, item, item.sessionId ? requeuePrompt : pickupPrompt)
      } else if (a.to === "in_progress" && a.from === "review") {
        void drive(workspaceId, board, item, resumeInProgressPrompt)
      }
    }
  }
}
