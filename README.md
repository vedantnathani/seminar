# seminar

## BEYOND THE PROMPT

A complete browser keynote for CA students in India: 28 scenes, nine chapters, 60 minutes. Vite + vanilla JavaScript + GSAP + Lenis + selectively lazy-loaded Vanta/Three.js. Fonts, scripts and data are bundled locally.

## Start

Use Node 24 LTS (pinned for Vercel in `.nvmrc` and `package.json`) and a current desktop browser. The application has also been tested locally on Node 26.

```sh
npm install
npm run dev
```

Open the local address printed by Vite, usually http://127.0.0.1:5173/ .

For the seminar, use the production build:

```sh
npm run build
npm run preview
```

Open http://127.0.0.1:4173/ . Keep the local server running. The production presentation requires no internet, API keys, login, AI service or backend. Do not open `dist/index.html` through `file://`; browser module security requires the local HTTP server. The separate static fallback file works directly from disk.

## Present

Start at scene 1, choose **Begin keynote**, then press **F** for fullscreen. If fullscreen is restricted, use the browser’s View → Enter Full Screen command. Press **O** for a clickable overview and **H** for settings. Navigation remains discreet at the bottom.

| Shortcut | Action |
|---|---|
| Right arrow | Next scene |
| Space | Next animation / reveal on the current scene |
| Left arrow | Previous scene |
| F | Toggle fullscreen |
| O | Scene overview |
| H | Help and animation settings |
| R | Reset the current interactive demo |
| Escape | Dismiss a dialog / leave fullscreen |

Typing in fields does not navigate. The table scrolls independently. Wheel, trackpad and touch work. Desktop scrolling settles near scene boundaries; reduced motion uses native scrolling. On narrow screens content stacks and a scene can grow vertically so its controls remain readable.

Space advances the current scene’s available reveals, workflow steps, timeline or diagram selections. It stays on the current scene when its builds are exhausted. Focused buttons, text fields and tables retain their normal keyboard behaviour. Manual reveals also use the visible buttons. Every scene carries a subtle @vedant_nathani watermark. No scene advances automatically. Help offers reduced motion, background disable, pause/resume and animation restart. Operating-system reduced motion is respected.

## Private presenter window

Choose **Presenter ↗**. Allow local pop-ups if your browser blocks it. Move this separate window to the laptop display. It shows the scene, chapter allocation, speaking script, takeaway, transition and next-scene title; its arrows control the audience window.

**Project or screen-share the audience browser window only. Never share the complete desktop or the presenter window.** Notes are not rendered in the audience page. A browser cannot control which display the meeting software shares.

The complete editable script is in [docs/PRESENTER-NOTES.md](docs/PRESENTER-NOTES.md). Its source is `src/data/presentation-content.js`. Each chapter’s scene allocations sum to its brief allocation; the total is 60 minutes. Timing is guidance, not a forced countdown.

## Personalise the real projects

Scene 4 has four project tabs. Enter the actual Problem, Approach, Build and Verified impact. Upload only authorised PNG, JPEG or WebP screenshots. None are invented, uploaded or persisted. Changes remain in memory for that page session; reloading clears them. Enter them before presenting and keep the page open. Edit the source to make permanent content changes.

The personal story uses only the background supplied in the brief. Confirm wording and all impact claims before delivery. No firm, client, approval or savings claim is assumed.

## Expense Exception Workbench

Scene 17 contains 24 synthetic transactions, search, filters, date settings, threshold, deterministic checks, an exception register, record details, reset, highlighting and CSV export. It has no live LLM connection. GSTIN values are visibly fictional identifiers, not valid tax identities.

At default settings, the planted data yields **6 records with rule flags**, **2 additional records with review suggestions**, and **8 records requiring review**. The clean baseline yields zero. Rule flags are duplicate candidates, missing mandatory fields, invalid amounts and date validation. Review suggestions are amount thresholds and explicit description keywords. “7/7” describes seven check groups: duplicate, GSTIN presence, other mandatory fields, date validity/period, amount validity, threshold and description keywords.

Changing settings clears stale results. Run checks again. A missing GSTIN is a field-presence exception, not a conclusion about GST applicability. Duplicate candidates need investigation. Neither flags nor review suggestions are audit findings.

## Live-demo fallback

1. Open scene 17 before the audience arrives; run checks, confirm 6/8, then reset.
2. During the demo, run planted data, inspect TX-001/TX-007, filter the register, lower the threshold and rerun.
3. Switch to the clean baseline and rerun; confirm zero flags/suggestions at default settings.
4. If animation or WebGL is troublesome, use Help → Reduced motion and Disable atmospheric backgrounds. Every teaching interaction still works.
5. If the interactive application fails, open `public/assets/demo-fallback.html` (or `dist/assets/demo-fallback.html`) directly in the browser. It includes the same verified default register and disclaimer, and needs no JavaScript, server or internet.
6. Continue with the testing and enterprise chapters. Discuss the rule and expected outcome using the static register; do not claim a live execution occurred.

## Verification

```sh
npm test
npm run build
```

Ten automated logic/content tests cover planted results, clean results, duplicate normalisation, different vendors, date/threshold boundaries, invalid settings, missing data, impact calculations and chapter timing.

`node scripts/browser-check.mjs` performs functional checks in installed macOS Chrome against the running local server. Set `TEST_URL=http://127.0.0.1:4173/` to test production. It writes browser results and selected screenshots. `node scripts/layout-check.mjs` checks every scene at 1366×768, 1440×900, 1920×1080 and 390×844. These developer scripts use a fresh temporary browser profile; they are not needed to present.

See `docs/QA.md` for verified results and limitations. Safari automation was blocked by this Mac’s existing “Allow remote automation” setting; it was not changed. Do a manual Safari rehearsal if you intend to use Safari. Chrome is the browser exercised end to end.

## Project structure

- `src/data/`: 28 scene scripts and synthetic transactions/rules.
- `src/components/`: navigation, presenter, teaching exercises and applications.
- `src/animations/`: GSAP setup and headline/SVG choreography.
- `src/effects/`: one Lenis instance and managed Vanta lifecycle.
- `src/styles/`: shared editorial system and interactive components.
- `public/assets/`: favicon and standalone demo fallback.
- `docs/`: speaking script, design decisions and QA evidence.
- `dist/`: ready-to-serve production build.

Taste Skill was installed with the brief’s exact command and verified at `.agents/skills/design-taste-frontend/SKILL.md`. It can be reused in the next Codex turn. Its browser tools were actually run. The user’s explicit keynote specification takes priority over conflicting company-website rules; see the design and QA reports.

## Deploy to Vercel

Import `vedantnathani/seminar` from GitHub into Vercel and select the `main` branch. Keep the root directory at the repository root. The committed `vercel.json` provides:

- Framework: Vite.
- Node.js: 24.x, selected through `package.json`.
- Install command: `npm ci`.
- Build command: `npm run build`.
- Output directory: `dist`.
- Environment variables: none required.

Both `/` (audience presentation) and `/presenter.html` (separate presenter window) are built. Scene links use URL fragments such as `/#scene-16`, so no catch-all rewrite is needed. Preserve the presenter page rather than rewriting every URL to the audience page. The static fallback is available at `/assets/demo-fallback.html`.

No API credentials, client data or model connection are required. Local browser profiles, dependencies, build output and delivery archives are excluded from Git; Vercel builds the application from source.

Configuration references: [Vite on Vercel](https://vercel.com/docs/frameworks/frontend/vite) and [Vercel Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).
