"use client";

import { useState } from "react";

export default function PlanBadge() {
  const [planCount, setPlanCount] = useState<number>(0);
  const [savedCount, setSavedCount] = useState<number>(0);

  return (
    <div className="flex items-center gap-2 bg-[#181818] border border-zinc-800 rounded-full px-3 py-1.5 text-xs font-semibold text-white">
      {/* Plan Section */}
      <div className="flex items-center gap-2">
        <span className="text-zinc-300">Plan</span>
        <span className="w-5 h-5 rounded-full bg-[#cfff04] text-black flex items-center justify-center text-[11px] font-bold">
          {planCount}
        </span>
      </div>

      {/* Saved Section */}
      <div className="flex items-center gap-2 ml-1">
        <span className="text-zinc-300">Saved</span>
        <span className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center text-[11px] font-bold">
          {savedCount}
        </span>
      </div>
    </div>
  );
}