import type { ThemeMode } from "../types/theme";

interface ThemeToggleProps {
  value: ThemeMode;
  onChange: (theme: ThemeMode) => void;
}

export function ThemeToggle({ value, onChange }: ThemeToggleProps) {
  const nextTheme = value === "light" ? "dark" : "light";
  const title =
    nextTheme === "dark" ? "Switch to dark theme" : "Switch to light theme";

  return (
    <button
      type="button"
      className="neo-icon-button"
      aria-label={title}
      title={title}
      onClick={() => onChange(nextTheme)}
    >
      {value === "light" ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3v2.2" />
          <path d="M12 18.8V21" />
          <path d="M3 12h2.2" />
          <path d="M18.8 12H21" />
          <path d="m5.64 5.64 1.56 1.56" />
          <path d="m16.8 16.8 1.56 1.56" />
          <path d="m5.64 18.36 1.56-1.56" />
          <path d="m16.8 7.2 1.56-1.56" />
          <circle cx="12" cy="12" r="4.2" />
        </svg>
      ) : (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.2 14.3A8.5 8.5 0 1 1 9.7 3.8a6.7 6.7 0 0 0 10.5 10.5Z" />
        </svg>
      )}
    </button>
  );
}
