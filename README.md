# strichka

A Vue 3 starter project with TypeScript, Tailwind CSS, Pinia, Vue Router, and Playwright e2e tests.

---

## Requirements

| Tool    | Version  |
|---------|----------|
| Node.js | v25.2.1  |
| npm     | 11.7.0   |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Testing

### Unit tests (Vitest)

```bash
# Watch mode
npm run test:unit

# Single run
npm run test:unit:run
```

Unit tests live in `tests/unit/`. They cover composable logic (e.g. `useCarousel`).

### E2E tests (Playwright)

```bash
# Run all e2e tests (headless)
npm run test:e2e

# Run with Playwright UI
npm run test:e2e:ui

# Open last HTML report
npm run test:e2e:report
```

> On first run you may need to install browsers: `npx playwright install`

---

## Linting

```bash
# Check for lint errors
npm run lint

# Auto-fix fixable issues
npm run lint:fix
```

---

## Tech Stack

| Layer         | Library / Tool                               |
|---------------|----------------------------------------------|
| Framework     | [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`) |
| Language      | [TypeScript](https://www.typescriptlang.org/) |
| Build tool    | [Vite](https://vite.dev/)                    |
| Styling       | [Tailwind CSS v4](https://tailwindcss.com/)  |
| State         | [Pinia](https://pinia.vuejs.org/)            |
| Routing       | [Vue Router](https://router.vuejs.org/)      |
| E2E tests     | [Playwright](https://playwright.dev/)        |
| Icons         | [Font Awesome 6 Free](https://fontawesome.com/) (solid, regular, brands) |
| i18n          | [vue-i18n v11](https://vue-i18n.intlify.dev/) |
| Linting       | [ESLint](https://eslint.org/) + typescript-eslint + eslint-plugin-vue |
| Git hooks     | [Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/lint-staged/lint-staged) |
| Variants      | [tailwind-variants](https://www.tailwind-variants.org/) |
| Utilities     | [VueUse](https://vueuse.org/) |

---

## Project Structure

```
src/
  api/                   → API clients and request functions
  assets/                → Static assets (images, fonts, etc.)
  components/
    ui/                  → Presentational/dumb components (props in, events out — no store/API access)
    (root)               → Smart components that compose ui/ with stores/composables
  composables/           → Reusable composition functions (use*)
  router/
    index.ts             → Route definitions
    middleware/          → Route guards (authGuard, guestGuard, etc.)
  stores/                → Pinia stores
  styles/
    main.css             → Global CSS entry (Tailwind import)
  types/                 → TypeScript interfaces and type definitions
  utils/                 → Utility helpers (Sentry, analytics, etc.)
  views/                 → Route-level page components (one per route)
  locales/
    en.json              → English translation strings
  App.vue
  i18n.ts                → vue-i18n setup (locale, fallback, messages)
  main.ts

tests/
  e2e/                   → Playwright end-to-end tests
```

### Component conventions

- `src/components/ui/` — dumb/presentational components. They receive data via props and emit events. No direct store access or API calls.
- `src/components/` (root) — smart components. They wire up `ui/` components with stores and composables.
- `src/views/` — one component per route, mounted by Vue Router.

---

## Architecture Rules

1. **`components/ui/` must be presentational only.** No imports from `stores/`, `api/`, or `composables/`. Props in, events out.

2. **`views/` are route-level containers.** Each view maps 1:1 to a route. They compose components and connect them to stores/composables.

3. **Smart components in `components/` (root) can use stores and composables.** They wire up `ui/` components with application logic.

4. **No direct `api/` imports in components or views.** Always go through a composable or store. Components and views must never call API functions directly.

5. **No barrel exports.** Import directly from the file: `@/components/ui/ValidatedTextInput.vue`, not from an `index.ts` re-export.

---

## Icons (Font Awesome)

All three free icon sets are registered globally — use `<FontAwesomeIcon>` anywhere without importing per component.

```vue
<!-- solid (fas) -->
<FontAwesomeIcon icon="fa-solid fa-house" />

<!-- regular (far) -->
<FontAwesomeIcon icon="fa-regular fa-bell" />

<!-- brands (fab) -->
<FontAwesomeIcon icon="fa-brands fa-github" />
```

Browse available icons at [fontawesome.com/icons](https://fontawesome.com/icons?m=free).

---

## Path Alias

`@` resolves to `src/`. Use it in imports:

```ts
import { useAuthStore } from '@/stores/auth'
import MyButton from '@/components/ui/MyButton.vue'
```
