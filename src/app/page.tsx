import Link from "next/link";

export default function Home() {
  return (
    <main className="flex w-full flex-1 flex-col">
      <section className="mx-auto mt-4 grid w-[calc(100%-2rem)] max-w-4xl min-[1800px]:max-w-7xl grid-cols-1 gap-3 rounded-3xl border border-zinc-200 bg-zinc-100 p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:mt-5 sm:gap-4 sm:p-5 md:min-h-[535px] md:grid-cols-2 lg:h-[535px] min-[1800px]:h-[690px] min-[1800px]:min-h-[690px] min-[1800px]:gap-6 min-[1800px]:p-7">
        <div className="flex flex-col justify-center rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 sm:p-8 lg:p-12 min-[1800px]:p-16">
          <span className="w-fit rounded-full bg-red-50 px-4 py-3 text-xs font-semibold text-red-700 transition-transform duration-200 hover:scale-103 dark:bg-red-950/30 min-[1800px]:px-5 min-[1800px]:py-3 min-[1800px]:text-sm">
            YOUR LEARNING JOURNEY
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 transition-transform duration-300 hover:scale-103 dark:text-white sm:text-4xl lg:text-5xl min-[1800px]:text-6xl">
            Every skill starts
            <span className="block text-red-700">
              with progress.
            </span>
          </h1>
          <p className="mt-5 max-w-md text-sm leading-7 sm:text-base sm:leading-8 min-[1800px]:max-w-lg min-[1800px]:text-lg min-[1800px]:leading-9 text-zinc-500 dark:text-zinc-400">
            Build better learning habits, track your skills,
            and stay motivated throughout your journey.
          </p>
          <Link
            href="/Dashboard"
            className="mt-8 inline-flex w-fit items-center justify-center rounded-xl bg-red-700 px-5 py-3 sm:px-7 min-[1800px]:px-9 min-[1800px]:py-4 min-[1800px]:text-lg font-semibold text-white transition-colors duration-300 hover:scale-103 hover:bg-red-800">
            Get Started
            <span className="ml-3" aria-hidden="true">
              →
            </span>
          </Link>
          <p className="mt-5 text-xs text-zinc-400 min-[1800px]:text-sm dark:text-zinc-500">
            Track your learning. One day at a time.
          </p>
        </div>
        <div className="flex min-w-0 flex-col gap-3 sm:gap-4 min-[1800px]:gap-6">
          <div className="flex min-h-[165px] flex-1 flex-col justify-center rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-7 md:min-h-0 min-[1800px]:p-10 dark:border-zinc-700 dark:bg-zinc-800">
            <span className="mb-5 flex size-10 items-center justify-center min-[1800px]:size-12 rounded-xl bg-red-50 text-lg font-bold text-red-700 transition-transform duration-300 hover:scale-115 dark:bg-red-950/30">
              01
            </span>
            <h2 className="text-xl font-semibold transition-transform min-[1800px]:text-2xl duration-200 hover:scale-103 dark:text-white">
              Track your skills
            </h2>
            <p className="mt-3 text-sm leading-7 text-zinc-500 min-[1800px]:text-base min-[1800px]:leading-8 dark:text-zinc-400">
              Keep your learning goals organized in one place.
            </p>
          </div>
          <div className="flex min-h-[165px] flex-1 flex-col justify-center rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-7 md:min-h-0 min-[1800px]:p-10 dark:border-zinc-700 dark:bg-zinc-800">
            <span className="mb-5 flex size-10 items-center justify-center min-[1800px]:size-12 rounded-xl bg-red-50 text-lg font-bold text-red-700 transition-transform duration-300 hover:scale-115 dark:bg-red-950/30">
              02
            </span>
            <h2 className="text-xl font-semibold transition-transform min-[1800px]:text-2xl duration-200 hover:scale-103 dark:text-white">
              Build consistency
            </h2>
            <p className="mt-3 text-sm leading-7 text-zinc-500 min-[1800px]:text-base min-[1800px]:leading-8 dark:text-zinc-400">
              Monitor your study streak and watch your progress grow.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
