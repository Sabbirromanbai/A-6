import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/assets/logo.png";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0d0d0d] border-t border-zinc-800/80 py-8 text-xs text-zinc-500">
      <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left Side: Logo & Brand Name */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={Logo}
            alt="FITLOG Logo"
            width={24}
            height={24}
            className="object-contain"
          />
          <span className="text-sm font-black tracking-wider text-white uppercase">
            FITLOG
          </span>
        </Link>

        {/* Right Side: Copyright Text */}
        <div className="text-zinc-500 font-normal text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log forever.
        </div>

      </div>
    </footer>
  );
}