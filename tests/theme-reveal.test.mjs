import test from "node:test";
import assert from "node:assert/strict";
import { getThemeRevealMetrics } from "../src/app/components/ui/theme-reveal.ts";

const viewports = [
  { width: 390, height: 844, zoom: 1, rect: { left: 310, top: 18, width: 44, height: 44 } },
  { width: 1440, height: 900, zoom: 1, rect: { left: 1120, top: 30, width: 40, height: 40 } },
  { width: 1920, height: 1080, zoom: 1.25, rect: { left: 1420, top: 37.5, width: 50, height: 50 } },
  { width: 2560, height: 1440, zoom: 1.25, rect: { left: 1740, top: 37.5, width: 50, height: 50 } },
];

for (const { width, height, zoom, rect } of viewports) {
  test("theme reveal starts at button center and covers " + width + "px viewport", () => {
    const result = getThemeRevealMetrics(rect, { width, height }, zoom);
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    assert.equal(result.x * zoom, centerX);
    assert.equal(result.y * zoom, centerY);

    for (const [cornerX, cornerY] of [[0, 0], [width, 0], [0, height], [width, height]]) {
      assert.ok(
        Math.hypot(cornerX - centerX, cornerY - centerY) < result.radius * zoom
      );
    }
  });
}

test("invalid zoom falls back to an unscaled reveal", () => {
  const rect = { left: 100, top: 20, width: 40, height: 40 };
  const expected = getThemeRevealMetrics(rect, { width: 390, height: 844 }, 1);

  assert.deepEqual(getThemeRevealMetrics(rect, { width: 390, height: 844 }, NaN), expected);
  assert.deepEqual(getThemeRevealMetrics(rect, { width: 390, height: 844 }, 0), expected);
});
