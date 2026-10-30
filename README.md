# Landing Page

A responsive marketing landing page with a hero section, feature grid, and call-to-action, built with React, TypeScript, and Tailwind CSS.

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
  App.tsx            Page content (header, hero, features, CTA)
  main.tsx           App entry point
  index.css          Tailwind and theme tokens
  components/ui/     shadcn/ui components (Button, Badge, Card)
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
