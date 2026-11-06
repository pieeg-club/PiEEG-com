"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname } from "next/navigation";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: Theme;
  setTheme: (theme: Theme) => void;
};

export const THEME_STORAGE_KEY = "theme";
const DEFAULT_THEME: Theme = "light";

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
  root.style.colorScheme = theme;
}

function readStoredTheme(): Theme {
  if (typeof window === "undefined") return DEFAULT_THEME;
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // Access to localStorage can throw (e.g. privacy mode) — fall back.
  }
  return DEFAULT_THEME;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStoreEntry = pathname === "/store";
  // The blocking script in the document head has already applied the correct
  // class before paint. Initialize from the same source so the provider's
  // state matches the DOM without causing a flash.
  const [theme, setThemeState] = useState<Theme>(readStoredTheme);

  const setTheme = useCallback(
    (next: Theme) => {
      if (isStoreEntry) {
        applyTheme("light");
        return;
      }
      setThemeState(next);
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        // Ignore persistence failures.
      }
      applyTheme(next);
    },
    [isStoreEntry],
  );

  // Sync the DOM class on mount/route change and keep multiple tabs in sync.
  useEffect(() => {
    if (isStoreEntry) {
      applyTheme("light");
      return;
    }
    const stored = readStoredTheme();
    setThemeState(stored);
    applyTheme(stored);
    const onStorage = (event: StorageEvent) => {
      if (
        event.key === THEME_STORAGE_KEY &&
        (event.newValue === "light" || event.newValue === "dark")
      ) {
        setThemeState(event.newValue);
        applyTheme(event.newValue);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [isStoreEntry]);

  const effectiveTheme: Theme = isStoreEntry ? "light" : theme;

  const value = useMemo<ThemeContextValue>(
    () => ({ theme: effectiveTheme, resolvedTheme: effectiveTheme, setTheme }),
    [effectiveTheme, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    return { theme: DEFAULT_THEME, resolvedTheme: DEFAULT_THEME, setTheme: () => {} };
  }
  return context;
}
