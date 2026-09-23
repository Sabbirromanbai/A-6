import Image from "next/image";
import { notFound } from "next/navigation";
import { Workout } from "@/Type/Type";

interface DetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Single Workout fetcher function
async function getWorkoutDetail(id: string): Promise<Workout | null> {
  try {
    const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function DetailsPage({ params }: DetailsPageProps) {
  const { id } = await params;
  const workout = await getWorkoutDetail(id);

  if (!workout) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-white py-6 sm:py-8">
      {/* Container max-width কমিয়ে max-w-5xl করা হয়েছে যেন স্ক্রিনে বেশি বড় না লাগে */}
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-[#141414] border border-zinc-800/80 rounded-2xl p-5 sm:p-6 lg:p-7">
          {/* Main Grid Gap কমানো হয়েছে */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
            {/* Left Column: Image Aspect-Ratio [4/3] বা Aspect-Square কমানো হয়েছে */}
            <div className="relative w-full aspect-4/3 lg:aspect-square bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800">
              <Image
                src={workout.image}
                alt={workout.name}
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Right Column: Spacing কমানো হয়েছে */}
            <div className="flex flex-col gap-4">
              {/* Title & Description */}
              <div>
                <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-white">
                  {workout.name}
                </h1>
                <p className="text-zinc-400 text-xs mt-1.5 leading-relaxed">
                  {workout.description}
                </p>
              </div>

              {/* Muscle Group Badges */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {workout.muscleGroups?.map((muscle, idx) => (
                  <span
                    key={idx}
                    className="bg-[#cfff04] text-black text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider"
                  >
                    {muscle}
                  </span>
                ))}
              </div>

              {/* Info Table (Compact Padding) */}
              <div className="bg-[#101010] border border-zinc-800/80 rounded-lg overflow-hidden text-xs">
                <div className="flex justify-between items-center px-3 py-2 border-b border-zinc-800/60">
                  <span className="text-zinc-400 font-medium uppercase tracking-wider text-[10px]">
                    Equipment
                  </span>
                  <span className="text-white font-semibold">
                    {workout.equipment}
                  </span>
                </div>
                <div className="flex justify-between items-center px-3 py-2 border-b border-zinc-800/60">
                  <span className="text-zinc-400 font-medium uppercase tracking-wider text-[10px]">
                    Difficulty
                  </span>
                  <span className="text-white font-semibold">
                    {workout.difficulty}
                  </span>
                </div>
                <div className="flex justify-between items-center px-3 py-2 border-b border-zinc-800/60">
                  <span className="text-zinc-400 font-medium uppercase tracking-wider text-[10px]">
                    Sets
                  </span>
                  <span className="text-white font-semibold">
                    {workout.sets}
                  </span>
                </div>
                <div className="flex justify-between items-center px-3 py-2 border-b border-zinc-800/60">
                  <span className="text-zinc-400 font-medium uppercase tracking-wider text-[10px]">
                    Reps
                  </span>
                  <span className="text-white font-semibold">
                    {workout.reps}
                  </span>
                </div>
                <div className="flex justify-between items-center px-3 py-2 border-b border-zinc-800/60">
                  <span className="text-zinc-400 font-medium uppercase tracking-wider text-[10px]">
                    Duration
                  </span>
                  <span className="text-white font-semibold">
                    {workout.duration} min
                  </span>
                </div>
                <div className="flex justify-between items-center px-3 py-2 border-b border-zinc-800/60">
                  <span className="text-zinc-400 font-medium uppercase tracking-wider text-[10px]">
                    Calories
                  </span>
                  <span className="text-white font-semibold">
                    {workout.caloriesBurned} kcal
                  </span>
                </div>
                <div className="flex justify-between items-center px-3 py-2">
                  <span className="text-zinc-400 font-medium uppercase tracking-wider text-[10px]">
                    Rating
                  </span>
                  <span className="text-white font-semibold">
                    ⭐ {workout.rating}
                  </span>
                </div>
              </div>

              {/* Instructions Section */}
              <div className="mt-1">
                <h3 className="text-[11px] font-bold text-zinc-300 uppercase tracking-widest mb-2">
                  INSTRUCTIONS
                </h3>
                <ol className="space-y-1 text-xs text-zinc-400 list-decimal list-inside leading-relaxed">
                  {workout.instructions?.map((step, index) => (
                    <li key={index} className="pl-0.5">
                      <span className="text-zinc-300">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Action Buttons (Compact Padding) */}
              <div className="flex items-center gap-2.5 pt-2 flex-wrap">
                <button className="bg-[#cfff04] hover:bg-[#b5e000] text-black font-extrabold text-xs px-5 py-2.5 rounded-lg transition-all active:scale-95 flex items-center gap-2 shadow-sm">
                  <svg
                    className="w-4 h-4 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm-3-3h.008v.008H9V12Zm0 3h.008v.008H9V15Z"
                    />
                  </svg>
                  <span>Add to today&apos;s plan</span>
                </button>

                <button className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white font-bold text-xs uppercase px-4 py-2.5 rounded-lg transition-all active:scale-95 flex items-center gap-1.5">
                  <span>🔖</span>
                  <span>Save for later</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
