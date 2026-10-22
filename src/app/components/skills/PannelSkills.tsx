import SelectTab from "./SelectTab";
import StreakTab from "./StreakTab";
import ProgressTab from "./ProgressTab";

export default function PannelSkills() {
  return (
    <section className="mx-auto mt-5 grid min-h-[535px] w-full max-w-4xl grid-cols-1 gap-4 rounded-3xl border border-zinc-200 bg-zinc-100 p-5 shadow-sm md:grid-cols-2 md:grid-rows-[auto_minmax(0,1fr)_auto] lg:h-[535px]">
      <h1 className="text-xl font-semibold text-zinc-900 md:col-span-2">
        Dashboard
      </h1>
      <SelectTab />
      <StreakTab />
      <div className="md:col-span-2">
        <ProgressTab />
      </div>
    </section>
  );
}
