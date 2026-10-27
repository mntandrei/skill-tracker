export type StreakState = {
  count: number;
  lastIncreaseAt: number | null;
};

export const STREAK_UPDATED_EVENT = "skill-tracker:streak-updated";

export const STREAK_COOLDOWN_MS = 24 * 60 * 60 * 1000;
export const STREAK_EXPIRY_MS = 48 * 60 * 60 * 1000;

const STREAK_KEY = "skill-tracker:streak";

const emptyStreak: StreakState = {
  count: 0,
  lastIncreaseAt: null,
};

export function getStreak(): StreakState {
  if (typeof window === "undefined") {
    return emptyStreak;
  }

  try {
    const saved = localStorage.getItem(STREAK_KEY);

    if (!saved) return emptyStreak;

    const parsed: unknown = JSON.parse(saved);

    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !("count" in parsed) ||
      !("lastIncreaseAt" in parsed)
    ) {
      return emptyStreak;
    }

    const { count, lastIncreaseAt } = parsed;

    if (
      typeof count !== "number" ||
      !Number.isInteger(count) ||
      count < 1 ||
      typeof lastIncreaseAt !== "number" ||
      !Number.isFinite(lastIncreaseAt)
    ) {
      return emptyStreak;
    }

    const now = Date.now();

    if (
      now < lastIncreaseAt ||
      now >= lastIncreaseAt + STREAK_EXPIRY_MS
    ) {
      localStorage.removeItem(STREAK_KEY);
      return emptyStreak;
    }

    return {
      count,
      lastIncreaseAt,
    };
  } catch (error) {
    console.error("Failed to load streak:", error);
    return emptyStreak;
  }
}

export function increaseStreak(): boolean {
  try {
    const current = getStreak();
    const now = Date.now();

    if (
      current.lastIncreaseAt !== null &&
      now - current.lastIncreaseAt < STREAK_COOLDOWN_MS
    ) {
      return false;
    }

    const updated: StreakState = {
      count: current.count + 1,
      lastIncreaseAt: now,
    };

    localStorage.setItem(
      STREAK_KEY,
      JSON.stringify(updated)
    );

    window.dispatchEvent(
      new Event(STREAK_UPDATED_EVENT)
    );

    return true;
  } catch (error) {
    console.error("Failed to update streak:", error);
    return false;
  }
}
