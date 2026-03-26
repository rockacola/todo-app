# Todo App

A lightweight, offline-first todo app. The key differentiator is [remoteStorage](https://remotestorage.io) integration — your data lives in your own storage account, not on anyone's server, and syncs across all your devices automatically.

## Features

- **Offline-first** — works fully without an internet connection. All data is stored locally in your browser (IndexedDB). Open the app on a plane, it just works.
- **Cross-device sync via remoteStorage** — connect your own remoteStorage account and your todo list syncs across every device you sign in on.
- **Your data, your storage** — remoteStorage is an open protocol. You choose where your data lives. No accounts on our servers, no tracking, no lock-in.
- **Clean mobile-friendly UI** — designed to work well on any screen size.

## What is remoteStorage?

[remoteStorage](https://remotestorage.io) is an open standard that lets web apps store data in a user-controlled location — your own server or a hosted provider like [5apps](https://5apps.com/storage). The app requests permission to a single folder (`/todos/`), and nothing else.

The cloud icon next to the "Tasks" heading is the entry point:

- **Gray cloud-off icon** — not connected. Click it to enter your remoteStorage address and connect.
- **Green cloud icon** — connected and syncing. Click it to view your connected address or disconnect.

No account? Get a free remoteStorage address at [5apps.com](https://5apps.com/storage), or [run your own server](https://remotestorage.io/servers/).

## Development

**Requirements:** Node.js 20+

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

| Script                 | Description                         |
| ---------------------- | ----------------------------------- |
| `npm run dev`          | Start the dev server with HMR       |
| `npm run build`        | Type-check and build for production |
| `npm run preview`      | Serve the production build locally  |
| `npm run lint`         | Run ESLint                          |
| `npm run format`       | Format all files with Prettier      |
| `npm run format:check` | Check formatting (useful in CI)     |

## Publishing

The app builds to a static `dist/` folder — deploy it anywhere that serves static files.

**Netlify** — connect the repo and set build command `npm run build`, publish directory `dist`. Or drag and drop the `dist/` folder at [app.netlify.com/drop](https://app.netlify.com/drop).

**Vercel**

```bash
npx vercel
# follow the prompts — it auto-detects Vite
```

**GitHub Pages**

```bash
npm run build
npx gh-pages -d dist
```

If not serving from the root path, set `base` in `vite.config.ts`:

```ts
export default defineConfig({
  base: '/your-repo-name/',
});
```

**Any static host (S3, Cloudflare Pages, Render, etc.)** — upload the `dist/` folder. No server runtime needed.

## Things you can do with this project

### Add due dates and priorities

Extend the `TodoItem` interface in `src/lib/remoteStorage.ts` with `dueAt?: number` and `priority?: 'low' | 'medium' | 'high'`. Update the JSON schema declaration in the same file to keep validation in sync.

### Sort and filter

The `useTodos` hook returns a flat list sorted by `createdAt`. A natural next step is adding filter state (`all | active | completed`) or sort options (`created | due | priority`).

### Multiple lists

Claim an additional remoteStorage scope (e.g. `/lists/`) and let users create named lists. The module pattern in `src/lib/remoteStorage.ts` makes it straightforward to add a second module alongside the existing todos one.

### PWA / installable app

Add [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) to get a service worker, offline app-shell caching, and an "Add to Home Screen" prompt on mobile — pairs naturally with the existing offline-first data layer.

### Drag-to-reorder

The `createdAt` timestamp drives the current sort order. Replace it with an explicit `order` field and wire up a drag-and-drop library (e.g. `@dnd-kit/core`) to let users reorder tasks manually.

### Stricter TypeScript linting

The current ESLint config uses `tseslint.configs.recommended`. Upgrading to `recommendedTypeChecked` catches more real bugs at the cost of a slightly slower lint run:

```js
// eslint.config.js
tseslint.configs.recommendedTypeChecked,
// also add parserOptions.project to languageOptions
```
