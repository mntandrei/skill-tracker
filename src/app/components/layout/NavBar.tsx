import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "../ui/ThemeToggle";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/Dashboard" },
  { label: "Skills", href: "/Skills" },
  { label: "About", href: "/About" },
];

export default function NavBar() {
  return (
    <nav className="mx-auto mt-4 w-[calc(100%-2rem)] max-w-4xl rounded-2xl border border-zinc-200 bg-white px-3 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-[0_8px_30px_rgba(0,0,0,0.25)] sm:mt-5 sm:px-6">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
        <Link
          href="/"
          aria-label="Skill Tracker Home"
          className="order-1 flex shrink-0 items-center gap-2 sm:gap-3">
          <Image
            src="/icon.svg"
            alt=""
            width={40}
            height={40}
            loading="eager"
            className="size-9 object-contain transition-transform duration-300 hover:scale-110"/>
          <span className="text-base font-bold tracking-tight transition-transform duration-300 hover:scale-105 sm:text-lg">
            <span className="text-zinc-900 dark:text-white">
              Skill
            </span>
            <span className="text-red-700">
              Tracker
            </span>
          </span>
        </Link>
        <div className="order-3 w-full min-w-0 overflow-x-auto md:order-2 md:ml-auto md:w-auto md:overflow-visible">
          <div className="flex min-w-max items-center justify-between gap-1 md:justify-start md:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl px-2.5 py-2.5 text-sm font-medium text-zinc-600 transition-colors duration-200 hover:bg-red-50 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-red-700 md:px-4 md:py-2">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="order-2 ml-auto md:order-3 md:ml-1 md:border-l md:border-zinc-200 md:pl-3 md:dark:border-zinc-700">
          <ThemeToggle/>
        </div>
      </div>
    </nav>
  );
}
