# Todo App

Offline-first todo app with optional [remoteStorage](https://remotestorage.io) sync - data lives in your own storage account, not on anyone's server.

**Live demo:** [rockacola.github.io/todo-app](https://rockacola.github.io/todo-app)

## Setup

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Script            | Description                    |
| ----------------- | ------------------------------ |
| `npm run dev`     | Dev server                     |
| `npm run build`   | Type-check + production build  |
| `npm run preview` | Serve production build locally |
| `npm run lint`    | ESLint                         |
| `npm run format`  | Prettier                       |

## remoteStorage sync

The cloud icon next to "Tasks" connects your remoteStorage account for cross-device sync. Get a free address at [5apps.com](https://5apps.com/storage).

## Deploying

Builds to a static `dist/` folder. Deploy anywhere that serves static files (Netlify, Vercel, GitHub Pages, S3, Cloudflare Pages, etc).

If not serving from root, set `base` in `vite.config.ts`:

```ts
export default defineConfig({
  base: '/your-repo-name/',
});
```
