import type { FlowResponse } from "./types"

/** Same-origin fetch into the host plugin's /api/kanban-flow route. */
export function callFlow(
  method: string,
  args: Record<string, unknown> = {},
  workspaceId = "default",
): Promise<FlowResponse> {
  return fetch("/api/kanban-flow", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ method, args: { ...args, workspaceId } }),
  })
    .then((r) => r.json())
    .catch((err) => ({ ok: false, error: String((err && err.message) || err) }) as FlowResponse)
}
