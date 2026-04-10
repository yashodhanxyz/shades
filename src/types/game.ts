export const SHADE_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

export type ShadeTone = (typeof SHADE_STEPS)[number];
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
