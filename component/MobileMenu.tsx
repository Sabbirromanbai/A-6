"use client";

import { useState } from "react";
import NavLinks from "@/component/NavLink";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="md:hidden">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
        aria-label="Toggle Menu"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-[#121212] border-b border-zinc-800 px-6 py-4 flex flex-col gap-4">
          <NavLinks onItemClick={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
}