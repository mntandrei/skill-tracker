import type { Skill } from "../types/skill";
import type { SubSkill } from "../types/subskill";

export const SKILLS_UPDATED_EVENT = "skill-tracker:skills-updated";

function notifySkillsUpdated(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(SKILLS_UPDATED_EVENT));
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readArray(key: string): unknown[] {
  if (typeof window === "undefined") return [];

  try {
    const saved = localStorage.getItem(key);
    if (!saved) return [];

    const parsed: unknown = JSON.parse(saved);
    if (!Array.isArray(parsed)) {
      console.warn(`Invalid ${key} data: expected an array`);
      return [];
    }

    return parsed;
  } catch (error) {
    console.error(`Failed to read ${key}:`, error);
    return [];
  }
}

export function getSkills(): Skill[] {
  return readArray("skills").flatMap((value): Skill[] => {
    if (!isRecord(value) ||
        typeof value.id !== "string" || !value.id.trim() ||
        typeof value.name !== "string" || !value.name.trim() ||
        typeof value.icon !== "string" || !value.icon.trim()) {
      return [];
    }

    return [{
      id: value.id,
      name: value.name,
      icon: value.icon,
      ...(typeof value.description === "string"
        ? { description: value.description }
        : {}),
    }];
  });
}

export function getSubSkills(): SubSkill[] {
  return readArray("subSkills").flatMap((value): SubSkill[] => {
    if (!isRecord(value) ||
        typeof value.id !== "string" || !value.id.trim() ||
        typeof value.skillId !== "string" || !value.skillId.trim() ||
        typeof value.name !== "string" || !value.name.trim() ||
        typeof value.icon !== "string" || !value.icon.trim() ||
        typeof value.studied !== "boolean") {
      return [];
    }

    const parentSubSkillId =
      typeof value.parentSubSkillId === "string" &&
      value.parentSubSkillId !== value.id
        ? value.parentSubSkillId
        : null;

    return [{
      id: value.id,
      skillId: value.skillId,
      name: value.name,
      icon: value.icon,
      studied: value.studied,
      parentSubSkillId,
      description: typeof value.description === "string" ? value.description : "",
      x: typeof value.x === "number" && Number.isFinite(value.x) ? value.x : 0,
      y: typeof value.y === "number" && Number.isFinite(value.y) ? value.y : 0,
    }];
  });
}

function writeArray(key: string, items: Skill[] | SubSkill[]): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(key, JSON.stringify(items));
    notifySkillsUpdated();
  } catch (error) {
    console.error(`Failed to save ${key}:`, error);
  }
}

export function saveSkills(skills: Skill[]): void {
  writeArray("skills", skills);
}

export function saveSubSkills(subSkills: SubSkill[]): void {
  writeArray("subSkills", subSkills);
}
