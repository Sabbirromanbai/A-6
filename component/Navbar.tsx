import Image from "next/image";
import Link from "next/link";
import NavLinks from "@/component/NavLink";
import PlanBadge from "@/component/PlaneBadge";
import MobileMenu from "./MobileMenu";
import Logo from "@/public/assets/logo.png";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#121212]/90 backdrop-blur-md border-b border-zinc-800">
      <nav className=" container mx-auto px-4 sm:px-6 h-20 flex items-center justify-between relative">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={Logo}
            alt="FITLOG Logo"
            width={32}
            height={32}
            className="object-contain"
            priority
          />
          <span className="text-xl font-bold tracking-wide text-white">FITLOG</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <NavLinks />
        </div>

        {/* Right Action Items */}
        <div className="flex items-center gap-3">
          <PlanBadge />
          <MobileMenu />
        </div>

      </nav>
    </header>
  );
}