"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// Theme context type
type ThemeContextType = {
  theme: string;
  updateTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }

  return context;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
 const [theme, setTheme] = useState("system");

 useEffect(() => {
   const storedTheme = window.localStorage.getItem("theme") || "system";
   setTheme(storedTheme);
   applyTheme(storedTheme);
 }, []);

  const updateTheme = (theme: string) => {
    setTheme(theme);
    applyTheme(theme);
    window.localStorage.setItem("theme", theme);
  };

  const applyTheme = (theme: string) => {
    if (theme === "system") {
      const userPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      document.documentElement.classList.toggle("dark", userPrefersDark);
    } else {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
