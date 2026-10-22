"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { skillIcons } from "./IconPicker";

type Skill = {
  id: string;
  name: string;
  icon: string;
};

export default function CreateSkillModal() {
  const [isOpen, setIsOpen] = useState(true);
  if (!isOpen) return null;
  
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const skillName = formData.get("skill-name");

    if (typeof skillName === "string" && skillName.trim() !== "") {
      const newSkill: Skill = {
        id: crypto.randomUUID(),
        name: skillName.trim(),
        icon: "",
      };
      console.log(newSkill);
    }
  };

  const categories = [...new Set(skillIcons.map((icon) => icon.category))];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 p-4">
      <div className="relative max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-7 shadow-2xl">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-2xl text-red-700 transition-transform duration-300 hover:scale-110">
            +
          </div>
          <h2 className="text-2xl font-bold text-zinc-900 transition-transform duration-300 hover:scale-103">
            Create your first skill
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            Start tracking your learning journey.
          </p>
        </div>
        <div className="space-y-4">
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="skill-name"
                className="text-sm font-medium text-zinc-700">
                Skill name
              </label>
              <input
                name="skill-name"
                id="skill-name"
                type="text"
                placeholder="e.g. JavaScript"
                className="mt-2 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"/>
            </div>
            <details className="group mt-4">
              <summary className="flex w-full cursor-pointer list-none items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-700 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-700 [&::-webkit-details-marker]:hidden">
                <span className="text-lg leading-none">+</span>
                Select Icon
                <ChevronDown
                  size={16}
                  className="transition-transform duration-200 group-open:rotate-180"/>
              </summary>
              <div className="mt-3 max-h-56 space-y-2 overflow-y-auto rounded-xl border border-zinc-200 bg-zinc-50 p-3">
                {categories.map((category) => (
                  <details
                    key={category}
                    className="group/category rounded-lg border border-zinc-200 bg-white">
                    <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:text-red-700 [&::-webkit-details-marker]:hidden">
                      {category}
                      <ChevronDown
                        size={16}
                        className="text-zinc-400 transition-transform duration-200 group-open/category:rotate-180"/>
                    </summary>
                    <div className="grid grid-cols-5 gap-2 border-t border-zinc-100 p-3 sm:grid-cols-6">
                      {skillIcons
                        .filter((icon) => icon.category === category)
                        .map(({ id, Icon }) => (
                          <div
                            key={id}
                            title={id}
                            className="flex aspect-square items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-600 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-700">
                            <Icon size={21} strokeWidth={1.8} />
                          </div>
                        ))}
                    </div>
                  </details>
                ))}
              </div>
            </details>
            <button
              type="submit"
              className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-700 py-3 font-medium text-white transition-all hover:scale-102 hover:bg-red-800">
              <span className="text-lg leading-none">+</span>
              Create Skill
            </button>
          </form>
          <button
            type="button"
            aria-label="Close modal"
            className="absolute right-3 top-1 text-2xl text-zinc-400 transition-all duration-300 hover:scale-120 hover:text-red-700"
            onClick={() => setIsOpen(false)}>
            &times;
          </button>
        </div>
      </div>
    </div>
  );
}
