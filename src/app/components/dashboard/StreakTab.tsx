"use client";

import { useState } from "react";

export default function StreakTab() {
  const [streak, setStreak] = useState<number>(0);

  return (
    <div className="flex h-full min-h-[200px] flex-col md:min-h-[240px] items-center rounded-2xl border border-zinc-200/70 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
      <h2 className="text-center text-2xl font-semibold text-zinc-900 dark:text-white">
        Streak
      </h2>
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-4 sm:gap-6">
        <div className="flex items-center justify-center gap-3">
          <span className="text-4xl font-bold sm:text-5xl text-red-700">
            {streak}
          </span>
          <span className="text-2xl font-semibold sm:text-3xl text-red-700">
            {streak === 1 ? "day" : "days"}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setStreak((prev) => prev + 1)}
          className="inline-flex w-fit cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-700 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:scale-[1.03] hover:bg-red-800">
          <span aria-hidden="true">🔥</span>
          Increase Streak
        </button>
      </div>
    </div>
  );
}
