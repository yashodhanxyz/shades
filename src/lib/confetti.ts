import confetti from "canvas-confetti";

export function launchSolveConfetti(colors: string[]) {
  const burst = {
    colors,
    gravity: 0.9,
    scalar: 0.96,
    spread: 110,
    startVelocity: 36,
    ticks: 220,
    zIndex: 2000,
  };

  confetti({
    ...burst,
    angle: 60,
    origin: { x: 0.18, y: 0.78 },
    particleCount: 80,
  });

  confetti({
    ...burst,
    angle: 120,
    origin: { x: 0.82, y: 0.78 },
    particleCount: 80,
  });

  confetti({
    ...burst,
    origin: { x: 0.5, y: 0.56 },
    particleCount: 50,
  });
}
