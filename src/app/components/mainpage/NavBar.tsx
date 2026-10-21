import Link from "next/link";

export default function NavBar() {

  return (
    <nav className="bg-red-700 max-w-4xl mx-auto mt-5 rounded-3xl p-5 shadow-lg">
        <div className="flex flex-row justify-between items-center text-white">
          <h1>Skill Tracker</h1>
          <div className="flex flex-row gap-5">
            <Link href="/" className="hover:bg-white/20 rounded-md p-1">
              Dashboard
            </Link>
            <Link href="/Skills" className="hover:bg-white/20 rounded-md p-1">
              Skills
            </Link>
            <Link href="/About" className="hover:bg-white/20 rounded-md p-1">
              About 
            </Link>
          </div>
        </div>
    </nav>
  );
}