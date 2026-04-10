import type { DragEvent } from "react";
import { cx } from "../lib/cx";

interface DropSlotProps {
  index: number;
  active: boolean;
  connected: boolean;
  isDragActive: boolean;
  onDragOver: (index: number, event: DragEvent<HTMLDivElement>) => void;
  onDrop: (index: number) => void;
}

export function DropSlot({
  index,
  active,
  connected,
  isDragActive,
  onDragOver,
  onDrop,
}: DropSlotProps) {
  return (
    <div
      aria-hidden="true"
      className={cx(
        "relative flex shrink-0 items-center justify-center transition-[width,opacity] duration-200 ease-out",
        connected ? "w-0 opacity-0" : active ? "w-5 md:w-6" : "w-2.5 md:w-3.5",
      )}
      onDragOver={(event) => {
        event.preventDefault();
        onDragOver(index, event);
      }}
      onDrop={(event) => {
        event.preventDefault();
        onDrop(index);
      }}
    >
      <span
        className={cx(
          "block rounded-[12px] transition-all duration-200 ease-out",
          active
            ? "h-[78%] w-full border-4"
            : isDragActive
              ? "h-[68%] w-full border-2 border-dashed"
              : "h-[58%] w-full border-2 border-transparent bg-transparent",
        )}
        style={
          active
            ? {
                borderColor: "var(--ink)",
                backgroundColor: "var(--ink)",
              }
            : isDragActive
              ? {
                  borderColor: "var(--slot-preview-border)",
                  backgroundColor: "var(--slot-preview-bg)",
                }
              : undefined
        }
      />
    </div>
  );
}
