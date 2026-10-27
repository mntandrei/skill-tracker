"use client";

import { useState } from "react";
import { Check, Plus, Trash2, X } from "lucide-react";
import { skillIcons } from "./IconPicker";
import type { SubSkill } from "@/app/components/types/subskill";

type SubSkillModalProps = {
  subSkill: SubSkill;
  onClose: () => void;
  onMarkLearned: () => void;
  onCreateChild: () => void;
  onDelete: () => void;
};

export default function SubSkillModal({subSkill,onClose,onMarkLearned,onCreateChild,onDelete}: SubSkillModalProps) {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const selectedIcon = skillIcons.find(
    (icon) => icon.id === subSkill.icon);

  const Icon = selectedIcon?.Icon;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-zinc-950/60 p-3 sm:items-center sm:p-4">
      <div className="relative max-h-[calc(100dvh-1.5rem)] w-full max-w-md overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xl sm:max-h-[calc(100dvh-2rem)] sm:p-7 dark:border-zinc-800 dark:bg-zinc-900">

        <div className="mb-6 text-center">
          <div
            className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${
              subSkill.studied
                ? "bg-green-500/10 text-green-700 dark:text-green-400"
                : "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400"}`}>
            {Icon && <Icon size={25} strokeWidth={1.8} />}
          </div>

          <h2 className="break-words text-xl font-bold text-zinc-900 sm:text-2xl dark:text-white">
            {subSkill.name}
          </h2>

          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Track your progress and keep building your skills.
          </p>
        </div>

        <div className="mb-5 flex justify-center">
          <div
            className={`inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold ${
              subSkill.studied
                ? "border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-400"
                : "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-400"
            }`}>
            <span
              className={`h-2 w-2 shrink-0 rounded-full ${
                subSkill.studied ? "bg-green-500" : "bg-red-500"
              }`}
            />

            <span>
              {subSkill.studied ? "Learned" : "Not learned yet"}
            </span>
          </div>
        </div>

        <div className="mb-5">
          <h3 className="mb-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
            Description
          </h3>

          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800">
            <p className="whitespace-pre-wrap break-words text-left text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              {subSkill.description?.trim()
                ? subSkill.description
                : "No description added for this subskill."}
            </p>
          </div>
        </div>

        {!isConfirmingDelete ? (
          <div className="space-y-3">
            <button
              type="button"
              onClick={onMarkLearned}
              disabled={subSkill.studied}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-green-600/40 bg-green-500/10 px-4 py-3 text-sm font-semibold text-green-700 transition-colors hover:border-green-600 hover:bg-green-500/20 disabled:cursor-default disabled:opacity-60 dark:border-green-500/40 dark:bg-green-500/10 dark:text-green-400 dark:hover:bg-green-500/20">
              <Check size={18} strokeWidth={2.2} />
              {subSkill.studied
                ? "Already Learned"
                : "Mark as Learned"}
            </button>

            <button
              type="button"
              onClick={onCreateChild}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-700 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-800">
              <Plus size={19} strokeWidth={2} />
              Create Child Subskill
            </button>

            <button
              type="button"
              onClick={() => setIsConfirmingDelete(true)}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm font-semibold text-red-700 transition-colors hover:bg-red-500/10 dark:border-red-500/30 dark:bg-red-950/20 dark:text-red-400 dark:hover:bg-red-950/40">
              <Trash2 size={17} strokeWidth={1.8} />
              Delete Subskill
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4 text-center dark:bg-red-950/20">
              <p className="text-sm font-semibold text-red-700 dark:text-red-400">
                Delete this subskill?
              </p>

              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                This will also delete all its child subskills.
                This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsConfirmingDelete(false)}
                className="min-w-0 flex-1 cursor-pointer rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700">
                Cancel
              </button>

              <button
                type="button"
                onClick={onDelete}
                className="flex min-w-0 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-700 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-red-800">
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        )}

        <button
          type="button"
          aria-label="Close modal"
          onClick={onClose}
          className="absolute right-2 top-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-zinc-400 transition-all duration-300 hover:scale-110 hover:text-red-700 sm:right-3 sm:top-3 dark:text-zinc-500 dark:hover:text-red-400">
          <X size={21} />
        </button>
      </div>
    </div>
  );
}
