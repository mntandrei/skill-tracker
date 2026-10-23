import Link from "next/link";

export default function Home() {
  return (
    <main className="flex w-full flex-1 flex-col">
      <section className="mx-auto mt-5 grid min-h-[535px] w-full max-w-4xl grid-cols-1 gap-4 rounded-3xl border border-zinc-200 bg-zinc-100 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 md:grid-cols-2 lg:h-[535px]">
        <div className="flex flex-col justify-center rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 sm:p-12">
          <span className="w-fit rounded-full bg-red-50 px-4 py-3 text-xs font-semibold text-red-700 transition-transform duration-200 hover:scale-103 dark:bg-red-950/30">
            YOUR LEARNING JOURNEY
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-900 transition-transform duration-300 hover:scale-103 dark:text-white sm:text-5xl">
            Every skill starts
            <span className="block text-red-700">
              with progress.
            </span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-8 text-zinc-500 dark:text-zinc-400">
            Build better learning habits, track your skills,
            and stay motivated throughout your journey.
          </p>
          <Link
            href="/Dashboard"
            className="mt-8 inline-flex w-fit items-center justify-center rounded-xl bg-red-700 px-7 py-3 font-semibold text-white transition-colors duration-300 hover:scale-103 hover:bg-red-800">
            Get Started
            <span className="ml-3" aria-hidden="true">
              →
            </span>
          </Link>
          <p className="mt-5 text-xs text-zinc-400 dark:text-zinc-500">
            Track your learning. One day at a time.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-1 flex-col justify-center rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
            <span className="mb-5 flex size-10 items-center justify-center rounded-xl bg-red-50 text-lg font-bold text-red-700 transition-transform duration-300 hover:scale-115 dark:bg-red-950/30">
              01
            </span>
            <h2 className="text-xl font-semibold transition-transform duration-200 hover:scale-103 dark:text-white">
              Track your skills
            </h2>
            <p className="mt-3 text-sm leading-7 text-zinc-500 dark:text-zinc-400">
              Keep your learning goals organized in one place.
            </p>
          </div>
          <div className="flex flex-1 flex-col justify-center rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
            <span className="mb-5 flex size-10 items-center justify-center rounded-xl bg-red-50 text-lg font-bold text-red-700 transition-transform duration-300 hover:scale-115 dark:bg-red-950/30">
              02
            </span>
            <h2 className="text-xl font-semibold transition-transform duration-200 hover:scale-103 dark:text-white">
              Build consistency
            </h2>
            <p className="mt-3 text-sm leading-7 text-zinc-500 dark:text-zinc-400">
              Monitor your study streak and watch your progress grow.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
