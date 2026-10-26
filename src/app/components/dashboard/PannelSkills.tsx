"use client";

import { useState, useEffect } from "react";
import SelectTab from "./SelectTab";
import StreakTab from "./StreakTab";
import ProgressTab from "./ProgressTab";
import type { SubSkill } from "../types/SubSkill";
import { getSubSkills } from "@/app/components/lib/skills-storage";

export default function PannelSkills() {
  const [selectedSkillId, setSelectedSkillId] = useState<string>("");
  const [subSkills, setSubSkills] = useState<SubSkill[]>([]);

  useEffect(() => {
    try {
      const savedSubSkills = getSubSkills();
      setSubSkills(savedSubSkills);
    } catch (error) {
      console.error("Failed to fetch subskills:", error);
    }
  }, []);

  useEffect(() => {
    const savedId = localStorage.getItem("selectedSkillId");
    if (savedId) {
      setSelectedSkillId(savedId);
    }
}, []);

  const skillSubSkills = subSkills.filter((subSkill) => 
    subSkill.skillId === selectedSkillId
  );

  const studied = skillSubSkills.filter((subSkill) => subSkill.studied === true);
  const progress = skillSubSkills.length > 0 ? (studied.length / skillSubSkills.length) * 100 : 0;

  return (
    <section className="mx-auto mt-4 grid w-[calc(100%-2rem)] max-w-4xl grid-cols-1 gap-3 rounded-3xl border border-zinc-200 bg-zinc-100 p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:mt-5 sm:gap-4 sm:p-5 md:min-h-[535px] md:grid-cols-2 md:grid-rows-[auto_minmax(0,1fr)_auto] lg:h-[535px]">
      <div className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 md:col-span-2">
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">
          Dashboard
        </h1>
      </div>
      <SelectTab selectedSkillId={selectedSkillId} setSelectedSkillId={setSelectedSkillId}/>
      <StreakTab />
      <div className="md:col-span-2">
        <ProgressTab progress={progress} />
      </div>
    </section>
  );
}
