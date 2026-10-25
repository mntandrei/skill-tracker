import type { Skill } from "../types/skill";

export function getSkills(): Skill[] {
  const savedSkills = localStorage.getItem("skills");

  if (!savedSkills) return [];

  const skills: unknown = JSON.parse(savedSkills);

  if (
    !Array.isArray(skills) ||
    !skills.every(
      (skill) =>
        skill !== null &&
        typeof skill === "object" &&
        typeof skill.id === "string" &&
        typeof skill.name === "string" &&
        typeof skill.icon === "string"
    )
  ) {
    throw new Error("Invalid skills data");
  }

  return skills as Skill[];
}

export function saveSkills(skills: Skill[]): void {
  localStorage.setItem("skills", JSON.stringify(skills));
}
