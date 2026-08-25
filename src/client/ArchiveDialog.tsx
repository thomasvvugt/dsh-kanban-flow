/**
 * Archive confirmation dialog: shown when the global "Require confirmation
 * to archive items" preference is on and the user quick-archives an item
 * from its card. Replaces the old native window.confirm alert.
 */
import { useEffect, useRef } from "react"
import type { Item } from "@/lib/types"

export interface ArchiveDialogProps {
  item: Item
  onConfirm: () => void
  onCancel: () => void
}

export function ArchiveDialog({ item, onConfirm, onCancel }: ArchiveDialogProps) {
  const confirmRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    confirmRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel()
      if (e.key === "Enter") onConfirm()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [onConfirm, onCancel])
  return (
    <div className="kf-dialog-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onCancel() }}>
      <div className="kf-dialog" role="alertdialog" aria-label={"Archive " + item.id} style={{ width: 400 }}>
        <div className="kf-dialog-head">
          <span className="kf-dialog-title">Archive item?</span>
        </div>
        <div className="kf-dialog-body">
          <div className="kf-muted">
            Archive <strong>{item.id}</strong> “{item.name}”? The item will be removed from the board
            {item.sessionId ? " and its task session archived" : ""}.
          </div>
          <div className="kf-newitem-row" style={{ justifyContent: "flex-end" }}>
            <button type="button" className="kf-btn kf-ghost" onClick={onCancel}>Cancel</button>
            <button type="button" ref={confirmRef} className="kf-btn kf-danger" onClick={onConfirm}>Archive</button>
          </div>
        </div>
      </div>
    </div>
  )
}
