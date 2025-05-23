import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import pluginPrettier from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    plugins: {
      js,
      prettier: pluginPrettier,
    },
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // Warn on Prettier issues in Problems tab
      'prettier/prettier': 'warn',
      trailingComma: 'none',
    },
    extends: ['js/recommended'],
  },
  tseslint.configs.recommended,
  pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  {
    // apply prettier config last to turn off conflicting rules
    files: ['**/*.{js,ts,vue}'],
    settings: {},
    rules: {},
    extends: ['plugin:prettier/recommended'],
  },
]);
