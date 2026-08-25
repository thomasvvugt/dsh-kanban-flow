/**
 * Item dialog: name/description editing, task-session link and a compact
 * activity list ("you moved to Done · 3 seconds ago"). Schema v2: no
 * comments, no linked items.
 */
import { useEffect, useState } from "react"
import { activityLine } from "@/lib/activity"
import { COLUMN_TITLES, type Board, type Item } from "@/lib/types"
import type { SessionsService } from "./KanbanBoard"

export interface CardFormValues {
  name: string
  description: string
}

export interface CardDialogProps {
  item: Item | null
  board: Board
  onOpenChange: (open: boolean) => void
  onSave: (values: CardFormValues) => void
  onDelete: (id: string) => void
  onOpenSession: (item: Item) => void
  sessions?: SessionsService
}

const COLUMN_LABEL = (id: string) => (COLUMN_TITLES as Record<string, string>)[id] || id

export function CardDialog(props: CardDialogProps) {
  const { item, board, onOpenChange, onSave, onDelete, onOpenSession, sessions } = props
  const [name, setName] = useState(item ? item.name : "")
  const [description, setDescription] = useState(item ? item.description : "")

  useEffect(() => {
    setName(item ? item.name : "")
    setDescription(item ? item.description : "")
  }, [item && item.id])

  if (!item) return null
  const activities = board.activities.filter((a) => a.itemId === item.id)

  return (
    <div className="kf-dialog-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onOpenChange(false) }}>
      <div className="kf-dialog" role="dialog" aria-label={"Item " + item.id}>
        <div className="kf-dialog-head">
          <span className="kf-code-chip">{item.id}</span>
          <span className="kf-dialog-title">{item.name}</span>
          <span className="kf-spacer" />
          {item.sessionId && sessions && (
            <button type="button" className="kf-btn" onClick={() => onOpenSession(item)}>Open task session</button>
          )}
          <button type="button" className="kf-iconbtn" title="Close" aria-label="Close item dialog" onClick={() => onOpenChange(false)}>✕</button>
        </div>
        <div className="kf-dialog-body">
          <div className="kf-muted">In <strong>{COLUMN_LABEL(item.columnId)}</strong>{item.sessionId ? " · linked to a task session" : ""}</div>

          <div>
            <div className="kf-fieldlabel">Name</div>
            <input className="kf-input" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <div className="kf-fieldlabel">Description</div>
            <textarea className="kf-textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="kf-newitem-row" style={{ justifyContent: "flex-start" }}>
            <button type="button" className="kf-btn kf-primary" onClick={() => onSave({ name, description })}>Save</button>
            <button type="button" className="kf-btn kf-danger" onClick={() => onDelete(item.id)}>Delete item</button>
          </div>
          {item.sessionId && (
            <div className="kf-muted">Deleting this item also archives its task session.</div>
          )}

          <div>
            <div className="kf-fieldlabel">Activity</div>
            {activities.length === 0 && <div className="kf-muted">No activity yet.</div>}
            {activities.slice().reverse().map((a) => (
              <div key={a.id} className="kf-activity-row">
                <span>{activityLine(a)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
