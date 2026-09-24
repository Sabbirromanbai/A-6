"use client";

import React from "react";
import { usePlan, PlanItem } from "@/context/PlanContext";
import { toast } from "react-toastify";

interface DetailsActionButtonsProps {
  workout: PlanItem;
}

export default function DetailsActionButtons({
  workout,
}: DetailsActionButtonsProps) {
  const { todayPlans, savedPlans, addToTodayPlan, addToSavedPlan } = usePlan();

  const isCapReached = todayPlans.length >= 5;
  const isAlreadyInToday = todayPlans.some((item) => item.id === workout.id);

  const handleAddToday = () => {
    if (isAlreadyInToday) {
      toast.warning(`${workout.name} is already in today's plan!`);
      return;
    }

    if (isCapReached) {
      toast.error("Cap of 5 lifts reached for today! Finish one before adding more.");
      return;
    }

    // Context method itself handles adding & showing toast
    addToTodayPlan(workout);
  };

  const handleSaveLater = () => {
    // Context method handles saving & showing toast
    addToSavedPlan(workout);
  };

  return (
    <div className="flex items-center gap-2.5 pt-2 flex-wrap">
      {/* Add to Today's Plan Button */}
      <button
        onClick={handleAddToday}
        disabled={isCapReached && !isAlreadyInToday}
        className={`font-extrabold text-xs px-5 py-2.5 rounded-lg transition-all flex items-center gap-2 shadow-sm ${
          isCapReached && !isAlreadyInToday
            ? "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700/50"
            : "bg-[#cfff04] hover:bg-[#b5e000] text-black active:scale-95 cursor-pointer"
        }`}
      >
        <svg
          className="w-4 h-4 text-black"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm-3-3h.008v.008H9V12Zm0 3h.008v.008H9V15Z"
          />
        </svg>
        <span>
          {isCapReached && !isAlreadyInToday
            ? "Cap Reached (5/5)"
            : "Add to today's plan"}
        </span>
      </button>

      {/* Save for Later Button */}
      <button
        onClick={handleSaveLater}
        className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white font-bold text-xs uppercase px-4 py-2.5 rounded-lg transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
      >
        <span>🔖</span>
        <span>Save for later</span>
      </button>
    </div>
  );
}