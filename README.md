# Dashboard

A responsive finance dashboard ("Finexy") with a top nav, balance and wallets, KPI tiles, an SVG profit/loss chart, spending limit, bank cards, and a searchable recent-activities table, built with React, TypeScript, Tailwind CSS, and shadcn/ui. Data is mocked in `src/App.tsx`.

**Live site:** https://jirakid-a11y.github.io/landing-page/

## Tech Stack

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev) for dev server and build
- [Tailwind CSS v4](https://tailwindcss.com) with [tw-animate-css](https://github.com/Wombosvideo/tw-animate-css)
- [shadcn/ui](https://ui.shadcn.com) components (Radix UI primitives) in `src/components/ui`
- [Hugeicons](https://hugeicons.com) for icons, Geist variable font
- [Oxlint](https://oxc.rs) for linting

## Project Structure

```
src/
  App.tsx            Dashboard layout, mock data, and chart
  main.tsx           App entry point
  index.css          Tailwind and theme tokens
  components/ui/     shadcn/ui components (Avatar, Badge, Button, Card, Checkbox, Input, Progress, Select, Table, ...)
  lib/utils.ts       Shared helpers
public/              Static assets (favicon)
.github/workflows/   GitHub Pages deployment
```

## Getting Started

Requires Node.js 22+.

```bash
npm install
npm run dev       # start the dev server
```

## Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite dev server with HMR   |
| `npm run build`   | Type-check and build to `dist/`      |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Lint with Oxlint                     |

## Deployment

Pushes to `main` trigger the GitHub Actions workflow in `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to GitHub Pages.

The Vite `base` is set to `/landing-page/` in `vite.config.ts` to match the repository name. If you rename the repo or deploy elsewhere, update it.

To enable deployment on a fork, go to **Settings → Pages** and set the source to **GitHub Actions**.
