# Architecture

## System Overview

A privacy-focused, offline-first task manager. Instead of storing data on a central server, it uses the [remoteStorage](https://remotestorage.io) open protocol to let users sync across devices through their own storage account.

## Components

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

`useRemoteStorage` manages the remoteStorage widget lifecycle: connecting, disconnecting, tracking sync status, and surfacing errors. `StorageModal` provides the UI for entering a remoteStorage address. Sync status is surfaced via `StorageStatusIcon` and `SyncOverlay`.

## Data Flow

1. User action triggers a component, which calls the relevant hook method
2. Hook updates local IndexedDB via the remoteStorage module
3. React state updates via change events emitted by the remoteStorage library
4. If a remote account is connected, the library syncs changes to/from the remote WebDAV endpoint in the background

## External Services

- **remoteStorage / WebDAV**: user-owned cloud storage for cross-device sync. Optional; the app is fully functional offline without it. Users supply their own remoteStorage address (e.g. via [5apps.com/storage](https://5apps.com/storage)).

## Deployment Model

Deployed to GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`) on every push to `main`. Vite outputs a static bundle to `dist/`. Base path is hardcoded as `/todo-app/` in `vite.config.ts` to match the Pages slug.

## Constraints

- No backend server; all data lives in the user's browser (IndexedDB) and optionally their own remote storage
- Static hosting only; no server-side rendering
- Base path must remain `/todo-app/` to match the GitHub Pages repository slug
