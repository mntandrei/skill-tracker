'use client';
import {useState } from 'react';

export default function SelectTab() {
  const [selectskill, setSelectSkill] = useState<string>("");
  const skill = ["Web Development"]
  const recommendedSkills = ["JavaScript", "React", "Next.js", "Angular", "TypeScript","etc.."];

  return (
    <div className="min-h-52 rounded-xl border border-gray-200 border-l-4 border-l-red-400 bg-white p-5 shadow-sm ">
      <h2 className="text-xl font-semibold">Select Skill</h2>
      <select className="mt-3 w-full rounded border border-gray-300 p-2" onChange={(e) => setSelectSkill(e.target.value)} >
        <option value="">Select a skill</option>
        {skill.map((skill) => (
          <option key={skill} value={skill.toLowerCase()}>
            {skill}
          </option>
        ))}
      </select>
      <div>
        <p className="mt-3 text-gray-500">Recommended skill</p>
        {selectskill && <p className="mt-1 text-gray-700">{recommendedSkills.join(", ")}</p>}
      </div>
    </div>
  );
}
