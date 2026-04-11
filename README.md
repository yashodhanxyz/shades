# HueThere

HueThere is a browser-based color sorting game where players rebuild a shade ramp by dragging blocks back into the correct order. The game starts with 3 shades, unlocks 6 shades after a few wins, and then opens the full 10-shade challenge with a fresh palette every round.

Live site: [https://huethere.vercel.app/](https://huethere.vercel.app/)

Built by: [https://yashodhan.xyz/](https://yashodhan.xyz/)

## What HueThere Does

- Starts with an easy 3-shade level and progressively unlocks 6-shade and 10-shade rounds
- Rotates through multiple Tailwind color families so each solved round feels visually new
- Saves game progress and theme preference in local storage
- Supports light mode and dark mode
- Uses direct-on-card drag and drop, so players can place a shade before or after another card
- Fires confetti when a round is solved
- Runs fully in the browser with no backend or account system

## Gameplay Loop

HueThere is designed as a fast pattern-recognition puzzle.

1. A color ramp is shuffled.
2. The player drags each shade into the correct position.
3. Solving the ramp records a win for that level.
4. After enough wins, the next difficulty level starts automatically.
5. Each new round switches to a different color family.

Current progression:

- Level 1: 3 shades
- Level 2: 6 shades
- Level 3: 10 shades

## Why This Project Exists

HueThere is a small experiment in visual problem solving, progressive difficulty, and minimal browser game design. The interface stays mostly monochrome so the shades themselves become the focus. That constraint keeps the puzzle readable and gives the game a strong visual identity without needing heavy UI chrome.

It is also a compact frontend project. No APIs. No auth. No server state. Just a focused interaction loop with local persistence, animation, theme switching, and static deployment.

## How It Is Built

### Stack

- React 19 for the UI and state management
- TypeScript for type safety
- Vite for development and production builds
- Tailwind CSS for utility styling
- `canvas-confetti` for the solve celebration effect
- Vercel for static hosting

### Core ideas

- Game progression is config-driven
- Round generation is based on Tailwind color ramps
- Progress and theme are stored locally in the browser
- The board uses FLIP-style animation for card reordering
- The game ships as a static frontend with zero runtime backend dependencies

## Project Structure

```text
.
├── index.html
├── public/
│   ├── favicon.svg
│   ├── favicon-dark.svg
│   ├── og-image.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── site.webmanifest
├── src/
│   ├── components/
│   ├── config/
│   ├── data/
│   ├── hooks/
│   ├── lib/
│   ├── types/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
└── vercel.json
```

Important files:

- [`src/components/ColorOrderingGame.tsx`](./src/components/ColorOrderingGame.tsx): main gameplay loop, win tracking, level progression, and round transitions
- [`src/lib/progression.ts`](./src/lib/progression.ts): level selection, round creation, palette rotation, and local storage persistence
- [`src/lib/game.ts`](./src/lib/game.ts): shuffle logic, solved-state checks, and card movement
- [`src/data/tailwindPalettes.ts`](./src/data/tailwindPalettes.ts): palette generation from Tailwind color families
- [`src/hooks/useThemePreference.ts`](./src/hooks/useThemePreference.ts): theme persistence and favicon switching
- [`src/hooks/useFlipAnimation.ts`](./src/hooks/useFlipAnimation.ts): reorder animation logic
- [`src/config/gameConfig.ts`](./src/config/gameConfig.ts): level setup, supported color families, and round timing

## Local Development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deployment

HueThere is configured for Vercel in [`vercel.json`](./vercel.json).

Expected Vercel settings:

- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`

Deploy from the Vercel dashboard by importing the repository, or use the CLI:

```bash
npm i -g vercel
vercel
```

## SEO And Share Preview Setup

The project includes a basic static SEO setup for a public landing page:

- canonical URL in [`index.html`](./index.html)
- Open Graph and Twitter metadata in [`index.html`](./index.html)
- structured data in [`index.html`](./index.html)
- sitemap in [`public/sitemap.xml`](./public/sitemap.xml)
- robots file in [`public/robots.txt`](./public/robots.txt)
- social preview asset in [`public/og-image.svg`](./public/og-image.svg)

Current production URL:

- [https://huethere.vercel.app/](https://huethere.vercel.app/)

## Design Notes

- The UI is intentionally bold and high-contrast
- The board is desktop-first, but smaller screens are supported with horizontal scrolling
- Theme switching changes both the UI palette and the favicon
- The interaction has been simplified so players can drop directly on a target card instead of hunting for thin gaps

## Current Limitations

- The game is best on desktop or laptop with a pointer device
- Progress is stored locally, not synced across devices
- There is currently no score history, leaderboard, or player profile
- The game uses one core mode: rebuilding a single shade ramp from light to dark

## Possible Next Steps

- add alternate game modes such as reverse ordering or timed rounds
- add more palette families and themed sets
- add touch-first drag interactions for mobile
- add sound design and better win-state feedback
- add analytics or experiment tracking for gameplay tuning

## License

No license file has been added yet. If this is going to stay public, add a license so usage terms are explicit.
