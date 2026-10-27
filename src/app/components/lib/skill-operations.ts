import type { SubSkill } from "../types/subskill";

export function removeSubSkillTree(subSkills: SubSkill[], rootId: string): SubSkill[] {
  const idsToDelete = new Set<string>([rootId]);
  let changed = true;

  while (changed) {
    changed = false;
    for (const item of subSkills) {
      if (item.parentSubSkillId !== null &&
          idsToDelete.has(item.parentSubSkillId) &&
          !idsToDelete.has(item.id)) {
        idsToDelete.add(item.id);
        changed = true;
      }
    }
  }

  return subSkills.filter((item) => !idsToDelete.has(item.id));
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
