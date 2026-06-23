# Skill: Record Memory

## Trigger

When a fact, decision, or constraint is identified that should persist across sessions and is not already captured in a context file, ADR, or task.

## Steps

1. Identify the topic and check whether `.ai/memory/{topic}.md` already exists.
   - If it exists: update the relevant section rather than creating a new file.
   - If it does not exist: create it using the schema in `spec/file-schemas.yaml`.

New file structure:

```markdown
---
last_updated: { YYYY-MM-DD }
---

# Memory: {Topic}

## Summary

{One paragraph describing what this memory captures and why it matters.}

## Key Facts

- {Fact 1}
- {Fact 2}

## References

- {Link to related ADR, task, or context file}
```

2. Use kebab-case for the filename (e.g. `auth-decisions.md`, `external-api-limits.md`).
3. Update `last_updated` in the frontmatter whenever the file is modified.
4. Do not duplicate information already present in `.ai/context/` files. Memory is for facts that don't fit context schemas — learned constraints, external API quirks, team conventions discovered during work.
5. Add a journal entry in `.ai/journal/{YYYY}/{today}.md` under `Changes Made` noting what was recorded.

## Examples

**Input:** "The Stripe webhook secret rotates every 90 days. We learned this the hard way when payments broke."

**Output:**

- `.ai/memory/stripe-integration.md` with the rotation fact under `Key Facts`
- Journal entry: `Updated memory: stripe-integration — added webhook secret rotation cadence`
