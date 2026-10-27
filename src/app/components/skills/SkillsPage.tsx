"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus, X } from "lucide-react";
import CreateSkillModal from "./CreateSkillModal";
import DeleteSkillModal from "./DeleteSkillModal";
import CreateSubSkillModal from "./CreateSubSkillModal";
import SubSkillModal from "./SubSkillModal";
import SkillTree from "./SkillTree";
import EditSkillModal, { type SkillDetails } from "./EditSkillModal";
import { skillIcons } from "./IconPicker";
import type { Skill } from "@/app/components/types/skill";
import type { SubSkill } from "@/app/components/types/subskill";
import { getSkills, saveSkills, getSubSkills, saveSubSkills } from "@/app/components/lib/skills-storage";
import { increaseStreak } from "@/app/components/lib/streak-storage";
import { removeSubSkillTree } from "@/app/components/lib/skill-operations";

export default function SkillsPage() {
  const [editingItem, setEditingItem] = useState<{ kind: "skill" | "subskill"; id: string } | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [subSkills, setSubSkills] = useState<SubSkill[]>([]);
  const [skillToDelete, setSkillToDelete] = useState<string | null>(null);
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
  const [selectedSubSkillId, setSelectedSubSkillId] = useState<string | null>(null);
  const [isSubSkillModalOpen, setIsSubSkillModalOpen] = useState(false);
  const [createSubSkillParentId, setCreateSubSkillParentId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const parsedSkills = getSkills();
      const parsedSubSkills = getSubSkills();

      setSkills(parsedSkills);
      setSubSkills(parsedSubSkills);

      setIsOpen(parsedSkills.length === 0);

      const savedID = localStorage.getItem("selectedSkillId");

      if (
        savedID &&
        parsedSkills.some((skill) => skill.id === savedID)
      ) {
        setSelectedSkillId(savedID);
      }
    } catch (error) {
      console.error("Failed to load skills:", error);
    }
  }, []);

  const selectedSkill = skills.find(
    (skill) => skill.id === selectedSkillId
  );

  const selectedSubSkill = subSkills.find(
    (subSkill) => subSkill.id === selectedSubSkillId
  );

  const currentSubSkills = subSkills.filter(
    (subSkill) => subSkill.skillId === selectedSkillId
  );

  const itemToEdit = editingItem?.kind === "skill"
    ? skills.find((item) => item.id === editingItem.id)
    : subSkills.find((item) => item.id === editingItem?.id);

  function handleCreateRoot(skillId: string) {
    localStorage.setItem("selectedSkillId", skillId);
    setSelectedSkillId(skillId);
    setSelectedSubSkillId(null);
    setCreateSubSkillParentId(null);
    setEditingItem(null);
    setIsSubSkillModalOpen(true);
  }

  function handleSaveDetails(details: SkillDetails) {
    if (!editingItem) return;

    if (editingItem.kind === "skill") {
      const updatedSkills = skills.map((item) =>
        item.id === editingItem.id ? { ...item, ...details } : item
      );
      saveSkills(updatedSkills);
      setSkills(updatedSkills);
    } else {
      const updatedSubSkills = subSkills.map((item) =>
        item.id === editingItem.id ? { ...item, ...details } : item
      );
      saveSubSkills(updatedSubSkills);
      setSubSkills(updatedSubSkills);
    }

    setEditingItem(null);
  }

  function handlePositionChange(id: string, x: number, y: number) {
    const updatedSubSkills = subSkills.map((item) =>
      item.id === id
        ? { ...item, x, y }
        : item
    );

    setSubSkills(updatedSubSkills);
    saveSubSkills(updatedSubSkills);
  }
    
  function handleMarkLearned() {
    if (!selectedSubSkill || selectedSubSkill.studied) {
      return;
    }

    const updatedSubSkills = subSkills.map((item) =>
      item.id === selectedSubSkill.id
        ? { ...item, studied: true }
        : item
    );

    setSubSkills(updatedSubSkills);
    saveSubSkills(updatedSubSkills);

    increaseStreak(selectedSubSkill.skillId);
  }

  function handleDeleteSubSkill() {
    if (!selectedSubSkill) return;

    const updatedSubSkills = removeSubSkillTree(subSkills, selectedSubSkill.id);

    setSubSkills(updatedSubSkills);
    saveSubSkills(updatedSubSkills);

    setSelectedSubSkillId(null);
  }

  return (
    <>
      <div className="flex min-h-[500px] w-full flex-1 flex-col rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 sm:p-4 md:h-full md:min-h-0">

        <div className="flex min-w-0 shrink-0 items-start gap-2 border-b border-zinc-200 pb-3 dark:border-zinc-700 sm:pb-4">
          <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible md:pb-0">

            {skills.map((skill) => {
              const selectedIcon = skillIcons.find(
                (icon) => icon.id === skill.icon
              );

              const Icon = selectedIcon?.Icon;
              const isSelected = selectedSkillId === skill.id;

              return (
                <div
                  key={skill.id}
                  className={`flex max-w-[235px] shrink-0 items-center gap-1 rounded-xl border px-2 py-2 text-sm font-semibold transition-colors ${isSelected ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-400" : "border-zinc-200 bg-white text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"}`}
                >
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => {
                      const nextId = isSelected ? null : skill.id;

                      setSelectedSkillId(nextId);
                      setSelectedSubSkillId(null);

                      if (nextId !== null) {
                        localStorage.setItem("selectedSkillId", nextId);
                      } else {
                        localStorage.removeItem("selectedSkillId");
                      }
                    }}
                    className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 rounded-md px-1 py-1.5 text-left focus-visible:outline-2 focus-visible:outline-red-500"
                  >
                    {Icon && (
                      <Icon size={18} strokeWidth={1.8} className="shrink-0" />
                    )}
                    <span className="min-w-0 truncate">{skill.name}</span>
                  </button>
                  <button
                    type="button"
                    aria-label={`Edit ${skill.name}`}
                    title="Edit skill"
                    onClick={() => setEditingItem({ kind: "skill", id: skill.id })}
                    className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md opacity-60 transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-red-500"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    type="button"
                    aria-label={`Delete ${skill.name}`}
                    title="Delete skill"
                    onClick={() => setSkillToDelete(skill.id)}
                    className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md opacity-60 transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-red-500"
                  >
                    <X size={15} />
                  </button>
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
          className={`flex min-h-0 min-w-0 flex-1 flex-col items-center text-center ${
            selectedSkill ? "overflow-hidden" : "justify-center overflow-y-auto"}`}>
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
            <SkillTree
              key={selectedSkill.id}
              skill={selectedSkill}
              subSkills={currentSubSkills}
              onSelect={setSelectedSubSkillId}
              onEdit={() => setEditingItem({ kind: "skill", id: selectedSkill.id })}
              onCreateRoot={() => handleCreateRoot(selectedSkill.id)}
              onPositionChange={handlePositionChange}/>
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
            skills.find(
              (skill) => skill.id === skillToDelete
            )?.name || ""
          }
          onClose={() => setSkillToDelete(null)}
          onDelete={() => {
            const updatedSkills = skills.filter(
              (skill) => skill.id !== skillToDelete
            );

            const updatedSubSkills = subSkills.filter(
              (subSkill) =>
                subSkill.skillId !== skillToDelete
            );

            setSkills(updatedSkills);
            saveSkills(updatedSkills);

            setSubSkills(updatedSubSkills);
            saveSubSkills(updatedSubSkills);

            if (selectedSkillId === skillToDelete) {
              setSelectedSkillId(null);
              setSelectedSubSkillId(null);

              localStorage.removeItem(
                "selectedSkillId"
              );
            }

            setSkillToDelete(null);
          }}/>
      )}

      {isSubSkillModalOpen && selectedSkillId && (
        <CreateSubSkillModal
          skillId={selectedSkillId}
          parentSubSkillId={createSubSkillParentId}
          onClose={() => {
            setIsSubSkillModalOpen(false);
            setCreateSubSkillParentId(null);
          }}
          onCreate={(subSkill) => {
            const updatedSubSkills = [
              ...subSkills,
              subSkill,
            ];

            setSubSkills(updatedSubSkills);
            saveSubSkills(updatedSubSkills);

            setIsSubSkillModalOpen(false);
            setCreateSubSkillParentId(null);
          }}/>
      )}

      {selectedSubSkill && !editingItem && (
        <SubSkillModal
          subSkill={selectedSubSkill}
          onClose={() => {
            setSelectedSubSkillId(null);
          }}
          onEdit={() => setEditingItem({ kind: "subskill", id: selectedSubSkill.id })}
          onMarkLearned={handleMarkLearned}
          onCreateChild={() => {
            setCreateSubSkillParentId(
              selectedSubSkill.id
            );

            setSelectedSubSkillId(null);
            setIsSubSkillModalOpen(true);
          }}
          onDelete={handleDeleteSubSkill}/>
      )}
      {editingItem && itemToEdit && (
        <EditSkillModal
          key={`${editingItem.kind}:${editingItem.id}`}
          item={itemToEdit}
          kind={editingItem.kind}
          onClose={() => setEditingItem(null)}
          onSave={handleSaveDetails}
          onCreateSubSkill={editingItem.kind === "skill"
            ? () => handleCreateRoot(editingItem.id)
            : undefined}
        />
      )}
    </>
  );
}
