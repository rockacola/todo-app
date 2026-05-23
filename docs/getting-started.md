# Getting Started

## Prerequisites

- Node.js 20+ (see `.tool-versions` for the exact version used)
- npm

## Setup

```bash
git clone https://github.com/rockacola/todo-app.git
cd todo-app
npm install
npm run dev
```

Open [http://localhost:3000/todo-app/](http://localhost:3000/todo-app/).

## Available Commands

| Script                  | Description                                                                           |
| ----------------------- | ------------------------------------------------------------------------------------- |
| `npm run dev`           | Start Vite dev server                                                                 |
| `npm run build`         | Type-check + production build                                                         |
| `npm run preview`       | Serve production build locally                                                        |
| `npm run typecheck`     | Type-check without building                                                           |
| `npm run lint`          | Lint with ESLint                                                                      |
| `npm run lint:fix`      | Lint and auto-fix                                                                     |
| `npm run format`        | Format with Prettier                                                                  |
| `npm run format:check`  | Check formatting (CI-friendly)                                                        |
| `npm run check`         | Format + lint:fix + typecheck (pre-commit)                                            |
| `npm test`              | Run tests                                                                             |
| `npm run test:coverage` | Run tests with coverage report                                                        |
| `npm run snapshot`      | Capture full-page screenshots of all routes (dev server must be running on port 3000) |

## Project Structure

```text
src/
├── components/        # UI components (AddTodoForm, TodoItem, TodoList, etc.)
├── hooks/             # Business logic (useTodos, useRemoteStorage)
├── lib/               # remoteStorage module definition and initialisation
├── types/             # TypeScript type definitions
└── test/              # Test setup and shared render utility
scripts/
└── snapshot.js        # Playwright full-page screenshot script
docs/
├── overview.md        # Architecture and data flow
└── getting-started.md # This file
```

## Tech Stack

| Tool                     | Role                          |
| ------------------------ | ----------------------------- |
| React 19                 | UI framework                  |
| TypeScript 5.9           | Type safety (strict mode)     |
| Chakra UI 3              | Component library             |
| Vite 8                   | Build tool and dev server     |
| Vitest + Testing Library | Unit and component tests      |
| remotestoragejs          | Offline-first sync via WebDAV |
| ESLint 9 (flat config)   | Linting                       |
| Prettier                 | Code formatting               |

## Optional: Enable Cloud Sync

1. Get a free remoteStorage address at [5apps.com/storage](https://5apps.com/storage)
2. Click the cloud icon next to "Tasks" in the app
3. Enter your remoteStorage address and authorise
