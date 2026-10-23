import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "../other/ThemeToggle";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/Dashboard" },
  { label: "Skills", href: "/Skills" },
  { label: "About", href: "/About" },
];

export default function NavBar() {
  return (
    <nav className="mx-auto mt-5 w-full max-w-4xl rounded-2xl border border-zinc-200 bg-white px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-[0_8px_30px_rgba(0,0,0,0.25)] sm:px-6">
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/"
          aria-label="Skill Tracker Home"
          className="flex shrink-0 items-center gap-3">
          <Image
            src="/icon.svg"
            alt=""
            width={40}
            height={40}
            loading="eager"
            className="size-9 object-contain hover:scale-110 transition-transform duration-300"/>
          <span className="hidden text-lg font-bold tracking-tight sm:inline hover:scale-105 transition-transform duration-300">
            <span className="text-zinc-900 dark:text-white">
              Skill
            </span>
            <span className="text-red-700">Tracker</span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 sm:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl px-3 py-2 text-sm font-medium text-zinc-600 transition-colors duration-200 hover:bg-red-50 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-red-700 sm:px-4">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="ml-1 border-l border-zinc-200 pl-3 dark:border-zinc-700">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
