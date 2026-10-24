import { Code2, Monitor, Palette, Plus, X } from "lucide-react";
import CreateSkillModal from "../components/skills/CreateSkillModal";

export default function Skills() {
  return (
    <main className="flex w-full flex-1 flex-col">
      <section className="mx-auto mt-5 h-[535px] w-full max-w-4xl rounded-3xl border border-zinc-200 bg-zinc-100 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex h-full w-full flex-col rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
          <div className="flex flex-wrap items-center gap-2 border-b border-zinc-200 pb-4 dark:border-zinc-700">
            <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-400">
              <Code2 size={18} />
              <span>Programming</span>
              <X
                size={15}
                className="cursor-pointer opacity-60 transition-opacity hover:opacity-100"
              />
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-800 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
              <Monitor size={18} />
              <span>Technology</span>
              <X
                size={15}
                className="cursor-pointer text-zinc-400 transition-colors hover:text-red-600 dark:text-zinc-500 dark:hover:text-red-400"
              />
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-800 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
              <Palette size={18} />
              <span>Design</span>
              <X
                size={15}
                className="cursor-pointer text-zinc-400 transition-colors hover:text-red-600 dark:text-zinc-500 dark:hover:text-red-400"
              />
            </div>
            <div className="flex h-[46px] w-[46px] cursor-pointer items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-800 shadow-sm transition-colors hover:border-red-300 hover:text-red-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-red-700 dark:hover:text-red-400">
              <Plus size={20} />
            </div>
            <span className="ml-auto text-xs font-medium text-zinc-500 dark:text-zinc-400">
              0 / 10 skills
            </span>
          </div>
          <div className="min-h-0 flex-1" />
        </div>
        <CreateSkillModal />
      </section>
    </main>
  );
}