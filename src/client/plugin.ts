/**
 * dsh-kanban-flow client plugin: slot registrations.
 *
 *  - conversation.view       "Board" tab — the in-app board for the session's
 *                            workspace (opened from the sidebar; see below)
 *  - settings.plugins.tab    Settings → Plugins → Kanban Flow panel (the
 *                            workspace-click toggle lives ONLY here)
 *  - sidebar.footer.action   invisible controllers: sidebar kanban icons,
 *                            workspace click mode, in-app board opener,
 *                            agent driver wiring
 */
import { createElement as h, useEffect, useSyncExternalStore } from "react"
import { KanbanBoard } from "./KanbanBoard"
import { SettingsTab } from "./SettingsPanel"
import { ArchiveSync, BoardDismiss, BoardOpener, BoardTabToggle, ClickMode, SidebarIcons, getBoardOverride, setBoardOverride, subscribeBoardOverride } from "./Controllers"
import { initAgentDriver } from "./lib/AgentDriver"
import { resolveBoardWorkspace } from "./lib/resolve"

interface WorkspaceSnapshot {
  items: Array<{ workspaceId: string; title: string; sessionIds: string[] }>
  recentWorkspaceId?: string
}

interface WorkspacesService {
  list: { getSnapshot(): any; subscribe(fn: () => void): () => void }
  startSession(workspaceId?: string): void
  archiveSession?(sessionId: string): Promise<void>
}
interface SessionsServiceFull {
  list: { getSnapshot(): any; subscribe(fn: () => void): () => void }
  open(sessionId: string): void
  create(opts?: { workspaceId?: string }): Promise<string>
  binding(id: string): { session: { rename(title: string): Promise<any>; prompt(content: Array<{ type: string; text: string }>, mode?: string): Promise<any> } } | undefined
}

function useWorkspaceSnapshot(workspaces: WorkspacesService | undefined): WorkspaceSnapshot {
  const fallback: WorkspaceSnapshot = { items: [] }
  if (!workspaces || !workspaces.list || typeof workspaces.list.getSnapshot !== "function") return fallback
  return useSyncExternalStore(
    (fn) => workspaces.list.subscribe(fn),
    () => workspaces.list.getSnapshot() as WorkspaceSnapshot,
  )
}

/**
 * The current session id from the sessions list (a primitive snapshot, so
 * useSyncExternalStore is safe). The conversation.view slot passes no session
 * identity in its props — this subscription is the reliable source.
 */
function useCurrentSession(sessions: SessionsServiceFull | undefined): string | undefined {
  if (!sessions || !sessions.list || typeof sessions.list.getSnapshot !== "function") return undefined
  return useSyncExternalStore(
    (fn) => sessions.list.subscribe(fn),
    () => (sessions.list.getSnapshot() as { current?: string }).current,
  )
}

/** Board tab inside a conversation (session-scoped props carry sessionId). */
function BoardTabView(props: { sessionId?: string; workspaces?: WorkspacesService; sessions?: SessionsServiceFull }) {
  const snap = useWorkspaceSnapshot(props.workspaces)
  const override = useSyncExternalStore(subscribeBoardOverride, getBoardOverride)
  const currentSessionId = useCurrentSession(props.sessions) ?? props.sessionId
  const resolved = resolveBoardWorkspace({
    override,
    currentSessionId,
    workspaceItems: Array.isArray(snap.items) ? snap.items : [],
    recentWorkspaceId: snap.recentWorkspaceId,
  })

  // Once a session of the override workspace is current, native resolution
  // takes over and the override becomes redundant — clear it.
  useEffect(() => {
    if (override && resolved.nativeWorkspaceId === override.workspaceId) setBoardOverride(null)
  }, [override, resolved.nativeWorkspaceId])

  const archiveSession = props.workspaces?.archiveSession
    ? (sessionId: string) => { void props.workspaces!.archiveSession!(sessionId) }
    : undefined
  return h(KanbanBoard, {
    workspaceId: resolved.workspaceId,
    workspaceTitle: resolved.pinned
      ? resolved.workspaceTitle || resolved.workspaceId
      : resolved.workspaceTitle,
    sessions: props.sessions,
    archiveSession,
  })
}

/** Settings tab: the single global preference (workspace-click behavior). */
function SettingsTabView() {
  return h(SettingsTab)
}

/** Invisible root controller host: sidebar icons, click mode, board opener. */
function RootControllers(props: { workspaces?: WorkspacesService; sessions?: SessionsServiceFull }) {
  useEffect(() => {
    const sessions = props.sessions
    if (!sessions) return
    initAgentDriver({
      createSession: (workspaceId) => sessions.create({ workspaceId }),
      renameSession: async (sessionId, title) => {
        const binding = sessions.binding(sessionId)
        const r = await binding?.session.rename(title)
        if (r && r.ok === false) console.warn("dsh-kanban-flow: rename failed", r.error)
      },
      promptSession: async (sessionId, text) => {
        const binding = sessions.binding(sessionId)
        if (!binding) throw new Error("session binding unavailable: " + sessionId)
        const r = await binding.session.prompt([{ type: "text", text }], "queue")
        if (r && r.ok === false) throw new Error("prompt failed: " + (r.error && r.error.message))
      },
      archiveSession: async (sessionId) => {
        const archive = props.workspaces?.archiveSession
        if (!archive) throw new Error("workspaces.archiveSession unavailable")
        await archive(sessionId)
      },
    })
  }, [props.sessions, props.workspaces])
  return h("div", { style: { display: "contents" } },
    h(BoardOpener, { workspaces: props.workspaces, sessions: props.sessions }),
    h(BoardDismiss, { workspaces: props.workspaces, sessions: props.sessions }),
    h(BoardTabToggle),
    h(ArchiveSync, { workspaces: props.workspaces }),
    h(SidebarIcons, { workspaces: props.workspaces }),
    h(ClickMode, { workspaces: props.workspaces }),
  )
}

export const KanbanFlowPlugin = {
  name: "dsh-kanban-flow",
  inject: ["slots"],
  apply(ctx: any) {
    const slots = ctx.get("slots")
    if (slots === undefined) return
    const workspaces: WorkspacesService | undefined = ctx.get("workspaces")
    const sessions: SessionsServiceFull | undefined = ctx.get("sessions")

    // "Board" tab beside conversation views — the in-app board surface.
    slots.inject("conversation.view", () =>
      slots.register(
        { name: "conversation.view", id: "kanban-flow", order: 20, label: "Board" },
        (props: any) => h(BoardTabView, { ...props, workspaces, sessions }),
      ),
    )

    // Settings → Plugins → Kanban Flow.
    slots.inject("settings.plugins.tab", () =>
      slots.register(
        { name: "settings.plugins.tab", id: "dsh-kanban-flow", order: 10, label: "Kanban Flow" },
        () => h(SettingsTabView),
      ),
    )

    // Always-mounted controllers in the sidebar footer action area.
    slots.inject("sidebar.footer.action", () =>
      slots.register(
        { name: "sidebar.footer.action", id: "kanban-flow-controllers", order: 90 },
        () => h(RootControllers, { workspaces, sessions }),
      ),
    )
  },
}
