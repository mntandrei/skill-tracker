"use client";

import { useState, useEffect } from "react";

export default function StreakTab() {
  const [streak, setStreak] = useState<number>(0);
  const [lastActivityAt, setLastActivityAt] = useState<number | null>(null);
  const [now, setNow] = useState<number>(0);

  useEffect(() => {
  setNow(Date.now());
  const interval = setInterval(() => {
    setNow(Date.now());
  }, 1000);
  return () => clearInterval(interval);
}, []);

useEffect(() => {
  const savedTime = localStorage.getItem("lastActivityAt");
  if (savedTime !== null) {
    setLastActivityAt(Number(savedTime));
    setNow(Date.now());
  }
  const savedStreak = localStorage.getItem("streak");
  if (savedStreak !== null) {
    setStreak(Number(savedStreak));
  }
}, []);

  const remaining = lastActivityAt === null ? 0 : Math.max(0, 24 * 60 * 60 * 1000 - (now - lastActivityAt));
  const totalSeconds = Math.ceil(remaining / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;


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
          disabled={remaining > 0}
          onClick={() => {
          const newStreak = streak + 1;
          setStreak(newStreak);
          const currentTime = Date.now();
          setLastActivityAt(currentTime);
          setNow(currentTime);
          localStorage.setItem("lastActivityAt", String(currentTime));
          localStorage.setItem("streak", String(newStreak));
        }}
          className="inline-flex w-fit cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-700 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:scale-[1.03] hover:bg-red-800">
          <span aria-hidden="true">🔥</span>
          Increase Streak
        </button>
      </div>
      {remaining > 0 && (
        <p className="-mt-5 text-sm text-zinc-500 dark:text-zinc-400">
          {String(hours).padStart(2, "0")}:
          {String(minutes).padStart(2, "0")}:
          {String(seconds).padStart(2, "0")}
        </p>
      )}
    </div>
  );
}
