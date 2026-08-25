/**
 * Client-side stores: the workspace-click preference (global UI setting,
 * persisted in localStorage) and its subscription helpers.
 */

const CLICK_PREF_KEY = "dsh-kanban-flow.clickOpensBoard"
const CLICK_PREF_EVENT = "dsh-kanban-flow:clickPrefChanged"
const ARCHIVE_CONFIRM_KEY = "dsh-kanban-flow.confirmArchive"
const ARCHIVE_CONFIRM_EVENT = "dsh-kanban-flow:archiveConfirmChanged"

export function getClickOpensBoard(): boolean {
  try {
    const raw = localStorage.getItem(CLICK_PREF_KEY)
    if (raw === "0") return false
    if (raw === "1") return true
  } catch {
    /* storage unavailable: default on */
  }
  return true
}

export function setClickOpensBoard(value: boolean) {
  try {
    localStorage.setItem(CLICK_PREF_KEY, value ? "1" : "0")
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent(CLICK_PREF_EVENT))
}

export function subscribeClickPref(listener: () => void): () => void {
  window.addEventListener(CLICK_PREF_EVENT, listener)
  window.addEventListener("storage", listener)
  return () => {
    window.removeEventListener(CLICK_PREF_EVENT, listener)
    window.removeEventListener("storage", listener)
  }
}

/**
 * Global "Require confirmation to archive items" preference (default ON).
 * When on, archiving an item from its card shows an in-app confirmation
 * dialog instead of archiving immediately.
 */
export function getConfirmArchive(): boolean {
  try {
    const raw = localStorage.getItem(ARCHIVE_CONFIRM_KEY)
    if (raw === "0") return false
    if (raw === "1") return true
  } catch {
    /* storage unavailable: default on */
  }
  return true
}

export function setConfirmArchive(value: boolean) {
  try {
    localStorage.setItem(ARCHIVE_CONFIRM_KEY, value ? "1" : "0")
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent(ARCHIVE_CONFIRM_EVENT))
}

export function subscribeArchiveConfirm(listener: () => void): () => void {
  window.addEventListener(ARCHIVE_CONFIRM_EVENT, listener)
  window.addEventListener("storage", listener)
  return () => {
    window.removeEventListener(ARCHIVE_CONFIRM_EVENT, listener)
    window.removeEventListener("storage", listener)
  }
}
