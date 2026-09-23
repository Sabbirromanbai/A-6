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
      {/* ================= PAGE TITLE ================= */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-white">
          MY PLAN
        </h1>

        <p className="text-zinc-500 text-xs sm:text-sm mt-1">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* ================= STATS SECTION ================= */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 bg-[#141414] border border-zinc-800/80 rounded-2xl p-4 sm:p-5 shadow-lg">
        {/* Exercises */}
        <div>
          <span className="text-[10px] sm:text-xs text-zinc-500 font-medium uppercase tracking-wider block mb-1">
            EXERCISES
          </span>

          <span className="text-2xl sm:text-4xl font-black text-[#cfff04]">
            {totalExercises}
          </span>
        </div>

        {/* Minutes */}
        <div className="border-l border-zinc-800/80 pl-4 sm:pl-6">
          <span className="text-[10px] sm:text-xs text-zinc-500 font-medium uppercase tracking-wider block mb-1">
            MINUTES
          </span>

          <span className="text-2xl sm:text-4xl font-black text-white">
            {totalMinutes}
          </span>
        </div>

        {/* Calories */}
        <div className="border-l border-zinc-800/80 pl-4 sm:pl-6">
          <span className="text-[10px] sm:text-xs text-zinc-500 font-medium uppercase tracking-wider block mb-1">
            CALORIES
          </span>

          <span className="text-2xl sm:text-4xl font-black text-white">
            {totalCalories}
          </span>
        </div>
      </div>

      {/* ================= TABS & DROPDOWN ================= */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4 flex-wrap gap-4">
        {/* LEFT SIDE TABS */}
        <div className="flex items-center gap-1.5 bg-[#141414] p-1.5 rounded-2xl border border-zinc-800/80">
          {/* Today's Plan */}
          <button
            onClick={() => setActiveTab("today")}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-300 ${
              activeTab === "today"
                ? "bg-zinc-800 text-white shadow-lg border border-zinc-700/50"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            Today&apos;s Plan ({todayPlans.length})
          </button>

          {/* Saved */}
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-300 ${
              activeTab === "saved"
                ? "bg-zinc-800 text-white shadow-lg border border-zinc-700/50"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            Saved ({savedPlans.length})
          </button>
        </div>

        {/* ================= PREMIUM DROPDOWN ================= */}
        <div className="flex items-center gap-3">
          {/* Label */}
          <span className="hidden sm:block text-[11px] font-bold text-zinc-500 uppercase tracking-[0.15em]">
            Sort By
          </span>

          {/* Dropdown Wrapper */}
          <div className="relative group">
            {/* Neon Glow */}
            <div className="absolute -inset-[1px] rounded-2xl bg-[#cfff04]/0 group-hover:bg-[#cfff04]/20 blur-sm transition-all duration-500" />

            <div className="relative">
              <select
                value={activeTab}
                onChange={(e) =>
                  setActiveTab(e.target.value as "today" | "saved")
                }
                className="
                  appearance-none
                  min-w-[170px]
                  bg-[#111111]
                  text-white
                  text-xs
                  sm:text-sm
                  font-bold
                  px-5
                  py-3
                  pr-12
                  rounded-2xl
                  border
                  border-zinc-800
                  hover:border-[#cfff04]/50
                  focus:border-[#cfff04]
                  focus:ring-2
                  focus:ring-[#cfff04]/10
                  outline-none
                  cursor-pointer
                  transition-all
                  duration-300
                  shadow-[0_8px_25px_rgba(0,0,0,0.35)]
                  group-hover:shadow-[0_8px_30px_rgba(207,255,4,0.08)]
                "
              >
                <option value="today" className="bg-[#111111] text-white">
                  Today&apos;s Plan
                </option>

                <option value="saved" className="bg-[#111111] text-white">
                  Saved for Later
                </option>
              </select>

              {/* Custom Arrow */}
              <div
                className="
                  pointer-events-none
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  flex
                  items-center
                  justify-center
                  w-6
                  h-6
                  rounded-full
                  bg-zinc-800
                  text-zinc-400
                  group-hover:bg-[#cfff04]
                  group-hover:text-black
                  transition-all
                  duration-300
                "
              >
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
