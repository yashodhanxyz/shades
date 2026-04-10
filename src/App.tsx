import { ColorOrderingGame } from "./components/ColorOrderingGame";
import { useThemePreference } from "./hooks/useThemePreference";

export default function App() {
  const { theme, setTheme } = useThemePreference();

  return (
    <main className="theme-ink min-h-screen px-4 py-6 md:px-8 lg:px-12">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl flex-col items-center justify-center gap-5">
        <section className="flex max-w-2xl flex-col items-center gap-3 text-center">
          <p className="neo-chip">
            Experimental Color Ordering Game
          </p>
          <h1 className="font-display text-3xl uppercase leading-[0.94] tracking-[-0.04em] md:text-4xl">
            Put the shades back in the right sequence.
          </h1>
          <p className="theme-muted max-w-xl text-sm font-semibold leading-6 md:text-base">
            The interface stays monochrome so the palette itself remains the
            main event.
          </p>
        </section>

        <div className="w-full">
          <ColorOrderingGame theme={theme} onThemeChange={setTheme} />
        </div>
      </div>
    </main>
  );
}
