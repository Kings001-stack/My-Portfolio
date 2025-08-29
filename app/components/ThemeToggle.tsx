"use client";
import { useEffect, useState } from "react";

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // Initialize from localStorage or system
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const initial = (stored as "light" | "dark") || getSystemTheme();
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggle}
      className="glow-btn flex items-center gap-2 whitespace-nowrap"
      type="button"
    >
      {theme === "dark" ? (
        <i className="bi bi-sun"></i>
      ) : (
        <i className="bi bi-moon"></i>
      )}
      {/* <span className="hidden sm:inline">{theme === "dark" ? "Light" : "Dark"} mode</span> */}
    </button>
  );
}
