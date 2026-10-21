'use client';
import { useState } from 'react';


export default function StreakTab() {
  const [streak, setStreak] = useState<number>(1);

  return (
    <div className="min-h-52 rounded-xl border border-gray-200 border-l-4 border-l-red-400 bg-white p-5 shadow-sm">
      <h1 className="text-xl font-semibold">Streak</h1>
      <p className="mt-3 text-gray-700">Current streak:</p>
      <h1 className="text-5xl font-bold mt-2">{streak}🔥days</h1>
      <button
        className="mt-5 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        onClick={() => setStreak(streak + 1)}>
        Increase Streak
      </button>
    </div>
  );
}
