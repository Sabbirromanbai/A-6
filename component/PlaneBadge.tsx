"use client";

import Link from "next/link";
import { usePlan } from "@/context/PlanContext";

export default function PlanBadge() {
  const { todayPlans, savedPlans, setActiveTab } = usePlan();

  const planCount = todayPlans.length;
  const savedCount = savedPlans.length;

  return (
    <div className="flex items-center gap-1.5 bg-[#181818] border border-zinc-800 rounded-full px-3 py-1.5 text-xs font-semibold text-white">
      {/* Plan Section */}
      <Link
        href="/my-plan"
        onClick={() => setActiveTab("today")}
        className="flex items-center gap-1.5 hover:text-[#cfff04] transition-colors"
      >
        <span className="text-zinc-300 hover:text-white">Plan</span>
        <span className="w-5 h-5 rounded-full bg-[#cfff04] text-black flex items-center justify-center text-[11px] font-extrabold">
          {planCount}
        </span>
      </Link>

      <span className="text-zinc-700">|</span>

      {/* Saved Section */}
      <Link
        href="/my-plan"
        onClick={() => setActiveTab("saved")}
        className="flex items-center gap-1.5 hover:text-[#cfff04] transition-colors"
      >
        <span className="text-zinc-300 hover:text-white">Saved</span>
        <span className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center text-[11px] font-bold">
          {savedCount}
        </span>
      </Link>
    </div>
  );
}
