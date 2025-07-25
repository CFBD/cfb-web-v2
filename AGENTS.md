# AGENTS.md - Development Guidelines

## Commands

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run generate` - Generate static site
- `pnpm run preview` - Preview built app
- `vitest` - Run all tests (Vitest with happy-dom environment)
- `vitest run path/to/test.spec.ts` - Run single test file
- `eslint .` - Run linting (ESLint with TypeScript support)
- `prettier --write .` - Format code with Prettier

## Code Style & Conventions

- **Framework**: Vue 3 + Nuxt 3 with TypeScript and Composition API
- **Formatting**: Prettier config - single quotes, semicolons, trailing commas, 80 char width, arrow parens always
- **Linting**: ESLint with @typescript-eslint rules, warns on multi-word component names
- **Imports**: Use `~` alias for project root (e.g., `~/stores/main`, `~/components/Navigation`)
- **Components**: PascalCase naming, use `<script setup lang="ts">`, import PrimeVue components explicitly
- **Types**: Define interfaces in TypeScript, use proper typing (see `types/` directory)
- **Stores**: Pinia with `defineStore(() => {})` composition pattern, reactive refs
- **Naming**: camelCase variables/functions, PascalCase components/types/interfaces
- **UI**: PrimeVue components with @primevue/themes, use v-ripple directive for interactions
- **Testing**: Vitest with happy-dom, test files in `test/` directory, globals enabled
- **Error Handling**: Use try/catch blocks, consider toast notifications for user feedback
- **Data Fetching**: Use `$fetch` for API calls with proper error handling
