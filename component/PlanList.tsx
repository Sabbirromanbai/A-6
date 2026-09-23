"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";

export default function PlanList() {
  const { activeTab, todayPlans, savedPlans, markAsDone, removeItem } =
    usePlan();

  const currentList = activeTab === "today" ? todayPlans : savedPlans;

  if (currentList.length === 0) {
    return (
      /* Empty State UI */
      <div className="bg-[#141414] border border-zinc-800/80 rounded-2xl p-12 sm:p-16 text-center flex flex-col items-center justify-center space-y-3">
        <h3 className="text-base sm:text-lg font-black uppercase text-white tracking-wider">
          NOTHING HERE YET
        </h3>
        <p className="text-zinc-500 text-xs sm:text-sm max-w-sm">
          Browse the library and add a lift to get today moving
        </p>
        <Link
          href="/WorkoutLibrary"
          className="mt-3 bg-[#cfff04] hover:bg-[#b5e000] text-black font-extrabold text-xs px-5 py-2.5 rounded-lg transition-all active:scale-95 inline-block"
        >
          Go to workouts
        </Link>
      </div>
    );
  }

  return (
    /* Workouts List UI */
    <div className="space-y-3">
      {currentList.map((item) => (
        <div
          key={item.id}
          className="bg-[#141414] border border-zinc-800/80 rounded-xl p-3 sm:p-4 flex items-center justify-between gap-4 hover:border-zinc-700 transition-all"
        >
          {/* Left Side: Image & Meta */}
          <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-zinc-900 shrink-0 border border-zinc-800">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="min-w-0 space-y-1">
              <h4 className="text-sm sm:text-base font-black text-white uppercase tracking-wide truncate">
                {item.name}
              </h4>
              <p className="text-xs text-zinc-400 font-medium truncate">
                {item.equipment}
              </p>

              <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-medium pt-0.5">
                <span>🕒 {item.duration} min</span>
                <span className="text-zinc-600">•</span>
                <span>🔥 {item.calories} kcal</span>
                <span className="text-zinc-600">•</span>
                <span>⭐ {item.rating}</span>
              </div>
            </div>
          </div>

          {/* Right Side: Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href={`/Details/${item.id}`}
              className="hidden sm:inline-block border border-zinc-800 hover:border-zinc-700 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-bold px-3.5 py-2 rounded-lg transition-all"
            >
              View Details
            </Link>

            {activeTab === "today" && (
              <button
                onClick={() => markAsDone(item.id, item.name)}
                disabled={item.isDone}
                className={`text-xs font-extrabold px-3.5 sm:px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                  item.isDone
                    ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                    : "bg-[#cfff04] hover:bg-[#b5e000] text-black active:scale-95"
                }`}
              >
                <span>✓</span>
                <span>{item.isDone ? "Done" : "Mark as Done"}</span>
              </button>
            )}

            <button
              onClick={() => removeItem(item.id, item.name, activeTab)}
              className="p-2 text-zinc-500 hover:text-red-400 hover:bg-zinc-800/60 rounded-lg transition-all"
              title="Remove"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
