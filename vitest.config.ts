import { defineConfig } from 'vitest/config';
import path from 'path';
import {sveltekit} from '@sveltejs/kit/vite'
import {svelteTesting} from '@testing-library/svelte/vite'

export default defineConfig({
  plugins: [sveltekit(),svelteTesting({
    // autoCleanup: false, resolveBrowser: false
  })],
  resolve: {
    alias: {
      $lib: path.resolve(__dirname, './src/lib'),
      '$env/static/private': path.resolve(__dirname, './tests/mocks/env-private.ts'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom', // <-- must be 'jsdom'
    setupFiles: './tests/setup.ts', // optional but recommended
  },
});
