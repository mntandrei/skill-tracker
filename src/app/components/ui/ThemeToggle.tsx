"use client";

import { useRef } from "react";
import { Moon, Sun } from "lucide-react";
import { getThemeRevealMetrics } from "./theme-reveal";

export default function ThemeToggle() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isAnimating = useRef(false);

  const handleClick = () => {
    if (isAnimating.current) return;

    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;

    const html = document.documentElement;
    const wasDark = html.classList.contains("dark");

    const changeTheme = () => {
      const isDark = !wasDark;
      const theme = isDark ? "dark" : "light";

      html.classList.toggle("dark", isDark);

      try {
        localStorage.setItem("theme", theme);
      } catch {
        console.error("Failed to save theme preference.");
      }

      document.cookie = "theme=" + theme + "; path=/; max-age=31536000; SameSite=Lax";
    };

    if (
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      changeTheme();
      return;
    }

    const zoom = Number.parseFloat(getComputedStyle(html).zoom);
    const reveal = getThemeRevealMetrics(
      rect,
      { width: window.innerWidth, height: window.innerHeight },
      zoom
    );

    isAnimating.current = true;

    html.style.setProperty("--theme-reveal-x", reveal.x + "px");
    html.style.setProperty("--theme-reveal-y", reveal.y + "px");
    html.style.setProperty("--theme-reveal-radius", reveal.radius + "px");
    html.style.setProperty("--theme-old-color-scheme", wasDark ? "dark" : "light");
    html.style.setProperty("--theme-old-background", wasDark ? "#09090b" : "#fafafa");
    html.style.setProperty("--theme-new-background", wasDark ? "#fafafa" : "#09090b");
    html.classList.add("theme-changing");

    const cleanup = () => {
      html.classList.remove("theme-changing");
      html.style.removeProperty("--theme-reveal-x");
      html.style.removeProperty("--theme-reveal-y");
      html.style.removeProperty("--theme-reveal-radius");
      html.style.removeProperty("--theme-old-color-scheme");
      html.style.removeProperty("--theme-old-background");
      html.style.removeProperty("--theme-new-background");
      isAnimating.current = false;
    };

    try {
      const transition = document.startViewTransition(changeTheme);
      void transition.finished.then(cleanup, cleanup);
    } catch {
      cleanup();
      changeTheme();
    }
  };

  return (
    <button
      type="button"
      ref={buttonRef}
      onClick={handleClick}
      aria-label="Toggle theme"
      title="Toggle theme"
      className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-700 transition-all duration-300 hover:scale-105 hover:border-red-300 hover:bg-red-50 hover:text-red-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:border-red-300 dark:hover:bg-zinc-700 dark:hover:text-red-700 md:h-10 md:w-10">
      <Moon
        size={20}
        strokeWidth={1.8}
        className="block dark:hidden"
      />
      <Sun
        size={20}
        strokeWidth={1.8}
        className="hidden dark:block"
      />
    </button>
  );
}
