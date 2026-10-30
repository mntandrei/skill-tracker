export type StreakState = {
  count: number;
  lastIncreaseAt: number | null;
  lastActivityAt: number | null;
};

export const STREAK_UPDATED_EVENT = "skill-tracker:streak-updated";
export const STREAK_COOLDOWN_MS = 24 * 60 * 60 * 1000;
export const STREAK_EXPIRY_MS = 48 * 60 * 60 * 1000;

function emptyStreak(): StreakState {
  return { count: 0, lastIncreaseAt: null, lastActivityAt: null };
}

function streakKey(skillId: string): string {
  return `skill-tracker:streak:${skillId}`;
}

export function getStreak(skillId: string): StreakState {
  if (typeof window === "undefined" || !skillId) return emptyStreak();

  try {
    const saved = localStorage.getItem(streakKey(skillId));
    if (!saved) return emptyStreak();

    const parsed: unknown = JSON.parse(saved);
    if (typeof parsed !== "object" || parsed === null ||
        !("count" in parsed) || !("lastIncreaseAt" in parsed)) {
      return emptyStreak();
    }

    const { count, lastIncreaseAt } = parsed;
    const lastActivityAt = "lastActivityAt" in parsed
      ? parsed.lastActivityAt
      : lastIncreaseAt;

    if (typeof count !== "number" || !Number.isInteger(count) || count < 1 ||
        typeof lastIncreaseAt !== "number" || !Number.isFinite(lastIncreaseAt) ||
        typeof lastActivityAt !== "number" || !Number.isFinite(lastActivityAt)) {
      return emptyStreak();
    }

    const latestActivityAt = Math.max(lastIncreaseAt, lastActivityAt);
    if (Date.now() - latestActivityAt >= STREAK_EXPIRY_MS) {
      return emptyStreak();
    }

    return { count, lastIncreaseAt, lastActivityAt: latestActivityAt };
  } catch (error) {
    console.error("Failed to load streak:", error);
    return emptyStreak();
  }
}

export function increaseStreak(skillId: string): boolean {
  if (typeof window === "undefined" || !skillId) return false;

  try {
    const current = getStreak(skillId);
    const now = Date.now();
    if (current.lastIncreaseAt !== null &&
        now - current.lastIncreaseAt < STREAK_COOLDOWN_MS) {
      if (current.lastActivityAt !== null && now > current.lastActivityAt) {
        const updated: StreakState = { ...current, lastActivityAt: now };
        localStorage.setItem(streakKey(skillId), JSON.stringify(updated));
        window.dispatchEvent(new Event(STREAK_UPDATED_EVENT));
      }
      return false;
    }

    const updated: StreakState = {
      count: current.count + 1,
      lastIncreaseAt: now,
      lastActivityAt: now,
    };

    localStorage.setItem(streakKey(skillId), JSON.stringify(updated));
    window.dispatchEvent(new Event(STREAK_UPDATED_EVENT));
    return true;
  } catch (error) {
    console.error("Failed to update streak:", error);
    return false;
  }
}

export function clearStreak(skillId: string): void {
  if (typeof window === "undefined" || !skillId) return;

  try {
    localStorage.removeItem(streakKey(skillId));
    window.dispatchEvent(new Event(STREAK_UPDATED_EVENT));
  } catch (error) {
    console.error("Failed to clear streak:", error);
  }
}
