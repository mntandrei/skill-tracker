import NavBar from "./components/mainpage/NavBar";
import PannelSkills from "./components/skills/PannelSkills";

export default function Home() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-[1070px] flex-col px-4 pb-6 md:h-dvh md:overflow-hidden md:pb-28">
      <div className="shrink-0">
        <NavBar />
      </div>

      <main className="mt-4 min-h-0 flex-1">
        <PannelSkills />
      </main>
    </div>
  );
}
