import { Trash2 } from "lucide-react";

type DeleteSkillModalProps = {
  skillName: string;
  onClose: () => void;
  onDelete: () => void;
};

export default function DeleteSkillModal({skillName, onClose, onDelete,}: DeleteSkillModalProps) {
    
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-zinc-950/60 p-3 sm:items-center sm:p-4">
      <div className="relative max-h-[calc(100dvh-1.5rem)] w-full max-w-md overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xl sm:max-h-[calc(100dvh-2rem)] sm:p-7 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400">
            <Trash2 size={24} strokeWidth={1.8} />
          </div>
          <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl dark:text-white">
            Delete Skill
          </h2>
          <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-red-700 dark:text-red-400">
              {skillName}
            </span>
            ?
          </p>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            This will also delete all its subskills.
            This action cannot be undone.
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onClose}
            className="min-w-0 flex-1 cursor-pointer rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700">
            Cancel
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="flex min-w-0 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-700 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-red-800">
            <Trash2 size={16} />
            Delete Skill
          </button>
        </div>
        <button
          type="button"
          aria-label="Close modal"
          onClick={onClose}
          className="absolute right-2 top-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-2xl text-zinc-400 transition-all duration-300 sm:right-3 sm:top-1 hover:scale-120 hover:text-red-700 dark:text-zinc-500 dark:hover:text-red-700">
          &times;
        </button>
      </div>
    </div>
  );
}
