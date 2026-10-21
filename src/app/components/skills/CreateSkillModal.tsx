"use client";
import { useState } from "react";

export default function CreateSkillModal() {
    const [isOpen, setIsOpen] = useState(true);
    if (!isOpen) return null;
    
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="relative w-full max-w-md rounded-2xl border border-gray-200 bg-white p-7 shadow-2xl">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-2xl text-red-700">
            +
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Create your first skill
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Start tracking your learning journey.
          </p>
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="skill-name" className="text-sm font-medium text-gray-700">
              Skill name
            </label>
            <input
              id="skill-name"
              type="text"
              placeholder="e.g. JavaScript"
              className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition-colors focus:border-red-500 focus:ring-2 focus:ring-red-500/20"/>
          </div>
          <button
            type="button"
            aria-label="Close modal"
            className="absolute right-3 top-1 text-2xl text-gray-400 transition-colors hover:text-red-700"
            onClick={() => setIsOpen(false)}>
            &times;
          </button>
          <button
            type="button"
            className="w-full rounded-lg bg-red-700 py-3 font-medium text-white transition-colors hover:bg-red-800">
            Create Skill
          </button>
        </div>
      </div>
    </div>
  );
}
