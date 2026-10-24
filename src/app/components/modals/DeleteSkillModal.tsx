import { Trash2 } from "lucide-react";

type DeleteSkillModalProps = {
  skillName: string;
  onClose: () => void;
  onDelete: () => void;
};

export default function DeleteSkillModal({skillName, onClose, onDelete,}: DeleteSkillModalProps) {
    
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 p-4">
      <div className="relative w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-7 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400">
            <Trash2 size={24} strokeWidth={1.8} />
          </div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
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
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 cursor-pointer rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700">
            Cancel
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-700 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-red-800">
            <Trash2 size={16} />
            Delete Skill
          </button>
        </div>
        <button
          type="button"
          aria-label="Close modal"
          onClick={onClose}
          className="absolute right-3 top-1 cursor-pointer text-2xl text-zinc-400 transition-all duration-300 hover:scale-120 hover:text-red-700 dark:text-zinc-500 dark:hover:text-red-700">
          &times;
        </button>
      </div>
    </div>
  );
}
