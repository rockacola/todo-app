# Skill: Create Task

## Trigger

When a unit of work is identified that should be tracked — by any agent or at operator request.

## Steps

1. List existing files under `.ai/tasks/active/` and `.ai/tasks/completed/` to determine the next sequential ID (zero-padded to three digits, e.g. `task-004`). IDs must be unique across both directories.
2. Identify or ask the operator for:
   - Task title (concise, verb-first)
   - Assigned agent (must be listed in `.ai/manifests/agents.yaml` under `active_agents`)
   - Description of the work and its acceptance criteria
   - Dependencies on other tasks (by task ID), if any
3. Write `.ai/tasks/active/{id}.yaml` using the schema in `spec/file-schemas.yaml`:

```yaml
id: task-{id}
title: { title }
status: pending
agent: { agent }
created_at: { iso8601_timestamp }
description: |
  {description}
depends_on: [{ dependency-ids }]
output: null
```

4. Do not set `status` to anything other than `pending` at creation time.
5. Add a journal entry in `.ai/journal/{YYYY}/{today}.md` under `Changes Made` noting the new task ID and title.

## Lifecycle

- All new tasks are created in `.ai/tasks/active/`.
- When a task status changes to `done` or `cancelled`, move the file to `.ai/tasks/completed/` using `git mv`.
- `.ai/tasks/templates/` holds reusable task definitions with placeholder values. Copy a template to `active/` and fill in the placeholders when instantiating it.

## Examples

**Input:** "We need to add rate limiting to the API."

**Output:**

- `.ai/tasks/active/task-004.yaml` with `status: pending`, `agent: implementer`
- Journal entry: `Created task-004: Add rate limiting to API`
