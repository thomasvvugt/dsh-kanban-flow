import { describe, expect, it } from 'vitest'
import { matchWorkspaceByTitle, resolveBoardWorkspace } from '../src/client/lib/resolve'

const ws = (workspaceId, title, sessionIds = []) => ({ workspaceId, title, sessionIds })

const items = [
  ws('home', 'Home', ['s-current']),
  ws('fresh', 'Fresh', []),
  ws('rvig', 'RvIG', ['s-rvig']),
]

describe('resolveBoardWorkspace — native resolution', () => {
  it('shows the current session\'s own workspace', () => {
    const r = resolveBoardWorkspace({ currentSessionId: 's-current', workspaceItems: items })
    expect(r.workspaceId).toBe('home')
    expect(r.pinned).toBe(false)
    expect(r.nativeWorkspaceId).toBe('home')
  })

  it('falls back to the recent workspace when no session is current', () => {
    const r = resolveBoardWorkspace({ workspaceItems: items, recentWorkspaceId: 'rvig' })
    expect(r.workspaceId).toBe('rvig')
    expect(r.pinned).toBe(false)
  })

  it('falls back to default when nothing is known', () => {
    const r = resolveBoardWorkspace({ workspaceItems: [] })
    expect(r.workspaceId).toBe('default')
  })
})

describe('resolveBoardWorkspace — pinning a session-less workspace board', () => {
  it('shows the pinned board inside its host conversation', () => {
    const r = resolveBoardWorkspace({
      override: { workspaceId: 'fresh', hostSessionId: 's-current' },
      currentSessionId: 's-current',
      workspaceItems: items,
    })
    expect(r.workspaceId).toBe('fresh')
    expect(r.pinned).toBe(true)
    expect(r.workspaceTitle).toBe('Fresh')
    // native workspace still reported so the caller can clear the pin later
    expect(r.nativeWorkspaceId).toBe('home')
  })

  it('does NOT leak the pin into other conversations', () => {
    const r = resolveBoardWorkspace({
      override: { workspaceId: 'fresh', hostSessionId: 's-current' },
      currentSessionId: 's-rvig',
      workspaceItems: items,
    })
    expect(r.workspaceId).toBe('rvig')
    expect(r.pinned).toBe(false)
  })

  it('native resolution wins once the pinned workspace has its own conversation', () => {
    // the fresh workspace gained a session which is now current
    const grown = [ws('home', 'Home', ['s-current']), ws('fresh', 'Fresh', ['s-new']), ws('rvig', 'RvIG', ['s-rvig'])]
    const r = resolveBoardWorkspace({
      override: { workspaceId: 'fresh', hostSessionId: 's-current' },
      currentSessionId: 's-new',
      workspaceItems: grown,
    })
    expect(r.workspaceId).toBe('fresh')
    expect(r.pinned).toBe(false)
  })

  it('a pin without hostSessionId applies while unpinned conversations have no native claim', () => {
    // legacy/unscoped pin: applies when current belongs to another workspace,
    // but native still wins inside the pinned workspace itself
    const r = resolveBoardWorkspace({
      override: { workspaceId: 'fresh' },
      currentSessionId: 's-rvig',
      workspaceItems: items,
    })
    expect(r.workspaceId).toBe('fresh')
    expect(r.pinned).toBe(true)
  })

  it('a deleted pinned workspace falls back to native resolution', () => {
    const r = resolveBoardWorkspace({
      override: { workspaceId: 'gone', hostSessionId: 's-current' },
      currentSessionId: 's-current',
      workspaceItems: items,
    })
    expect(r.workspaceId).toBe('home')
    expect(r.pinned).toBe(false)
  })
})

describe('matchWorkspaceByTitle — collision-safe sidebar mapping', () => {
  const list = [ws('a', 'proj'), ws('b', 'other'), ws('c', 'proj'), ws('d', 'proj')]
  it('maps the n-th occurrence of a title to the n-th workspace with that title', () => {
    expect(matchWorkspaceByTitle(list, 'proj', 0)).toBe('a')
    expect(matchWorkspaceByTitle(list, 'proj', 1)).toBe('c')
    expect(matchWorkspaceByTitle(list, 'proj', 2)).toBe('d')
    expect(matchWorkspaceByTitle(list, 'other', 0)).toBe('b')
  })
  it('missing titles and out-of-range occurrences resolve to null', () => {
    expect(matchWorkspaceByTitle(list, 'nope', 0)).toBeNull()
    expect(matchWorkspaceByTitle(list, 'proj', 3)).toBeNull()
    expect(matchWorkspaceByTitle([], 'proj', 0)).toBeNull()
  })
})
