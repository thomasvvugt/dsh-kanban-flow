/**
 * Pure resolution helpers for the in-app board surface (no React, no DOM —
 * unit-testable).
 *
 * The Board tab of a conversation shows ONE workspace's board. Which one,
 * is decided here:
 *
 *   1. A PIN (set when a session-less workspace's board is opened — that
 *      workspace has no conversation to host its Board tab) applies only
 *      inside the conversation it was pinned into (hostSessionId) and only
 *      while the override workspace itself has no conversation current
 *      (native resolution takes over the moment it does).
 *   2. Otherwise the CURRENT session's own workspace (native resolution).
 *   3. Otherwise the most recently active workspace.
 */

/** A board pin: the workspace whose board is pinned, and the conversation
 *  (session id) it was pinned into. */
export interface BoardPin {
  workspaceId: string
  hostSessionId?: string
}

export interface WorkspaceSummaryLike {
  workspaceId: string
  title: string
  sessionIds?: string[]
}

export interface ResolveBoardWorkspaceArgs {
  /** Active pin, if any. */
  override?: BoardPin | null
  /** The conversation currently shown (sessions.list current). */
  currentSessionId?: string
  /** Workspace list snapshot items. */
  workspaceItems: WorkspaceSummaryLike[]
  /** Most recently active workspace id. */
  recentWorkspaceId?: string
}

export interface ResolvedBoardWorkspace {
  workspaceId: string
  workspaceTitle?: string
  /** True when the shown board comes from a pin (not native resolution). */
  pinned: boolean
  /** The current session's own workspace, when it has one (native board). */
  nativeWorkspaceId?: string
}

/**
 * Resolve which workspace's board the Board tab shows. Pure; every input is
 * a snapshot value so React can call it inside useSyncExternalStore flows.
 */
export function resolveBoardWorkspace(args: ResolveBoardWorkspaceArgs): ResolvedBoardWorkspace {
  const { override, currentSessionId, workspaceItems, recentWorkspaceId } = args
  const items = Array.isArray(workspaceItems) ? workspaceItems : []
  const byId = (id?: string) => (id ? items.find((w) => w && w.workspaceId === id) : undefined)
  const sessionWorkspace = currentSessionId
    ? items.find((w) => w && Array.isArray(w.sessionIds) && w.sessionIds.includes(currentSessionId))
    : undefined
  const nativeWorkspaceId = sessionWorkspace ? sessionWorkspace.workspaceId : undefined

  // A pin applies only inside its host conversation and only while the
  // override workspace has no conversation of its own current (native wins).
  // A pin whose workspace no longer exists is inert (native resolution).
  const pinCandidate =
    override !== undefined &&
    override !== null &&
    override.workspaceId !== nativeWorkspaceId &&
    (override.hostSessionId === undefined || override.hostSessionId === currentSessionId)
      ? override
      : undefined
  const pinnedWs = pinCandidate ? byId(pinCandidate.workspaceId) : undefined

  const effective = pinnedWs || sessionWorkspace || byId(recentWorkspaceId)
  return {
    workspaceId: effective ? effective.workspaceId : recentWorkspaceId || "default",
    workspaceTitle: effective ? effective.title : undefined,
    pinned: pinnedWs !== undefined,
    nativeWorkspaceId,
  }
}

/**
 * Map a sidebar workspace row to its workspace id by (title, occurrence):
 * the sidebar renders workspace groups in host list order, so the n-th row
 * titled T maps to the n-th workspace titled T. Collision-safe — duplicate
 * titles no longer collapse onto the first match.
 */
export function matchWorkspaceByTitle(
  items: WorkspaceSummaryLike[],
  title: string,
  occurrence = 0,
): string | null {
  if (!Array.isArray(items)) return null
  let seen = 0
  for (const w of items) {
    if (!w || w.title !== title) continue
    if (seen === occurrence) return w.workspaceId
    seen += 1
  }
  return null
}
