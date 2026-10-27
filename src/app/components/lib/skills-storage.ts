import type { Skill } from "../types/skill";
import type { SubSkill } from "../types/subskill";

export const SKILLS_UPDATED_EVENT = "skill-tracker:skills-updated";

function notifySkillsUpdated(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(SKILLS_UPDATED_EVENT));
  }
}

export function getSkills(): Skill[] {
  const savedSkills = localStorage.getItem("skills");

  if (!savedSkills) return [];

  const skills: unknown = JSON.parse(savedSkills);

  if (!Array.isArray(skills) || !skills.every((skill) => 
        skill !== null &&
        typeof skill === "object" &&
        typeof skill.id === "string" &&
        typeof skill.name === "string" &&
        typeof skill.icon === "string")) {

    throw new Error("Invalid skills data");
  }
  return skills as Skill[];
}
export function saveSkills(skills: Skill[]): void {
  localStorage.setItem("skills", JSON.stringify(skills));
  notifySkillsUpdated();
}

export function getSubSkills (): SubSkill[] {
  const savedSubSkills = localStorage.getItem("subSkills");

  if (!savedSubSkills) return [];

  const subSkills: unknown = JSON.parse(savedSubSkills);

  if (!Array.isArray(subSkills) || !subSkills.every((subSkill) => 
        subSkill !== null &&
        typeof subSkill === "object" &&
        typeof subSkill.id === "string" &&
        typeof subSkill.skillId === "string" &&
        typeof subSkill.name === "string" &&
        typeof subSkill.icon === "string" &&
        typeof subSkill.studied === "boolean")) {

    throw new Error("Invalid subSkills data");
  }
  return subSkills as SubSkill[];
}
export function saveSubSkills(subSkills: SubSkill[]): void {
  localStorage.setItem("subSkills", JSON.stringify(subSkills));
  notifySkillsUpdated();
}