
"use client";

import { useState } from "react";
import { Check, ChevronDown, Plus, X } from "lucide-react";
import { skillIcons } from "./IconPicker";

type CreateSubSkillModalProps = {
  onClose: () => void;
};

export default function CreateSubSkillModal({
  onClose,
}: CreateSubSkillModalProps) {
  const [description, setDescription] = useState<string>("");
  const [selectedIcon, setSelectedIcon] = useState<string>("");
  const [nameError, setNameError] = useState<boolean>(false);
  const [iconError, setIconError] = useState<boolean>(false);

  const categories = [
    ...new Set(skillIcons.map((icon) => icon.category)),
  ];

  const SelectedIcon = skillIcons.find(
    (icon) => icon.id === selectedIcon
  )?.Icon;

  const handleSubmit = (
    e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const subskillName = formData.get("subskill-name");

    const isNameInvalid =
      typeof subskillName !== "string" ||
      subskillName.trim() === "";

    const isIconInvalid = !selectedIcon;

    setNameError(isNameInvalid);
    setIconError(isIconInvalid);

    if (isNameInvalid || isIconInvalid) {
      return;
    }

    //soon
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-zinc-950/60 p-3 sm:items-center sm:p-4">
      <div className="relative max-h-[calc(100dvh-1.5rem)] w-full max-w-md overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xl sm:max-h-[calc(100dvh-2rem)] sm:p-7 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400">
            {SelectedIcon ? (
              <SelectedIcon size={25} strokeWidth={1.8} />
            ) : (
              <Plus size={25} strokeWidth={1.8} />
            )}
          </div>
          <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl dark:text-white">
            Create Subskill
          </h2>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Break down your learning journey into smaller steps.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="subskill-name"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Subskill name
            </label>
            <input
              id="subskill-name"
              name="subskill-name"
              type="text"
              placeholder="e.g. React Hooks"
              onChange={() => setNameError(false)}
              className="mt-2 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-red-500"/>
            {nameError && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                Please enter a subskill name
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="subskill-description"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Description
              <span className="ml-2 text-xs font-normal text-zinc-400 dark:text-zinc-500">
                Optional
              </span>
            </label>
            <textarea
              id="subskill-description"
              name="subskill-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={250}
              rows={3}
              placeholder="What do you want to learn about this subskill?"
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
              <div className="mt-3 max-h-44 space-y-2 overflow-y-auto rounded-xl border border-zinc-200 bg-zinc-50 p-3 sm:max-h-56 dark:border-zinc-700 dark:bg-zinc-950">
                {categories.map((category) => (
                  <details
                    key={category}
                    className="group/category rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
                    <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:text-red-700 dark:text-zinc-200 dark:hover:text-red-400 [&::-webkit-details-marker]:hidden">
                      {category}
                      <ChevronDown
                        size={16}
                        className="text-zinc-400 transition-transform duration-200 group-open/category:rotate-180"/>
                    </summary>
                    <div className="grid grid-cols-4 gap-2 border-t border-zinc-100 p-3 min-[380px]:grid-cols-5 sm:grid-cols-6 dark:border-zinc-800">
                      {skillIcons
                        .filter((icon) => icon.category === category)
                        .map(({ id, Icon }) => (
                          <button
                            key={id}
                            type="button"
                            title={id}
                            aria-label={id}
                            aria-pressed={selectedIcon === id}
                            onClick={() => {
                              setSelectedIcon(
                                selectedIcon === id ? "" : id
                              );
                              setIconError(false);
                            }}
                            className={`flex aspect-square cursor-pointer items-center justify-center rounded-lg border transition-colors ${
                              selectedIcon === id
                                ? "border-red-500 bg-red-50 text-red-700 dark:border-red-500 dark:bg-red-950/40 dark:text-red-400"
                                : "border-zinc-200 bg-zinc-50 text-zinc-600 hover:border-red-300 hover:bg-red-50 hover:text-red-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-red-700 dark:hover:bg-zinc-700 dark:hover:text-red-400"
                            }`}>
                            <Icon size={21} strokeWidth={1.8} />
                          </button>
                        ))}
                    </div>
                  </details>
                ))}
              </div>
            </details>
            {iconError && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                Please select an icon
              </p>
            )}
          </div>
          <button
            type="button"
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-green-600/40 bg-green-500/10 px-4 py-3 text-sm font-semibold text-green-700 transition-colors hover:border-green-600 hover:bg-green-500/20 dark:border-green-500/40 dark:bg-green-500/10 dark:text-green-400 dark:hover:bg-green-500/20">
            <Check size={18} strokeWidth={2.2} />
            Mark as Learned
          </button>
          <button
            type="submit"
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-700 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-800">
            <Plus size={19} strokeWidth={2} />
            Create Subskill
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
    </div>
  );
}
