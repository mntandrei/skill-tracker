import NavBar from "./components/mainpage/NavBar";
import PannelSkills from "./components/skills/PannelSkills";

export default function Home() {
  const version = "v0.0.4";
  const release = "ALPHA";

  return (
    <div className="mx-auto flex min-h-dvh max-w-[1070px] flex-col px-4 pb-6 md:h-dvh md:overflow-hidden md:pb-28">
      <div className="shrink-0">
        <NavBar />
      </div>

      <main className="mt-4 min-h-0 flex-1">
        <PannelSkills />
        <div className="fixed right-5 bottom-5 flex items-center gap-2 rounded-xl border border-gray-200 bg-white/90 px-4 py-2 shadow-md backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-yellow-600" />
          <span className="text-xs font-medium text-gray-600">
            Skill Tracker <span className="text-red-700">{version}</span>
          </span>
          <span className="rounded-md bg-yellow-50 px-2 py-0.5 text-[10px] font-semibold text-yellow-700">
            {release}
          </span>
        </div>


      </main>
    </div>
  );
}
