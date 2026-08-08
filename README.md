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
  layout.tsx       — fonts + page shell
  page.tsx          — the whole UI (header, filters, tiers, rows)
  globals.css        — theme tokens and base styles
components/ui/
  badge.tsx          — shadcn Badge (position/value/reach/risk tags)
  separator.tsx       — shadcn Separator (used by tier-divider)
  tier-divider.tsx    — the yard-line style tier separator, built on Separator
data/
  rankings.ts        — YOUR RANKINGS — edit this file
lib/
  utils.ts           — shadcn's cn() class-merging helper
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
