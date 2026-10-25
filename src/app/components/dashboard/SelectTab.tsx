"use client";
import { useState, useEffect } from "react";
import { getSkills } from "@/app/components/lib/skills-storage";
import type { Skill } from "@/app/components/types/skill";

export default function SelectTab() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkillId, setSelectedSkillId] = useState<string>("");
  useEffect(() => {
    try {
      const savedSkills = getSkills();
      setSkills(savedSkills);
    } catch (error) {
      console.error("Failed to fetch skills:", error);
    }
  }, []);

  return (
    <div className="min-h-40 rounded-2xl bg-white p-4 dark:bg-zinc-800">
      <h2 className="text-sm font-medium text-zinc-900 dark:text-white">
        Select Skill
      </h2>
      <select
        aria-label="Select a skill"
        onChange={(e) => setSelectedSkillId(e.target.value)}
        value={selectedSkillId}
        defaultValue=""
        className="mt-2 w-full rounded-xl border border-transparent bg-zinc-100 px-3 py-2.5 text-sm text-zinc-700 outline-none transition-colors focus:border-red-500 focus:ring-2 focus:ring-red-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:focus:border-red-500">
        <option value="">Choose a skill</option>
        {skills.map((skill) => (
          <option key={skill.id} value={skill.id}>
            {skill.name}
          </option>
        ))}
      </select>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          Recommended Skills
          {selectedSkillId && (
            <span className="ml-2 text-zinc-400">
              
            </span>
          )}
        </h3>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-200"></p>
      </div>
    </div>
  );
}