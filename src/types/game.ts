export const SHADE_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;
export const LEVEL_SHADE_COUNTS = [3, 6, 10] as const;

export type ShadeTone = (typeof SHADE_STEPS)[number];
export type LevelShadeCount = (typeof LEVEL_SHADE_COUNTS)[number];
export type SortDirection = "light-to-dark" | "dark-to-light";
export type TailwindColorFamily = "blue" | "emerald" | "violet" | "slate";

export interface Shade {
  tone: ShadeTone;
  hex: string;
  rank: number;
}

export interface GamePalette {
  family: TailwindColorFamily;
  label: string;
  shades: Shade[];
  gradient: string;
}

export interface GameLevel {
  id: number;
  shadeCount: LevelShadeCount;
  winsToAdvance: number | null;
}

export type WinsByLevel = Record<LevelShadeCount, number>;

export interface GameRound {
  family: TailwindColorFamily;
  paletteLabel: string;
  shadeCount: LevelShadeCount;
  gradient: string;
  shades: Shade[];
  moveCount: number;
  roundStartTime: number;
}
