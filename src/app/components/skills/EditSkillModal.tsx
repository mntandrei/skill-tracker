"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Plus, X } from "lucide-react";
import IconPicker, { skillIcons } from "./IconPicker";

export type SkillDetails = {
  name: string;
  description: string;
  icon: string;
};

type EditSkillModalProps = {
  item: { name: string; icon: string; description?: string };
  kind: "skill" | "subskill";
  onClose: () => void;
  onSave: (details: SkillDetails) => void;
};

export default function EditSkillModal({ item, kind, onClose, onSave }: EditSkillModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [description, setDescription] = useState(item.description ?? "");
  const [selectedIcon, setSelectedIcon] = useState(item.icon);
  const [nameError, setNameError] = useState(false);
  const [iconError, setIconError] = useState(false);
  const [saveError, setSaveError] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);

  const SelectedIcon = skillIcons.find(
    (icon) => icon.id === selectedIcon
  )?.Icon;

  const handleSubmit = (
    e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("edit-skill-name");

    const isNameInvalid =
      typeof name !== "string" ||
      name.trim() === "";

    const isIconInvalid = !selectedIcon;

    setNameError(isNameInvalid);
    setIconError(isIconInvalid);

    if (isNameInvalid || isIconInvalid) {
      return;
    }

    if (typeof name !== "string") return;
    try {
      onSave({
        name: name.trim(),
        description: description.trim(),
        icon: selectedIcon,
      });
    } catch {
      setSaveError(true);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="edit-skill-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 m-auto max-h-[100dvh] w-full max-w-[480px] overflow-y-auto bg-transparent p-3 backdrop:bg-zinc-950/60 sm:p-4">
      <div className="relative max-h-[calc(100dvh-1.5rem)] w-full max-w-md overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xl sm:max-h-[calc(100dvh-2rem)] sm:p-7 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400">
            {SelectedIcon ? (
              <SelectedIcon size={25} strokeWidth={1.8} />
            ) : (
              <Plus size={25} strokeWidth={1.8} />
            )}
          </div>
          <h2 id="edit-skill-title" className="text-xl font-bold text-zinc-900 sm:text-2xl dark:text-white">
            Edit {kind === "skill" ? "Skill" : "Subskill"}
          </h2>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Update the name, description and icon.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="edit-skill-name"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Name
            </label>
            <input
              id="edit-skill-name"
              name="edit-skill-name"
              type="text"
              defaultValue={item.name}
              autoFocus
              aria-invalid={nameError}
              placeholder="e.g. React Hooks"
              onChange={() => setNameError(false)}
              className="mt-2 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-red-500"/>
            {nameError && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                Please enter a name
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="edit-skill-description"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Description
              <span className="ml-2 text-xs font-normal text-zinc-400 dark:text-zinc-500">
                Optional
              </span>
            </label>
            <textarea
              id="edit-skill-description"
              name="edit-skill-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={250}
              rows={3}
              placeholder="What do you want to learn?"
              className="mt-2 w-full resize-none rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-red-500"/>
            <p className="mt-1 text-right text-xs text-zinc-400 dark:text-zinc-500">
              {description.length === 0
                ? "Maximum 250 characters"
                : `${description.length} / 250`}
            </p>
          </div>
          <div>
            <details className="group">
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
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                Please select an icon
              </p>
            )}
          </div>
          <button
            type="submit"
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-700 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-800">
            <Check size={19} strokeWidth={2} />
            Save Changes
          </button>
          {saveError && (
            <p role="alert" className="text-sm text-red-600 dark:text-red-400">
              Could not save your changes. Please try again.
            </p>
          )}
          <button
            type="button"
            onClick={onClose}
            className="w-full cursor-pointer rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700">
            Cancel
          </button>
        </form>
        <button
          type="button"
          aria-label="Close modal"
          onClick={onClose}
          className="absolute right-2 top-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-zinc-400 transition-all duration-300 hover:scale-110 hover:text-red-700 sm:right-3 sm:top-3 dark:text-zinc-500 dark:hover:text-red-400">
          <X size={21} />
        </button>
      </div>
    </dialog>
  );
}
