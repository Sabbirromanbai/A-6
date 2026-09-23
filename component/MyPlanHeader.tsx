"use client";

import React from "react";
import { usePlan } from "@/context/PlanContext";

export default function MyPlanHeader() {
  const { activeTab, setActiveTab, todayPlans, savedPlans } = usePlan();

  const currentList = activeTab === "today" ? todayPlans : savedPlans;

  // Stats calculation
  const totalExercises = currentList.length;
  const totalMinutes = currentList.reduce(
    (acc, curr) => acc + curr.duration,
    0,
  );
  const totalCalories = currentList.reduce(
    (acc, curr) => acc + curr.calories,
    0,
  );

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-white">
          MY PLAN
        </h1>
        <p className="text-zinc-500 text-xs sm:text-sm mt-1">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 bg-[#141414] border border-zinc-800/80 rounded-2xl p-4 sm:p-5">
        <div>
          <span className="text-[10px] sm:text-xs text-zinc-500 font-medium uppercase tracking-wider block mb-1">
            EXERCISES
          </span>
          <span className="text-2xl sm:text-4xl font-black text-[#cfff04]">
            {totalExercises}
          </span>
        </div>

        <div className="border-l border-zinc-800/80 pl-4 sm:pl-6">
          <span className="text-[10px] sm:text-xs text-zinc-500 font-medium uppercase tracking-wider block mb-1">
            MINUTES
          </span>
          <span className="text-2xl sm:text-4xl font-black text-white">
            {totalMinutes}
          </span>
        </div>

        <div className="border-l border-zinc-800/80 pl-4 sm:pl-6">
          <span className="text-[10px] sm:text-xs text-zinc-500 font-medium uppercase tracking-wider block mb-1">
            CALORIES
          </span>
          <span className="text-2xl sm:text-4xl font-black text-white">
            {totalCalories}
          </span>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
        <div className="flex items-center gap-2 bg-[#141414] p-1 rounded-xl border border-zinc-800/80">
          <button
            onClick={() => setActiveTab("today")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "today"
                ? "bg-zinc-800 text-white shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "saved"
                ? "bg-zinc-800 text-white shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        <div className="text-xs text-zinc-400 font-medium flex items-center gap-1.5">
          <span className="text-zinc-500">Sort By:</span>
          <span className="text-white font-semibold cursor-pointer flex items-center gap-1">
            Duration <span className="text-[10px]">▼</span>
          </span>
        </div>
      </div>
    </div>
  );
}
