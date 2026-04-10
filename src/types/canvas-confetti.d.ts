declare module "canvas-confetti" {
  interface ConfettiOptions {
    angle?: number;
    colors?: string[];
    gravity?: number;
    origin?: {
      x?: number;
      y?: number;
    };
    particleCount?: number;
    scalar?: number;
    spread?: number;
    startVelocity?: number;
    ticks?: number;
    zIndex?: number;
  }

  export default function confetti(options?: ConfettiOptions): Promise<null> | null;
}
