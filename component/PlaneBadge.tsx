"use client";

import React from "react";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";

export default function PlanBadge() {
  const {
    todayPlans,
    savedPlans,
    hydrated,
  } = usePlan();

  const todayCount = hydrated
    ? todayPlans.length
    : 0;

  const savedCount = hydrated
    ? savedPlans.length
    : 0;

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/my-plan"
        className="px-3 py-2 rounded-full bg-[#cfff04] text-black text-xs font-black"
      >
        Plan {todayCount}
      </Link>

      <Link
        href="/my-plan"
        className="px-3 py-2 rounded-full border border-zinc-700 text-zinc-300 text-xs font-black hover:border-[#cfff04] hover:text-white transition"
      >
        Saved {savedCount}
      </Link>
    </div>
  );
}
