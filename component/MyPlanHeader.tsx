"use client";

import React from "react";
import { usePlan } from "@/context/PlanContext";

export default function MyPlanHeader() {
  const { activeTab, setActiveTab, todayPlans, savedPlans } = usePlan();

  const currentList = activeTab === "today" ? todayPlans : savedPlans;

  // Dynamic stats calculation
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
      {/* Page Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-white">
          MY PLAN
        </h1>
        <p className="text-zinc-500 text-xs sm:text-sm mt-1">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 bg-[#141414] border border-zinc-800/80 rounded-2xl p-4 sm:p-5 shadow-lg">
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

      {/* Tabs & Sort Row */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4 flex-wrap gap-3">
        {/* Left Side Tab Buttons */}
        <div className="flex items-center gap-1.5 bg-[#141414] p-1.5 rounded-2xl border border-zinc-800/80">
          <button
            onClick={() => setActiveTab("today")}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 ${
              activeTab === "today"
                ? "bg-zinc-800 text-white shadow-md border border-zinc-700/50"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Today&apos;s Plan ({todayPlans.length})
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 ${
              activeTab === "saved"
                ? "bg-zinc-800 text-white shadow-md border border-zinc-700/50"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Saved ({savedPlans.length})
          </button>
        </div>

        {/* Right Side Stylish & Fully Rounded Dropdown */}
        <div className="flex items-center gap-2.5">
          <span className="text-xs sm:text-sm font-bold text-zinc-400 uppercase tracking-wide">
            Sort By
          </span>

          <div className="relative group">
            <select
              value={activeTab}
              onChange={(e) =>
                setActiveTab(e.target.value as "today" | "saved")
              }
              className="appearance-none bg-linear-to-r from-zinc-900 to-[#181818] border border-zinc-800 hover:border-[#cfff04]/50 text-white text-xs sm:text-sm font-black px-5 py-2.5 pr-11 rounded-full outline-none focus:ring-2 focus:ring-[#cfff04]/30 cursor-pointer transition-all duration-300 shadow-md group-hover:shadow-[#cfff04]/5"
            >
              <option
                value="today"
                className="bg-[#181818] text-white font-semibold py-2"
              >
                Today&apos;s Plan
              </option>
              <option
                value="saved"
                className="bg-[#181818] text-white font-semibold py-2"
              >
                Saved for Later
              </option>
            </select>

            {/* Neon Glow Chevron Arrow Icon */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-zinc-400 group-hover:text-[#cfff04] transition-colors duration-200">
              <svg
                className="w-4 h-4 fill-current transform group-hover:translate-y-0.5 transition-transform"
                viewBox="0 0 20 20"
              >
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
