/**
 * Sidebar controllers: kanban-icon injection, workspace-click behavior and
 * the in-app board opener.
 *
 * The board opens IN-APP: the workspace's session opens in the conversation
 * area and its view switches to the "Board" tab (registered on
 * conversation.view). DSH renders view tabs as role="tab" buttons whose click
 * calls the conversation store's setView — the opener clicks that tab, which
 * is the only externally reachable path.
 *
 * Session-less workspaces: a workspace with no (non-blank) sessions has no
 * conversation of its own, so its board has nowhere to render. The opener
 * then PINS that board into a usable conversation's Board tab (see
 * lib/resolve.ts for the pin scoping rules) — and switches to native
 * resolution as soon as the workspace gets its own conversation.
 *
 * DSH 0.1.1-rc.2 sidebar markup (anchored defensively — degrade to no-ops):
 * workspace rows are [role=treeitem][aria-expanded] flex rows:
 * [folder span] [chevron span] [title span (flex:1)] [actions span].
 */
import { useEffect } from "react"
import { callFlow } from "@/lib/api"
import { getClickOpensBoard } from "@/lib/store"
import { matchWorkspaceByTitle, type BoardPin } from "@/lib/resolve"

interface WorkspaceSummary {
  workspaceId: string
  title: string
  sessionIds: string[]
}
interface WorkspaceListStore {
  getSnapshot(): { items: WorkspaceSummary[]; recentWorkspaceId?: string; archivedSessionIds?: string[] }
  subscribe(fn: () => void): () => void
}
interface WorkspacesService {
  list: WorkspaceListStore
  startSession(workspaceId?: string): void
  archiveSession?(sessionId: string): Promise<void>
}
interface SessionsListStore {
  getSnapshot(): { current?: string; ids?: string[]; byId?: Record<string, { blank?: boolean }> }
  subscribe(fn: () => void): () => void
}
interface SessionsService {
  list: SessionsListStore
  open?(sessionId: string): void
  binding?(id: string): { session: { prompt(content: Array<{ type: string; text: string }>, mode?: string): Promise<any> } } | undefined
}

export interface ControllerProps {
  workspaces?: WorkspacesService
  sessions?: SessionsService
}

const KANBAN_BTN_FLAG = "data-kf-kanban"
const BOARD_TAB_LABEL = "Board"

// ---------------------------------------------------------------------------
// In-app board opener + dismiss-as-toggle
// ---------------------------------------------------------------------------

type OpenImpl = (workspaceId: string) => void
let openImpl: OpenImpl | null = null
/** True while the opener is driving a cross-workspace open (suppresses the
 *  Board-tab toggle and the navigate-away dismiss while it lands). */
let openingBoard = false
let dismissRunning = false

export function isOpeningBoard(): boolean {
  return openingBoard
}

/** Request opening a workspace's board in-app (no-op until the controller mounts). */
export function openBoardInApp(workspaceId: string) {
  if (openImpl) openImpl(workspaceId)
}

function allTabs(): HTMLButtonElement[] {
  if (typeof document === "undefined") return []
  return Array.from(document.querySelectorAll<HTMLButtonElement>('[role="tab"]'))
}

function findBoardTab(): HTMLButtonElement | undefined {
  return allTabs().find((t) => (t.textContent || "").trim() === BOARD_TAB_LABEL)
}

function boardTabActive(): boolean {
  const board = findBoardTab()
  return !!board && board.getAttribute("aria-selected") === "true"
}

/** Click the conversation area's "Board" view tab; retries while it renders. */
function selectBoardTab(deadlineMs = 4000): void {
  if (typeof document === "undefined") return
  const deadline = Date.now() + deadlineMs
  const attempt = () => {
    const board = findBoardTab()
    if (board) {
      board.click()
      return
    }
    if (Date.now() < deadline) window.setTimeout(attempt, 120)
  }
  attempt()
}

/** Click the first non-Board view tab (the conversation/chat view). */
function selectChatTab(): void {
  const other = allTabs().find((t) => (t.textContent || "").trim() !== BOARD_TAB_LABEL)
  if (other) other.click()
}

/**
 * Dismiss the Board view (switch the current session back to chat). Idempotent
 * and retrying: right after a session switch the tab strip may still reflect
 * the previous session for a moment.
 */
export function dismissBoardTab(): void {
  if (typeof document === "undefined") return
  if (dismissRunning) return
  dismissRunning = true
  const deadline = Date.now() + 2500
  const attempt = () => {
    if (openingBoard) {
      dismissRunning = false
      return
    }
    const board = findBoardTab()
    if (!board || board.getAttribute("aria-selected") !== "true") {
      dismissRunning = false
      return
    }
    const other = allTabs().find((t) => (t.textContent || "").trim() !== BOARD_TAB_LABEL)
    if (other) {
      other.click()
      dismissRunning = false
      return
    }
    if (Date.now() < deadline) {
      window.setTimeout(attempt, 120)
      return
    }
    dismissRunning = false
  }
  attempt()
}

/**
 * Board-tab toggle: clicking the "Board" view tab in the conversation header
 * (next to Chat / Trajectory) while the board is already showing switches
 * back to the chat view — the same toggle semantics as clicking the workspace
 * row in the sidebar. Clicking Board from Chat/Trajectory switches to the
 * board natively. Programmatic opener clicks (openingBoard) are exempt: the
 * opener needs the native switch even when the tab is already selected.
 */
export function BoardTabToggle() {
  useEffect(() => {
    if (typeof document === "undefined") return
    const onClick = (e: Event) => {
      if (isOpeningBoard()) return // the opener is landing on the board: never treat its click as a toggle
      if (!(e.target instanceof Element)) return
      const tab = e.target.closest<HTMLElement>('[role="tab"]')
      if (!tab) return
      if ((tab.textContent || "").trim() !== BOARD_TAB_LABEL) return
      if (tab.getAttribute("aria-selected") !== "true") return // not active yet: native switch
      // Board already showing -> redirect to the conversation view instead.
      e.stopImmediatePropagation()
      e.preventDefault()
      selectChatTab()
    }
    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, [])
  return null
}

function workspaceOfSession(workspaces: WorkspacesService | undefined, sessionId: string | undefined): string | undefined {
  if (!sessionId || !workspaces?.list) return undefined
  const items = workspaces.list.getSnapshot()?.items
  if (!Array.isArray(items)) return undefined
  const hit = items.find((w) => w && Array.isArray(w.sessionIds) && w.sessionIds.includes(sessionId))
  return hit ? hit.workspaceId : undefined
}

// ---------------------------------------------------------------------------
// Board workspace override (pin)
//
// DSH renders the conversation view area (and with it the Board tab) only for
// NON-BLANK sessions. A workspace with no sessions yet has only blank ones,
// so its board has no session to host it. When that happens, the target
// board is PINNED into a usable conversation's Board tab via this override
// (scoped to that conversation — see lib/resolve.ts); it clears
// automatically once a session of that workspace becomes current (native
// resolution takes over).
// ---------------------------------------------------------------------------

let boardOverride: BoardPin | null = null
const overrideListeners = new Set<() => void>()

export function getBoardOverride(): BoardPin | undefined {
  return boardOverride ?? undefined
}

export function setBoardOverride(pin: BoardPin | null) {
  const same =
    (boardOverride === null && pin === null) ||
    (boardOverride !== null &&
      pin !== null &&
      boardOverride.workspaceId === pin.workspaceId &&
      boardOverride.hostSessionId === pin.hostSessionId)
  if (same) return
  boardOverride = pin
  for (const l of overrideListeners) l()
}

export function subscribeBoardOverride(listener: () => void): () => void {
  overrideListeners.add(listener)
  return () => {
    overrideListeners.delete(listener)
  }
}

/** Always-mounted controller that fulfills openBoardInApp requests. */
export function BoardOpener({ workspaces, sessions }: ControllerProps) {
  useEffect(() => {
    if (!workspaces || !sessions) return
    const list = () => sessions.list.getSnapshot() as { current?: string; ids?: string[]; byId?: Record<string, { blank?: boolean }> }
    const isNonBlank = (id: string | undefined): id is string => {
      if (id === undefined) return false
      const byId = list().byId
      return !!(byId && byId[id] && byId[id].blank === false)
    }
    const currentNonBlank = (): string | undefined => {
      const cur = list().current
      return isNonBlank(cur) ? cur : undefined
    }
    // Archived sessions are unusable as open targets: the runtime clears the
    // selection immediately (project() sees current ∈ archivedSessionIds →
    // sessions.clear()), leaving the blank hero instead of the conversation.
    const archivedIds = (): Set<string> => {
      const snap = workspaces.list?.getSnapshot?.() as { archivedSessionIds?: string[] } | undefined
      return new Set(Array.isArray(snap?.archivedSessionIds) ? snap!.archivedSessionIds! : [])
    }
    const nonBlankSessionOf = (workspaceId: string): string | undefined => {
      const items = workspaces.list?.getSnapshot?.()?.items
      const w = Array.isArray(items) ? items.find((i) => i && i.workspaceId === workspaceId) : undefined
      if (!w || !Array.isArray(w.sessionIds)) return undefined
      const archived = archivedIds()
      return w.sessionIds.find((id) => isNonBlank(id) && !archived.has(id))
    }
    const anyNonBlankSession = (): string | undefined => {
      const snap = list()
      const archived = archivedIds()
      for (const id of snap.ids ?? []) if (isNonBlank(id) && !archived.has(id)) return id
      return undefined
    }
    // Wait until pred() holds (checked now, on every sessions.list tick, on
    // every workspaces.list tick — the predicate may read both stores — and
    // on a timeout), then run done() exactly once.
    const settleThen = (pred: () => boolean, done: () => void, timeoutMs = 6000) => {
      if (pred()) {
        done()
        return
      }
      let finished = false
      const finish = () => {
        if (finished) return
        finished = true
        unsubscribeSessions()
        if (typeof unsubscribeWorkspaces === "function") unsubscribeWorkspaces()
        window.clearTimeout(timer)
        done()
      }
      const unsubscribeSessions = sessions!.list.subscribe(() => {
        if (pred()) finish()
      })
      const unsubscribeWorkspaces = workspaces!.list?.subscribe?.(() => {
        if (pred()) finish()
      })
      const timer = window.setTimeout(finish, timeoutMs)
    }
    const finishOpening = () => {
      // If the Board tab is already the active view, changing the pin/current
      // session is enough — do not click the tab again. Otherwise switch to it.
      if (!boardTabActive()) selectBoardTab()
      window.setTimeout(() => {
        openingBoard = false
      }, 600)
    }

    const open = (workspaceId: string) => {
      const trace = (caseId: string, extra?: Record<string, unknown>) => {
        // Diagnostic trail for the session-less open path; safe to remove later.
        console.info(
          `[dsh-kanban-flow] open case ${caseId}:`,
          JSON.stringify({
            target: workspaceId,
            current: currentNonBlank() ?? null,
            actualCurrent: list().current ?? null,
            override: boardOverride,
            boardTabActive: boardTabActive(),
            ...extra,
          }),
        )
      }
      // 1) Current conversation can host the board: toggle in place.
      const current = currentNonBlank()
      if (current !== undefined) {
        const effective = boardOverride?.workspaceId ?? workspaceOfSession(workspaces, current)
        if (effective === workspaceId) {
          trace("1-toggle", { effective })
          if (boardTabActive()) selectChatTab()
          else selectBoardTab()
          return
        }
      }
      openingBoard = true
      // 2) Target workspace has a real (non-blank) session: open it + Board tab.
      const targetSession = nonBlankSessionOf(workspaceId)
      if (targetSession !== undefined) {
        trace("2-native", { targetSession })
        setBoardOverride(null) // native resolution from here on
        if (sessions.open) sessions.open(targetSession)
        settleThen(() => list().current === targetSession, finishOpening)
        return
      }
      // 3) No usable session in the target workspace: pin its board into the
      //    current conversation (which must be non-blank to show the tab).
      if (current !== undefined) {
        trace("3-pin-current")
        setBoardOverride({ workspaceId, hostSessionId: current })
        finishOpening()
        return
      }
      // 4) No non-blank session anywhere near: borrow an existing
      //    conversation — preferring the current session's own workspace so
      //    the user stays in context — then pin the target board into it.
      const currentWorkspaceId = workspaceOfSession(workspaces, list().current)
      const borrowed =
        (currentWorkspaceId !== undefined ? nonBlankSessionOf(currentWorkspaceId) : undefined) ??
        anyNonBlankSession()
      if (borrowed !== undefined) {
        trace("4-borrow", { borrowed, currentWorkspaceId })
        setBoardOverride({ workspaceId, hostSessionId: borrowed })
        if (list().current === borrowed) finishOpening()
        else {
          if (sessions.open) sessions.open(borrowed)
          settleThen(() => list().current === borrowed, finishOpening)
        }
        return
      }
      // 5) Fresh app, zero usable conversations: create the workspace's first
      //    session and seed it with a minimal turn — the accepted turn makes
      //    the session non-blank, which renders the header/tabs/view area,
      //    and the Board tab becomes available. No pin needed: the session
      //    belongs to the target workspace, so resolution is native.
      trace("5-seed")
      workspaces.startSession(workspaceId)
      settleThen(
        () => {
          const cur = list().current
          return cur !== undefined && workspaceOfSession(workspaces, cur) === workspaceId
        },
        () => {
          const cur = list().current
          if (cur === undefined || workspaceOfSession(workspaces, cur) !== workspaceId) {
            // never landed in the target workspace (connect failed): give up
            // instead of seeding some other workspace's conversation
            openingBoard = false
            return
          }
          const binding = sessions.binding ? sessions.binding(cur) : undefined
          const seeded = binding?.session.prompt(
            [{ type: "text", text: "Kanban board bootstrap: reply with the single word \"ready\"." }],
            "queue",
          )
          Promise.resolve(seeded).catch((err) => console.warn("dsh-kanban-flow: board seed prompt failed", err))
          settleThen(() => currentNonBlank() !== undefined, finishOpening, 20000)
        },
        10000,
      )
    }
    openImpl = open
    return () => {
      if (openImpl === open) openImpl = null
    }
  }, [workspaces, sessions])
  return null
}

/**
 * Dismiss-as-toggle: the board disappears when the user navigates away —
 * clicking a session row in the sidebar (same or another session) or any
 * current-session change switches the view back to chat. Never blocks the
 * native navigation.
 */
export function BoardDismiss({ sessions }: ControllerProps) {
  useEffect(() => {
    if (typeof document === "undefined") return
    const onClick = (e: Event) => {
      if (!(e.target instanceof Element)) return
      const row = e.target.closest<HTMLElement>('[role="treeitem"]')
      if (!row || row.hasAttribute("aria-expanded")) return // workspace rows: ClickMode's job
      if (e.target.closest("button")) return // row action buttons: native only
      if (boardTabActive()) dismissBoardTab()
    }
    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, [])

  useEffect(() => {
    if (!sessions?.list) return
    let prev = sessions.list.getSnapshot()?.current
    const unsubscribe = sessions.list.subscribe(() => {
      const now = sessions.list.getSnapshot()?.current
      if (now === prev) return
      prev = now
      if (!openingBoard) dismissBoardTab()
    })
    return unsubscribe
  }, [sessions])

  return null
}

// ---------------------------------------------------------------------------
// Sidebar row mapping (defensive)
// ---------------------------------------------------------------------------

function findWorkspaceRows(): HTMLElement[] {
  if (typeof document === "undefined") return []
  const rows = Array.from(document.querySelectorAll<HTMLElement>('[role="treeitem"][aria-expanded]'))
  return rows.filter((row) => titleSpanOf(row) !== null)
}

function titleSpanOf(row: HTMLElement): HTMLElement | null {
  const spans = Array.from(row.querySelectorAll<HTMLElement>(":scope > span"))
  for (const s of spans) {
    const text = (s.textContent || "").trim()
    if (text !== "" && s.querySelector("button") === null && s.querySelector("svg") === null) return s
  }
  return null
}

function actionsSpanOf(row: HTMLElement): HTMLElement | null {
  const spans = Array.from(row.querySelectorAll<HTMLElement>(":scope > span"))
  for (const s of spans) if (s.querySelector("button") !== null) return s
  return null
}

function isIconBit(row: HTMLElement, target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false
  const span = target.closest("span")
  if (!span || !row.contains(span)) return false
  return span.querySelector("svg") !== null && span.querySelector("button") === null && (span.textContent || "").trim() === ""
}

/**
 * Resolve a workspace row to its workspace id. The sidebar renders workspace
 * groups in host list order, so the n-th row titled T is the n-th workspace
 * titled T (duplicate titles stay distinct).
 */
function workspaceIdForRow(workspaces: WorkspacesService | undefined, row: HTMLElement): string | null {
  const titleSpan = titleSpanOf(row)
  if (!titleSpan) return null
  const title = (titleSpan.textContent || "").trim()
  const items = workspaces?.list?.getSnapshot?.()?.items
  if (!Array.isArray(items)) return null
  let occurrence = 0
  for (const other of findWorkspaceRows()) {
    if (other === row) break
    const otherTitle = titleSpanOf(other)
    if (otherTitle && (otherTitle.textContent || "").trim() === title) occurrence += 1
  }
  return matchWorkspaceByTitle(items, title, occurrence)
}

function kanbanSvg(): SVGSVGElement {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  svg.setAttribute("viewBox", "0 0 16 16")
  svg.setAttribute("width", "14")
  svg.setAttribute("height", "14")
  svg.setAttribute("fill", "none")
  for (const [x, h] of [[1.5, 12], [6, 8], [10.5, 5]] as const) {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
    rect.setAttribute("x", String(x))
    rect.setAttribute("y", "2")
    rect.setAttribute("width", "4")
    rect.setAttribute("height", String(h))
    rect.setAttribute("rx", "1.4")
    rect.setAttribute("fill", "currentColor")
    svg.appendChild(rect)
  }
  return svg
}

// ---------------------------------------------------------------------------
// Controllers
// ---------------------------------------------------------------------------

/** Injects a kanban board button into every mapped workspace row. */
export function SidebarIcons({ workspaces }: ControllerProps) {
  useEffect(() => {
    if (typeof document === "undefined") return
    let disposed = false

    const inject = () => {
      if (disposed) return
      for (const row of findWorkspaceRows()) {
        const titleSpan = titleSpanOf(row)
        const actions = actionsSpanOf(row)
        if (!titleSpan || !actions) continue
        if (actions.querySelector(`[${KANBAN_BTN_FLAG}]`)) continue
        const workspaceId = workspaceIdForRow(workspaces, row)
        if (!workspaceId) continue
        const title = (titleSpan.textContent || "").trim()
        const btn = document.createElement("button")
        btn.type = "button"
        btn.setAttribute(KANBAN_BTN_FLAG, "")
        btn.className = "kf-sidebar-icon"
        btn.title = `Open kanban board (${title})`
        btn.setAttribute("aria-label", `Open kanban board for ${title}`)
        btn.appendChild(kanbanSvg())
        btn.addEventListener("click", (e) => {
          e.stopPropagation()
          e.preventDefault()
          openBoardInApp(workspaceId)
        })
        // Append at the end: after the ellipsis menu and the new-session
        // button, so the order is [⋯] [＋] [kanban].
        actions.appendChild(btn)
      }
    }

    const observer = new MutationObserver(() => inject())
    observer.observe(document.documentElement, { childList: true, subtree: true })
    const unsubscribe = workspaces?.list?.subscribe?.(() => inject())
    inject()
    return () => {
      disposed = true
      observer.disconnect()
      if (typeof unsubscribe === "function") unsubscribe()
      for (const btn of Array.from(document.querySelectorAll(`[${KANBAN_BTN_FLAG}]`))) btn.remove()
    }
  }, [workspaces])

  return null
}

/**
 * NEW workspace-click behavior: clicking a workspace row opens that
 * workspace's board in-app (Board view of its session); the leading
 * folder/chevron icon bit still toggles the session list. Inactive while the
 * preference is OFF (native behavior).
 */
export function ClickMode({ workspaces }: ControllerProps) {
  useEffect(() => {
    if (typeof document === "undefined") return
    const onClick = (e: Event) => {
      if (!getClickOpensBoard()) return
      if (!(e.target instanceof Element)) return
      const row = e.target.closest<HTMLElement>('[role="treeitem"][aria-expanded]')
      if (!row) return
      const titleSpan = titleSpanOf(row)
      if (!titleSpan) return // unmapped markup: native pass-through
      if (isIconBit(row, e.target)) return // folder/chevron: native expand/collapse
      if (e.target.closest("button") && !e.target.closest(`[${KANBAN_BTN_FLAG}]`)) return // row actions: native
      const workspaceId = workspaceIdForRow(workspaces, row)
      if (!workspaceId) return
      e.stopPropagation()
      e.preventDefault()
      openBoardInApp(workspaceId)
    }
    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, [workspaces])

  return null
}

// ---------------------------------------------------------------------------
// Chat <-> board sync: archiving a task session removes its board item
// ---------------------------------------------------------------------------

/**
 * Watches the sidebar's archived-session list; when a session that backs a
 * board item gets archived, the item is removed from its board. (The other
 * direction — deleting an item archives its session — lives in the agent
 * driver and the board UI.)
 */
export function ArchiveSync({ workspaces }: ControllerProps) {
  useEffect(() => {
    if (!workspaces?.list || typeof workspaces.list.getSnapshot !== "function") return
    let disposed = false
    let prevArchived = new Set<string>(workspaces.list.getSnapshot()?.archivedSessionIds ?? [])

    const check = async () => {
      if (disposed) return
      const snap = workspaces.list!.getSnapshot()
      const now = new Set<string>(snap?.archivedSessionIds ?? [])
      const added = [...now].filter((id) => !prevArchived.has(id))
      prevArchived = now
      if (added.length === 0) return
      // Find items backed by a newly archived session across all boards.
      for (const w of Array.isArray(snap?.items) ? snap.items : []) {
        if (!w || !w.workspaceId) continue
        try {
          const res = await callFlow("get", {}, w.workspaceId)
          const items = res?.board?.items ?? []
          for (const it of items) {
            if (it.sessionId && added.includes(it.sessionId)) {
              await callFlow("deleteItem", { id: it.id }, w.workspaceId)
            }
          }
        } catch {
          /* workspace board unavailable: skip */
        }
      }
    }

    const unsubscribe = workspaces.list.subscribe(() => {
      void check()
    })
    return () => {
      disposed = true
      unsubscribe()
    }
  }, [workspaces])

  return null
}
