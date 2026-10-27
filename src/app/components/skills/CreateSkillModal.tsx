"use client";

import { useState } from "react";
import { ChevronDown, Plus } from "lucide-react";
import IconPicker, { skillIcons } from "./IconPicker";
import type { Skill } from "@/app/components/types/skill";

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

      onCreate(newSkill);
    }
  };

  const selectedIconData = skillIcons.find(
  (icon) => icon.id === selectedIcon
  );
  const SelectedIcon = selectedIconData?.Icon;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-zinc-950/60 p-3 sm:items-center sm:p-4">
      <div className="relative max-h-[calc(100dvh-1.5rem)] w-full max-w-md overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xl sm:max-h-[calc(100dvh-2rem)] sm:p-7 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-2xl text-red-700 transition-transform duration-300 hover:scale-110 dark:bg-red-950/30">
            {SelectedIcon ? (
              <SelectedIcon size={24} strokeWidth={1.8} />
            ) : (
              "+"
            )}
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
              <summary className="flex w-full cursor-pointer list-none items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-700 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:border-red-700 dark:hover:bg-zinc-700 dark:hover:text-red-400 [&::-webkit-details-marker]:hidden">
                <Plus size={18} />
                Select Icon
                <ChevronDown
                  size={16}
                  className="transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <IconPicker
                selectedIcon={skillIcons.find((icon) => icon.id === selectedIcon)?.id ?? null}
                onSelect={(icon) => {
                  setSelectedIcon(icon);
                  setIconError(false);
                }}
              />
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
