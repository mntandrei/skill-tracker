"use client";

import { useRef } from "react";
import type { PointerEvent } from "react";
import type { SubSkill } from "@/app/components/types/subskill";
import { skillIcons } from "./IconPicker";

type Point = {
  x: number;
  y: number;
};

type SubSkillNodeProps = {
  subSkill: SubSkill;
  position: Point;
  onSelect: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void;
  onDrop: (id: string, x: number, y: number) => void;
};

type DragInfo = {
  pointerId: number;
  startClientX: number;
  startClientY: number;
  startX: number;
  startY: number;
  moved: boolean;
};

export default function SubSkillNode({subSkill, position, onSelect, onMove, onDrop,}: SubSkillNodeProps) {
  const dragRef = useRef<DragInfo | null>(null);
  const wasDraggedRef = useRef(false);

  const selectedIcon = skillIcons.find(
    (icon) => icon.id === subSkill.icon
  );

  const Icon = selectedIcon?.Icon;

  function handlePointerDown(event: PointerEvent<HTMLButtonElement>) {
    if (event.button !== 0 || !event.isPrimary) return;

    wasDraggedRef.current = false;

    dragRef.current = {
      pointerId: event.pointerId,
      startClientX: event.clientX,
      startClientY: event.clientY,
      startX: position.x,
      startY: position.y,
      moved: false,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLButtonElement>) {
    const drag = dragRef.current;

    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }

    const dx = event.clientX - drag.startClientX;
    const dy = event.clientY - drag.startClientY;

    if (!drag.moved && Math.hypot(dx, dy) < 5) {
      return;
    }

    drag.moved = true;
    wasDraggedRef.current = true;

    onMove(subSkill.id, drag.startX + dx, drag.startY + dy);
  }

  function handlePointerUp(event: PointerEvent<HTMLButtonElement>) {
    const drag = dragRef.current;

    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }

    if (drag.moved) {
      const dx = event.clientX - drag.startClientX;
      const dy = event.clientY - drag.startClientY;

      onDrop( subSkill.id, drag.startX + dx, drag.startY + dy);
    }

    dragRef.current = null;
  }

  return (
    <button
      type="button"
      title={`${subSkill.name} - Click to open, drag to move`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClick={() => {
        if (wasDraggedRef.current) {
          wasDraggedRef.current = false;
          return;
        }
        onSelect(subSkill.id);
      }}
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
        touchAction: "none",
      }}
      className={`absolute z-10 flex h-20 w-20 cursor-grab select-none flex-col items-center justify-center gap-1 rounded-full border-2 p-2 text-center active:cursor-grabbing ${
        subSkill.studied
          ? "border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-400"
          : "border-red-500/50 bg-red-500/10 text-red-700 dark:text-red-400"
      }`}>
      {Icon && (
        <Icon
          size={21}
          strokeWidth={1.8}
          className="shrink-0"/>
      )}
      <span className="line-clamp-2 max-w-full break-words text-xs font-medium">
        {subSkill.name}
      </span>
    </button>
  );
}
