import Image from "next/image";
import Link from "next/link";
import Banner from "@/public/assets/banner.png";

export default function HeroBanner() {
  return (
    <section className="w-full container mx-auto px-4 sm:px-6 pt-6 pb-12">
      <div className="relative w-full bg-[#161616] border border-zinc-800 rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left Content Column */}
        <div className="z-10 max-w-2xl text-left">
          {/* Top Yellow Tag */}
          <span className="text-[#cfff04] text-xs font-bold uppercase tracking-widest block mb-4">
            WORKOUT LIBRARY
          </span>

          {/* Main Hero Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-[1.1]">
            TRAIN WITH INTENT. <br />
            <span className="text-white">LOG EVERY SET.</span>
          </h1>

          {/* Subtitle / Description */}
          <p className="mt-6 text-zinc-400 text-sm sm:text-base max-w-lg leading-relaxed">
            FitLog is a dark, no-nonsense gym companion. Pick a lift, lock it into today’s plan, and watch the week’s work add up.
          </p>

          {/* Action Button */}
          <div className="mt-8">
            <Link
              href="#workouts"
              className="inline-flex items-center justify-center bg-[#cfff04] hover:bg-[#b5e000] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-lg transition-all transform active:scale-95 shadow-md"
            >
              BROWSE WORKOUTS
            </Link>
          </div>
        </div>

        {/* Right Hero Image */}
        <div className="relative w-full md:w-[420px] h-[280px] sm:h-[350px] md:h-[380px] flex justify-center items-center">
          <Image
            src={Banner}
            alt="Workout Anatomy Illustration"
            fill
            className="object-contain"
            priority
          />
        </div>

      </div>
    </section>
  );
}