import PannelSkills from "../components/skills/PannelSkills";

export default function Dashboard() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-[1070px] flex-col px-4 pb-6 md:h-dvh md:overflow-hidden md:pb-28">
      <main className="min-h-0 flex-1">
        <PannelSkills />
      </main>
    </div>
  );
}
