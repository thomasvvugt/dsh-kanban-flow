/**
 * Settings surfaces. The Settings → Plugins → Kanban Flow tab carries the one
 * GLOBAL preference (workspace-click behavior). Per-board options — the
 * completion-confirmation toggle and the board code — live ONLY in the board
 * header gear popover, because they are board-specific.
 */
import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import { getClickOpensBoard, getConfirmArchive, setClickOpensBoard, setConfirmArchive, subscribeArchiveConfirm, subscribeClickPref } from "@/lib/store"
import type { Board } from "@/lib/types"

function Switch({ on, onToggle, label }: { on: boolean; onToggle: () => void; label: string }) {
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={label} className={"kf-switch" + (on ? " kf-on" : "")} onClick={onToggle}>
      <span className="kf-switch-thumb" />
    </button>
  )
}

export interface SettingsPopoverProps {
  board: Board
  onCode: (code: string) => void
  onConfirmRequired: (value: boolean) => void
  onClose: () => void
}

export function SettingsPopover({ board, onCode, onConfirmRequired, onClose }: SettingsPopoverProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [code, setCode] = useState(board.code)
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener("mousedown", onDown)
    return () => document.removeEventListener("mousedown", onDown)
  }, [onClose])
  const clean = code.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6)
  const valid = /^[A-Z0-9]{2,6}$/.test(clean)
  const confirmRequired = !!(board.settings && board.settings.confirmRequired)
  return (
    <div className="kf-pop" ref={ref} role="dialog" aria-label="Board settings">
      <div className="kf-toggle-row">
        <Switch on={confirmRequired} onToggle={() => onConfirmRequired(!confirmRequired)} label="Require confirmation to complete work" />
        <div className="kf-toggle-text">
          <div className="kf-toggle-title">Require confirmation to complete work</div>
          <div className="kf-toggle-sub">On: the agent must send finished work through Review — it can never move items to Done. You complete by dragging to Done.</div>
        </div>
      </div>
      <div>
        <div className="kf-fieldlabel">Board code</div>
        <div className="kf-code-row">
          <input className="kf-input" value={code} maxLength={6} onChange={(e) => setCode(e.target.value.toUpperCase())} />
          <button type="button" className="kf-btn" disabled={!valid || clean === board.code} onClick={() => onCode(clean)}>Save</button>
        </div>
        <div className="kf-toggle-sub" style={{ marginTop: 4 }}>Prefixes new item ids ({board.code}-1, {board.code}-2…). Existing ids stay unchanged. The workspace-click preference lives in Settings → Plugins → Kanban Flow.</div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Settings → Plugins → Kanban Flow tab (global preferences only)
// ---------------------------------------------------------------------------

export function SettingsTab() {
  const clickOpensBoard = useSyncExternalStore(subscribeClickPref, getClickOpensBoard)
  const confirmArchive = useSyncExternalStore(subscribeArchiveConfirm, getConfirmArchive)
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 520 }}>
      <div className="kf-toggle-row">
        <Switch on={clickOpensBoard} onToggle={() => setClickOpensBoard(!clickOpensBoard)} label="Workspace click opens board" />
        <div className="kf-toggle-text">
          <div className="kf-toggle-title">Workspace click opens board</div>
          <div className="kf-toggle-sub">
            New: clicking a workspace in the sidebar opens that workspace's board in-app, on the Board tab of its
            conversation (the folder icon still expands the session list).
            Old: clicking a workspace expands its session list.
          </div>
        </div>
      </div>
      <div className="kf-toggle-row">
        <Switch on={confirmArchive} onToggle={() => setConfirmArchive(!confirmArchive)} label="Require confirmation to archive items" />
        <div className="kf-toggle-text">
          <div className="kf-toggle-title">Require confirmation to archive items</div>
          <div className="kf-toggle-sub">
            On: archiving an item from its card first opens a confirmation dialog describing what will be removed.
            Off: the card's archive button removes the item (and archives its task session) immediately.
          </div>
        </div>
      </div>
      <div className="kf-muted">
        Board-specific options — “Require confirmation to complete work” and the board code — live in the gear
        menu of each board (Board tab → ⚙).
      </div>
    </div>
  )
}
