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

      <a
        href="https://yashodhan.xyz/"
        target="_blank"
        rel="noreferrer"
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
