# Sully's Big Board

A single-page site that shows your personal fantasy football draft rankings.
Built with Next.js + Tailwind, using real [shadcn/ui](https://ui.shadcn.com)
components (Badge, Separator) retinted to the board's own color tokens, plus
a custom tier-divider component built on top of them. No database, no
backend — it's a static page that reads from one data file.

## Update your rankings

Everything you show on the page lives in **`data/rankings.ts`**. Edit that
array — rank, player, team, position, tier, bye, ADP, risk, notes — save,
and the page updates. That's the only file you need to touch day to day.

## Log a mock draft

Mock draft results live in **`data/mock-drafts.csv`** — one row per pick,
grouped into a draft by a shared `mock_id`:

```csv
mock_id,date,source,teams,slot,round,pick,player,position,team,notes
2026-08-10-sleeper,2026-08-10,Sleeper,12,4,1,4,Ja'Marr Chase,WR,CIN,
2026-08-10-sleeper,2026-08-10,Sleeper,12,4,2,21,Breece Hall,RB,NYJ,
```

- `mock_id` — anything unique per draft (e.g. `date-source`); every row
  sharing it becomes one draft card on the **Mock Drafts** tab.
- `date`, `source`, `teams`, `slot` — repeat these on every row of the draft.
- `round`, `pick`, `player`, `position`, `team` — one player per row.
- `notes` — optional; put it on any one row for that draft, it'll show once
  on the card.

A CSV is easiest to bulk-fill from a spreadsheet — paste a whole draft's
picks in one go, then save as CSV. The sample rows at the top of the file
are a placeholder; delete them once you've logged your own.

## Run it locally

You'll need [Node.js](https://nodejs.org) 18+ installed.

```bash
npm install
npm run dev
```

Then open http://localhost:3000 — you'll see live updates as you edit
`data/rankings.ts`.

## Deploy to GitHub Pages

The site is a static export (no server, no API routes), so it deploys
cleanly to GitHub Pages via the included workflow at
`.github/workflows/deploy.yml`.

1. Push this repo to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. In the repo on GitHub, go to **Settings → Pages** and set **Source** to
   **GitHub Actions**.
3. Push to `main` (or re-run the workflow from the **Actions** tab). The
   workflow builds the static site and deploys it — your board will be live
   at `https://<your-username>.github.io/<repo-name>/`.
4. Every time you edit `data/rankings.ts` and push to `main`, the site
   redeploys automatically.

`next.config.mjs` auto-detects the repo name from GitHub Actions and sets
the base path accordingly, so no manual config is needed regardless of
what you name the repo.

## Deploy to Vercel (alternative)

```bash
npm install -g vercel
vercel
```

Follow the prompts (link or create a project). Run `vercel --prod` when
you're ready to push it live. To update later, just run `vercel --prod`
again after editing your rankings.

## Project structure

```
app/
  layout.tsx           — fonts + page shell
  page.tsx              — Big Board UI (header, filters, tiers, rows)
  mock-drafts/page.tsx   — Mock Drafts UI (stats + draft history cards)
  globals.css            — theme tokens and base styles
components/
  site-nav.tsx           — tab nav shared by both pages
  ui/
    badge.tsx              — shadcn Badge (position/value/reach/risk tags)
    separator.tsx           — shadcn Separator (used by tier-divider)
    tier-divider.tsx        — the yard-line style tier separator, built on Separator
data/
  rankings.ts            — YOUR RANKINGS — edit this file
  mock-drafts.csv         — YOUR MOCK DRAFTS — edit this file
  mock-drafts.ts           — TypeScript types for mock draft data
lib/
  utils.ts               — shadcn's cn() class-merging helper
  mock-drafts.ts          — parses mock-drafts.csv at build time
```

Components are managed with the [shadcn CLI](https://ui.shadcn.com/docs/cli)
(`components.json` holds its config). To add another component:

```bash
npx shadcn@latest add <component>
```

Note this project is on Tailwind v3, while the shadcn CLI now defaults to
v4-style theming (semantic tokens like `bg-primary`, CSS variables in
`app/globals.css`). Newly added components will reference those tokens —
either add them to `tailwind.config.ts`/`globals.css`, or restyle the
component's `variant` classes to use the board's existing tokens (`chalk`,
`gold`, `hash`, `field`, `line`), the way `badge.tsx` and `separator.tsx`
already do.

## Design notes

The look is a "war room whiteboard": deep chalkboard green background,
chalk-white type, condensed athletic display font (Oswald) for headers and
rank numbers, monospace (IBM Plex Mono) for stats like bye week and ADP.
Tier breaks are rendered as yard-line style dividers rather than plain
numbered headers, since tiers actually encode talent cliffs — not just a
sequential list.

Position filter tabs at the top (ALL / QB / RB / WR / TE) let visitors
narrow the board to one position without leaving the page.

The Mock Drafts tab uses the same styling and the same "edit a data file"
model as the Big Board — no forms, no database, just `data/mock-drafts.csv`.
