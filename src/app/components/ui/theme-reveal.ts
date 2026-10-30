type ThemeButtonRect = Pick<DOMRect, "left" | "top" | "width" | "height">;

type ThemeViewport = {
  width: number;
  height: number;
};

export function getThemeRevealMetrics(
  rect: ThemeButtonRect,
  viewport: ThemeViewport,
  zoom: number
) {
  const scale = Number.isFinite(zoom) && zoom > 0 ? zoom : 1;
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const farthestX = Math.max(centerX, viewport.width - centerX);
  const farthestY = Math.max(centerY, viewport.height - centerY);

  return {
    x: centerX / scale,
    y: centerY / scale,
    radius: (Math.hypot(farthestX, farthestY) + 24) / scale,
  };
}
