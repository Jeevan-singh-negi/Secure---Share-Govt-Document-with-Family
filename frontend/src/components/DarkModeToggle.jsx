import React from "react";
import { Moon, Sun } from "lucide-react";

/**
 * DarkModeToggle component (ShadCN-style)
 * - Toggles Tailwind dark mode via <html> class
 * - Respects user preference & persists via localStorage
 * - Lucide icons + transition-aware
 */

export default function DarkModeToggle({ className = "" }) {
  const [theme, setTheme] = React.useState("light");
  const [mounted, setMounted] = React.useState(false); // prevent mismatch

  // On mount: get stored theme or system preference
  React.useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored || (prefersDark ? "dark" : "light");
    setTheme(initial);
    setMounted(true);
  }, []);

  // Update <html> class and localStorage
  React.useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) return null; // prevent hydration mismatch

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className={`inline-flex items-center justify-center rounded-md p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 ${className}`}
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-yellow-400 transition duration-200" />
      ) : (
        <Moon className="w-5 h-5 text-blue-600 transition duration-200" />
      )}
    </button>
  );
}
