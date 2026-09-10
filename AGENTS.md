# AGENTS.md

Guidance for AI agents working in this repository.

## Project overview

This is a **static, single-page personal portfolio** for Naga Sai Hemanth Jamili,
deployed via GitHub Pages from the `main` branch. It is intentionally dependency-free:
plain HTML, CSS, and vanilla JavaScript with no build step, bundler, package manager,
or backend.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | All page markup and content (hero, work, projects, highlights, achievements, capabilities, contact). |
| `styles.css` | All styling. Uses CSS custom properties as design tokens; supports light/dark themes and animations. |
| `script.js` | All client-side behavior. No modules, no dependencies. |
| `assets/` | `photo.jpg` (avatar) and `dev-favicon.svg` (favicon). |
| `README.md` | Human-facing project docs. |

## How to run and verify

- **Preview:** open `index.html` in a browser, or run `python3 -m http.server 8000` and visit `http://localhost:8000`.
- **There are no tests, linters, or build commands configured.** Do not invent them or add tooling unless the user explicitly asks.
- Verify changes visually in the browser and by reading the rendered markup — the site is small enough to inspect directly.

## Conventions

- **Keep it dependency-free.** Do not introduce frameworks (React, Tailwind, etc.), a bundler, or a `package.json` unless explicitly requested. The value of this repo is its simplicity.
- **CSS:** define and reuse the design tokens in `:root` (e.g. `--ink`, `--paper`, `--accent`, `--serif`, `--sans`, `--mono`). Respect the existing light/dark theming via `[data-theme]` and the `theme-color` meta tag. Properties are written alphabetically within rules — match that style.
- **JavaScript:** vanilla ES, run at the end of `<body>`. Guard DOM lookups (the code uses `?.` and truthiness checks before acting). Preserve accessibility attributes (`aria-pressed`, `aria-label`) when touching the theme toggle or nav.
- **Accessibility:** maintain semantic HTML, `aria-*` attributes, and `prefers-reduced-motion` / `prefers-color-scheme` handling already present in `script.js`.
- **Content edits** go in `index.html`. Section anchors (`#work`, `#projects`, `#highlights`, `#achievements`, `#capabilities`, `#contact`) are referenced by both the topbar nav and the left scroll rail — keep them in sync if you add, remove, or rename a section.

## Behavior notes (script.js)

- Persists theme choice in `localStorage` under `portfolio-theme`; falls back to `prefers-color-scheme`.
- Uses `IntersectionObserver` for `.reveal` animations, active-nav highlighting, and scroll-rail state.
- Reorders the Azira project cards into a fixed display order and relabels one card.
- Pointer tilt/spotlight effects are gated behind `hover: hover` + `pointer: fine` and disabled under `prefers-reduced-motion`.
- Cache-busts the footer visitor-badge image with a timestamp query param.

## Deployment

Changes to `main` publish automatically through GitHub Pages (source: `main`, root folder).
Do not push directly to `main` without the user's confirmation; there is no CI gate,
so a bad commit ships live.
