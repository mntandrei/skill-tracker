"use client";

import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

import {
  getSkills,
  getSubSkills,
} from "@/app/components/lib/skills-storage";

import { skillIcons } from "@/app/components/skills/IconPicker";

import type { Skill } from "@/app/components/types/skill";
import type { SubSkill } from "@/app/components/types/subskill";

type SelectTabProps = {
  selectedSkillId: string;
  setSelectedSkillId: Dispatch<SetStateAction<string>>;
};

export default function SelectTab({
  selectedSkillId,
  setSelectedSkillId,
}: SelectTabProps) {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [subSkills, setSubSkills] = useState<SubSkill[]>([]);

  useEffect(() => {
    try {
      setSkills(getSkills());
      setSubSkills(getSubSkills());
    } catch (error) {
      console.error("Failed to load skills:", error);
    }
  }, []);

  const recommendedSkills = subSkills
    .filter(
      (subSkill) =>
        subSkill.skillId === selectedSkillId &&
        subSkill.studied === false
    )
    .slice(0, 3);

  return (
    <div className="min-h-0 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800 md:h-full">
      <h2 className="text-sm font-semibold text-zinc-900 dark:text-white">
        Select Skill
      </h2>

      <select
        aria-label="Select a skill"
        value={selectedSkillId}
        onChange={(e) => {
          const id = e.target.value;

          setSelectedSkillId(id);

          if (id) {
            localStorage.setItem("selectedSkillId", id);
          } else {
            localStorage.removeItem("selectedSkillId");
          }
        }}
        className="mt-2 h-11 w-full cursor-pointer rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-800 outline-none transition-colors focus:border-red-500 focus:ring-2 focus:ring-red-500/15 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
      >
        <option value="">Choose a skill</option>

        {skills.map((skill) => (
          <option key={skill.id} value={skill.id}>
            {skill.name}
          </option>
        ))}
      </select>

      <div className="mt-5">
        <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
          Recommended Skills
        </h3>

        {recommendedSkills.length > 0 ? (
          <div className="mt-3 grid grid-cols-3 gap-2">
            {recommendedSkills.map((subSkill) => {
              const selectedIcon = skillIcons.find(
                (icon) => icon.id === subSkill.icon
              );

              const Icon = selectedIcon?.Icon;
              return (
                <div
                  key={subSkill.id}
                  title={subSkill.name}
                  className="relative flex min-w-0 flex-col items-start justify-between gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-900">
                  <span
                    title="Not learned yet"
                    className="absolute right-3 top-3 size-1.5 rounded-full bg-red-500"/>

                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-950/50 dark:text-red-400">
                    {Icon && (
                      <Icon size={19} strokeWidth={1.8} />
                    )}
                  </div>

                  <span className="w-full truncate text-left text-xs font-semibold text-zinc-800 dark:text-zinc-200 sm:text-sm">
                    {subSkill.name}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mt-3 flex min-h-24 items-center justify-center rounded-xl border border-dashed border-zinc-200 bg-zinc-50 px-4 text-center dark:border-zinc-700 dark:bg-zinc-900">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Add a skill to appear recommendation
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
