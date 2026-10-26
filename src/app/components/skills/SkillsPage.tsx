"use client";

import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import CreateSkillModal from "./CreateSkillModal";
import DeleteSkillModal from "./DeleteSkillModal";
import CreateSubSkillModal from "./CreateSubSkillModal";
import { skillIcons } from "./IconPicker";
import type { Skill } from "@/app/components/types/skill";
import type { SubSkill } from "@/app/components/types/subskill";
import {getSkills, saveSkills, getSubSkills, saveSubSkills} from "@/app/components/lib/skills-storage";

export default function SkillsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillToDelete, setSkillToDelete] = useState<string | null>(null);
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
  const [isSubSkillModalOpen, setIsSubSkillModalOpen] = useState(false);
  const [subSkills, setSubSkills] = useState<SubSkill[]>([]);

  useEffect(() => {
    try {
      const parsedSkills = getSkills();
      const parsedSubSkills = getSubSkills();

      setSkills(parsedSkills);
      setSubSkills(parsedSubSkills);
      setIsOpen(parsedSkills.length === 0);

      const savedID = localStorage.getItem("selectedSkillId");

      if (savedID) {
        setSelectedSkillId(savedID);
      }
    } catch (error) {
      console.error("Failed to load skills:", error);
    }
  }, []);

  const selectedSkill = skills.find(
    (skill) => skill.id === selectedSkillId);

  return (
    <>
      <div className="flex min-h-[500px] w-full flex-1 flex-col rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 sm:p-4 md:h-full md:min-h-0">
        <div className="flex min-w-0 items-start gap-2 border-b border-zinc-200 pb-3 dark:border-zinc-700 sm:pb-4">
          <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible md:pb-0">
            {skills.map((skill) => {
              const selectedIcon = skillIcons.find((icon) => icon.id === skill.icon);
              const Icon = selectedIcon?.Icon;
              return (
                <div
                  key={skill.id}
                  onClick={() => {
                    const nextId =
                      selectedSkillId === skill.id ? null : skill.id;

                    setSelectedSkillId(nextId);

                    if (nextId !== null) {
                      localStorage.setItem("selectedSkillId", nextId);
                    } else {
                      localStorage.removeItem("selectedSkillId");
                    }
                  }}
                  className={`flex max-w-[235px] shrink-0 cursor-pointer items-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold transition-colors sm:gap-3 sm:px-4 ${
                    selectedSkillId === skill.id ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-400" : "border-zinc-200 bg-white text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"}`}>
                  {Icon && <Icon size={18} strokeWidth={1.8} />}
                  <span className="min-w-0 truncate">
                    {skill.name}
                  </span>
                  <X
                    size={15}
                    className="size-8 shrink-0 cursor-pointer rounded-md p-1.5 opacity-60 transition-opacity hover:opacity-100 sm:size-[15px] sm:p-0"
                    onClick={() => setSkillToDelete(skill.id)}/>
                </div>
              );
            })}
          </div>
          <button
            type="button"
            aria-label="Add skill"
            onClick={() => setIsOpen(true)}
            disabled={skills.length >= 10}
            className="flex h-[46px] w-[46px] shrink-0 cursor-pointer items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-800 shadow-sm transition-colors hover:border-red-300 hover:text-red-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-red-700 dark:hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-40">
            <Plus size={20} />
          </button>
          <span className="shrink-0 whitespace-nowrap pt-4 text-[11px] font-medium text-zinc-500 dark:text-zinc-400 sm:text-xs">
            {skills.length} / 10 skills
          </span>
        </div>
        <div
          className={`flex min-h-0 flex-1 flex-col items-center overflow-y-auto text-center ${selectedSkill ? "justify-start" : "justify-center"}`}>
          {skills.length === 0 && (
            <>
              <p className="text-base font-semibold text-zinc-700 dark:text-zinc-200">
                No skills added yet
              </p>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                Create your first skill to start your learning journey.
              </p>
            </>
          )}
          {skills.length > 0 && !selectedSkill && (
            <div className="text-center">
              <p className="text-base font-semibold text-zinc-700 dark:text-zinc-200">
                No skill selected yet
              </p>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                Choose a skill from above and let's start learning something new!
              </p>
            </div>
          )}
          {selectedSkill && (
            <button
              type="button"
              onClick={() => setIsSubSkillModalOpen(true)}
              className="mt-1.5 flex h-28 w-28 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-red-500/50 bg-red-500/10 p-4">
              <span className="break-words text-center font-semibold text-red-700 dark:text-red-400">
                {selectedSkill.name}
              </span>
            </button>
          )}
          {selectedSkill && (
            <div className="mt-12 flex flex-wrap justify-center gap-6">
              {subSkills
                .filter(
                  (subSkill) =>
                    subSkill.skillId === selectedSkillId &&
                    subSkill.parentSubSkillId === null).map((subSkill) => (
                  <div
                    key={subSkill.id}
                    className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 p-2 text-center ${
                      subSkill.studied ? "border-green-500/50 bg-green-500/10": "border-red-500/50 bg-red-500/10"}`}>
                    <span className="break-words text-xs font-medium text-red-700 dark:text-red-400">
                      {subSkill.name}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
      {isOpen && (
        <CreateSkillModal
          onClose={() => setIsOpen(false)}
          onCreate={(newSkill) => {
            const updatedSkills = [...skills, newSkill];

            setSkills(updatedSkills);
            saveSkills(updatedSkills);
            setIsOpen(false);
          }}
        />
      )}
      {skillToDelete && (
        <DeleteSkillModal
          skillName={
            skills.find((skill) => skill.id === skillToDelete)?.name || ""}
          onClose={() => setSkillToDelete(null)}
          onDelete={() => {
            const updatedSkills = skills.filter(
              (skill) => skill.id !== skillToDelete
            );

            saveSkills(updatedSkills);
            setSkills(updatedSkills);
            setSkillToDelete(null);
          }}/>
      )}
      {isSubSkillModalOpen && selectedSkillId && (
        <CreateSubSkillModal
          skillId={selectedSkillId}
          onClose={() => setIsSubSkillModalOpen(false)}
          onCreate={(subSkill) => {
            const updatedSubSkills = [...subSkills, subSkill];

            setSubSkills(updatedSubSkills);
            saveSubSkills(updatedSubSkills);
            setIsSubSkillModalOpen(false);
          }}
        />
      )}
    </>
  );
}
