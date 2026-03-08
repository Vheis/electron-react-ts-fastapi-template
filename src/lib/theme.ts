export type ThemePreference = "light" | "dark" | "system";

type ResolvedTheme = "light" | "dark";

const THEME_STORAGE_KEY = "theme";
const DARK_MEDIA_QUERY = "(prefers-color-scheme: dark)";

export const getStoredThemePreference = (): ThemePreference => {
  if (typeof window === "undefined") {
    return "system";
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (
    storedTheme === "light" ||
    storedTheme === "dark" ||
    storedTheme === "system"
  ) {
    return storedTheme;
  }

  return "system";
};

export const getSystemPrefersDark = () => {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }

  return window.matchMedia(DARK_MEDIA_QUERY).matches;
};

export const resolveTheme = (
  themePreference: ThemePreference,
  systemPrefersDark: boolean
): ResolvedTheme =>
  themePreference === "system"
    ? systemPrefersDark
      ? "dark"
      : "light"
    : themePreference;

export const applyResolvedTheme = (resolvedTheme: ResolvedTheme) => {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;

  root.classList.toggle("dark", resolvedTheme === "dark");
  root.style.colorScheme = resolvedTheme;
};

export const persistThemePreference = (themePreference: ThemePreference) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(THEME_STORAGE_KEY, themePreference);
};

export const themeMediaQuery = DARK_MEDIA_QUERY;
