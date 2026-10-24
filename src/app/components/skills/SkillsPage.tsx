"use client";

import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import CreateSkillModal from "../modals/CreateSkillModal";
import DeleteSkillModal from "../modals/DeleteSkillModal";
import { skillIcons } from "./IconPicker";

type Skill = {
  id: string;
  name: string;
  icon: string;
};

export default function SkillsPage() {
  const [isOpen, setIsOpen] = useState(true);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillToDelete, setSkillToDelete] = useState<string | null>(null);
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedSkills = localStorage.getItem("skills");
      const parsedSkills = savedSkills ? JSON.parse(savedSkills) : [];

      if (Array.isArray(parsedSkills)) {
        setSkills(parsedSkills);
      }
    } catch (error) {
      console.error("Failed to load skills:", error);
    }
  }, []);

  return (
    <>
      <div className="flex h-full w-full flex-col rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
        <div className="flex flex-wrap items-center gap-2 border-b border-zinc-200 pb-4 dark:border-zinc-700">
          {skills.map((skill) => {
            const selectedIcon = skillIcons.find(
              (icon) => icon.id === skill.icon);
            const Icon = selectedIcon?.Icon;
            return (
              <div
                key={skill.id}
                onClick={() => setSelectedSkillId(selectedSkillId === skill.id ? null : skill.id)}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-semibold ${
                  selectedSkillId === skill.id
                    ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-400"
                    : "border-zinc-200 bg-white text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
                }`}>
                {Icon && <Icon size={18} strokeWidth={1.8} />}
                <span>{skill.name}</span>
                <X
                  size={15}
                  className="cursor-pointer opacity-60 transition-opacity hover:opacity-100"
                  onClick={() => setSkillToDelete(skill.id)}/>
              </div>
              );
          })}
          <button
            type="button"
            aria-label="Add skill"
            onClick={() => setIsOpen(true)}
            disabled={skills.length >= 10}
            className="flex h-[46px] w-[46px] cursor-pointer items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-800 shadow-sm transition-colors hover:border-red-300 hover:text-red-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-red-700 dark:hover:text-red-400">
            <Plus size={20} />
          </button>
          <span className="ml-auto text-xs font-medium text-zinc-500 dark:text-zinc-400">
            {skills.length} / 10 skills
          </span>
        </div>
        <div className="min-h-0 flex-1" />
      </div>
      {isOpen && (
        <CreateSkillModal onClose={() => setIsOpen(false)} onCreate={(newSkill) => {
          const updatedSkills = [...skills, newSkill];
          setSkills(updatedSkills);
          setIsOpen(false);
        }} />
      )}
      {skillToDelete && (
        <DeleteSkillModal
          skillName={skills.find(skill => skill.id === skillToDelete)?.name || ""}
          onClose={() => setSkillToDelete(null)}
          onDelete={() => {
            const updatedSkills = skills.filter(skill => skill.id !== skillToDelete);
            localStorage.setItem("skills", JSON.stringify(updatedSkills));
            setSkills(updatedSkills);
            setSkillToDelete(null);
          }}/>
      )}
    </>
  );
}
