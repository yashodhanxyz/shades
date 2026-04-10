# HueThere

HueThere is an experimental color-ordering game built with React, TypeScript, Vite, and Tailwind CSS.

## What it does

- Starts at 3 shades, then automatically unlocks 6 and 10 shade levels
- Tracks wins per level and saves progress in local storage
- Rotates to a different Tailwind color family every round
- Lets you drag a shade directly onto the target card to place it before or after
- Checks the order after every move
- Connects the blocks into one seamless strip when solved
- Fires confetti once per solved board
- Includes dark mode and a reset progress control

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open the local URL shown by Vite.

## Production build

```bash
npm run build
npm run preview
```

## Deploy on Vercel

This repo is configured for Vercel with [`vercel.json`](./vercel.json).

Expected project settings:

- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`

Deploy options:

1. Import the Git repository into Vercel and keep the detected settings.
2. Or deploy from the CLI:

```bash
npm i -g vercel
vercel
```

## Game tuning

The level progression, supported color families, and round timing live in [`src/config/gameConfig.ts`](./src/config/gameConfig.ts).

## Interaction note

The game is still desktop-first. Smaller screens are supported with horizontal scrolling, but the drag interaction is best on pointer devices.
