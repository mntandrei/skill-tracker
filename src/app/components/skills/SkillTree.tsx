"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent } from "react";

import { Minus, Plus } from "lucide-react";

import type { Skill } from "@/app/components/types/skill";
import type { SubSkill } from "@/app/components/types/subskill";

import { skillIcons } from "./IconPicker";
import SubSkillNode from "./SubSkillNode";

type Point = {
  x: number;
  y: number;
};

type SkillTreeProps = {
  skill: Skill;
  subSkills: SubSkill[];
  onSelect: (id: string) => void;
  onCreateRoot: () => void;
  onPositionChange: (
    id: string,
    x: number,
    y: number
  ) => void;
};

const MIN_ZOOM = 50;
const MAX_ZOOM = 200;
const ZOOM_STEP = 10;
const ZOOM_STORAGE_KEY = "skillTreeZoom";

const NODE_SPACING = 170;
const LEVEL_SPACING = 165;
const FIRST_LEVEL_Y = 250;

const NODE_RADIUS = 40;
const ROOT_RADIUS = 56;
const EDGE_PADDING = NODE_RADIUS + 5;

function createLayout(subSkills: SubSkill[], viewportWidth: number) {
  const ids = new Set(
    subSkills.map((item) => item.id)
  );

  const childrenMap = new Map<string | null,SubSkill[]>();

  for (const item of subSkills) {
    const parentId =
      item.parentSubSkillId &&
      ids.has(item.parentSubSkillId) ? item.parentSubSkillId : null;

    const group = childrenMap.get(parentId) ?? [];

    group.push(item);
    childrenMap.set(parentId, group);
  }

  const roots = childrenMap.get(null) ?? [];
  function countLeaves(node: SubSkill, visited = new Set<string>()): number {
    if (visited.has(node.id)) return 1;

    const nextVisited = new Set(visited);
    nextVisited.add(node.id);

    const children = (
      childrenMap.get(node.id) ?? []
    ).filter(
      (child) => !nextVisited.has(child.id)
    );

    if (children.length === 0) return 1;

    return children.reduce(
      (total, child) =>
        total + countLeaves(child, nextVisited),
      0
    );
  }

  const leafCount = Math.max(
    1,
    roots.reduce(
      (total, node) =>
        total + countLeaves(node),
      0
    )
  );

  const width = Math.max(700, viewportWidth, leafCount * NODE_SPACING + 180);
  const startX = (width - leafCount * NODE_SPACING) / 2;
  const positions: Record<string, Point> = {};
  let nextLeaf = 0;

  function positionNode(
    node: SubSkill,
    depth: number,
    visited = new Set<string>()): number {
    const nextVisited = new Set(visited);
    nextVisited.add(node.id);

    const children = (
      childrenMap.get(node.id) ?? []
    ).filter(
      (child) => !nextVisited.has(child.id)
    );

    const childXs = children.map((child) =>
      positionNode(
        child,
        depth + 1,
        nextVisited
      )
    );

    const x =
      childXs.length > 0
        ? (
            childXs[0] +
            childXs[childXs.length - 1]
          ) / 2
        : startX +
          (nextLeaf++ + 0.5) * NODE_SPACING;

    positions[node.id] = {
      x,
      y: FIRST_LEVEL_Y + depth * LEVEL_SPACING,
    };

    return x;
  }

  roots.forEach((root) =>
    positionNode(root, 0)
  );

  return {
    width,
    positions,
  };
}

function lineBetween(from: Point, to: Point, fromRadius: number, toRadius: number) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;

  const distance = Math.hypot(dx, dy) || 1;

  const ux = dx / distance;
  const uy = dy / distance;

  return {
    x1: from.x + ux * fromRadius,
    y1: from.y + uy * fromRadius,
    x2: to.x - ux * toRadius,
    y2: to.y - uy * toRadius,
  };
}

export default function SkillTree({skill, subSkills, onSelect, onCreateRoot, onPositionChange}: SkillTreeProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(100);
  const [rootPosition, setRootPosition] = useState<Point | null>(null);
  const rootStorageKey = `skillTreeRootPosition:${skill.id}`;
  const rootDragRef = useRef<{
    pointerId: number;
    clientX: number;
    clientY: number;
    start: Point;
    current: Point;
    moved: boolean;
  } | null>(null);
  const rootWasDraggedRef = useRef(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const saved = localStorage.getItem(rootStorageKey);
        const value: unknown = saved ? JSON.parse(saved) : null;

        if (
          typeof value === "object" && value !== null &&
          "x" in value && "y" in value &&
          typeof value.x === "number" && typeof value.y === "number" &&
          Number.isFinite(value.x) && Number.isFinite(value.y) &&
          value.x >= ROOT_RADIUS + 5 && value.y >= ROOT_RADIUS + 5
        ) {
          setRootPosition({ x: value.x, y: value.y });
        } else {
          setRootPosition(null);
        }
      } catch {
        setRootPosition(null);
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [rootStorageKey]);
  const scale = zoom / 100;

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const saved = localStorage.getItem(ZOOM_STORAGE_KEY);
        const value = saved === null ? 100 : Number(saved);

        if (Number.isFinite(value) && value >= MIN_ZOOM && value <= MAX_ZOOM) {
          setZoom(Math.round(value / ZOOM_STEP) * ZOOM_STEP);
        }
      } catch {
        return;
      }
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  function changeZoom(direction: number) {
    const nextZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom + direction * ZOOM_STEP));
    setZoom(nextZoom);

    try {
      localStorage.setItem(ZOOM_STORAGE_KEY, String(nextZoom));
    } catch {
      return;
    }
  }

  const [viewportWidth, setViewportWidth] =
    useState(700);
  const [viewportHeight, setViewportHeight] = useState(0);

  const [dragPositions, setDragPositions] =
    useState<Record<string, Point>>({});

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) return;

    const updateWidth = () => {
      setViewportWidth(viewport.clientWidth);
      setViewportHeight(viewport.clientHeight);
    };

    updateWidth();

    const observer = new ResizeObserver(
      updateWidth
    );

    observer.observe(viewport);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setDragPositions({});
  }, [skill.id]);

  const layout = useMemo(
    () => createLayout(subSkills, viewportWidth),
    [subSkills, viewportWidth]
  );

  const positions: Record<string, Point> = {...layout.positions};

  for (const node of subSkills) {
    const hasSavedPosition =
      Number.isFinite(node.x) &&
      Number.isFinite(node.y) &&
      (node.x !== 0 || node.y !== 0);

    if (!hasSavedPosition) continue;

    const savedPositionIsValid =
      node.x >= EDGE_PADDING &&
      node.y >= EDGE_PADDING;

    if (savedPositionIsValid) {
      positions[node.id] = {
        x: node.x,
        y: node.y,
      };
    }
  }

  Object.assign(positions, dragPositions);
  const canvasWidth = Math.max(
    layout.width,
    viewportWidth / scale,
    rootPosition ? rootPosition.x + ROOT_RADIUS + 5 : 0,
    ...Object.values(positions).map((point) => point.x + EDGE_PADDING)
  );
  const canvasHeight = Math.max(
    650,
    viewportHeight / scale,
    rootPosition ? rootPosition.y + ROOT_RADIUS + 5 : 0,
    ...Object.values(positions).map((point) => point.y + 110)
  );

  const mainPosition: Point = rootPosition ?? {
    x: layout.width / 2,
    y: 90,
  };

  const selectedIcon = skillIcons.find(
    (icon) => icon.id === skill.icon
  );

  const MainIcon = selectedIcon?.Icon;

  function limitPosition(x: number, y: number, padding = EDGE_PADDING): Point {
    const viewport = viewportRef.current;

    if (!viewport) {
      return {
        x: Math.round(
          Math.max(
            padding,
            Math.min(
              x,
              canvasWidth - padding
            )
          )
        ),
        y: Math.round(
          Math.max(padding, y)
        ),
      };
    }

    const scrollLeft = viewport.scrollLeft / scale;
    const scrollTop = viewport.scrollTop / scale;

    const visibleWidth = viewport.clientWidth / scale;
    const visibleHeight = viewport.clientHeight / scale;

    const minX = scrollLeft + padding;
    const maxX = Math.max(
      minX,
      Math.min(
        canvasWidth - padding,
        scrollLeft +
          visibleWidth -
          padding
      )
    );

    const minY = scrollTop + padding;

    const maxY = Math.max(
      minY,
      Math.min(
        canvasHeight - padding,
        scrollTop +
          visibleHeight -
          padding
      )
    );

    return {
      x: Math.round(
        Math.max(minX, Math.min(x, maxX))
      ),
      y: Math.round(
        Math.max(minY, Math.min(y, maxY))
      ),
    };
  }

  function handleRootPointerDown(event: PointerEvent<HTMLButtonElement>) {
    if (event.button !== 0 || !event.isPrimary) return;

    rootWasDraggedRef.current = false;
    rootDragRef.current = {
      pointerId: event.pointerId,
      clientX: event.clientX,
      clientY: event.clientY,
      start: mainPosition,
      current: mainPosition,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handleRootPointerMove(event: PointerEvent<HTMLButtonElement>) {
    const drag = rootDragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const dx = event.clientX - drag.clientX;
    const dy = event.clientY - drag.clientY;
    if (!drag.moved && Math.hypot(dx, dy) < 5) return;

    drag.moved = true;
    rootWasDraggedRef.current = true;
    drag.current = limitPosition(
      drag.start.x + dx / scale,
      drag.start.y + dy / scale,
      ROOT_RADIUS + 5
    );
    setRootPosition(drag.current);
  }

  function handleRootPointerUp(event: PointerEvent<HTMLButtonElement>) {
    const drag = rootDragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    if (event.type !== "pointercancel") {
      handleRootPointerMove(event);
    }

    rootDragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (drag.moved) {
      try {
        localStorage.setItem(rootStorageKey, JSON.stringify(drag.current));
      } catch {
        return;
      }
    }
  }

  function handleMove( id: string, x: number,  y: number) {
    const position = limitPosition(x, y);

    setDragPositions((previous) => ({
      ...previous,
      [id]: position,
    }));
  }

  function handleDrop(id: string, x: number,  y: number) {
    const position = limitPosition(x, y);

    onPositionChange(id, position.x, position.y);
    setDragPositions((previous) => {
      const updated = { ...previous };
      delete updated[id];
      return updated;
    });
  }

  return (
    <div className="relative flex h-full min-h-[420px] w-full min-w-0 flex-1 flex-col md:min-h-0">
      <div className="absolute right-3 top-3 z-20 flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white/95 p-2 shadow-sm dark:border-zinc-700 dark:bg-zinc-800/95">
        <span aria-live="polite" aria-atomic="true" className="mr-1 text-xs font-medium tabular-nums text-zinc-500 dark:text-zinc-400">
          Zoom: {zoom}%
        </span>
        <button
          type="button"
          aria-label="Zoom out"
          title="Zoom out"
          disabled={zoom <= MIN_ZOOM}
          onClick={() => changeZoom(-1)}
          className="flex size-9 cursor-pointer items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-800 shadow-sm transition-colors hover:border-red-300 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-red-700 dark:hover:text-red-400">
          <Minus size={18} aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="Zoom in"
          title="Zoom in"
          disabled={zoom >= MAX_ZOOM}
          onClick={() => changeZoom(1)}
          className="flex size-9 cursor-pointer items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-800 shadow-sm transition-colors hover:border-red-300 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-red-700 dark:hover:text-red-400">
          <Plus size={18} aria-hidden="true" />
        </button>
      </div>
      <div ref={viewportRef} className="min-h-0 w-full min-w-0 flex-1 overflow-auto">
        <div
          className="relative mx-auto overflow-hidden"
          style={{ width: canvasWidth * scale, height: canvasHeight * scale }}>
          <div
            className="relative origin-top-left"
            style={{
              width: canvasWidth,
              height: canvasHeight,
              transform: `scale(${scale})`,
            }}>
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 text-zinc-400 dark:text-zinc-500"
          width={canvasWidth}
          height={canvasHeight}>
          {subSkills.map((node) => {
            const target = positions[node.id];

            if (!target) return null;

            const parent = node.parentSubSkillId
              ? positions[node.parentSubSkillId]
              : null;

            const source = parent ?? mainPosition;

            const line = lineBetween(
              source,
              target,
              parent ? NODE_RADIUS : ROOT_RADIUS,
              NODE_RADIUS
            );

            return (
              <line
                key={node.id}
                {...line}
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
              />
            );
          })}
        </svg>
        <button
          type="button"
          onPointerDown={handleRootPointerDown}
          onPointerMove={handleRootPointerMove}
          onPointerUp={handleRootPointerUp}
          onPointerCancel={handleRootPointerUp}
          onClick={() => {
            if (rootWasDraggedRef.current) {
              rootWasDraggedRef.current = false;
              return;
            }
            onCreateRoot();
          }}
          style={{
            left: mainPosition.x,
            top: mainPosition.y,
            transform: "translate(-50%, -50%)",
            touchAction: "none",
          }}
          className="absolute z-10 flex h-28 w-28 cursor-grab select-none flex-col items-center justify-center gap-2 rounded-full border-2 border-red-500/50 bg-red-500/10 p-3 text-center text-red-700 dark:text-red-400 active:cursor-grabbing">
          {MainIcon && (
            <MainIcon
              size={26}
              strokeWidth={1.8}
              className="shrink-0"/>
          )}
          <span className="line-clamp-2 max-w-full break-words text-sm font-semibold">
            {skill.name}
          </span>
        </button>
        {subSkills.map((node) => {
          const position = positions[node.id];
          if (!position) return null;
          return (
            <SubSkillNode
              key={node.id}
              subSkill={node}
              position={position}
              scale={scale}
              onSelect={onSelect}
              onMove={handleMove}
              onDrop={handleDrop}
            />
          );
        })}
          </div>
        </div>
      </div>
    </div>
  );
}
