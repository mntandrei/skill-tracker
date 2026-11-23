import type { Skill } from "../types/skill";
import type { SubSkill } from "../types/subskill";

export const MAX_SKILLS = 30;

export function moveSkill(skills: Skill[], sourceId: string, targetId: string): Skill[] {
  const from = skills.findIndex((skill) => skill.id === sourceId);
  const to = skills.findIndex((skill) => skill.id === targetId);
  if (from < 0 || to < 0 || from === to) return skills;

  const ordered = [...skills];
  const [moved] = ordered.splice(from, 1);
  ordered.splice(to, 0, moved);
  return ordered;
}

export function removeSubSkillTree(subSkills: SubSkill[], rootId: string): SubSkill[] {
  const root = subSkills.find((item) => item.id === rootId);
  if (!root) return subSkills;

  const idsToDelete = new Set<string>([rootId]);
  let changed = true;

  while (changed) {
    changed = false;
    for (const item of subSkills) {
      if (item.skillId === root.skillId &&
          item.parentSubSkillId !== null &&
          idsToDelete.has(item.parentSubSkillId) &&
          !idsToDelete.has(item.id)) {
        idsToDelete.add(item.id);
        changed = true;
      }
    }
  }

  return subSkills.filter((item) =>
    item.skillId !== root.skillId || !idsToDelete.has(item.id)
  );
}

export function getSkillProgress(subSkills: SubSkill[], skillId: string): number {
  const matching = subSkills.filter((item) => item.skillId === skillId);
  if (matching.length === 0) return 0;
  return (matching.filter((item) => item.studied).length / matching.length) * 100;
}

export function getRecommendedSubSkills(
  subSkills: SubSkill[],
  skillId: string,
  limit = 3
): SubSkill[] {
  return subSkills
    .filter((item) => item.skillId === skillId && !item.studied)
    .slice(0, Math.max(0, limit));
}
