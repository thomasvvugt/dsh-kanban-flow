import { describe, expect, it } from 'vitest'
import {
  emptyBoard,
  createItem,
  moveItem,
  deleteItem,
  setCode,
  setConfirmRequired,
  setStatus,
  checkAgentMove,
  normalizeCode,
  deriveCode,
  parseBoardText,
  migrateBoard,
  validateBoard,
  nextItemId,
  workflowRules,
  cloneBoard,
  COLUMN_IDS,
} from '../lib/core.js'

const boardWith = (n = 3, settings = {}) => {
  const b = emptyBoard('TEST')
  b.settings = { confirmRequired: false, ...settings }
  for (let i = 0; i < n; i++) createItem(b, { name: 'Item ' + (i + 1), description: 'd', columnId: 'backlog', actor: 'human' })
  return b
}

describe('board code', () => {
  it('normalizes and validates codes', () => {
    expect(normalizeCode('ab')).toBe('AB')
    expect(normalizeCode('kan-b6')).toBe('KANB6')
    expect(normalizeCode('a')).toBeNull()
    expect(normalizeCode('ABCDEFG')).toBeNull()
    expect(normalizeCode('')).toBeNull()
  })
  it('derives codes from workspace titles', () => {
    expect(deriveCode('My Project')).toBe('MP')
    expect(deriveCode('dsh-kanban-flow')).toBe('DKF')
    expect(deriveCode('Authentication')).toBe('AUTHEN')
    expect(deriveCode('a')).toBe('AX')
    expect(deriveCode('')).toBe('BOARD')
  })
  it('changing the code keeps old ids and bumps seq above them', () => {
    const b = boardWith(2)
    const firstId = b.items[0].id
    setCode(b, 'NEW', true)
    expect(b.code).toBe('NEW')
    expect(b.items[0].id).toBe(firstId)
    const created = createItem(b, { name: 'after rename' })
    expect(created.item.id.startsWith('NEW-')).toBe(true)
  })
})

describe('item ids', () => {
  it('auto-increments per board and never reuses numbers', () => {
    const b = boardWith(3)
    expect(b.items.map((i) => i.id)).toEqual(['TEST-1', 'TEST-2', 'TEST-3'])
    deleteItem(b, 'TEST-2', 'human')
    const next = createItem(b, { name: 'new' })
    expect(next.item.id).toBe('TEST-4')
  })
  it('seq survives deletion and reaches above imported numbers', () => {
    const b = emptyBoard('TEST')
    b.items.push({ id: 'TEST-9', columnId: 'backlog', name: 'x', description: '', sessionId: null, createdAt: null, createdBy: 'human' })
    expect(nextItemId(b)).toBe('TEST-10')
  })
})

describe('status notes', () => {
  it('sets and clears the status note with a timestamp and activity record', () => {
    const b = boardWith(1)
    const r = setStatus(b, { id: 'TEST-1', note: '  Implemented the core, running tests next.  ', actor: 'agent' })
    expect(r.error).toBeUndefined()
    expect(b.items[0].statusNote).toBe('Implemented the core, running tests next.')
    expect(typeof b.items[0].statusAt).toBe('string')
    expect(b.activities.at(-1).type).toBe('item_status')
    expect(b.activities.at(-1).source).toBe('agent')
    const cleared = setStatus(b, { id: 'TEST-1', note: '   ', actor: 'agent' })
    expect(cleared.error).toBeUndefined()
    expect(b.items[0].statusNote).toBeNull()
    expect(b.items[0].statusAt).toBeNull()
  })
  it('caps the note length and rejects unknown items', () => {
    const b = boardWith(1)
    const long = 'x'.repeat(1000)
    setStatus(b, { id: 'TEST-1', note: long, actor: 'agent' })
    expect(b.items[0].statusNote.length).toBe(400)
    expect(setStatus(b, { id: 'NOPE', note: 'hi', actor: 'agent' }).error).toMatch(/not found/i)
  })
  it('cloneBoard carries status fields; unset stays null', () => {
    const b = boardWith(1)
    expect(cloneBoard(b).items[0].statusNote).toBeNull()
    setStatus(b, { id: 'TEST-1', note: 'halfway', actor: 'human' })
    const c = cloneBoard(b)
    expect(c.items[0].statusNote).toBe('halfway')
    expect(c.items[0].statusAt).toBe(b.items[0].statusAt)
  })
})

describe('agent transition table', () => {
  it('allows exactly the legal agent moves', () => {
    const b = boardWith(1)
    moveItem(b, { id: 'TEST-1', toColumn: 'todo', actor: 'human' })
    expect(checkAgentMove(b, 'TEST-1', 'in_progress').ok).toBe(true)
    moveItem(b, { id: 'TEST-1', toColumn: 'in_progress', actor: 'human' })
    expect(checkAgentMove(b, 'TEST-1', 'review').ok).toBe(true)
    expect(checkAgentMove(b, 'TEST-1', 'done').ok).toBe(true)
    moveItem(b, { id: 'TEST-1', toColumn: 'review', actor: 'human' })
    expect(checkAgentMove(b, 'TEST-1', 'in_progress').ok).toBe(true)
    expect(checkAgentMove(b, 'TEST-1', 'done').ok).toBe(false)
    moveItem(b, { id: 'TEST-1', toColumn: 'done', actor: 'human' })
    expect(checkAgentMove(b, 'TEST-1', 'in_progress').ok).toBe(true)
  })
  it('rejects agent moves into todo from anywhere', () => {
    const b = boardWith(2)
    moveItem(b, { id: 'TEST-1', toColumn: 'todo', actor: 'human' })
    moveItem(b, { id: 'TEST-2', toColumn: 'review', actor: 'human' })
    expect(checkAgentMove(b, 'TEST-1', 'todo').ok).toBe(false)
    expect(checkAgentMove(b, 'TEST-2', 'todo').ok).toBe(false)
  })
  it('rejects backlog -> anything and todo -> review/done for agents', () => {
    const b = boardWith(2)
    expect(checkAgentMove(b, 'TEST-1', 'in_progress').ok).toBe(false)
    moveItem(b, { id: 'TEST-1', toColumn: 'todo', actor: 'human' })
    expect(checkAgentMove(b, 'TEST-1', 'review').ok).toBe(false)
    expect(checkAgentMove(b, 'TEST-1', 'done').ok).toBe(false)
  })
  it('blocks In Progress -> Done when confirmation is required', () => {
    const b = boardWith(1, { confirmRequired: true })
    moveItem(b, { id: 'TEST-1', toColumn: 'todo', actor: 'human' })
    moveItem(b, { id: 'TEST-1', toColumn: 'in_progress', actor: 'agent' })
    const v = checkAgentMove(b, 'TEST-1', 'done')
    expect(v.ok).toBe(false)
    expect(v.reason).toMatch(/confirmation/i)
    expect(checkAgentMove(b, 'TEST-1', 'review').ok).toBe(true)
  })
  it('agent may reopen Done -> In Progress (human replied) but nothing else from Done', () => {
    const b = boardWith(1)
    moveItem(b, { id: 'TEST-1', toColumn: 'done', actor: 'human' })
    expect(checkAgentMove(b, 'TEST-1', 'in_progress').ok).toBe(true)
    expect(checkAgentMove(b, 'TEST-1', 'todo').ok).toBe(false)
    expect(checkAgentMove(b, 'TEST-1', 'review').ok).toBe(false)
    const r = moveItem(b, { id: 'TEST-1', toColumn: 'in_progress', actor: 'agent' })
    expect(r.error).toBeUndefined()
  })
  it('humans remain unrestricted', () => {
    const b = boardWith(1)
    for (const col of ['todo', 'in_progress', 'review', 'done', 'backlog']) {
      expect(moveItem(b, { id: 'TEST-1', toColumn: col, actor: 'human' }).error).toBeUndefined()
    }
  })
})

describe('moveItem enforcement', () => {
  it('records actor-stamped move activities without comments', () => {
    const b = boardWith(1)
    moveItem(b, { id: 'TEST-1', toColumn: 'todo', actor: 'human' })
    moveItem(b, { id: 'TEST-1', toColumn: 'in_progress', actor: 'agent' })
    const moves = b.activities.filter((a) => a.type === 'item_moved')
    expect(moves.map((m) => m.source)).toEqual(['human', 'agent'])
    expect(moves.map((m) => [m.from, m.to])).toEqual([['backlog', 'todo'], ['todo', 'in_progress']])
    expect(b.items[0].comments).toBeUndefined()
  })
  it('agent moves to review need no comment anymore', () => {
    const b = boardWith(1)
    moveItem(b, { id: 'TEST-1', toColumn: 'todo', actor: 'human' })
    moveItem(b, { id: 'TEST-1', toColumn: 'in_progress', actor: 'agent' })
    const r = moveItem(b, { id: 'TEST-1', toColumn: 'review', actor: 'agent' })
    expect(r.error).toBeUndefined()
  })
})

describe('deletion records the task session for archive sync', () => {
  it('deleteItem stamps sessionId into the activity', () => {
    const b = boardWith(1)
    b.items[0].sessionId = 'sess-1'
    const r = deleteItem(b, 'TEST-1', 'human')
    expect(r.deletedSessionId).toBe('sess-1')
    const act = b.activities.find((a) => a.type === 'item_deleted')
    expect(act.sessionId).toBe('sess-1')
    expect(act.source).toBe('human')
  })
  it('agent deletions are stamped as agent', () => {
    const b = boardWith(1)
    deleteItem(b, 'TEST-1', 'agent')
    expect(b.activities.find((a) => a.type === 'item_deleted').source).toBe('agent')
  })
})

describe('items carry only id, name, description (+ workflow metadata)', () => {
  it('created items have no comments or linkedItemIds', () => {
    const b = boardWith(1)
    const it = b.items[0]
    expect(Object.keys(it).sort()).toEqual(['columnId', 'createdAt', 'createdBy', 'description', 'id', 'name', 'sessionId'].sort())
  })
  it('cloneBoard strips legacy fields', () => {
    const b = boardWith(1)
    b.items[0].comments = [{ id: 'c1' }]
    b.items[0].linkedItemIds = ['TEST-9']
    const c = cloneBoard(b)
    expect(c.items[0].comments).toBeUndefined()
    expect(c.items[0].linkedItemIds).toBeUndefined()
  })
})

describe('persistence + migrations', () => {
  it('round-trips through JSON and parseBoardText', () => {
    const b = boardWith(2)
    b.items[0].sessionId = 'sess-1'
    setConfirmRequired(b, true)
    const text = JSON.stringify({ schemaVersion: 2, ...b })
    const parsed = parseBoardText(text)
    expect(parsed.ok).toBe(true)
    expect(parsed.data.code).toBe('TEST')
    expect(parsed.data.settings.confirmRequired).toBe(true)
    expect(parsed.data.items[0].sessionId).toBe('sess-1')
  })
  it('upgrades legacy schemaless files straight to v2', () => {
    const legacy = JSON.stringify({ code: 'old', items: [{ id: 'OLD-1', columnId: 'todo', name: 'x', comments: [{ id: 'c', author: 'agent', text: 'hi' }], linkedItemIds: ['OLD-2'] }], activities: [{ id: 'a1', ts: '2026-01-01T00:00:00.000Z', itemId: 'OLD-1', type: 'commented', source: 'agent' }, { id: 'a2', ts: '2026-01-01T00:00:01.000Z', itemId: 'OLD-1', type: 'item_moved', source: 'human', from: 'backlog', to: 'todo' }] })
    const parsed = parseBoardText(legacy)
    expect(parsed.ok).toBe(true)
    expect(parsed.migrated).toBe(true)
    expect(parsed.data.schemaVersion).toBe(2)
    expect(parsed.data.items[0].id).toBe('OLD-1')
    expect(parsed.data.items[0].comments).toBeUndefined()
    expect(parsed.data.items[0].linkedItemIds).toBeUndefined()
    expect(parsed.data.activities.map((a) => a.type)).toEqual(['item_moved'])
  })
  it('migrates v1 files to v2 (comments/links stripped, audit kept)', () => {
    const v1 = JSON.stringify({
      schemaVersion: 1,
      code: 'V1',
      codeConfirmed: true,
      seq: 3,
      settings: { confirmRequired: false },
      items: [{ id: 'V1-2', columnId: 'in_progress', name: 'x', description: '', comments: [{ id: 'c1', author: 'human', text: 'hello', ts: '2026-01-01T00:00:00.000Z' }], linkedItemIds: [], sessionId: 's1', createdAt: '2026-01-01T00:00:00.000Z', createdBy: 'human' }],
      activities: [
        { id: 'a1', ts: '2026-01-01T00:00:00.000Z', itemId: 'V1-2', type: 'commented', source: 'human' },
        { id: 'a2', ts: '2026-01-01T00:00:02.000Z', itemId: 'V1-2', type: 'item_linked', source: 'human' },
        { id: 'a3', ts: '2026-01-01T00:00:03.000Z', itemId: 'V1-2', type: 'item_moved', source: 'agent', from: 'todo', to: 'in_progress' },
      ],
    })
    const parsed = parseBoardText(v1)
    expect(parsed.ok).toBe(true)
    expect(parsed.migrated).toBe(true)
    expect(parsed.data.items[0].comments).toBeUndefined()
    expect(parsed.data.items[0].sessionId).toBe('s1')
    expect(parsed.data.activities.map((a) => a.type)).toEqual(['item_moved'])
    expect(validateBoard(parsed.data).ok).toBe(true)
  })
  it('flags corrupt json and newer schema', () => {
    expect(parseBoardText('{nope').kind).toBe('corrupt')
    const newer = JSON.stringify({ schemaVersion: 99, code: 'X', items: [], activities: [] })
    const r = parseBoardText(newer)
    expect(r.ok).toBe(false)
    expect(r.kind).toBe('unsupported')
  })
  it('migration chain upgrades step by step', () => {
    const out = migrateBoard({ code: 'old', items: [], activities: [] }, 0)
    expect(out.schemaVersion).toBe(2)
    expect(validateBoard(out).ok).toBe(true)
  })
  it('validateBoard catches duplicate ids', () => {
    expect(validateBoard({ schemaVersion: 2, code: 'AB', items: [{ id: 'A' }, { id: 'A' }], activities: [] }).ok).toBe(false)
  })
})

describe('workflow rules text', () => {
  it('adapts to the confirmation setting and covers Done reopening', () => {
    const off = workflowRules(emptyBoard('T'))
    expect(off).toMatch(/self-evaluated/)
    expect(off).toMatch(/Done -> In Progress/)
    const on = workflowRules({ code: 'T', settings: { confirmRequired: true } })
    expect(on).toMatch(/REQUIRES confirmation/)
    expect(on).not.toMatch(/self-evaluated/)
    expect(off).not.toMatch(/comment/i)
  })
})

describe('creation column triage', () => {
  it('agents and humans both create into backlog by default', () => {
    const b = emptyBoard('TEST')
    const agentCreate = createItem(b, { name: 'agent one', columnId: undefined, actor: 'agent' })
    expect(agentCreate.item.columnId).toBe('backlog')
    const humanCreate = createItem(b, { name: 'human one', columnId: undefined, actor: 'human' })
    expect(humanCreate.item.columnId).toBe('backlog')
    const ids = b.items.map((i) => i.columnId)
    expect(ids.every((c) => c !== 'todo')).toBe(true)
  })
})

describe('column ids are the fixed five', () => {
  it('matches the spec order', () => {
    expect(COLUMN_IDS).toEqual(['backlog', 'todo', 'in_progress', 'review', 'done'])
  })
})
