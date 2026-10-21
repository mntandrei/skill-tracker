export default function ProgressTab() {
  return (
    <div className="min-h-32 rounded-xl border border-gray-200 border-l-4 border-l-red-400 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold">Progress: 67%</h2>
      <div className="h-5 w-full overflow-hidden rounded-full bg-gray-200 mt-5">
        <div className="h-full w-[67%] rounded-full bg-red-600" />
      </div>
    </div>
  );
}