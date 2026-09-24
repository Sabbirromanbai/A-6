import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center bg-[#0d0d0d] text-white px-4">
      <div className="text-center space-y-5 max-w-md">
        <h1 className="text-7xl font-black text-[#cfff04] tracking-tighter">404</h1>
        <h2 className="text-2xl font-bold uppercase tracking-wide">Page Not Found</h2>
        <p className="text-zinc-400 text-sm">
          The page you are looking for doesn&apos;t exist or has been moved to another lift.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#cfff04] text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-xl hover:bg-[#b5e000] transition-all transform active:scale-95 shadow-lg"
          >
            Go To Workouts
          </Link>
        </div>
      </div>
    </main>
  );
}