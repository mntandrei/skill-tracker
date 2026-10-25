"use client";

import { useRef } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isAnimating = useRef(false);

  const handleClick = () => {
    if (isAnimating.current) return;

    const rect = buttonRef.current?.getBoundingClientRect();

    if (!rect) return;

    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const radius =
      Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      ) + 24;

    const html = document.documentElement;

    const changeTheme = () => {
      const isDark = html.classList.toggle("dark");

      try {
        localStorage.setItem(
          "theme",
          isDark ? "dark" : "light"
        );
      } catch {
        console.error("Failed to save theme preference.");
      }
    };

    if (
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      changeTheme();
      return;
    }

    isAnimating.current = true;

    html.style.setProperty("--reveal-x", `${x}px`);
    html.style.setProperty("--reveal-y", `${y}px`);
    html.style.setProperty("--reveal-radius", `${radius}px`);

    html.classList.add("theme-changing");

    const transition = document.startViewTransition(changeTheme);

    const cleanup = () => {
      html.classList.remove("theme-changing");
      isAnimating.current = false;
    };

    void transition.finished.then(cleanup, cleanup);
  };

  return (
    <button
      type="button"
      ref={buttonRef}
      onClick={handleClick}
      aria-label="Toggle theme"
      title="Toggle theme"
      className="flex h-11 w-11 cursor-pointer md:h-10 md:w-10 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-700 transition-all duration-300 hover:scale-105 hover:border-red-300 hover:bg-red-50 hover:text-red-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:border-red-300 dark:hover:bg-zinc-700 dark:hover:text-red-700">
      <Moon
        size={20}
        strokeWidth={1.8}
        className="block dark:hidden"/>
      <Sun
        size={20}
        strokeWidth={1.8}
        className="hidden dark:block"/>
    </button>
  );
}
