# dsh-kanban-flow

**Agent-driven kanban boards for DeepSeek Harness — one board per workspace, one task session per item.**

Partially based on the [dsh-kanban](https://github.com/alpacachen/dsh-kanban) plugin architecture, rebuilt around a
multica-style human/agent workflow: you triage, the agent works, comments every step, and asks for review when it
needs you.

## Install

```sh
dsh plugin --profile web add /path/to/dsh-kanban-flow
```

Restart `dsh web` afterwards. Confirm with `dsh --profile web --dump-config` (look for the `dsh-kanban-flow` layer).

## The workflow

Columns are fixed: **Backlog → To Do → In Progress → Review → Done**

| Who | Move | Meaning |
| --- | --- | --- |
| Human | Backlog → To Do | Hand the item to the agent (the only pickup trigger) |
| Agent | To Do → In Progress | Confirm pickup, start work |
| Agent | In Progress → Review | Needs a human (comment with the question is mandatory) |
| Agent | Review → In Progress | Resume straight after human feedback |
| Agent | Done → In Progress | Reopen when the human replies on a finished item |
| Agent | In Progress → Done | Self-evaluated completion — only when confirmation is OFF |
| Human | Review → Done / In Progress | Accept / rework |

Agents can never move items into To Do, never complete from Review, and never reopen Done items. The host plugin
enforces all of this in the `kanbanflow_move_item` tool — illegal moves are rejected with an explanation.

Commenting on an item while it is in Review (on the card **or** in the item's task session) sends the agent back to
work: it acknowledges, moves the item Review → In Progress and addresses the feedback in the same turn.

## Features

- **Kanban icon next to every workspace** in the sidebar — click to open that workspace's board
- **Board opens in-app**: clicking a workspace (or its kanban icon) opens the workspace's session in the
  conversation area with the **Board** tab selected — no popup
- **Board toggles**: clicking the same workspace again switches back to chat; clicking any session in the
  sidebar dismisses the board too — navigating away from the board always lands you in the conversation
- **Session-less workspaces**: a workspace with no conversations yet has no view area for its Board tab —
  its board pins into the current conversation's Board tab instead (header shows the board's code and
  workspace), and switches to native resolution once that workspace gets its own conversation. The pin
  lives only in the conversation it was opened from (other conversations keep showing their own board),
  and opening a board while the Board view is already showing works reliably (the opener's tab click is
  never mistaken for the user's board-tab toggle)
- **Workspace click opens the board** (new default) or expands sessions (old behavior) — global toggle in
  **Settings → Plugins → Kanban Flow** (the only place it lives)
- **Per-task agent sessions**: pickup creates a session named `CODE-12 · Item name`; clicking a card jumps to it
- **Board code** per workspace (2–6 chars): item ids like `API-3`, `DKF-17`
- Items carry **id, name, description** — progress narration lives in the task session conversation, and each
  card shows a compact latest-activity line ("harness moved to Done · 3 seconds ago")
- **Settings**: one global preference — workspace-click behavior (Settings → Plugins → Kanban Flow) — and
  per-board options in each board's gear menu: *require confirmation to complete work* (when on, the agent
  can never reach Done; you complete by dragging Review → Done) and the board code
- **Light & dark** via DSH design tokens with `light-dark()` column accents: slate/blue/violet/amber/emerald
- Animations for create/move/comment, drag lift with column highlight, agent-changed cards pulse; all respect
  `prefers-reduced-motion`
- English end-to-end

## Agent tools

`kanbanflow_get` · `kanbanflow_get_item` · `kanbanflow_create_item` · `kanbanflow_update_item` ·
`kanbanflow_move_item` · `kanbanflow_delete_item` · `kanbanflow_set_code`

## Storage

One JSON file per workspace: `<workspace>/.dsh-kanban-flow.json` (schema-versioned, migrated automatically,
corrupt files are backed up before being reset).

## Development

```sh
npm install
npm test          # vitest unit tests (state machine, ids, links, migrations)
npm run typecheck
npm run build     # rebuild lib/client.js (committed) via esbuild
```

## Notes

- The sidebar icon and workspace-click behavior anchor on DSH 0.1.1-rc.2 sidebar markup (no per-row slot exists);
  they degrade to native behavior if the markup changes, and icons only appear in the expanded sidebar.
- Board views poll every 3s; agent moves appear on the next poll.

## License

MIT
