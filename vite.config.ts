import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { version } from './package.json';

// https://vite.dev/config/
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1];

export default defineConfig({
  base: repo ? `/${repo}/` : '/',
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
  plugins: [react()],
});
