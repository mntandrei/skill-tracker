import SelectTab from "./SelectTab";
import StreakTab from "./StreakTab";
import ProgressTab from "./ProgressTab";

export default function PannelSkills() {
  return (
    <section className="mx-auto mt-4 grid w-[calc(100%-2rem)] max-w-4xl grid-cols-1 gap-3 rounded-3xl border border-zinc-200 bg-zinc-100 p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:mt-5 sm:gap-4 sm:p-5 md:min-h-[535px] md:grid-cols-2 md:grid-rows-[auto_minmax(0,1fr)_auto] lg:h-[535px]">
      <div className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 md:col-span-2">
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">
          Dashboard
        </h1>
      </div>
      <SelectTab />
      <StreakTab />
      <div className="md:col-span-2">
        <ProgressTab />
      </div>
    </section>
  );
}
