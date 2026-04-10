import type { DragEvent } from "react";
import { Fragment } from "react";
import { cx } from "../lib/cx";
import type { Shade, ShadeTone } from "../types/game";
import { ColorCard } from "./ColorCard";
import { DropSlot } from "./DropSlot";

interface ColorBoardProps {
  shades: Shade[];
  solved: boolean;
  isDragActive: boolean;
  gradient: string;
  draggedTone: ShadeTone | null;
  insertionIndex: number | null;
  registerCard: (tone: ShadeTone) => (node: HTMLDivElement | null) => void;
  onDragStart: (tone: ShadeTone, event: DragEvent<HTMLDivElement>) => void;
  onDragEnd: () => void;
  onSlotDragOver: (index: number, event: DragEvent<HTMLDivElement>) => void;
  onSlotDrop: (index: number) => void;
}

export function ColorBoard({
  shades,
  solved,
  isDragActive,
  gradient,
  draggedTone,
  insertionIndex,
  registerCard,
  onDragStart,
  onDragEnd,
  onSlotDragOver,
  onSlotDrop,
}: ColorBoardProps) {
  const connected = solved && !isDragActive;
  const boardMinWidth = Math.max(320, shades.length * 76 + (shades.length + 1) * 18);

  return (
    <div className="overflow-x-auto pb-4 lg:overflow-x-visible">
      <div style={{ minWidth: boardMinWidth }}>
        <div
          className="relative rounded-[24px] border-4 p-3"
          style={{
            borderColor: "var(--ink)",
            backgroundColor: "var(--surface-alt)",
            boxShadow: "8px 8px 0 var(--ink)",
          }}
        >
          <div
            aria-hidden="true"
            className={cx(
              "pointer-events-none absolute inset-3 rounded-[16px] opacity-0 transition-all duration-500",
              connected && "opacity-25",
            )}
            style={{ backgroundImage: gradient }}
          />

          <div className="relative flex items-stretch">
            <DropSlot
              index={0}
              active={insertionIndex === 0}
              connected={connected}
              isDragActive={isDragActive}
              onDragOver={onSlotDragOver}
              onDrop={onSlotDrop}
            />

            {shades.map((shade, index) => (
              <Fragment key={shade.tone}>
                <ColorCard
                  shade={shade}
                  connected={connected}
                  isDragging={draggedTone === shade.tone}
                  isFirst={index === 0}
                  isLast={index === shades.length - 1}
                  registerNode={registerCard(shade.tone)}
                  onDragStart={onDragStart}
                  onDragEnd={onDragEnd}
                />
                <DropSlot
                  index={index + 1}
                  active={insertionIndex === index + 1}
                  connected={connected}
                  isDragActive={isDragActive}
                  onDragOver={onSlotDragOver}
                  onDrop={onSlotDrop}
                />
              </Fragment>
            ))}
          </div>
          <p className="theme-muted mt-4 text-[11px] font-black uppercase tracking-[0.22em]">
            Drag a shade into the slot between two cards.
          </p>
        </div>
      </div>
    </div>
  );
}
