import { useLayoutEffect, useRef } from "react";

type Key = string | number;

export function useFlipAnimation<T extends Key>(items: T[]) {
  const elementMap = useRef(new Map<T, HTMLElement>());
  const previousRects = useRef(new Map<T, DOMRect>());
  const itemsSignature = items.map((item) => String(item)).join("|");

  const registerItem = (key: T) => (node: HTMLElement | null) => {
    if (node) {
      elementMap.current.set(key, node);
      return;
    }

    elementMap.current.delete(key);
  };

  const snapshotPositions = () => {
    previousRects.current = new Map(
      Array.from(elementMap.current.entries()).map(([key, node]) => [
        key,
        node.getBoundingClientRect(),
      ]),
    );
  };

  const resetPositions = () => {
    previousRects.current = new Map();
  };

  useLayoutEffect(() => {
    const nextRects = new Map<T, DOMRect>();

    items.forEach((item) => {
      const element = elementMap.current.get(item);

      if (!element) {
        return;
      }

      const nextRect = element.getBoundingClientRect();
      nextRects.set(item, nextRect);

      const previousRect = previousRects.current.get(item);
      if (!previousRect) {
        return;
      }

      const deltaX = previousRect.left - nextRect.left;
      const deltaY = previousRect.top - nextRect.top;

      if (deltaX === 0 && deltaY === 0) {
        return;
      }

      element.animate(
        [
          { transform: `translate(${deltaX}px, ${deltaY}px)` },
          { transform: "translate(0px, 0px)" },
        ],
        {
          duration: 280,
          easing: "cubic-bezier(0.2, 1, 0.3, 1)",
        },
      );
    });

    previousRects.current = nextRects;
  }, [itemsSignature]);

  return {
    registerItem,
    resetPositions,
    snapshotPositions,
  };
}
