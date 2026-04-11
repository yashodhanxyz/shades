import type { DragEvent } from "react";
import { useEffect, useRef, useState } from "react";
import {
  EMPTY_WINS_BY_LEVEL,
  GAME_CONFIG,
  GAME_LEVELS,
} from "../config/gameConfig";
import { useFlipAnimation } from "../hooks/useFlipAnimation";
import { launchSolveConfetti } from "../lib/confetti";
import { isSolved, moveShade } from "../lib/game";
import {
  createRound,
  getCurrentLevel,
  getNextLevel,
  readWinsByLevel,
  recordLevelWin,
  writeWinsByLevel,
} from "../lib/progression";
import type { ThemeMode } from "../types/theme";
import type { GameLevel, GameRound, ShadeTone, WinsByLevel } from "../types/game";
import { ColorBoard } from "./ColorBoard";
import { ThemeToggle } from "./ThemeToggle";

interface ColorOrderingGameProps {
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

function formatElapsedTime(elapsedMs: number) {
  const totalSeconds = Math.floor(elapsedMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function formatWinsLabel(
  level: GameLevel,
  winsByLevel: WinsByLevel,
  solved: boolean,
) {
  const winsAtLevel = winsByLevel[level.shadeCount];
  const displayedWins = solved ? winsAtLevel + 1 : winsAtLevel;

  if (level.winsToAdvance === null) {
    return `${displayedWins} wins banked`;
  }

  return `${displayedWins}/${level.winsToAdvance} wins`;
}

function getStatusCopy(
  level: GameLevel,
  round: GameRound,
  winsByLevel: WinsByLevel,
  solved: boolean,
) {
  const nextLevel = getNextLevel(level);
  const winsAtLevel = winsByLevel[level.shadeCount];

  if (solved) {
    if (
      nextLevel &&
      level.winsToAdvance !== null &&
      winsAtLevel + 1 >= level.winsToAdvance
    ) {
      return `Solved. Level ${nextLevel.id} starts now with ${nextLevel.shadeCount} shades.`;
    }

    return "Solved. The next round starts automatically with a new color.";
  }

  if (!nextLevel || level.winsToAdvance === null) {
    return `Final level. Each completed round swaps to a new palette automatically. Current color: ${round.paletteLabel}.`;
  }

  const winsRemaining = Math.max(level.winsToAdvance - winsAtLevel, 0);
  const winsLabel = winsRemaining === 1 ? "win" : "wins";

  return `Current color: ${round.paletteLabel}. Solve ${winsRemaining} more ${winsLabel} to unlock Level ${nextLevel.id} with ${nextLevel.shadeCount} shades.`;
}

export function ColorOrderingGame({ theme, onThemeChange }: ColorOrderingGameProps) {
  const direction = GAME_CONFIG.initialDirection;
  const [winsByLevel, setWinsByLevel] = useState<WinsByLevel>(readWinsByLevel);
  const [round, setRound] = useState(() =>
    createRound(getCurrentLevel(readWinsByLevel())),
  );
  const [draggedTone, setDraggedTone] = useState<ShadeTone | null>(null);
  const [insertionIndex, setInsertionIndex] = useState<number | null>(null);
  const [solved, setSolved] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const celebratedSolve = useRef(false);
  const transitionTimeoutRef = useRef<number | null>(null);

  const currentLevel = getCurrentLevel(winsByLevel);
  const nextLevel = getNextLevel(currentLevel);
  const levelUpPending =
    solved &&
    nextLevel !== null &&
    currentLevel.winsToAdvance !== null &&
    winsByLevel[currentLevel.shadeCount] + 1 >= currentLevel.winsToAdvance;
  const winsLabel = formatWinsLabel(currentLevel, winsByLevel, solved);
  const statusCopy = getStatusCopy(currentLevel, round, winsByLevel, solved);

  const { registerItem, resetPositions, snapshotPositions } = useFlipAnimation(
    round.shades.map((shade) => shade.tone),
  );

  useEffect(() => {
    writeWinsByLevel(winsByLevel);
  }, [winsByLevel]);

  const clearPendingTransition = () => {
    if (transitionTimeoutRef.current === null) {
      return;
    }

    window.clearTimeout(transitionTimeoutRef.current);
    transitionTimeoutRef.current = null;
  };

  const clearDragState = () => {
    setDraggedTone(null);
    setInsertionIndex(null);
  };

  const startRound = (level: GameLevel, previousFamily?: GameRound["family"]) => {
    clearPendingTransition();
    resetPositions();
    clearDragState();
    celebratedSolve.current = false;
    setSolved(false);
    setElapsedMs(0);
    setRound(createRound(level, previousFamily));
  };

  useEffect(() => clearPendingTransition, []);

  useEffect(() => {
    const boardSolved = isSolved(round.shades, direction);
    setSolved(boardSolved);

    if (!boardSolved || celebratedSolve.current) {
      return;
    }

    celebratedSolve.current = true;
    setElapsedMs(Date.now() - round.roundStartTime);
    launchSolveConfetti(round.shades.map((shade) => shade.hex));

    const nextWinsByLevel = recordLevelWin(winsByLevel, currentLevel.shadeCount);
    const nextRoundLevel = getCurrentLevel(nextWinsByLevel);

    transitionTimeoutRef.current = window.setTimeout(() => {
      transitionTimeoutRef.current = null;
      setWinsByLevel(nextWinsByLevel);
      startRound(nextRoundLevel, round.family);
    }, GAME_CONFIG.roundTransitionMs);
  }, [currentLevel, direction, round.family, round.roundStartTime, round.shades, winsByLevel]);

  useEffect(() => {
    if (solved) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setElapsedMs(Date.now() - round.roundStartTime);
    }, 250);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [round.roundStartTime, solved]);

  const handleDragStart = (tone: ShadeTone, event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", String(tone));
    setDraggedTone(tone);
  };

  const handleDragEnd = () => {
    clearDragState();
  };

  const handleSlotDragOver = (index: number, event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.dropEffect = "move";
    setInsertionIndex(index);
  };

  const handleSlotDrop = (targetIndex: number) => {
    if (!draggedTone) {
      clearDragState();
      return;
    }

    const nextBoard = moveShade(round.shades, draggedTone, targetIndex);
    if (nextBoard !== round.shades) {
      snapshotPositions();
      setRound((current) => ({
        ...current,
        shades: nextBoard,
        moveCount: current.moveCount + 1,
      }));
    }

    clearDragState();
  };

  const handleResetProgress = () => {
    clearPendingTransition();
    setWinsByLevel({ ...EMPTY_WINS_BY_LEVEL });
    startRound(GAME_LEVELS[0]!, round.family);
  };

  return (
    <section className="neo-panel mx-auto w-full max-w-6xl p-5 md:p-7">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="theme-muted flex flex-wrap items-center gap-3 text-sm">
            <span className="neo-chip">
              {round.moveCount} {round.moveCount === 1 ? "move" : "moves"}
            </span>
            <span className="neo-chip">
              {formatElapsedTime(elapsedMs)}
            </span>
            <span className="neo-chip">
              {winsLabel}
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              className="neo-icon-button"
              aria-label="Reset progress"
              title="Reset progress"
              onClick={handleResetProgress}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12a9 9 0 1 0 2.64-6.36" />
                <path d="M3 4v6h6" />
              </svg>
            </button>
            <ThemeToggle value={theme} onChange={onThemeChange} />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="font-display text-2xl uppercase leading-[0.96] tracking-[-0.03em] md:text-3xl">
            Level {currentLevel.id}.
          </h2>
          <p className="theme-muted max-w-2xl text-sm font-semibold leading-6 md:text-base">
            {nextLevel
              ? `Clear this level to unlock ${nextLevel.shadeCount} shades. Every solved board rotates to a different color family.`
              : "Final stretch. The board keeps rotating through fresh color families after every solve."}
          </p>
        </div>

        <ColorBoard
          shades={round.shades}
          solved={solved}
          isDragActive={draggedTone !== null}
          gradient={round.gradient}
          draggedTone={draggedTone}
          insertionIndex={insertionIndex}
          registerCard={registerItem}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onSlotDragOver={handleSlotDragOver}
          onSlotDrop={handleSlotDrop}
        />

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="theme-muted max-w-2xl text-sm font-semibold leading-6">
            {statusCopy}
          </p>

          {solved ? (
            <div
              className="neo-chip w-fit rotate-[1deg] md:ml-auto"
              style={{
                backgroundColor: "var(--inverted-surface)",
                color: "var(--inverted-ink)",
              }}
            >
              {levelUpPending
                ? `Level ${nextLevel.id} next`
                : "Next round"}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
