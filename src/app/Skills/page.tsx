import SkillsPage from "../components/skills/SkillsPage";

export default function Skills() {
  return (
    <main className="flex w-full flex-1 flex-col">
      <section className="mx-auto mt-4 flex min-h-[535px] w-[calc(100%-2rem)] max-w-4xl min-[1800px]:max-w-7xl flex-col rounded-3xl border border-zinc-200 bg-zinc-100 p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:mt-5 sm:p-5 md:h-[535px] min-[1800px]:h-[690px] min-[1800px]:min-h-[690px] min-[1800px]:p-7">
        <SkillsPage />
      </section>
    </main>
  );
}
