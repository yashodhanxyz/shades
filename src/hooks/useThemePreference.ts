import { useEffect, useState } from "react";
import type { ThemeMode } from "../types/theme";

const STORAGE_KEY = "huethere-theme";

function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = window.localStorage.getItem(STORAGE_KEY);
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function useThemePreference() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    // Keep the DOM theme in sync so the CSS variable system updates globally.
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);

    const favicon = document.getElementById("app-favicon");
    if (favicon instanceof HTMLLinkElement) {
      favicon.href = theme === "dark" ? "/favicon-dark.svg" : "/favicon.svg";
    }
  }, [theme]);

  return { theme, setTheme };
}
