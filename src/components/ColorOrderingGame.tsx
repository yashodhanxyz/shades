import type { DragEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { ACTIVE_PALETTE, GAME_CONFIG } from "../config/gameConfig";
import { useFlipAnimation } from "../hooks/useFlipAnimation";
import { launchSolveConfetti } from "../lib/confetti";
import { createShuffledBoard, isSolved, moveShade } from "../lib/game";
import type { ThemeMode } from "../types/theme";
import type { Shade, ShadeTone } from "../types/game";
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

export function ColorOrderingGame({ theme, onThemeChange }: ColorOrderingGameProps) {
  const direction = GAME_CONFIG.initialDirection;
  const [shades, setShades] = useState<Shade[]>(() =>
    createShuffledBoard(ACTIVE_PALETTE.shades, direction),
  );
  const [draggedTone, setDraggedTone] = useState<ShadeTone | null>(null);
  const [insertionIndex, setInsertionIndex] = useState<number | null>(null);
  const [solved, setSolved] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  const [roundStartTime, setRoundStartTime] = useState(() => Date.now());
  const [elapsedMs, setElapsedMs] = useState(0);
  const celebratedSolve = useRef(false);

  const { registerItem, snapshotPositions } = useFlipAnimation(
    shades.map((shade) => shade.tone),
  );

  useEffect(() => {
    const boardSolved = isSolved(shades, direction);
    setSolved(boardSolved);

    if (boardSolved && !celebratedSolve.current) {
      setElapsedMs(Date.now() - roundStartTime);
      launchSolveConfetti(ACTIVE_PALETTE.shades.map((shade) => shade.hex));
      celebratedSolve.current = true;
    }
  }, [direction, roundStartTime, shades]);

  useEffect(() => {
    if (solved) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setElapsedMs(Date.now() - roundStartTime);
    }, 250);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [roundStartTime, solved]);

  const clearDragState = () => {
    setDraggedTone(null);
    setInsertionIndex(null);
  };

  const shuffleBoard = () => {
    snapshotPositions();
    clearDragState();
    celebratedSolve.current = false;
    setSolved(false);
    setMoveCount(0);
    setElapsedMs(0);
    setRoundStartTime(Date.now());
    setShades(createShuffledBoard(ACTIVE_PALETTE.shades, direction));
  };

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

    const nextBoard = moveShade(shades, draggedTone, targetIndex);
    if (nextBoard !== shades) {
      snapshotPositions();
      setShades(nextBoard);
      setMoveCount((current) => current + 1);
    }

    clearDragState();
  };

  return (
    <section className="neo-panel mx-auto w-full max-w-6xl p-5 md:p-7">
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <div className="theme-muted flex flex-wrap items-center gap-3 text-sm">
            <span className="neo-chip">
              {moveCount} {moveCount === 1 ? "move" : "moves"}
            </span>
            <span className="neo-chip">
              {formatElapsedTime(elapsedMs)}
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <ThemeToggle value={theme} onChange={onThemeChange} />
            <button
              type="button"
              className="neo-icon-button"
              aria-label="Shuffle board"
              title="Shuffle board"
              onClick={() => shuffleBoard()}
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
                <path d="M17 3h4v4" />
                <path d="M3 7h6l4 5 4-5h4" />
                <path d="M17 21h4v-4" />
                <path d="M3 17h6l2.5-3" />
                <path d="M14.5 10 17 7h4" />
              </svg>
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="font-display text-2xl uppercase leading-[0.96] tracking-[-0.03em] md:text-3xl">
            Rebuild the ramp.
          </h2>
          <p className="theme-muted max-w-2xl text-sm font-semibold leading-6 md:text-base">
            Move each shade into the correct slot until the row snaps into one
            continuous strip.
          </p>
        </div>

        <ColorBoard
          shades={shades}
          solved={solved}
          isDragActive={draggedTone !== null}
          gradient={ACTIVE_PALETTE.gradient}
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
            Desktop-first for now. Drag a block into the gap where it should
            land in the final sequence.
          </p>

          {solved ? (
            <div
              className="neo-chip w-fit rotate-[1deg] md:ml-auto"
              style={{
                backgroundColor: "var(--inverted-surface)",
                color: "var(--inverted-ink)",
              }}
            >
              Solved
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
