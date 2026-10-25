export default function ProgressTab() {
  return (
    <div className="min-h-[125px] rounded-2xl border border-zinc-200/70 bg-white p-4 shadow-sm sm:min-h-[150px] sm:p-5 min-[1800px]:p-8 dark:border-zinc-700 dark:bg-zinc-800">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold sm:text-2xl min-[1800px]:text-3xl text-zinc-900 dark:text-white">
          Progress
        </h2>
        <span className="text-2xl font-bold sm:text-3xl min-[1800px]:text-4xl text-red-700">
          67%
        </span>
      </div>
      <div className="mt-5 h-5 w-full min-[1800px]:mt-7 min-[1800px]:h-6 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
        <div className="h-full w-[67%] rounded-full bg-red-700" />
      </div>
    </div>
  );
}
