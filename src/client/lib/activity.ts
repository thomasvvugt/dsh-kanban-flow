/** Compact activity presentation: "harness moved to Done (3 seconds ago)". */
import type { Activity } from "./types"
import { COLUMN_TITLES } from "./types"

const columnLabel = (id: string | null | undefined) =>
  (COLUMN_TITLES as Record<string, string>)[String(id)] || String(id || "")

/** Relative, human-friendly time ("just now" … "3 days ago"). */
export function relTime(ts: string | null | undefined): string {
  if (!ts) return ""
  const t = new Date(ts).getTime()
  if (!Number.isFinite(t)) return ""
  const s = Math.max(0, (Date.now() - t) / 1000)
  if (s < 5) return "just now"
  if (s < 60) return `${Math.floor(s)} seconds ago`
  if (s < 120) return "1 minute ago"
  if (s < 3600) return `${Math.floor(s / 60)} minutes ago`
  if (s < 7200) return "1 hour ago"
  if (s < 86400) return `${Math.floor(s / 3600)} hours ago`
  return `${Math.floor(s / 86400)} days ago`
}

/** One-line summary of an activity ("you moved to To Do"). */
export function activityPhrase(a: Activity): string {
  const who = a.source === "agent" ? "harness" : "you"
  switch (a.type) {
    case "item_moved":
      return `${who} moved to ${columnLabel(a.to)}`
    case "item_created":
      return `${who} created`
    case "item_updated":
      return `${who} edited`
    case "item_deleted":
      return `${who} deleted`
    default:
      return `${who} ${a.type.replace(/_/g, " ")}`
  }
}

/** Full compact line: "harness moved to Done (3 seconds ago)". */
export function activityLine(a: Activity): string {
  return `${activityPhrase(a)} (${relTime(a.ts)})`
}

/** Card presentation parts: phrase and relative time rendered on separate lines. */
export function activityParts(a: Activity): { phrase: string; time: string } {
  return { phrase: activityPhrase(a), time: relTime(a.ts) }
}
