import { defineConfig } from 'vitest/config';
import path from 'path';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
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
