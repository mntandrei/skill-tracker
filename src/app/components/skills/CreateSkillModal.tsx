"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { skillIcons } from "./IconPicker";

type Skill = {
  id: string;
  name: string;
  icon: string;
};

type CreateSkillModalProps = {
  onClose: () => void;
  onCreate: (skill: Skill) => void;
};

export default function CreateSkillModal({onClose, onCreate}: CreateSkillModalProps) {
  const [selectedIcon, setSelectedIcon] = useState<string>("");
  const [iconError, setIconError] = useState<boolean>(false);
  const [nameError, setNameError] = useState<boolean>(false);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const skillName = formData.get("skill-name");

    const isNameInvalid = typeof skillName !== "string" || skillName.trim() === "";
    const isIconInvalid = !selectedIcon;

    setNameError(isNameInvalid);
    setIconError(isIconInvalid);

    if (isNameInvalid || isIconInvalid) {
      return;
    }

    if (typeof skillName === "string" && skillName.trim() !== "") {
      const newSkill: Skill = {
        id: crypto.randomUUID(),
        name: skillName.trim(),
        icon: selectedIcon,
      };

      try {
        const savedSkills = localStorage.getItem("skills");
        const skills = savedSkills ? JSON.parse(savedSkills) : [];
        if (!Array.isArray(skills)) {
          throw new Error("Invalid skills data");
        }
        if (!skills.every((skill) =>
          typeof skill.id === "string" &&
          typeof skill.name === "string" &&
          typeof skill.icon === "string"
        )) {
          throw new Error("Invalid skill data");
        }
        skills.push(newSkill);
        localStorage.setItem("skills", JSON.stringify(skills));
        onCreate(newSkill);
        
      } catch (error) {
        console.error("Failed to save skill:", error);
      }
    }
  };

  const categories = [
    ...new Set(skillIcons.map((icon) => icon.category)),
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-zinc-950/60 p-3 sm:items-center sm:p-4">
      <div className="relative max-h-[calc(100dvh-1.5rem)] w-full max-w-md overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xl sm:max-h-[calc(100dvh-2rem)] sm:p-7 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-2xl text-red-700 transition-transform duration-300 hover:scale-110 dark:bg-red-950/30">
            +
          </div>
          <h2 className="text-xl font-bold text-zinc-900 transition-transform sm:text-2xl duration-300 hover:scale-103 dark:text-white">
            Create your first skill
          </h2>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Start tracking your learning journey.
          </p>
        </div>
        <div className="space-y-4">
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="skill-name"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                Skill name
              </label>
              <input
                name="skill-name"
                id="skill-name"
                type="text"
                onChange={() => setNameError(false)}
                placeholder="e.g. JavaScript"
                className="mt-2 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-red-500"/>
            </div>
            {nameError && (
              <p className="mt-2 text-sm text-red-600">
                Please enter a skill name
              </p>
            )}
            <details className="group mt-4">
              <summary className="flex w-full cursor-pointer list-none items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-700 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:border-red-700 dark:hover:bg-zinc-700 dark:hover:text-red-700 [&::-webkit-details-marker]:hidden">
                <span className="text-lg leading-none">+</span>
                Select Icon
                <ChevronDown
                  size={16}
                  className="transition-transform duration-200 group-open:rotate-180"/>
              </summary>
              <div className="mt-3 max-h-44 space-y-2 overflow-y-auto sm:max-h-56 rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-950">
                {categories.map((category) => (
                  <details
                    key={category}
                    className="group/category rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
                    <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:text-red-700 dark:text-zinc-200 dark:hover:text-red-700 [&::-webkit-details-marker]:hidden">
                      {category}
                      <ChevronDown
                        size={16}
                        className="text-zinc-400 transition-transform duration-200 group-open/category:rotate-180"/>
                    </summary>
                    <div className="grid grid-cols-4 gap-2 border-t min-[380px]:grid-cols-5 border-zinc-100 p-3 sm:grid-cols-6 dark:border-zinc-800">
                      {skillIcons
                        .filter((icon) => icon.category === category)
                        .map(({ id, Icon }) => (                     
                        <button
                          key={id}
                          type="button"
                          title={id}
                          onClick={() => {
                            setSelectedIcon(selectedIcon === id ? "" : id),
                            setIconError(false)
                          }}
                          className={`flex aspect-square cursor-pointer items-center justify-center rounded-lg border transition-colors ${
                            selectedIcon === id
                              ? "border-red-500 bg-red-50 text-red-700 dark:border-red-500 dark:bg-red-950/40 dark:text-red-400"
                              : "border-zinc-200 bg-zinc-50 text-zinc-600 hover:border-red-300 hover:bg-red-50 hover:text-red-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-red-700 dark:hover:bg-zinc-700 dark:hover:text-red-700"}`}>
                          <Icon size={21} strokeWidth={1.8} />
                        </button>
                        ))}
                    </div>
                  </details>
                ))}
              </div>
            </details>
          {iconError && (
            <p className="mt-2 text-sm text-red-600">
              Please select an icon
            </p>
            )}
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
            className="absolute right-2 top-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-2xl text-zinc-400 transition-all duration-300 sm:right-3 sm:top-1 hover:scale-120 hover:text-red-700 dark:text-zinc-500 dark:hover:text-red-700"
            onClick={() => onClose()}>
            &times;
          </button>
        </div>
      </div>
    </div>
  );
}
