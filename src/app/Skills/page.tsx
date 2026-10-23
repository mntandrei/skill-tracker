import CreateSkillModal from "../components/skills/CreateSkillModal";

export default function Skills() {
  return (
    <main className="flex w-full flex-1 flex-col">
      <section className="mx-auto mt-5 min-h-[535px] w-full max-w-4xl rounded-3xl border border-zinc-200 bg-zinc-100 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-white">
          Skills
        </h2>
        <CreateSkillModal />
      </section>
    </main>
  );
}
