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
      coverage: {
      reporter: ['text', 'html'],
      all: true, // include all files in coverage
      include: [
        'src/lib/component/**/*.{ts,svelte}',
        'src/routes/**/*.{ts,svelte}'
      ],
      exclude: [
        '**/node_modules/**',
        '**/.svelte-kit/**',
        '**/vitest.config.ts',
        '**/vite.config.ts',
        '**/svelte.config.js',
        '**/*.d.ts',
        '**/lib/server/**'
      ]
    },
    setupFiles: './tests/setup.ts', // optional but recommended
  },
});
