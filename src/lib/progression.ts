import {
  EMPTY_WINS_BY_LEVEL,
  GAME_CONFIG,
  GAME_LEVELS,
  TAILWIND_COLOR_FAMILIES,
} from "../config/gameConfig";
import { buildGradient, buildPalette } from "../data/tailwindPalettes";
import type {
  GameLevel,
  GameRound,
  LevelShadeCount,
  TailwindColorFamily,
  WinsByLevel,
} from "../types/game";
import { createShuffledBoard, selectShadesForLevel } from "./game";

function cloneWinsByLevel(winsByLevel: WinsByLevel): WinsByLevel {
  return { ...winsByLevel };
}

function sanitizeWinCount(value: unknown) {
  return typeof value === "number" && Number.isFinite(value)
    ? Math.max(0, Math.floor(value))
    : 0;
}

export function readWinsByLevel(): WinsByLevel {
  if (typeof window === "undefined") {
    return cloneWinsByLevel(EMPTY_WINS_BY_LEVEL);
  }

  const savedWins = window.localStorage.getItem(GAME_CONFIG.progressStorageKey);
  if (!savedWins) {
    return cloneWinsByLevel(EMPTY_WINS_BY_LEVEL);
  }

  try {
    const parsed = JSON.parse(savedWins) as Partial<Record<string, unknown>>;

    return {
      3: sanitizeWinCount(parsed["3"]),
      6: sanitizeWinCount(parsed["6"]),
      10: sanitizeWinCount(parsed["10"]),
    };
  } catch {
    return cloneWinsByLevel(EMPTY_WINS_BY_LEVEL);
  }
}

export function writeWinsByLevel(winsByLevel: WinsByLevel) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    GAME_CONFIG.progressStorageKey,
    JSON.stringify(winsByLevel),
  );
}

export function clearWinsByLevel() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(GAME_CONFIG.progressStorageKey);
}

export function getCurrentLevel(winsByLevel: WinsByLevel) {
  return (
    GAME_LEVELS.find(
      (level) =>
        level.winsToAdvance === null ||
        winsByLevel[level.shadeCount] < level.winsToAdvance,
    ) ?? GAME_LEVELS[GAME_LEVELS.length - 1]!
  );
}

export function recordLevelWin(
  winsByLevel: WinsByLevel,
  shadeCount: LevelShadeCount,
): WinsByLevel {
  return {
    ...winsByLevel,
    [shadeCount]: winsByLevel[shadeCount] + 1,
  };
}

export function getNextLevel(level: GameLevel) {
  return GAME_LEVELS.find((candidate) => candidate.id === level.id + 1) ?? null;
}

export function getNextColorFamily(previousFamily?: TailwindColorFamily) {
  const families =
    previousFamily && TAILWIND_COLOR_FAMILIES.length > 1
      ? TAILWIND_COLOR_FAMILIES.filter((family) => family !== previousFamily)
      : TAILWIND_COLOR_FAMILIES;

  return families[Math.floor(Math.random() * families.length)]!;
}

export function createRound(
  level: GameLevel,
  previousFamily?: TailwindColorFamily,
): GameRound {
  const family = getNextColorFamily(previousFamily);
  const palette = buildPalette(family);
  const roundShades = selectShadesForLevel(palette.shades, level.shadeCount);

  return {
    family,
    paletteLabel: palette.label,
    shadeCount: level.shadeCount,
    gradient: buildGradient(roundShades),
    shades: createShuffledBoard(roundShades, GAME_CONFIG.initialDirection),
    moveCount: 0,
    roundStartTime: Date.now(),
  };
}
