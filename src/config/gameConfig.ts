import { buildPalette } from "../data/tailwindPalettes";
import type { SortDirection, TailwindColorFamily } from "../types/game";

export const GAME_CONFIG: {
  colorFamily: TailwindColorFamily;
  initialDirection: SortDirection;
} = {
  // Change this one value to retheme the prototype with another Tailwind ramp.
  colorFamily: "emerald",
  initialDirection: "light-to-dark",
};

export const ACTIVE_PALETTE = buildPalette(GAME_CONFIG.colorFamily);
