import SkillsPage from "../components/skills/SkillsPage";

export default function Skills() {
  return (
    <main className="flex w-full flex-1 flex-col">
      <section className="mx-auto mt-5 h-[535px] w-full max-w-4xl rounded-3xl border border-zinc-200 bg-zinc-100 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <SkillsPage />
      </section>
    </main>
  );
}
