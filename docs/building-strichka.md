# Building strichka

A walkthrough of every decision that shaped this project — from the first sketch to the trickiest component.

---

## 1. Idea & Inspiration

### Why this kind of app?

The idea didn't come from Netflix specifically. I spent time browsing platforms that focus on movies and TV — [Netflix](https://www.netflix.com/browse), [Amazon Prime](https://www.primevideo.com/), [IMDb](https://www.imdb.com/), (planetakino)[https://planetakino.ua/] — picking out the elements I liked from each. I also generated around six or seven design mockups, but honestly none of them felt right. The card styles and sliders weren't landing.

Two things eventually made Netflix the reference point:

**Search.** Netflix sends you to a dedicated page when you search. I liked that. Dropdowns and modals feel noisy — they interrupt the page you're already on. A full navigation feels cleaner and more intentional.

**The carousel.** Netflix's slider is infinite. You can keep clicking right and it never snaps back to position one. It also has cards that bleed past the normal content margins, peeking out at the edges. I loved that detail. I decided to take it as a personal challenge and build it from scratch.

### Why TVMaze?

The API isn't ideal — it doesn't give me the query flexibility I'd want. No "give me 50 Drama shows", no fetching a single show by ID with full detail. If I had a backend, I'd move all the sorting, filtering, and search there. But I understood the point: show what you can do with raw, imperfect data. So I fetch everything, map it to an internal type, rank it in memory, and group it by genre client-side.

---

## 2. Project Setup

### Structure

I chose a simple, explicit structure. Small presentational components live in `components/ui/` and get reused everywhere — that's what keeps styles consistent. Larger components have their logic extracted into composables, which makes that logic straightforward to test in isolation. The API layer is split into small focused files, types live in their own folder, and all UI text lives in i18n so it never creates noise inside component code and is always easy to find.

### Why Vite over Nuxt?

For this kind of platform Nuxt would have been my preference, but based on my understanding of the requirements, a plain project where I configure everything myself made more sense.

### ESLint from day one

I set up ESLint — including the i18n rules — before writing any real code. The classic trap is "I'll just leave this text here for now" and then forgetting it forever. Having the linter catch that from the start meant the codebase stayed clean throughout. Trying to fix all those issues retroactively at the end would have been much harder.

---

## 3. Design System

### The logo animation

The logo looked empty with just text. I didn't want to hunt for an icon that would fit, so I added a small indicator dot next to it and gave it a pulse animation I'd seen in other projects. I think it came out clean and distinctive.

### Color palette

Trial and error. I started with a purely red palette and after half a day it wasn't working. I went looking for inspiration and found this warm, cinematic dark palette in an older project of mine. I pulled out the variables, adapted them, and it clicked immediately.

| Token              | Value     | Usage                        |
|--------------------|-----------|------------------------------|
| `surface`          | `#0a0705` | Main background              |
| `surface-elevated` | `#141110` | Cards, dropdowns             |
| `surface-hover`    | `#1e1a17` | Hover states                 |
| `muted`            | `#8b7d75` | Secondary text               |
| `accent`           | `#d44d18` | Primary buttons, brand       |
| `rating`           | `#f5c518` | Star ratings                 |

### Typography

Same story as the palette — these fonts came from an older project. Oswald for headings (bold, condensed, uppercase), Space Grotesk for body (geometric, readable). The pairing already felt right so I carried it over.

### Fluid typography with `clamp()`

I'm not a big fan of `clamp()` as a general rule. In this case I used it because the project is small enough that it saved me time over writing separate size modifiers for every breakpoint. For a larger project I'd probably be more explicit.

### Component variants with `tailwind-variants`

Setting up the UI components was the second thing I did after the project scaffold. If you skip this step, styles drift all over the codebase. Spending a bit more time upfront — defining colors, sizes, and compound variants in one place — makes everything after it faster and more consistent. `Button.vue` ended up with three color variants, two sizes, and compound variants for edge cases like icon-only buttons.

---

## 4. Architectural Decisions

### Presentational `ui/` components

Components without logic are dramatically easier to test and trivially reusable. No store access, no API calls, no side effects — just props in and events out. The boundary is enforced by ESLint rules that prevent importing `stores/` or `api/` anywhere inside `components/ui/`.

### Pinia over lifting state to `App.vue`

For a project this size, `App.vue` refs would have worked. But Pinia gives better structure, first-class devtools, and cleaner tests. On larger projects the value is obvious; here it's mostly discipline and consistency.

### `localStorage` for My List

I would have preferred proper backend persistence. Without API access, local storage is the practical choice.

---

## 5. The Hard Parts

### Search — debouncing

I added debounce so users aren't hammered with re-renders on every keystroke. Without it the UI would repaint the results grid with every character, which feels janky and wastes API calls.

### The infinite carousel

This was the biggest challenge. I'd always used pre-built carousel libraries before — this was the first time I built one from scratch.

**The core idea: array rotation instead of DOM cloning.**

Most carousel tutorials clone items and append them to the end of the list to fake infinite scroll. Instead, I rotate the underlying array. When you navigate forward, the animation plays, and once the CSS transition ends, the array shifts: the first item moves to the back, the position resets silently, and the user never sees the jump.

```
Initial:  [A, B, C, D, E, F, G]
→ click next
Animate:  slide left (CSS transition)
On end:   rotate → [B, C, D, E, F, G, A], reset translateX
Result:   visually identical, user never notices
```

**Why `hasTransition` matters.**

Without that flag, the silent position reset would be visible. The flow is:
1. `next()` sets `hasTransition = true`, starts the CSS animation
2. `@transitionend` fires on the DOM element
3. `onTransitionEnd()` rotates the array, resets `translateX`, sets `hasTransition = false`

The transition flag is what lets the CSS do the visible movement while the array rotation happens invisibly underneath it.

Inspiration came from these two articles, though both had limitations I worked around:
- [How to build a carousel from scratch using Vue.js](https://dev.to/laurxn/how-to-build-a-carousel-from-scratch-using-vue-js-4ki0)
- [React carousel example on StackBlitz](https://stackblitz.com/edit/react-krlb2wqm?file=src%2Findex.js)

**Responsive card count.**

The carousel renders 3 to 7 cards depending on breakpoint, computed via `useBreakpoints()` from VueUse. The `translateX` offset is derived from `cardsPerPage`, so navigation always moves exactly one full page.

### HeroSection — layered backdrop

The hero background is three stacked layers:
1. The poster image, blurred at 125% scale and 25% opacity
2. A dark overlay at 60% opacity
3. The actual content — text on the left, poster image on the right

A gradient at the bottom blends the section into the rest of the page. The whole effect took a few attempts to get right but the result feels close to what you'd see on a real streaming platform.

---

## 6. Testing

I structured the project so that logic lives in composables, which makes it testable without touching the DOM. That's where I focused the unit tests: `use-carousel`, `use-search`, `use-home`, and the list store. The sort utility has its own test suite too.

The one E2E test is intentionally minimal — a smoke test that checks the app loads. More coverage would make sense as the app grows, but for now it's there as an example of the setup rather than full coverage.

One tricky part: testing the carousel required mocking `requestAnimationFrame`, which Vitest handles via `vi.useFakeTimers()`. Without it, the async timing of `onTransitionEnd` is hard to assert against.

---

## 7. CI/CD

Four parallel GitHub Actions jobs: lint, type check, unit tests, E2E tests. Parallel because they're fully independent — no reason to wait for lint to pass before running tests. Faster feedback means problems surface sooner. E2E test reports are uploaded as artifacts on failure so you can inspect what went wrong without rerunning locally.
