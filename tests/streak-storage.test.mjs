import test from "node:test";
import assert from "node:assert/strict";
import {
  clearStreak,
  getStreak,
  increaseStreak,
  STREAK_COOLDOWN_MS,
  STREAK_EXPIRY_MS,
} from "../src/app/components/lib/streak-storage.ts";

const data = new Map();
let updates = 0;

globalThis.window = { dispatchEvent() { updates += 1; } };
globalThis.localStorage = {
  getItem: (key) => data.get(key) ?? null,
  setItem: (key, value) => data.set(key, value),
  removeItem: (key) => data.delete(key),
};

function withClock(callback) {
  data.clear();
  updates = 0;
  const originalNow = Date.now;
  const clock = { now: 1_000_000_000 };
  Date.now = () => clock.now;
  try {
    callback(clock);
  } finally {
    Date.now = originalNow;
  }
}

test("streaks are independent and cannot increase twice during a 24-hour cooldown", () => {
  withClock((clock) => {
    assert.equal(increaseStreak("react"), true);
    assert.equal(increaseStreak("css"), true);
    assert.equal(increaseStreak("react"), false);
    assert.equal(getStreak("react").count, 1);
    clock.now += STREAK_COOLDOWN_MS;
    assert.equal(increaseStreak("react"), true);
    assert.equal(getStreak("react").count, 2);
    assert.equal(getStreak("css").count, 1);
  });
});

test("a streak of two survives a reload and a return within 24 hours", () => {
  withClock((clock) => {
    increaseStreak("react");
    clock.now += STREAK_COOLDOWN_MS;
    increaseStreak("react");
    clock.now += STREAK_COOLDOWN_MS - 1_000;
    assert.equal(getStreak("react").count, 2);
    assert.equal(increaseStreak("react"), false);
    assert.equal(getStreak("react").count, 2);
  });
});

test("learning during cooldown protects the streak without double-counting", () => {
  withClock((clock) => {
    increaseStreak("react");
    clock.now += STREAK_COOLDOWN_MS;
    increaseStreak("react");
    const previousIncreaseAt = getStreak("react").lastIncreaseAt;
    clock.now += STREAK_COOLDOWN_MS - 1_000;
    assert.equal(increaseStreak("react"), false);
    assert.equal(getStreak("react").lastIncreaseAt, previousIncreaseAt);
    const activityAt = getStreak("react").lastActivityAt;
    assert.equal(activityAt, clock.now);
    clock.now += STREAK_COOLDOWN_MS + 1_000;
    assert.equal(getStreak("react").count, 2);
    assert.equal(increaseStreak("react"), true);
    assert.equal(getStreak("react").count, 3);
    assert.equal(updates, 4);
  });
});

test("streak expires exactly 48 hours after the last learning activity", () => {
  withClock((clock) => {
    increaseStreak("react");
    clock.now += STREAK_EXPIRY_MS - 1;
    assert.equal(getStreak("react").count, 1);
    clock.now += 1;
    assert.equal(getStreak("react").count, 0);
    assert.equal(data.has("skill-tracker:streak:react"), true);
    assert.equal(increaseStreak("react"), true);
    assert.equal(getStreak("react").count, 1);
  });
});

test("clock changes backwards do not erase a stored streak", () => {
  withClock((clock) => {
    increaseStreak("react");
    clock.now += STREAK_COOLDOWN_MS;
    increaseStreak("react");
    clock.now -= 2 * STREAK_COOLDOWN_MS;
    assert.equal(getStreak("react").count, 2);
    assert.equal(increaseStreak("react"), false);
    assert.equal(getStreak("react").count, 2);
    assert.equal(data.has("skill-tracker:streak:react"), true);
    clock.now += 2 * STREAK_COOLDOWN_MS;
    assert.equal(getStreak("react").count, 2);
  });
});

test("older saved streaks remain compatible", () => {
  withClock((clock) => {
    const lastIncreaseAt = clock.now - STREAK_COOLDOWN_MS / 2;
    data.set("skill-tracker:streak:react", JSON.stringify({ count: 2, lastIncreaseAt }));
    assert.deepEqual(getStreak("react"), {
      count: 2,
      lastIncreaseAt,
      lastActivityAt: lastIncreaseAt,
    });
    assert.equal(increaseStreak("react"), false);
    assert.equal(getStreak("react").count, 2);
  });
});

test("clearing one streak does not affect other skills", () => {
  withClock(() => {
    increaseStreak("react");
    increaseStreak("css");
    clearStreak("react");
    assert.equal(getStreak("react").count, 0);
    assert.equal(getStreak("css").count, 1);
  });
});
