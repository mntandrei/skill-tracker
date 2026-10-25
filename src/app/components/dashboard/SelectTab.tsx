"use client";

import { useState } from "react";

export default function SelectTab() {
  const [selectedSkill, setSelectedSkill] = useState<string>("");

  const skills = ["Ex: Web Development"];
  const recommendedSkills = [
    "JavaScript",
    "React",
    "Next.js",
    "Angular",
    "TypeScript",
  ];

  return (
    <div className="min-h-40 rounded-2xl bg-white p-4 dark:bg-zinc-800 min-[1800px]:p-7">
      <h2 className="text-sm font-medium text-zinc-900 min-[1800px]:text-base dark:text-white">
        Select Skill
      </h2>
      <select
        aria-label="Select a skill"
        value={selectedSkill}
        onChange={(e) => setSelectedSkill(e.target.value)}
        className="mt-2 w-full rounded-xl border border-transparent bg-zinc-100 px-3 py-2.5 text-sm text-zinc-700 outline-none transition-colors focus:border-red-500 focus:ring-2 focus:ring-red-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:focus:border-red-500 min-[1800px]:py-3.5 min-[1800px]:text-base">
        <option value="">Choose a skill</option>
        {skills.map((skill) => (
          <option key={skill} value={skill.toLowerCase()}>
            {skill}
          </option>
        ))}
      </select>
      {selectedSkill && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-zinc-500 min-[1800px]:text-base dark:text-zinc-400">
            Recommended Skills
          </h3>
          <p className="mt-2 text-sm text-zinc-700 min-[1800px]:text-base dark:text-zinc-200">
            {recommendedSkills.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}
