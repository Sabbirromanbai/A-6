"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";

export default function PlanBadge() {
  const { todayPlans, savedPlans, hydrated } = usePlan();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // RequestAnimationFrame use korle React compiler cascading render error dibe na
    const timer = requestAnimationFrame(() => {
      setIsMounted(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  // Browser fully mount hoye local storage sync na haowa porjonto force 0 thakbe
  const todayCount = isMounted && hydrated ? todayPlans.length : 0;
  const savedCount = isMounted && hydrated ? savedPlans.length : 0;

  return (
    <div className="flex items-center gap-2">
      {/* Plan Badge */}
      <Link
        href="/my-plan"
        className="flex items-center gap-2 bg-[#cfff04] text-black px-3 py-2 rounded-lg text-xs font-extrabold transition-all hover:bg-[#b5e000]"
      >
        <span>Plan</span>
        <span className="w-5 h-5 rounded-full bg-black/15 flex items-center justify-center text-[11px] font-bold">
          {todayCount}
        </span>
      </Link>

      {/* Saved Badge */}
      <Link
        href="/my-plan"
        className="flex items-center gap-2 border border-zinc-800 hover:border-zinc-700 px-3 py-2 rounded-lg text-xs font-extrabold transition-all"
      >
        <span className="text-zinc-300 hover:text-white">Saved</span>
        <span className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center text-[11px] font-bold">
          {savedCount}
        </span>
      </Link>
    </div>
  );
}