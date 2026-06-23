# Skill: Update Journal

## Trigger

At the end of any working session, or whenever a significant action is taken (decision made, task completed, blocker encountered).

## Steps

1. Determine today's date in `YYYY-MM-DD` format and extract the year (`YYYY`).
2. Check whether `.ai/journal/{YYYY}/{today}.md` already exists.
   - If it exists: load it and append to the appropriate section.
   - If it does not exist: create it (and the year subdirectory if needed) using the schema in `spec/file-schemas.yaml`.

New file structure:

```markdown
# Journal — {YYYY-MM-DD}

## Summary

{One or two sentences describing what happened today.}

## Changes Made

- {List each file created, modified, or deleted.}

## Decisions

- {List any decisions made. Cross-reference ADR numbers if an ADR was created.}

## Open Questions

- {List unresolved questions or blockers.}
```

3. Append new entries under the relevant section. Do not replace existing entries.
4. If there are no open questions, write `None.` in that section rather than leaving it blank.

## Examples

**Input:** "We decided to use Zod for input validation and created ADR 0003."

**Output entry under `Decisions`:**

```
- Chose Zod for runtime input validation over Joi. See ADR 0003.
```
