# Skill: Generate ADR

## Trigger

When an architectural decision is being made, or when asked to document a technical decision.

## Steps

1. List existing files under `docs/adr/` and determine the next sequential ID (zero-padded to four digits).
2. Identify from context or ask the operator for:
   - The decision being made
   - The problem or context it addresses
   - Alternatives that were considered
   - Consequences (positive and negative)
3. Write the ADR to `docs/adr/{id}-{kebab-case-title}.md` using the schema in `spec/file-schemas.yaml`.
4. Set `Status` to `proposed`. Do not change to `accepted` without explicit operator confirmation.
5. Add an entry in `.ai/journal/{YYYY}/{today}.md` under `Decisions` noting the ADR number and title.

## Examples

**Input:** "We've decided to use Zod for runtime validation instead of Joi."

**Output:**

- `docs/adr/0003-runtime-validation-library.md` with status `proposed`
- Journal entry: `Created ADR 0003: runtime-validation-library`
