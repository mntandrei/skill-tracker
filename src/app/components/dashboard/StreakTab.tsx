"use client";

import { useEffect, useState } from "react";
import { BookOpenCheck, Clock3, Flame } from "lucide-react";
import { getStreak, STREAK_COOLDOWN_MS, STREAK_EXPIRY_MS, STREAK_UPDATED_EVENT} from "@/app/components/lib/streak-storage";
import type { StreakState } from "@/app/components/lib/streak-storage";

function formatTime(milliseconds: number): string {
  const seconds = Math.ceil(Math.max(0, milliseconds) / 1000);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return [hours, minutes, remainingSeconds]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");
}

export default function StreakTab({ skillId }: { skillId: string }) {
  const [streak, setStreak] = useState<StreakState>({
    count: 0,
    lastIncreaseAt: null,
  });

  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    function refreshStreak() {
      setStreak(getStreak(skillId));
      setNow(Date.now());
    }

    refreshStreak();

    const interval = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    window.addEventListener(STREAK_UPDATED_EVENT, refreshStreak);
    window.addEventListener("storage", refreshStreak);
    window.addEventListener("focus", refreshStreak);
    document.addEventListener("visibilitychange", refreshStreak);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener(STREAK_UPDATED_EVENT, refreshStreak);
      window.removeEventListener("storage", refreshStreak);
      window.removeEventListener("focus", refreshStreak);
      document.removeEventListener("visibilitychange", refreshStreak);
    };
  }, [skillId]);

  const lastIncreaseAt = streak.lastIncreaseAt;
  const lastActivityAt = streak.lastActivityAt;
  const isActive = Boolean(skillId) && now !== null && lastActivityAt !== null && now < lastActivityAt + STREAK_EXPIRY_MS;
  const streakCount = isActive ? streak.count : 0;
  const cooldownRemaining = isActive && lastIncreaseAt !== null ? Math.min(STREAK_COOLDOWN_MS, Math.max(0, lastIncreaseAt + STREAK_COOLDOWN_MS - now!)) : 0;
  const endRemaining = isActive && lastActivityAt !== null ? Math.min(STREAK_EXPIRY_MS, Math.max(0, lastActivityAt + STREAK_EXPIRY_MS - now!)) : 0;
  const isCooldown = cooldownRemaining > 0;
  const statusMessage = !skillId ? "Select a skill to track your streak." : now === null ? "Loading streak..." : isCooldown ? "Cooldown active. Your streak is protected." 
    : isActive  ? "Ready! Mark a subskill as learned to continue." : "Mark a subskill as learned to start.";

  return (
    <div className="flex h-full min-h-[250px] min-w-0 flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 md:min-h-0">
      <div className="flex shrink-0 items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Streak
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Stay consistent every day
          </p>
        </div>
        <span
          className={`flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${
            isActive ? "bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-400" : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400"}`}>
          <span
            className={`size-1.5 rounded-full ${
              isActive ? "bg-green-500" : "bg-red-500"}`}/>
          {isActive ? "Active" : "Not Active"}
        </span>
      </div>
      <div className="flex min-h-0 flex-1 items-center gap-3 rounded-xl bg-red-50/70 px-4 py-3 dark:bg-red-950/20">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-red-700 shadow-sm dark:bg-red-950/50 dark:text-red-400">
          <Flame size={25} strokeWidth={1.8} />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold leading-none tabular-nums text-red-700 dark:text-red-400">
            {streakCount}
          </span>

          <span className="text-lg font-medium text-red-700 dark:text-red-400">
            {streakCount === 1 ? "day" : "days"}
          </span>
        </div>
      </div>
      <div className="grid shrink-0 grid-cols-2 gap-2">
        <div className="min-w-0 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 dark:border-zinc-700 dark:bg-zinc-900">
          <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
            <Clock3 size={13} className="shrink-0" />
            <span className="truncate text-[11px] font-medium">
              Next increase
            </span>
          </div>
          <p className="mt-1.5 font-mono text-base font-semibold tabular-nums text-zinc-900 dark:text-white">
            {now === null ? "--:--:--" : isCooldown ? formatTime(cooldownRemaining): "Ready"}
          </p>
        </div>
        <div className="min-w-0 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 dark:border-zinc-700 dark:bg-zinc-900">
          <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
            <Flame size={13} className="shrink-0" />
            <span className="truncate text-[11px] font-medium">
              Streak expires
            </span>
          </div>
          <p className="mt-1.5 font-mono text-base font-semibold tabular-nums text-zinc-900 dark:text-white">
            {now === null ? "--:--:--" : isActive ? formatTime(endRemaining): "Not started"}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2 rounded-lg border border-zinc-200 px-3 py-2.5 dark:border-zinc-700">
        <BookOpenCheck
          size={16}
          className="shrink-0 text-red-700 dark:text-red-400"/>
        <p className="text-xs leading-4 text-zinc-600 dark:text-zinc-300">
          {statusMessage}
        </p>
      </div>
    </div>
  );
}
