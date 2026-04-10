import colors from "tailwindcss/colors";
import { SHADE_STEPS, type GamePalette, type ShadeTone, type TailwindColorFamily } from "../types/game";

const paletteLabels: Record<TailwindColorFamily, string> = {
  blue: "Blue",
  emerald: "Emerald",
  slate: "Slate",
  violet: "Violet",
};

const tailwindPalettes: Record<TailwindColorFamily, Record<ShadeTone, string>> = {
  blue: colors.blue as Record<ShadeTone, string>,
  emerald: colors.emerald as Record<ShadeTone, string>,
  slate: colors.slate as Record<ShadeTone, string>,
  violet: colors.violet as Record<ShadeTone, string>,
};

export function buildPalette(family: TailwindColorFamily): GamePalette {
  const ramp = tailwindPalettes[family];

  const shades = SHADE_STEPS.map((tone, index) => ({
    tone,
    hex: ramp[tone],
    rank: index,
  }));

  const gradient = `linear-gradient(90deg, ${shades
    .map((shade, index) => {
      const percentage = Math.round((index / (shades.length - 1)) * 100);
      return `${shade.hex} ${percentage}%`;
    })
    .join(", ")})`;

  return {
    family,
    label: paletteLabels[family],
    shades,
    gradient,
  };
}
