import react from '@vitejs/plugin-react';
import { mergeConfig } from 'vite';
import { defineConfig } from 'vitest/config';

export default mergeConfig(
  // Inherit the React plugin so JSX is transformed the same way as in dev/build.
  { plugins: [react()] },
  defineConfig({
    test: {
      // 'jsdom' simulates a browser environment (document, window, localStorage, etc.)
      // inside Node.js. The alternative 'happy-dom' is faster but less complete;
      // jsdom is the safer choice when third-party libs probe DOM APIs at import time.
      environment: 'jsdom',

      // Run this file before each test suite, used for global setup like
      // @testing-library cleanup.
      setupFiles: ['src/test/setup.ts'],
    },
  }),
);
