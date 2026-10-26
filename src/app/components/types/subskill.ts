export type SubSkill = {
  id: string;
  skillId: string;
  name: string;
  icon: string;
  studied: boolean;
  parentSubSkillId: string | null;
  description: string;
  x: number;
  y: number;
};