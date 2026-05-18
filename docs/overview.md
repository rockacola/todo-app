# Overview

A privacy-focused, offline-first task manager. Instead of storing data on a central server, it uses the [remoteStorage](https://remotestorage.io) open protocol to let users sync across devices through their own storage account.

**Live demo:** [rockacola.github.io/todo-app](https://rockacola.github.io/todo-app)

---

## Architecture

```text
┌─────────────────────────────────────────────┐
│                  React UI                   │
│  (Chakra UI components, responsive layout)  │
├──────────────────┬──────────────────────────┤
│   useTodos()     │   useRemoteStorage()     │
│   CRUD + state   │   connection + sync      │
├──────────────────┴──────────────────────────┤
│         remoteStorage module                │
│   (JSON Schema, IndexedDB cache, sync)      │
├─────────────────────────────────────────────┤
│    Local (IndexedDB)  ⇄  Remote (WebDAV)    │
└─────────────────────────────────────────────┘
```

- **Components** handle rendering and user interaction only
- **Custom hooks** (`useTodos`, `useRemoteStorage`) encapsulate all business logic and side effects
- **remoteStorage module** (`src/lib/remoteStorage.ts`) defines the data schema and provides typed CRUD operations backed by IndexedDB
- Local edits persist immediately to IndexedDB, then replicate to the user's remote storage when connected

## Data Flow

1. User action → component calls hook method
2. Hook updates local IndexedDB via `remoteStorage` module
3. React state is updated via change events emitted by the remoteStorage library
4. If a remote account is connected, the library syncs changes to/from the remote WebDAV endpoint in the background

## Sync Connection

`useRemoteStorage` manages the remoteStorage widget lifecycle: connecting, disconnecting, tracking sync status, and surfacing errors. The `StorageModal` component provides the UI for entering a remoteStorage address. Sync status is shown via `StorageStatusIcon` and `SyncOverlay`.

## Deployment

Deployed to GitHub Pages via a GitHub Actions workflow on every push to `main`. The Vite build outputs a static bundle to `dist/`.
