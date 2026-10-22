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
    <div className="min-h-40 rounded-2xl bg-white p-4">
      <h2 className="text-sm font-medium text-zinc-900">
        Select Skill
      </h2>
      <select
        aria-label="Select a skill"
        value={selectedSkill}
        onChange={(e) => setSelectedSkill(e.target.value)}
        className="mt-2 w-full rounded-xl border border-transparent bg-zinc-100 px-3 py-2.5 text-sm text-zinc-700 outline-none transition-colors focus:border-red-500 focus:ring-2 focus:ring-red-500/20">
        <option value="">Choose a skill</option>
        {skills.map((skill) => (
          <option key={skill} value={skill.toLowerCase()}>
            {skill}
          </option>
        ))}
      </select>
      {selectedSkill && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-zinc-500">
            Recommended Skills
          </h3>
          <p className="mt-2 text-sm text-zinc-700">
            {recommendedSkills.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}
