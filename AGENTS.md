# Agent Instructions

This file is the mandatory entry point for all AI systems operating in this repository.
Load this file first before any other context.

## Critical Rules

These rules are non-negotiable and apply to every task, every session, without exception.

- **Never commit without explicit instruction from the operator.** Stage changes, show a `git diff --stat` summary, and wait for confirmation. An interrupted or redirected request cancels the prior commit instruction.
- **Never add `Co-Authored-By` to commit messages.**
- **Never use em dashes.** Use a comma, full stop, or rewrite the sentence.
- Commit message format: single-line conventional commits, no body. Types: `feat`, `fix`, `docs`, `refactor`, `chore`, `test`.

---

## Load Order

1. Standards — `.ai/standards/` (contains both foundation-inherited and project-specific standards)
2. Context — `.ai/context/` (follow sequence in `.ai/manifests/context.yaml`)
3. Memory — `.ai/memory/`
4. Tasks — `.ai/tasks/active/` (active and blocked tasks; completed tasks are archived in `.ai/tasks/completed/`)

## Rules

- Follow spec strictly. No structural invention.
- Do not create files outside the permitted types: manifests, context, agents, standards, skills, memory, journal, and tasks.
- Do not activate agents not listed in `.ai/manifests/agents.yaml`.
- Use `.ai/manifests/context.yaml` to determine which context files to load and in what order.
- Record all decisions in `.ai/journal/{YYYY}/{today}.md`.
- All architectural decisions require an ADR in `docs/adr/`.
- Do not modify `.ai/manifests/foundation.yaml` after initial setup.

### Journal

Add a journal entry for each working session. Create `.ai/journal/{YYYY}/{date}.md` using today's date, or append to it if it already exists. Create the year subdirectory if it does not exist.

Each entry has four sections. Fill in what is relevant; write `None.` if a section has no content:

- **Summary** — what happened today
- **Changes Made** — files created, modified, or deleted
- **Decisions** — choices made; cross-reference ADR numbers where applicable
- **Open Questions** — unresolved questions or blockers

Keep entries brief. One or two sentences per section is enough.

### Docs

Update `README.md` and `.ai/context/architecture.md` in the same commit as any code change. Specifically:

- **Files added/removed/renamed** — update the project structure section in `README.md`
- **New architectural pattern introduced** — add a named section in `.ai/context/architecture.md`

## Active Agents

See `.ai/manifests/agents.yaml`.

## Ownership

See `.ai/manifests/ownership.yaml`.

## Foundation Version

See `.ai/manifests/foundation.yaml`. Rules in this file follow the spec version recorded there. On upgrade, replace this file with the version from the new foundation release.

## Git

- When changing code, update relevant documentation in the same commit. Do not leave docs out of sync with the implementation.
