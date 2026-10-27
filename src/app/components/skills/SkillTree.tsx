"use client";

import { useEffect, useRef, useState } from "react";
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

const NODE_SPACING = 170;
const LEVEL_SPACING = 165;
const FIRST_LEVEL_Y = 250;

function createLayout(
  subSkills: SubSkill[],
  viewportWidth: number
) {
  const ids = new Set(subSkills.map((item) => item.id));

  const childrenMap = new Map<string | null, SubSkill[]>();

  for (const item of subSkills) {
    const parentId =
      item.parentSubSkillId &&
      ids.has(item.parentSubSkillId)
        ? item.parentSubSkillId
        : null;

    const group = childrenMap.get(parentId) ?? [];

    group.push(item);
    childrenMap.set(parentId, group);
  }

  const roots = childrenMap.get(null) ?? [];

  function countLeaves( node: SubSkill, visited = new Set<string>()): number {
    if (visited.has(node.id)) return 1;

    const nextVisited = new Set(visited);
    nextVisited.add(node.id);

    const children = (childrenMap.get(node.id) ?? []).filter(
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
      (total, node) => total + countLeaves(node),
      0
    )
  );

  const width = Math.max(700, viewportWidth, leafCount * NODE_SPACING + 180
  );

  const startX = (width - leafCount * NODE_SPACING) / 2;
  const positions: Record<string, Point> = {};
  let nextLeaf = 0;

  function positionNode(node: SubSkill, depth: number, visited = new Set<string>()): number {
    const nextVisited = new Set(visited);
    nextVisited.add(node.id);

    const children = (childrenMap.get(node.id) ?? []).filter(
      (child) => !nextVisited.has(child.id)
    );

    const childXs = children.map((child) =>
      positionNode(child, depth + 1, nextVisited)
    );

    const x =
      childXs.length > 0
        ? (childXs[0] + childXs[childXs.length - 1]) / 2
        : startX + (nextLeaf++ + 0.5) * NODE_SPACING;

    positions[node.id] = {
      x,
      y: FIRST_LEVEL_Y + depth * LEVEL_SPACING,
    };

    return x;
  }

  roots.forEach((root) => positionNode(root, 0));

  return { width, positions };
}

function lineBetween(
  from: Point,
  to: Point,
  fromRadius: number,
  toRadius: number
) {
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
  const [viewportWidth, setViewportWidth] = useState(700);
  const [dragPositions, setDragPositions] = useState<
    Record<string, Point>
  >({});

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const updateWidth = () => {
      setViewportWidth(viewport.clientWidth);
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(viewport);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setDragPositions({});
  }, [skill.id]);

  const layout = createLayout(
    subSkills,
    viewportWidth
  );

  const positions: Record<string, Point> = {
    ...layout.positions,
  };

  for (const node of subSkills) {
    if (
      Number.isFinite(node.x) &&
      Number.isFinite(node.y) &&
      (node.x !== 0 || node.y !== 0)
    ) {
      positions[node.id] = {
        x: node.x,
        y: node.y,
      };
    }
  }

  Object.assign(positions, dragPositions);

  const canvasWidth = Math.max(
    layout.width,
    ...Object.values(positions).map(
      (point) => point.x + 100
    )
  );

  const canvasHeight = Math.max(520,...Object.values(positions).map((point) => point.y + 100));
  const mainPosition: Point = {x: layout.width / 2,y: 90,};
  const selectedIcon = skillIcons.find((icon) => icon.id === skill.icon);
  const MainIcon = selectedIcon?.Icon;

  function handleMove(id: string,x: number,y: number) {setDragPositions((previous) => ({...previous,[id]: {
        x: Math.max(45, Math.round(x)),
        y: Math.max(45, Math.round(y)),
      },
    }));
  }

  function handleDrop(id: string,x: number, y: number) {
    const nextX = Math.max(45, Math.round(x));
    const nextY = Math.max(45, Math.round(y));

    onPositionChange(id, nextX, nextY);

    setDragPositions((previous) => {const updated = { ...previous };
        delete updated[id];
        return updated;
    });
  }

  return (
    <div
      ref={viewportRef}
      className="h-full min-h-[450px] w-full min-w-0 overflow-auto">
      <div
        className="relative"
        style={{width: canvasWidth, height: canvasHeight,}}>
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 text-zinc-400 dark:text-zinc-500"
          width={canvasWidth}
          height={canvasHeight}>
          {subSkills.map((node) => {
            const target = positions[node.id];
            if (!target) return null;

            const parent = node.parentSubSkillId ? positions[node.parentSubSkillId] : null;
            const source = parent ?? mainPosition;
            const line = lineBetween(source, target, parent ? 40 : 56, 40);
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
          onClick={onCreateRoot}
          style={{
            left: mainPosition.x,
            top: mainPosition.y,
            transform: "translate(-50%, -50%)",
          }}
          className="absolute z-10 flex h-28 w-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-full border-2 border-red-500/50 bg-red-500/10 p-3 text-center text-red-700 dark:text-red-400">
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
        {subSkills.map((node) => {const position = positions[node.id];
          if (!position) return null;

          return (
            <SubSkillNode
              key={node.id}
              subSkill={node}
              position={position}
              onSelect={onSelect}
              onMove={handleMove}
              onDrop={handleDrop}/>
          );
        })}
      </div>
    </div>
  );
}
