"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinksProps {
  onItemClick?: () => void;
}

interface NavItem {
  name: string;
  href: string;
}

export default function NavLinks({ onItemClick }: NavLinksProps) {
  const pathname = usePathname();

  const links: NavItem[] = [
    { name: "Workouts", href: "/" },
    { name: "My Plan", href: "/my-plan" },
  ];

  return (
    <>
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onItemClick}
            className={`transition-colors text-sm font-medium hover:text-[#a8ff00] ${
              isActive ? "text-[#a8ff00]" : "text-zinc-400"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </>
  );
}