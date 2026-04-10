import { ColorOrderingGame } from "./components/ColorOrderingGame";
import { useThemePreference } from "./hooks/useThemePreference";

export default function App() {
  const { theme, setTheme } = useThemePreference();

  return (
    <main className="theme-ink min-h-screen px-4 py-6 md:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 pb-20">
        <section className="flex min-h-[calc(100vh-3rem)] flex-col items-center justify-center gap-5">
          <section className="flex max-w-2xl flex-col items-center gap-3 text-center">
            <p className="neo-chip">
              Experimental Color Ordering Game
            </p>
            <h1 className="font-display text-3xl uppercase leading-[0.94] tracking-[-0.04em] md:text-4xl">
              Put the shades back in the right sequence.
            </h1>
            <p className="theme-muted max-w-xl text-sm font-semibold leading-6 md:text-base">
              HueThere is a free browser color sorting game where each win pushes
              you from 3 shades to 6 and then 10, with a fresh palette every
              round.
            </p>
          </section>

          <div className="w-full">
            <ColorOrderingGame theme={theme} onThemeChange={setTheme} />
          </div>
        </section>

        <section
          aria-labelledby="how-huethere-works"
          className="neo-panel mx-auto w-full max-w-6xl p-5 md:p-7"
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <article className="space-y-3">
              <p className="neo-chip">How It Works</p>
              <h2
                id="how-huethere-works"
                className="font-display text-2xl uppercase leading-[0.96] tracking-[-0.03em]"
              >
                Drag shades into the right order.
              </h2>
              <p className="theme-muted text-sm font-semibold leading-6 md:text-base">
                Each round gives you a broken color ramp. Drop a shade directly
                on the left or right half of another card to place it where it
                belongs.
              </p>
            </article>

            <article className="space-y-3">
              <p className="neo-chip">Progression</p>
              <h2 className="font-display text-2xl uppercase leading-[0.96] tracking-[-0.03em]">
                Start simple, then scale.
              </h2>
              <p className="theme-muted text-sm font-semibold leading-6 md:text-base">
                HueThere starts with 3 shades, unlocks 6 shades after 3 wins, then
                opens the full 10 shade challenge after 3 more wins at level 2.
              </p>
            </article>

            <article className="space-y-3">
              <p className="neo-chip">Palettes</p>
              <h2 className="font-display text-2xl uppercase leading-[0.96] tracking-[-0.03em]">
                Every solved board changes color.
              </h2>
              <p className="theme-muted text-sm font-semibold leading-6 md:text-base">
                The game rotates through blue, emerald, violet, and slate ramps
                so the challenge stays familiar without feeling visually stale.
              </p>
            </article>
          </div>
        </section>

        <section
          aria-labelledby="why-play-huethere"
          className="neo-panel mx-auto w-full max-w-6xl p-5 md:p-7"
        >
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-3">
              <p className="neo-chip">About The Game</p>
              <h2
                id="why-play-huethere"
                className="font-display text-2xl uppercase leading-[0.96] tracking-[-0.03em] md:text-3xl"
              >
                A color sorting game built for fast pattern recognition.
              </h2>
              <p className="theme-muted text-sm font-semibold leading-6 md:text-base">
                HueThere is a minimalist web game about spotting subtle shifts in a
                color ramp and restoring the correct order under light pressure.
                It works as a quick visual puzzle, a casual browser challenge,
                and a small experiment in progressive game difficulty.
              </p>
              <p className="theme-muted text-sm font-semibold leading-6 md:text-base">
                Because the interface stays mostly monochrome, the shades become
                the main event. That keeps the puzzle legible and helps each
                round feel intentional instead of noisy.
              </p>
            </div>

            <aside className="space-y-3">
              <p className="neo-chip">Quick Facts</p>
              <ul className="theme-muted space-y-3 text-sm font-semibold leading-6 md:text-base">
                <li>Free to play in the browser</li>
                <li>No sign-up required</li>
                <li>Progress saves locally on your device</li>
                <li>Best experienced on desktop or laptop</li>
              </ul>
            </aside>
          </div>
        </section>
      </div>

      <a
        href="https://yashodhan.xyz/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-3 right-3 z-20 rounded-full border-4 px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] transition-transform duration-150 hover:-translate-y-0.5 md:bottom-4 md:right-4"
        style={{
          borderColor: "var(--ink)",
          backgroundColor: "var(--surface)",
          color: "var(--ink)",
          boxShadow: "5px 5px 0 var(--ink)",
        }}
      >
        Built by Yashodhan
      </a>
    </main>
  );
}
