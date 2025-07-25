import typescriptEslint from '@typescript-eslint/eslint-plugin';
import vue from 'eslint-plugin-vue';
import globals from 'globals';
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import vueParser from 'vue-eslint-parser';

export default [
  {
    ignores: ['.nuxt/**', '.output/**', 'dist/**', 'node_modules/**'],
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        // Nuxt auto-imports
        $fetch: 'readonly',
        defineNuxtConfig: 'readonly',
        useRuntimeConfig: 'readonly',
        useRoute: 'readonly',
        useRouter: 'readonly',
        navigateTo: 'readonly',
        definePageMeta: 'readonly',
        useHead: 'readonly',
        onMounted: 'readonly',
        onBeforeMount: 'readonly',
        ref: 'readonly',
        computed: 'readonly',
        Ref: 'readonly',
        // TypeScript types
        defineStore: 'readonly',
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
    },
    rules: {},
  },
  {
    files: ['**/*.vue'],
    plugins: {
      vue,
      '@typescript-eslint': typescriptEslint,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        // Nuxt auto-imports
        $fetch: 'readonly',
        defineNuxtConfig: 'readonly',
        useRuntimeConfig: 'readonly',
        useRoute: 'readonly',
        useRouter: 'readonly',
        navigateTo: 'readonly',
        definePageMeta: 'readonly',
        useHead: 'readonly',
        onMounted: 'readonly',
        onBeforeMount: 'readonly',
        ref: 'readonly',
        computed: 'readonly',
        Ref: 'readonly',
        // TypeScript types
        defineStore: 'readonly',
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
      },
    },
    rules: {
      ...vue.configs.essential.rules,
      'vue/multi-word-component-names': 'off', // Turn off multi-word component name rule
    },
  },
];
