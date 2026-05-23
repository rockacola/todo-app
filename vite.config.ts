import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { version } from './package.json';

// https://vite.dev/config/
export default defineConfig({
  base: '/todo-app/',
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
  plugins: [react()],
  server: {
    port: 3000,
  },
});
