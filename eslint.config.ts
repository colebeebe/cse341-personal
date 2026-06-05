import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{ts}'],
    extends: [js.configs.recommended],
    languageOptions: {
      emcaVersion: 2020,
      globals: globals.browser,
    },
  },
  {
    rules: {
      quotes: ['error', 'single', { allowTemplateLiterals: true }],
      'no-console': 'warn',
    },
  },
  {
    files: ['./index.ts', './models/db.ts'],
    rules: {
      'no-console': 'off',
    },
  },
]);
