"use client";
import { useRouter } from "next/navigation";


export default function NavBar() {
    const router = useRouter();
    const handleNavigation = () => {
        router.push("/");
    };

  return (
    <nav className="bg-red-700 max-w-3xl mx-auto mt-5 rounded-lg p-5 shadow-lg">
        <div className="flex flex-row justify-between items-center text-white">
          <h1>Skill Tracker</h1>
          <div className="flex flex-row gap-5">
            <button onClick={handleNavigation} className="hover:bg-white/30 rounded-md p-1">
              Home
            </button>
            <button onClick={() => router.push("/About")} className="hover:bg-white/30 rounded-md p-1">
              About
            </button>
            <button onClick={() => router.push("/Contact")} className="hover:bg-white/30 rounded-md p-1">
              Contact
            </button>
          </div>
        </div>
    </nav>
  );
}