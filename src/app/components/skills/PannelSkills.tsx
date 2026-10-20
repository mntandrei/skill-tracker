
import SelectTab from "./SelectTab";
import StreakTab from "./StreakTab";
import ProgressTab from "./ProgressTab";

export default function PannelSkills() {
  return (
    <section className="mx-auto mt-5 grid w-full max-w-4xl grid-cols-1 gap-4 rounded-3xl bg-gray-100 p-5 shadow-lg md:grid-cols-2">
      <SelectTab />
      <StreakTab />

      <div className="md:col-span-2">
        <ProgressTab />
      </div>
    </section>
  );
}
