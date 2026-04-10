import type { DragEvent } from "react";
import { cx } from "../lib/cx";
import type { Shade, ShadeTone } from "../types/game";

interface ColorCardProps {
  shade: Shade;
  connected: boolean;
  isDragging: boolean;
  isFirst: boolean;
  isLast: boolean;
  registerNode: (node: HTMLDivElement | null) => void;
  onDragStart: (tone: ShadeTone, event: DragEvent<HTMLDivElement>) => void;
  onDragEnd: () => void;
}

export function ColorCard({
  shade,
  connected,
  isDragging,
  isFirst,
  isLast,
  registerNode,
  onDragStart,
  onDragEnd,
}: ColorCardProps) {
  const borderWidth = connected
    ? isFirst
      ? "4px 0 4px 4px"
      : isLast
        ? "4px 4px 4px 0"
        : "4px 0"
    : "4px";

  const borderRadius = connected
    ? isFirst
      ? "16px 0 0 16px"
      : isLast
        ? "0 16px 16px 0"
        : "0"
    : "18px";

  return (
    <div
      ref={registerNode}
      draggable
      aria-label={`Shade ${shade.tone}`}
      className={cx(
        "group relative flex h-48 min-w-[68px] flex-1 basis-0 cursor-grab overflow-hidden transition-[border-radius,box-shadow,transform,opacity] duration-500 md:h-56 md:min-w-[72px] lg:h-64 lg:min-w-0",
        isDragging && "-rotate-2 opacity-85",
      )}
      style={{
        backgroundColor: shade.hex,
        borderStyle: "solid",
        borderColor: "var(--ink)",
        borderWidth,
        borderRadius,
        boxShadow: connected
          ? "none"
          : isDragging
            ? "10px 10px 0 var(--ink)"
            : "6px 6px 0 var(--ink)",
      }}
      onDragStart={(event) => onDragStart(shade.tone, event)}
      onDragEnd={onDragEnd}
    />
  );
}
