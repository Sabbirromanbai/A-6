export default function Loading() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-spinner loading-lg text-[#cfff04]" />

        <p className="text-sm font-bold text-zinc-400 uppercase tracking-wider">
          Loading workouts...
        </p>
      </div>
    </main>
  );
}