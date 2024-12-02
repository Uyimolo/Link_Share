import { useEffect, useState } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState("system"); // Default to "system"

  useEffect(() => {
    // On mount, retrieve theme from localStorage or default to "system"
    const savedTheme = window.localStorage.getItem("theme") || "system";
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  useEffect(() => {
    // Apply theme whenever it changes
    applyTheme(theme);
  }, [theme]);

  const applyTheme = (theme: string) => {
    if (theme === "system") {
      const userPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      document.body.classList.toggle("dark", userPrefersDark);
    } else {
      document.body.classList.toggle("dark", theme === "dark");
    }
  };

  const updateTheme = (selectedTheme: string) => {
    window.localStorage.setItem("theme", selectedTheme);
    setTheme(selectedTheme);
  };

  return { theme, updateTheme };
};

export default useTheme;
