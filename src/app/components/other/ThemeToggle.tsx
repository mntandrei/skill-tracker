import { Moon } from "lucide-react";

export default function ThemeToggle() {
  return (
    <button
      type="button"
      aria-label="Toggle theme"
      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-700 transition-all duration-300 hover:scale-105 hover:border-red-300 hover:bg-red-50 hover:text-red-700">
      <Moon size={20} strokeWidth={1.8} />
    </button>
  );
}
