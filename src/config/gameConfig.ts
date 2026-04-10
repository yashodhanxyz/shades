import type {
  GameLevel,
  SortDirection,
  TailwindColorFamily,
  WinsByLevel,
} from "../types/game";

export const TAILWIND_COLOR_FAMILIES: TailwindColorFamily[] = [
  "blue",
  "emerald",
  "violet",
  "slate",
];

export const GAME_LEVELS: GameLevel[] = [
  { id: 1, shadeCount: 3, winsToAdvance: 3 },
  { id: 2, shadeCount: 6, winsToAdvance: 3 },
  { id: 3, shadeCount: 10, winsToAdvance: null },
];

export const EMPTY_WINS_BY_LEVEL: WinsByLevel = {
  3: 0,
  6: 0,
  10: 0,
};

export const GAME_CONFIG: {
  initialDirection: SortDirection;
  progressStorageKey: string;
  roundTransitionMs: number;
} = {
  initialDirection: "light-to-dark",
  progressStorageKey: "rang-progress",
  roundTransitionMs: 1400,
};
