# CLAUDE.md — Project rules for Claude Code

## README

**Always keep `README.md` up to date.**

Whenever you add, remove, or change a package, script, environment requirement, directory, or architectural convention, update `README.md` to reflect the change in the same response. Do not leave the README stale after making changes to the project.

## Architecture rules

1. **`components/ui/` must be presentational only.** No imports from `stores/`, `api/`, or `composables/`. Props in, events out.

2. **`views/` are route-level containers.** Each view maps 1:1 to a route. They compose components and connect them to stores/composables.

3. **Smart components in `components/` (root) can use stores and composables.** They wire up `ui/` components with application logic.

4. **No direct `api/` imports in components or views.** Always go through a composable or store. Components and views must never call API functions directly.

5. **No barrel exports.** Import directly from the file: `@/components/ui/TextInput.vue`, not from an `index.ts` re-export.

6. **All user-visible text must come from `src/locales/en.json`.** Never hardcode text strings in templates or scripts. Always add the key to `en.json` and reference it with `t('key')` via `useI18n()`.

7. **Use only Tailwind colors.** Never use arbitrary color values (`text-[#fff]`, `bg-[rgb(...)]`, inline `style` color properties, or custom CSS color variables). Stick to the Tailwind color palette (e.g. `text-slate-700`, `bg-blue-500`).
