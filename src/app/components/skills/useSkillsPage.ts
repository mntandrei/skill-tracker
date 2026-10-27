"use client";

import { useEffect, useState } from "react";
import { getSkills, getSubSkills, saveSkills, saveSubSkills } from "../lib/skills-storage";
import { clearStreak, increaseStreak } from "../lib/streak-storage";
import { removeSubSkillTree } from "../lib/skill-operations";
import type { Skill } from "../types/skill";
import type { SubSkill } from "../types/subskill";

type EditingItem = { kind: "skill" | "subskill"; id: string };
type SkillDetails = { name: string; description: string; icon: string };

export function useSkillsPage() {
  const [editingItem, setEditingItem] = useState<EditingItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [subSkills, setSubSkills] = useState<SubSkill[]>([]);
  const [skillToDelete, setSkillToDelete] = useState<string | null>(null);
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
  const [selectedSubSkillId, setSelectedSubSkillId] = useState<string | null>(null);
  const [isSubSkillModalOpen, setIsSubSkillModalOpen] = useState(false);
  const [createSubSkillParentId, setCreateSubSkillParentId] = useState<string | null>(null);

  useEffect(() => {
    let initialLoad = true;

    function refreshSkills() {
      const loadedSkills = getSkills();
      const loadedSubSkills = getSubSkills();
      setSkills(loadedSkills);
      setSubSkills(loadedSubSkills);

      if (initialLoad) {
        setIsOpen(loadedSkills.length === 0);
        initialLoad = false;
      }

      const storedId = localStorage.getItem("selectedSkillId");
      const validId = storedId && loadedSkills.some((item) => item.id === storedId)
        ? storedId
        : null;

      setSelectedSkillId(validId);
      setSelectedSubSkillId((current) =>
        loadedSubSkills.some((item) => item.id === current) ? current : null
      );
    }

    refreshSkills();
    window.addEventListener("storage", refreshSkills);
    return () => window.removeEventListener("storage", refreshSkills);
  }, []);

  const selectedSkill = skills.find((item) => item.id === selectedSkillId);
  const selectedSubSkill = subSkills.find((item) => item.id === selectedSubSkillId);
  const currentSubSkills = subSkills.filter((item) => item.skillId === selectedSkillId);
  const itemToEdit = editingItem?.kind === "skill"
    ? skills.find((item) => item.id === editingItem.id)
    : subSkills.find((item) => item.id === editingItem?.id);

  function handleSelectSkill(id: string | null) {
    setSelectedSkillId(id);
    setSelectedSubSkillId(null);
    if (id) localStorage.setItem("selectedSkillId", id);
    else localStorage.removeItem("selectedSkillId");
  }

  function handleCreateRoot(skillId: string) {
    handleSelectSkill(skillId);
    setCreateSubSkillParentId(null);
    setEditingItem(null);
    setIsSubSkillModalOpen(true);
  }

  function handleCreateChildSubSkill(id: string) {
    setCreateSubSkillParentId(id);
    setSelectedSubSkillId(null);
    setIsSubSkillModalOpen(true);
  }

  function handleCloseCreateSubSkill() {
    setIsSubSkillModalOpen(false);
    setCreateSubSkillParentId(null);
  }

  function handleCreateSkill(newSkill: Skill) {
    if (skills.length >= 10) return;
    const updated = [...skills, newSkill];
    setSkills(updated);
    saveSkills(updated);
    setIsOpen(false);
  }

  function handleCreateSubSkill(newSubSkill: SubSkill) {
    const updated = [...subSkills, newSubSkill];
    setSubSkills(updated);
    saveSubSkills(updated);
    handleCloseCreateSubSkill();
  }

  function handleSaveDetails(details: SkillDetails) {
    if (!editingItem) return;

    if (editingItem.kind === "skill") {
      const updated = skills.map((item) =>
        item.id === editingItem.id ? { ...item, ...details } : item
      );
      setSkills(updated);
      saveSkills(updated);
    } else {
      const updated = subSkills.map((item) =>
        item.id === editingItem.id ? { ...item, ...details } : item
      );
      setSubSkills(updated);
      saveSubSkills(updated);
    }

    setEditingItem(null);
  }

  function handlePositionChange(id: string, x: number, y: number) {
    const updated = subSkills.map((item) =>
      item.id === id ? { ...item, x, y } : item
    );
    setSubSkills(updated);
    saveSubSkills(updated);
  }

  function handleMarkLearned() {
    if (!selectedSubSkill || selectedSubSkill.studied) return;

    const updated = subSkills.map((item) =>
      item.id === selectedSubSkill.id ? { ...item, studied: true } : item
    );
    setSubSkills(updated);
    saveSubSkills(updated);
    increaseStreak(selectedSubSkill.skillId);
  }

  function handleDeleteSubSkill() {
    if (!selectedSubSkill) return;
    const updated = removeSubSkillTree(subSkills, selectedSubSkill.id);
    setSubSkills(updated);
    saveSubSkills(updated);
    setSelectedSubSkillId(null);
  }

  function handleDeleteSkill() {
    if (!skillToDelete) return;
    const updatedSkills = skills.filter((item) => item.id !== skillToDelete);
    const updatedSubSkills = subSkills.filter((item) => item.skillId !== skillToDelete);

    setSkills(updatedSkills);
    saveSkills(updatedSkills);
    setSubSkills(updatedSubSkills);
    saveSubSkills(updatedSubSkills);
    clearStreak(skillToDelete);

    try {
      localStorage.removeItem(`skillTreeRootPosition:${skillToDelete}`);
    } catch (error) {
      console.error("Failed to clear saved tree position:", error);
    }

    if (selectedSkillId === skillToDelete) {
      handleSelectSkill(null);
    }
    setSkillToDelete(null);
  }

  return {
    editingItem, setEditingItem,
    isOpen, setIsOpen,
    skills, skillToDelete, setSkillToDelete,
    selectedSkillId, selectedSubSkillId, setSelectedSubSkillId,
    isSubSkillModalOpen, createSubSkillParentId,
    selectedSkill, selectedSubSkill, currentSubSkills, itemToEdit,
    handleSelectSkill, handleCreateRoot, handleCreateChildSubSkill,
    handleCloseCreateSubSkill, handleCreateSkill, handleCreateSubSkill,
    handleSaveDetails, handlePositionChange, handleMarkLearned,
    handleDeleteSubSkill, handleDeleteSkill,
  };
}
