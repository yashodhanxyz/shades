import type { Shade, SortDirection, ShadeTone } from "../types/game";

export function shuffleShades(shades: Shade[]) {
  const next = [...shades];

  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
  }

  return next;
}

export function sortShades(shades: Shade[], direction: SortDirection) {
  const next = [...shades];
  const multiplier = direction === "light-to-dark" ? 1 : -1;
  return next.sort((left, right) => (left.rank - right.rank) * multiplier);
}

export function isSolved(shades: Shade[], direction: SortDirection) {
  const target = sortShades(shades, direction);
  return shades.every((shade, index) => shade.tone === target[index]?.tone);
}

export function createShuffledBoard(shades: Shade[], direction: SortDirection) {
  // Avoid starting in a solved state so each round requires at least one move.
  let next = shuffleShades(shades);
  let attempts = 0;

  while (isSolved(next, direction) && attempts < 8) {
    next = shuffleShades(shades);
    attempts += 1;
  }

  return next;
}

export function moveShade(shades: Shade[], draggedTone: ShadeTone, targetIndex: number) {
  const draggedIndex = shades.findIndex((shade) => shade.tone === draggedTone);

  if (draggedIndex === -1) {
    return shades;
  }

  const boundedIndex = Math.max(0, Math.min(targetIndex, shades.length));
  const insertIndex = draggedIndex < boundedIndex ? boundedIndex - 1 : boundedIndex;

  if (insertIndex === draggedIndex) {
    return shades;
  }

  const next = [...shades];
  const [movedShade] = next.splice(draggedIndex, 1);
  next.splice(insertIndex, 0, movedShade);
  return next;
}
