/** First-open board code dialog: confirm or edit the suggested 2–6 char code. */
import { useEffect, useRef, useState } from "react"

export interface CodeDialogProps {
  code: string
  itemCount: number
  onConfirm: (code: string) => void
  onDismiss: () => void
}

export function CodeDialog({ code, itemCount, onConfirm, onDismiss }: CodeDialogProps) {
  const [value, setValue] = useState(code)
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    inputRef.current?.focus()
    inputRef.current?.select()
  }, [])
  const clean = value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6)
  const valid = /^[A-Z0-9]{2,6}$/.test(clean)
  return (
    <div className="kf-dialog-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onDismiss() }}>
      <div className="kf-dialog" role="dialog" aria-label="Board code" style={{ width: 400 }}>
        <div className="kf-dialog-head">
          <span className="kf-dialog-title">Name your board</span>
        </div>
        <div className="kf-dialog-body">
          <div className="kf-muted">
            Pick a short code (2–6 letters/digits) for this workspace's board. New items get ids like{" "}
            <strong>{(clean.length >= 2 ? clean : "XX") + "-1"}</strong>.
            {itemCount > 0 && " Existing item ids stay unchanged."}
          </div>
          <div>
            <div className="kf-fieldlabel">Board code</div>
            <input
              ref={inputRef}
              className="kf-input"
              style={{ fontFamily: "var(--ds-font-family-code)", textTransform: "uppercase", fontSize: 16, letterSpacing: "0.08em" }}
              value={value}
              onChange={(e) => setValue(e.target.value.toUpperCase())}
              onKeyDown={(e) => {
                if (e.key === "Enter" && valid) onConfirm(clean)
                if (e.key === "Escape") onDismiss()
              }}
              maxLength={6}
            />
          </div>
          <div className="kf-newitem-row" style={{ justifyContent: "flex-end" }}>
            <button type="button" className="kf-btn kf-ghost" onClick={onDismiss}>Decide later</button>
            <button type="button" className="kf-btn kf-primary" disabled={!valid} onClick={() => onConfirm(clean)}>
              Use {clean || "…"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
