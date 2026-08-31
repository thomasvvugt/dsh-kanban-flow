/**
 * dsh-kanban-flow — pure board core (no cordis, no DOM; unit-testable).
 *
 * All state-machine rules, validation, normalization and migration logic for
 * the per-workspace kanban board live here. The host plugin (index.js) and the
 * test suite import this module directly.
 *
 * Schema v2: items carry only id, name, description (+ workflow metadata).
 * Comments and linked items were removed in v2; agents narrate progress in
 * their task session conversation instead, and the board shows a compact
 * latest-activity line per item.
 */

export const SCHEMA_VERSION = 2
export const LEGACY_VERSION = 0

/** Fixed workflow columns; order is the board order. */
export const COLUMN_IDS = ['backlog', 'todo', 'in_progress', 'review', 'done']
export const COLUMN_TITLES = {
  backlog: 'Backlog',
  todo: 'To Do',
  in_progress: 'In Progress',
  review: 'Review',
  done: 'Done',
}

/** Cap on the append-only activity log to keep files bounded. */
export const ACTIVITY_LIMIT = 2000

const isObj = (v) => typeof v === 'object' && v !== null && !Array.isArray(v)
const strField = (v, fb) => (typeof v === 'string' && v ? v : fb)

// ---------------------------------------------------------------------------
// Board code (2–6 chars, A–Z0–9)
// ---------------------------------------------------------------------------

export function normalizeCode(v) {
  if (typeof v !== 'string') return null
  const up = v.toUpperCase().replace(/[^A-Z0-9]/g, '')
  return /^[A-Z0-9]{2,6}$/.test(up) ? up : null
}

/** Derive a valid board code suggestion from a workspace title (2–6 chars). */
export function deriveCode(title) {
  const words = String(title || '')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
  if (words.length === 0) return 'BOARD'
  if (words.length === 1) {
    const w = words[0].toUpperCase()
    return w.length >= 6 ? w.slice(0, 6) : w.length >= 2 ? w : (w + 'X').slice(0, 2)
  }
  const initials = words.map((w) => w[0]).join('').toUpperCase()
  return initials.length > 6 ? initials.slice(0, 6) : initials
}

// ---------------------------------------------------------------------------
// Entity normalization + migrations
// ---------------------------------------------------------------------------

const normItem = (c, i) => {
  if (!isObj(c)) return null
  const col = COLUMN_IDS.includes(c.columnId) ? c.columnId : 'backlog'
  return {
    id: strField(c.id, 'ITEM-' + (i + 1)),
    columnId: col,
    name: strField(c.name, 'Untitled item').slice(0, 160),
    description: typeof c.description === 'string' ? c.description.slice(0, 4000) : '',
    sessionId: typeof c.sessionId === 'string' ? c.sessionId : null,
    createdAt: strField(c.createdAt, null),
    createdBy: c.createdBy === 'agent' ? 'agent' : 'human',
  }
}

/** Activity types dropped entirely in v2 (comment/link features removed). */
const DROPPED_ACTIVITY_TYPES = new Set(['commented', 'item_linked', 'item_unlinked', 'card_created', 'card_moved'])

const normActivity = (a, i) => {
  if (!isObj(a) || DROPPED_ACTIVITY_TYPES.has(a.type)) return null
  return {
    id: strField(a.id, 'a' + (i + 1)),
    ts: strField(a.ts, new Date(0).toISOString()),
    itemId: typeof a.itemId === 'string' ? a.itemId : null,
    type: strField(a.type, 'unknown'),
    source: a.source === 'agent' ? 'agent' : 'human',
    from: typeof a.from === 'string' ? a.from : null,
    to: typeof a.to === 'string' ? a.to : null,
    text: typeof a.text === 'string' ? a.text : null,
    sessionId: typeof a.sessionId === 'string' ? a.sessionId : null,
  }
}

/**
 * Migration registry, keyed by old version.
 *   v0 -> v1: declare schema + normalize entities (historical).
 *   v1 -> v2: strip comments and linked items from items; drop comment/link
 *             activities; keep move/edit/delete audit intact.
 */
export const MIGRATIONS = {
  0: (data) => {
    const src = isObj(data) ? data : {}
    const pick = (arr) => (Array.isArray(arr) ? arr : [])
    return {
      schemaVersion: 1,
      code: normalizeCode(src.code) || 'KANBAN',
      codeConfirmed: src.codeConfirmed === true,
      seq: typeof src.seq === 'number' && Number.isFinite(src.seq) && src.seq > 0 ? Math.floor(src.seq) : 0,
      settings: { confirmRequired: isObj(src.settings) && src.settings.confirmRequired === true },
      items: pick(src.items).map(normItem).filter(Boolean),
      activities: pick(src.activities).map(normActivity).filter(Boolean),
    }
  },
  1: (data) => {
    const src = isObj(data) ? data : {}
    const pick = (arr) => (Array.isArray(arr) ? arr : [])
    return {
      schemaVersion: 2,
      code: normalizeCode(src.code) || 'KANBAN',
      codeConfirmed: src.codeConfirmed === true,
      seq: typeof src.seq === 'number' && Number.isFinite(src.seq) && src.seq > 0 ? Math.floor(src.seq) : 0,
      settings: { confirmRequired: isObj(src.settings) && src.settings.confirmRequired === true },
      items: pick(src.items).map(normItem).filter(Boolean),
      activities: pick(src.activities).map(normActivity).filter(Boolean),
    }
  },
}

/** Run the migration chain from fromVersion up to SCHEMA_VERSION. Throws on gaps. */
export function migrateBoard(data, fromVersion) {
  let out = data
  let v = fromVersion
  while (v < SCHEMA_VERSION) {
    const step = MIGRATIONS[v]
    if (typeof step !== 'function') throw new Error('missing migration v' + v + ' -> v' + (v + 1))
    out = step(out)
    v += 1
    if (!isObj(out) || out.schemaVersion !== v) {
      throw new Error('migration v' + (v - 1) + ' -> v' + v + ' produced invalid data')
    }
  }
  return out
}

/** Structural validation of the final shape. Returns { ok, errors }. */
export function validateBoard(data) {
  const errors = []
  if (!isObj(data)) return { ok: false, errors: ['board is not an object'] }
  if (data.schemaVersion !== SCHEMA_VERSION) {
    errors.push('expected schemaVersion ' + SCHEMA_VERSION + ', got ' + String(data.schemaVersion))
  }
  if (!Array.isArray(data.items)) errors.push('items must be an array')
  if (!Array.isArray(data.activities)) errors.push('activities must be an array')
  if (normalizeCode(data.code) === null) errors.push('code must be 2-6 chars A-Z0-9')
  if (Array.isArray(data.items)) {
    const seen = new Set()
    for (const it of data.items) {
      if (!isObj(it) || typeof it.id !== 'string' || !it.id) {
        errors.push('items contain an entry without a valid id')
        break
      }
      if (seen.has(it.id)) {
        errors.push('duplicate item id: ' + it.id)
        break
      }
      seen.add(it.id)
    }
  }
  return { ok: errors.length === 0, errors }
}

/**
 * Parse and upgrade board file text (pure). Corrupt / invalid / newer-schema
 * inputs return { ok: false, kind, warnings } — the caller backs up the file.
 */
export function parseBoardText(text) {
  const warnings = []
  let data
  try {
    data = JSON.parse(text)
  } catch {
    return { ok: false, kind: 'corrupt', warnings: ['Board data file is not valid JSON; it was backed up and the board opened empty.'] }
  }
  const version = isObj(data) && typeof data.schemaVersion === 'number' ? data.schemaVersion : LEGACY_VERSION
  if (version > SCHEMA_VERSION) {
    return {
      ok: false,
      kind: 'unsupported',
      version,
      warnings: [
        'Board data was written by a newer plugin version (schemaVersion ' + version + '); supported up to ' + SCHEMA_VERSION + '. The file was backed up and the board opened empty.',
      ],
    }
  }
  let migrated = false
  if (version < SCHEMA_VERSION) {
    try {
      data = migrateBoard(data, version)
      migrated = true
      warnings.push('Board data was automatically upgraded to schemaVersion ' + SCHEMA_VERSION + '; the pre-upgrade file was backed up.')
    } catch (err) {
      return { ok: false, kind: 'invalid', version, warnings: ['Board data upgrade failed (' + ((err && err.message) || err) + '); the file was backed up and the board opened empty.'] }
    }
  }
  const check = validateBoard(data)
  if (!check.ok) {
    return { ok: false, kind: 'invalid', version, warnings: ['Board data structure is invalid (' + check.errors.join('; ') + '); the file was backed up and the board opened empty.'] }
  }
  return { ok: true, kind: 'ok', data, migrated, fromVersion: version, warnings }
}

/** A fresh empty board for a workspace. */
export function emptyBoard(code) {
  return {
    schemaVersion: SCHEMA_VERSION,
    code: normalizeCode(code) || 'KANBAN',
    codeConfirmed: false,
    seq: 0,
    settings: { confirmRequired: false },
    items: [],
    activities: [],
  }
}

// ---------------------------------------------------------------------------
// Workflow state machine
// ---------------------------------------------------------------------------

/**
 * Agent move legality. Returns { ok: true } or { ok: false, reason }.
 * The human actor is never restricted here (the UI allows free drags).
 */
export function checkAgentMove(board, itemId, toColumn) {
  const item = board.items.find((i) => i.id === itemId)
  if (!item) return { ok: false, reason: 'Item not found: ' + itemId }
  if (!COLUMN_IDS.includes(toColumn)) return { ok: false, reason: 'Unknown column: ' + toColumn }
  const from = item.columnId
  if (from === toColumn) return { ok: false, reason: 'Item is already in ' + COLUMN_TITLES[toColumn] }
  if (toColumn === 'todo') {
    return {
      ok: false,
      reason:
        'Agents never move items to To Do. To Do is the human pickup signal (drag Backlog -> To Do yourself). To act on human feedback, move the item back to In Progress instead.',
    }
  }
  if (from === 'todo' && toColumn === 'in_progress') return { ok: true }
  if (from === 'todo') {
    return { ok: false, reason: 'Start by confirming pickup: move the item To Do -> In Progress first.' }
  }
  if (from === 'in_progress' && toColumn === 'review') return { ok: true }
  if (from === 'in_progress' && toColumn === 'done') {
    if (board.settings && board.settings.confirmRequired) {
      return {
        ok: false,
        reason:
          'This board requires human confirmation to complete work. Move the item In Progress -> Review and ask the human to confirm in your conversation; the human completes it by dragging to Done.',
      }
    }
    return { ok: true }
  }
  if (from === 'in_progress') return { ok: false, reason: 'Illegal agent move In Progress -> ' + COLUMN_TITLES[toColumn] }
  if (from === 'review' && toColumn === 'in_progress') return { ok: true }
  if (from === 'review') {
    return { ok: false, reason: 'Completion from Review is human-only. Stay in Review and wait for the human to drag the item.' }
  }
  if (from === 'done' && toColumn === 'in_progress') {
    return { ok: true }
  }
  if (from === 'done') return { ok: false, reason: 'Done items only reopen to In Progress (when the human replies); other moves are human-only.' }
  if (from === 'backlog') {
    return { ok: false, reason: 'Items in Backlog are not being worked on. Wait for the human to move the item to To Do.' }
  }
  return { ok: false, reason: 'Illegal agent move ' + from + ' -> ' + toColumn }
}

/** English workflow rule text embedded into agent tool output. */
export function workflowRules(board) {
  const confirm = board && board.settings && board.settings.confirmRequired
  return [
    'Kanban workflow rules (columns: ' + COLUMN_IDS.map((id) => COLUMN_TITLES[id]).join(' -> ') + '):',
    '- The HUMAN moves items Backlog -> To Do to hand you work. You can NEVER move anything into To Do.',
    '- When you see an item in To Do addressed to you: read it (kanbanflow_get_item), then move it To Do -> In Progress to confirm pickup and start working.',
    '- While working: narrate your progress, decisions and questions in this conversation — the human reads the chat, not the board.',
    '- Need a human (question, decision, missing info, partial-result review)? Move the item In Progress -> Review, state your question in the conversation, and wait.',
    '- When the human replies or returns an item to you: move it Review -> In Progress and address their message in the same turn.',
    '- When the human sends a follow-up message while an item is Done: reopen it by moving Done -> In Progress, then work on their request.',
    confirm
      ? '- This board REQUIRES confirmation: you can NEVER move an item to Done. Finish via Review and let the human drag it to Done.'
      : '- When the task is fully complete: move the item In Progress -> Done (self-evaluated).',
    '- Always reference items by their id (e.g. ' + (board && board.code ? board.code : 'CODE') + '-1). Never modify other items.',
    '- Scope limit: execute ONLY the work described in the picked-up item. If other work surfaces, mention it and let the human queue a separate item instead of starting it.',
    '- Deleting an item archives its task session — only delete when the human asks.',
  ].join('\n')
}

// ---------------------------------------------------------------------------
// Mutations (pure-ish: mutate the given board object, return op result)
// ---------------------------------------------------------------------------

export function nextItemId(board) {
  board.seq = Math.max(board.seq || 0, highestItemNumber(board)) + 1
  return board.code + '-' + board.seq
}

function highestItemNumber(board) {
  const prefix = board.code + '-'
  let max = 0
  for (const it of board.items) {
    if (typeof it.id === 'string' && it.id.startsWith(prefix)) {
      const n = Number(it.id.slice(prefix.length))
      if (Number.isFinite(n) && n > max) max = n
    }
  }
  return max
}

export function record(board, ev) {
  if (!Array.isArray(board.activities)) board.activities = []
  board.activities.push({ id: 'a' + board.activities.length + '-' + Date.now(), ts: new Date().toISOString(), ...ev })
  if (board.activities.length > ACTIVITY_LIMIT) board.activities.splice(0, board.activities.length - ACTIVITY_LIMIT)
}

export function setCode(board, code, confirmed) {
  const normalized = normalizeCode(code)
  if (!normalized) return { error: 'Board code must be 2-6 characters (letters and digits)' }
  const oldCode = board.code
  board.code = normalized
  if (confirmed === true) board.codeConfirmed = true
  // Keep existing item ids stable; re-key seq counter to the new prefix.
  board.seq = Math.max(board.seq || 0, highestItemNumber(board))
  record(board, { itemId: null, type: 'code_changed', source: 'human', from: oldCode, to: normalized })
  return { message: 'Board code set to ' + normalized }
}

export function createItem(board, { name, description, columnId, actor }) {
  const col = COLUMN_IDS.includes(columnId) ? columnId : 'backlog'
  const cleanName = String(name || '').slice(0, 160).trim()
  if (!cleanName) return { error: 'Item name is required' }
  const item = {
    id: nextItemId(board),
    columnId: col,
    name: cleanName,
    description: String(description || '').slice(0, 4000),
    sessionId: null,
    createdAt: new Date().toISOString(),
    createdBy: actor === 'agent' ? 'agent' : 'human',
  }
  board.items.push(item)
  record(board, { itemId: item.id, type: 'item_created', source: item.createdBy, to: col, text: item.name })
  return { item, message: 'Created ' + item.id + ' "' + item.name + '" in ' + COLUMN_TITLES[col] }
}

export function updateItem(board, { id, name, description, actor }) {
  const item = board.items.find((i) => i.id === id)
  if (!item) return { error: 'Item not found: ' + id }
  if (typeof name === 'string' && name.trim()) item.name = name.trim().slice(0, 160)
  if (typeof description === 'string') item.description = description.slice(0, 4000)
  record(board, { itemId: item.id, type: 'item_updated', source: actor === 'agent' ? 'agent' : 'human' })
  return { message: 'Updated ' + item.id }
}

export function deleteItem(board, id, actor) {
  const item = board.items.find((i) => i.id === id)
  if (!item) return { error: 'Item not found: ' + id }
  board.items = board.items.filter((i) => i.id !== id)
  record(board, {
    itemId: id,
    type: 'item_deleted',
    source: actor === 'agent' ? 'agent' : 'human',
    text: item.name,
    sessionId: item.sessionId || null,
  })
  return { message: 'Deleted ' + id, deletedSessionId: item.sessionId || null }
}

export function moveItem(board, { id, toColumn, actor }) {
  const item = board.items.find((i) => i.id === id)
  if (!item) return { error: 'Item not found: ' + id }
  if (!COLUMN_IDS.includes(toColumn)) return { error: 'Unknown column: ' + toColumn }
  const from = item.columnId
  if (from === toColumn) return { error: 'Item is already in ' + COLUMN_TITLES[toColumn] }
  if (actor === 'agent') {
    const verdict = checkAgentMove(board, id, toColumn)
    if (!verdict.ok) return { error: 'Move rejected: ' + verdict.reason }
  }
  item.columnId = toColumn
  record(board, { itemId: item.id, type: 'item_moved', source: actor === 'agent' ? 'agent' : 'human', from, to: toColumn })
  return { message: 'Moved ' + item.id + ' ' + COLUMN_TITLES[from] + ' -> ' + COLUMN_TITLES[toColumn] }
}

export function setConfirmRequired(board, value) {
  board.settings = { ...(board.settings || {}), confirmRequired: value === true }
  record(board, { itemId: null, type: 'confirm_required_changed', source: 'human', to: String(value === true) })
  return { message: 'Completion confirmation ' + (value === true ? 'required' : 'not required') }
}

/** Clone for serialization to tools/HTTP (defensive copy). */
export function cloneBoard(b) {
  return {
    schemaVersion: b.schemaVersion,
    code: b.code,
    codeConfirmed: b.codeConfirmed === true,
    seq: b.seq,
    settings: { confirmRequired: !!(b.settings && b.settings.confirmRequired) },
    items: b.items.map((i) => ({
      id: i.id,
      columnId: i.columnId,
      name: i.name,
      description: i.description,
      sessionId: i.sessionId || null,
      createdAt: i.createdAt || null,
      createdBy: i.createdBy,
    })),
    activities: (b.activities || []).map((a) => ({ ...a })),
  }
}

/** Compact board summary used in agent tool output. */
export function summarizeBoard(b) {
  return {
    code: b.code,
    settings: { confirmRequired: !!(b.settings && b.settings.confirmRequired) },
    columns: COLUMN_IDS.map((id) => ({
      id,
      title: COLUMN_TITLES[id],
      count: b.items.filter((i) => i.columnId === id).length,
      items: b.items.filter((i) => i.columnId === id).map((i) => ({ id: i.id, name: i.name })),
    })),
  }
}
