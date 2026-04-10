# Rang

An experimental color-ordering game built with React, TypeScript, Vite, and Tailwind CSS.

## What it does

- Uses a Tailwind color family as the palette source of truth
- Shows 10 shades in a single horizontal row
- Shuffles the shades on load
- Lets you drag one shade onto another to swap their positions
- Checks the order after every move
- Connects the blocks into one seamless strip when solved
- Fires confetti once per solved board
- Lets you reshuffle or change the target direction

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

## Swap the Tailwind color family

The prototype is configured in [`src/config/gameConfig.ts`](./src/config/gameConfig.ts). Change `colorFamily` to another supported Tailwind family such as `blue`, `violet`, or `slate`.

## Interaction note

The current prototype is optimized for desktop-style drag and drop. Smaller screens are supported with horizontal scrolling.
