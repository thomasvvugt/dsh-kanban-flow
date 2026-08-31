/**
 * The kanban board UI: five fixed columns, dnd-kit drag & drop, item cards,
 * per-task session badges, board code dialog, settings popover and the
 * 3s poll that keeps agent changes flowing in while a board is visible.
 */
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react"
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  pointerWithin,
  rectIntersection,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type CollisionDetection,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core"
import { callFlow } from "@/lib/api"
import { notifyBoard } from "@/lib/AgentDriver"
import { activityParts } from "@/lib/activity"
import { getConfirmArchive, subscribeArchiveConfirm } from "@/lib/store"
import { dismissBoardTab } from "./Controllers"
import { COLUMN_IDS, COLUMN_TITLES, type Board, type ColumnId, type Item } from "@/lib/types"
import { ArchiveDialog } from "./ArchiveDialog"
import { CardDialog, type CardFormValues } from "./CardDialog"
import { CodeDialog } from "./CodeDialog"
import { SettingsPopover } from "./SettingsPanel"

export interface SessionsService {
  open(sessionId: string): void
  list?: { getSnapshot?: () => { current?: string } | undefined }
}

export interface KanbanBoardProps {
  workspaceId: string
  workspaceTitle?: string
  sessions?: SessionsService
  archiveSession?: (sessionId: string) => void
}

const combinationCollision: CollisionDetection = (args) => {
  const pointer = pointerWithin(args)
  if (pointer.length > 0) return pointer
  const intersections = rectIntersection(args)
  if (intersections.length > 0) return intersections
  return closestCorners(args)
}

function Icon({ path, size = 15 }: { path: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={path} />
    </svg>
  )
}
const PENCIL = "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"
const PLUS = "M5 12h14M12 5v14"
const GEAR = "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
const CHAT = "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
const ARCHIVE = "M2 4h20v4H2zM3 8v12h18V8 M10 12h4"

interface ActivityParts {
  phrase: string
  time: string
}

interface CardProps {
  item: Item
  flash: boolean
  lastActivity?: ActivityParts
  onOpenSession: () => void
  onEdit: () => void
  onArchive: () => void
}

function KfCard({ item, flash, lastActivity, onOpenSession, onEdit, onArchive }: CardProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: item.id })
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={
        "kf-card" + (flash ? " kf-agent-flash" : "") +
        (item.sessionId ? " kf-has-session" : "") +
        (isDragging ? " kf-dragging" : "")
      }
      style={{ ["--kf-card-accent" as string]: "var(--kf-accent, var(--dsw-alias-label-secondary))" }}
      onClick={(e) => {
        if ((e.target as Element).closest(".kf-edit-fab, .kf-archive-fab")) return
        if (item.sessionId) onOpenSession()
        else onEdit()
      }}
    >
      <button type="button" className="kf-edit-fab" title="Details" aria-label={"Details for " + item.id} onClick={(e) => { e.stopPropagation(); onEdit() }}>
        <Icon path={PENCIL} size={13} />
      </button>
      <button type="button" className="kf-archive-fab" title="Archive item" aria-label={"Archive " + item.id} onClick={(e) => { e.stopPropagation(); onArchive() }}>
        <Icon path={ARCHIVE} size={13} />
      </button>
      <div className="kf-card-id">
        {item.id}
        {item.sessionId && (
          <span className="kf-session-badge" title={"Open task session " + item.sessionId}>
            <Icon path={CHAT} size={11} />
          </span>
        )}
      </div>
      <div className="kf-card-name">{item.name}</div>
      {lastActivity && (
        <div className="kf-card-activity">
          <span className="kf-card-activity-phrase">{lastActivity.phrase}</span>
          <span className="kf-card-activity-time">{lastActivity.time}</span>
        </div>
      )}
    </div>
  )
}

interface NewItemProps {
  columnId: ColumnId
  onAdd: (name: string, description: string) => void
  onCancel: () => void
}

function NewItemForm({ columnId, onAdd, onCancel }: NewItemProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  return (
    <div className="kf-newitem">
      <input
        className="kf-input"
        autoFocus
        placeholder="Item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && name.trim()) onAdd(name, description)
          if (e.key === "Escape") onCancel()
        }}
      />
      <textarea
        className="kf-textarea"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="kf-newitem-row">
        <button type="button" className="kf-btn kf-ghost" onClick={onCancel}>Cancel</button>
        <button type="button" className="kf-btn kf-primary" disabled={!name.trim()} onClick={() => onAdd(name, description)}>
          Add to {COLUMN_TITLES[columnId]}
        </button>
      </div>
    </div>
  )
}

interface ColumnProps {
  colId: ColumnId
  highlighted: boolean
  /** Only the backlog column hosts the inline creation form. */
  adding: boolean
  items: Item[]
  flashIds: Set<string>
  lastLines: Map<string, ActivityParts>
  onAdd: (name: string, description: string) => void
  onCancelAdd: () => void
  onOpenSession: (item: Item) => void
  onEdit: (item: Item) => void
  onArchive: (item: Item) => void
}

function KfColumn({ colId, highlighted, adding, items, flashIds, lastLines, onAdd, onCancelAdd, onOpenSession, onEdit, onArchive }: ColumnProps) {
  const { setNodeRef } = useDroppable({ id: colId })
  return (
    <div className={"kf-column kf-" + colId + (highlighted ? " kf-over" : "")}>
      <div className="kf-column-head">
        <span className="kf-column-dot" />
        <span className="kf-column-title">{COLUMN_TITLES[colId]}</span>
      </div>
      <div className="kf-column-list" ref={setNodeRef}>
        {adding && <NewItemForm columnId={colId} onAdd={onAdd} onCancel={onCancelAdd} />}
        {items.length === 0 && !adding && <div className="kf-column-empty">No items</div>}
        {items.map((item) => (
          <KfCard
            key={item.id}
            item={item}
            flash={flashIds.has(item.id)}
            lastActivity={lastLines.get(item.id)}
            onOpenSession={() => onOpenSession(item)}
            onEdit={() => onEdit(item)}
            onArchive={() => onArchive(item)}
          />
        ))}
      </div>
    </div>
  )
}

export function KanbanBoard(props: KanbanBoardProps) {
  const { workspaceId, workspaceTitle, sessions, archiveSession } = props
  const [board, setBoard] = useState<Board | null>(null)
  const [error, setError] = useState("")
  const [warnings, setWarnings] = useState<string[]>([])
  const [dialog, setDialog] = useState<{ item: Item | null; columnId: ColumnId } | null>(null)
  const [adding, setAdding] = useState<ColumnId | null>(null)
  const [codeDialog, setCodeDialog] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [dragItem, setDragItem] = useState<Item | null>(null)
  const [archiveTarget, setArchiveTarget] = useState<Item | null>(null)
  const confirmArchive = useSyncExternalStore(subscribeArchiveConfirm, getConfirmArchive)
  const [overColumn, setOverColumn] = useState<ColumnId | null>(null)
  const [flashIds, setFlashIds] = useState<Set<string>>(new Set())
  const prevItemsRef = useRef<Map<string, string> | null>(null)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))

  const applyBoard = useCallback(
    (res: any) => {
      if (res && res.board) {
        const next: Board = { ...res.board, activities: Array.isArray(res.board.activities) ? res.board.activities : [] }
        // Detect agent-driven changes since the previous snapshot -> pulse flash.
        const prev = prevItemsRef.current
        if (prev) {
          const changed = new Set<string>()
          for (const it of next.items) {
            const p = prev.get(it.id)
            if (!p) continue
            if (p !== it.columnId + "|" + it.name + "|" + it.description) changed.add(it.id)
          }
          if (changed.size > 0) {
            setFlashIds(changed)
            window.setTimeout(() => setFlashIds(new Set()), 1500)
          }
        }
        prevItemsRef.current = new Map(next.items.map((i) => [i.id, i.columnId + "|" + i.name + "|" + i.description]))
        setBoard(next)
        setError("")
        notifyBoard(workspaceId, next)
      }
      if (res && typeof res.error === "string" && res.error) setError(res.error)
      if (Array.isArray(res && res.warnings) && res.warnings.length > 0) {
        setWarnings((w) => [...w, ...res.warnings])
      }
    },
    [workspaceId],
  )

  const act = useCallback(
    (method: string, args: Record<string, unknown> = {}) => callFlow(method, args, workspaceId).then(applyBoard),
    [workspaceId, applyBoard],
  )

  // initial load + poll while mounted
  useEffect(() => {
    let disposed = false
    const load = () => callFlow("get", {}, workspaceId).then((r) => { if (!disposed) applyBoard(r) })
    load()
    const timer = window.setInterval(load, 3000)
    return () => {
      disposed = true
      window.clearInterval(timer)
    }
  }, [workspaceId, applyBoard])

  // first-open code dialog (board used but code never confirmed)
  useEffect(() => {
    if (board && !board.codeConfirmed && !codeDialog) setCodeDialog(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board && board.codeConfirmed])

  const openSession = useCallback(
    (item: Item) => {
      if (!item.sessionId || !sessions) return
      // Opening the CURRENT session is a no-op (no selection change fires, so
      // the dismiss-on-navigation controller never runs): treat it as "close
      // the board and return to the conversation" instead.
      const current = sessions.list?.getSnapshot?.()?.current
      if (current !== undefined && current === item.sessionId) {
        dismissBoardTab()
        return
      }
      sessions.open(item.sessionId)
    },
    [sessions],
  )

  const onDragStart = (e: DragStartEvent) => {
    const item = board?.items.find((i) => i.id === String(e.active.id))
    if (item) setDragItem(item)
  }

  const onDragOver = (e: { over: { id: string | number } | null }) => {
    const overId = e.over ? String(e.over.id) : null
    setOverColumn(COLUMN_IDS.includes(overId as ColumnId) ? (overId as ColumnId) : null)
  }

  const onDragEnd = (e: DragEndEvent) => {
    setDragItem(null)
    const { active, over } = e
    if (!over || !board) return
    const itemId = String(active.id)
    const overId = String(over.id)
    const overIsColumn = COLUMN_IDS.includes(overId as ColumnId)
    const targetColumn = overIsColumn
      ? (overId as ColumnId)
      : board.items.find((i) => i.id === overId)?.columnId
    if (!targetColumn) return
    const item = board.items.find((i) => i.id === itemId)
    if (!item || item.columnId === targetColumn) return
    void act("moveItem", { id: itemId, toColumn: targetColumn })
  }

  const saveCard = (values: CardFormValues) => {
    if (!dialog) return
    if (dialog.item) {
      void act("updateItem", { id: dialog.item.id, name: values.name, description: values.description })
    } else {
      void act("createItem", { name: values.name, description: values.description, columnId: dialog.columnId })
    }
    setDialog(null)
  }

  // Quick-archive from the card: same behavior as the delete button in the
  // card dialog (deleteItem + archive the task session). Guarded by the
  // global "Require confirmation to archive items" preference (default on):
  // when on, an in-app confirmation dialog replaces the old native alert.
  const archiveItem = (item: Item) => {
    if (confirmArchive) {
      setArchiveTarget(item)
      return
    }
    runArchive(item)
  }

  const runArchive = (item: Item) => {
    void act("deleteItem", { id: item.id })
    if (item.sessionId && archiveSession) archiveSession(item.sessionId)
  }

  // Latest activity per item: phrase line ("harness moved to Done") with the
  // relative time ("3 seconds ago") on its own line underneath for visibility.
  const lastLines = useMemo(() => {
    const m = new Map<string, ActivityParts>()
    for (const a of board?.activities ?? []) {
      if (!a.itemId) continue
      m.set(a.itemId, activityParts(a))
    }
    return m
  }, [board])

  const header = board && (
    <div className="kf-header">
      <span className="kf-header-title">
        <span className="kf-code-chip">{board.code}</span>
        {workspaceTitle ? workspaceTitle : "Board"}
      </span>
      <span className="kf-count-chip">{board.items.length} items</span>
      <button
        type="button"
        className="kf-btn kf-primary kf-new-item-btn"
        title="New item (created in Backlog)"
        aria-label="Create a new item in Backlog"
        onClick={() => setAdding("backlog")}
      >
        <Icon path={PLUS} size={15} />
        New item
      </button>
      <span className="kf-spacer" />
      <button type="button" className="kf-iconbtn" title="Refresh" aria-label="Refresh board" onClick={() => act("get")}>
        <Icon path="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" />
      </button>
      <button type="button" className="kf-iconbtn" title="Board settings" aria-label="Board settings" onClick={() => setSettingsOpen((v) => !v)}>
        <Icon path={GEAR} />
      </button>
      {settingsOpen && (
        <SettingsPopover
          board={board}
          onCode={(code) => act("setCode", { code }).then(() => setCodeDialog(false))}
          onConfirmRequired={(v) => act("setConfirmRequired", { value: v })}
          onClose={() => setSettingsOpen(false)}
        />
      )}
    </div>
  )

  const content = board && (
    <div className="kf-body">
      <div className="kf-columns">
        {COLUMN_IDS.map((colId) => {
          const items = (board.items ?? []).filter((i) => i.columnId === colId)
          return (
            <KfColumn
              key={colId}
              colId={colId}
              highlighted={overColumn === colId && dragItem !== null}
              adding={adding === colId && colId === "backlog"}
              items={items}
              flashIds={flashIds}
              lastLines={lastLines}
              onAdd={(name, description) => {
                void act("createItem", { name, description, columnId: "backlog" })
                setAdding(null)
              }}
              onCancelAdd={() => setAdding(null)}
              onOpenSession={openSession}
              onEdit={(item) => setDialog({ item, columnId: item.columnId as ColumnId })}
              onArchive={archiveItem}
            />
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="kf-root">
      {warnings.length > 0 && (
        <div className="kf-warning">
          {warnings.map((w, i) => <div key={i}>{w}</div>)}
          <button type="button" className="kf-btn kf-ghost" onClick={() => setWarnings([])}>Dismiss</button>
        </div>
      )}
      {header}
      {error && <div className="kf-error kf-loading">{error}</div>}
      {board ? (
        <DndContext sensors={sensors} collisionDetection={combinationCollision} onDragStart={onDragStart} onDragOver={onDragOver as any} onDragEnd={onDragEnd}>
          {content}
          <DragOverlay dropAnimation={{ duration: 220, easing: "cubic-bezier(0.2, 0, 0, 1)" }}>
            {dragItem ? (
              <div className="kf-card kf-drag-ghost" style={{ width: 240, ["--kf-card-accent" as string]: "var(--kf-accent, var(--dsw-alias-label-secondary))" }}>
                <div className="kf-card-id">{dragItem.id}</div>
                <div className="kf-card-name">{dragItem.name}</div>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      ) : (
        !error && <div className="kf-loading">Loading board…</div>
      )}
      {board && dialog && (
        <CardDialog
          item={dialog.item}
          board={board}
          onOpenChange={(open) => { if (!open) setDialog(null) }}
          onSave={saveCard}
          onDelete={(id) => {
            const target = board.items.find((i) => i.id === id)
            void act("deleteItem", { id })
            // Deleting an item archives its task session (driver also catches
            // it via the activity log; this covers the closed-board case).
            if (target && target.sessionId && archiveSession) archiveSession(target.sessionId)
            setDialog(null)
          }}
          onOpenSession={openSession}
        />
      )}
      {archiveTarget && (
        <ArchiveDialog
          item={archiveTarget}
          onConfirm={() => {
            runArchive(archiveTarget)
            setArchiveTarget(null)
          }}
          onCancel={() => setArchiveTarget(null)}
        />
      )}
      {board && codeDialog && (
        <CodeDialog
          code={board.code}
          itemCount={board.items.length}
          onConfirm={(code) => act("setCode", { code }).then(() => setCodeDialog(false))}
          onDismiss={() => setCodeDialog(false)}
        />
      )}
    </div>
  )
}
