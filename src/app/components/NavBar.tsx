import Link from "next/link";

export default function NavBar() {

  return (
    <nav className="bg-red-700 max-w-3xl mx-auto mt-5 rounded-lg p-5 shadow-lg">
        <div className="flex flex-row justify-between items-center text-white">
          <h1>Skill Tracker</h1>
          <div className="flex flex-row gap-5">
            <Link href="/" className="hover:bg-white/30 rounded-md p-1">
              Home
            </Link>
            <Link href="/About" className="hover:bg-white/30 rounded-md p-1">
              About
            </Link>
            <Link href="/Contact" className="hover:bg-white/30 rounded-md p-1">
              Contact
            </Link>
          </div>
        </div>
    </nav>
  );
}