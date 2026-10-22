export default function ProgressTab() {
  
  return (
    <div className="min-h-[150px] rounded-2xl border border-zinc-200/70 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-zinc-900">Progress</h2>
        <span className="text-3xl font-bold text-red-700">67%</span>
      </div>
      <div className="mt-5 h-5 w-full overflow-hidden rounded-full bg-zinc-200">
        <div className="h-full w-[67%] rounded-full bg-red-700" />
      </div>
    </div>
  );
}