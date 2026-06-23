# Standard: Coding

These rules apply regardless of language. Language-specific rules belong in `.ai/standards/` within each repository.

## Rules

### Explicitness

- Prefer explicit over implicit in all constructs — types, error paths, dependencies, and control flow
- No silent type coercion or implicit defaults at system boundaries
- All public interfaces must have explicit contracts (types, schemas, or documented invariants)

### Structure

- One concept per file
- File and folder names in kebab-case
- Avoid wildcard re-exports that obscure what a module provides
- Functions and methods should do one thing. Establish a per-project line limit and enforce it. Extract when exceeded.
- Files should stay focused. Establish a per-project file size limit. Split when exceeded.

### Error Handling

- Explicit error handling required at every I/O boundary (network, file system, external services)
- No silent catch blocks that swallow errors without logging or re-raising
- Distinguish recoverable errors from programmer errors — handle them differently
- Use structured error types, not untyped strings, where the language supports it

### Dependencies

- No circular dependencies between modules
- External dependencies must be declared in the project manifest (package.json, go.mod, pyproject.toml, etc.)
- Do not use development-only dependencies in production code paths

### Comments

- No comments that describe what the code does — well-named identifiers do that
- Comments permitted only for: non-obvious constraints, workarounds for external bugs, subtle invariants

### Documentation

- When changing code, update the relevant documentation in the same commit
- Do not leave docs out of sync with the implementation at any point in the commit history

## Rationale

Explicitness and single-responsibility reduce the surface area an AI system must reason about when modifying code. Explicit error handling surfaces failures early rather than silently propagating corrupt state.

## Examples

See `examples/` for `.ai/` structural patterns. Language-specific elaborations of these rules live in `.ai/standards/` within each repository (see `examples/nextjs-saas/.ai/standards/nextjs.md` for a worked example).

---

## Project Standards

The following rules apply specifically to this repository.

### TypeScript and JSX

- Always use braces for `if`, `for`, `while`, etc. No bracketless single-liners (enforced via ESLint `curly: all`).
- Sort object literal keys alphabetically when order has no semantic meaning (config objects, type definitions, plain data). Skip when order matters (migration steps, priority queues).
- JSX props are always sorted alphabetically (enforced via ESLint `react/jsx-sort-props`).
- `import type` must be a separate statement from value imports, even from the same module (enforced via ESLint `@typescript-eslint/consistent-type-imports`).

### React Hooks

- Always name `useEffect` callbacks: `useEffect(function myName() { ... }, [])`.
- Hooks and utility functions must not be defined inline inside component files; extract them to their own file (e.g. `hooks/useMyHook.ts`) or a shared utils file.

### Copywriting

- No em dashes. Minimise dash usage in general; restructure sentences to avoid them.

### Chakra UI

- Use Chakra UI components for all UI elements. Do not hand-roll accessible primitives (modals, tooltips, etc.) that Chakra already provides.
- Use Chakra UI's responsive array/object syntax for responsive behaviour.
- Do not mix raw HTML elements and Chakra UI components within the same layout layer.
