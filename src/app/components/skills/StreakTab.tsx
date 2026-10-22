"use client";

import { useState } from "react";

export default function StreakTab() {
  const [streak, setStreak] = useState<number>(0);

  return (
    <div className="flex flex-col items-center h-full min-h-[240px] rounded-2xl border border-zinc-200/70 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-semibold text-zinc-900">Streak</h2>
      <div className="mt-5 flex items-center gap-3">
        <span className="text-5xl font-bold text-red-700">{streak}</span>
        <span className="text-3xl font-semibold text-red-700">
          {streak === 1 ? "day" : "days"}
        </span>
      </div>
      <button
        type="button"
        onClick={() => setStreak((prev) => prev + 1)}
        className="mt-8 inline-flex items-center gap-2 rounded-3xl bg-red-700 px-10 py-3 text-md font-semibold text-white transition hover:bg-red-800 hover:scale-103 transition-transform">
        <span>🔥</span>
        Increase Streak
      </button>
    </div>
  );
}