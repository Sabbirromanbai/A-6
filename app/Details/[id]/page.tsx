import Image from "next/image";
import { notFound } from "next/navigation";
import { Workout } from "@/Type/Type";
import DetailsActionButtons from "@/component/DetailsActionButtons";

interface DetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

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

  // Formatting workout object for Context/PlanItem
  const planItemData = {
    id: workout.id.toString(),
    name: workout.name,
    equipment: workout.equipment,
    duration: workout.duration,
    calories: workout.caloriesBurned,
    rating: workout.rating,
    image: workout.image,
  };

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-white py-6 sm:py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-[#141414] border border-zinc-800/80 rounded-2xl p-5 sm:p-6 lg:p-7">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
            
            {/* Left Column: Image */}
            <div className="relative w-full aspect-[4/3] lg:aspect-square bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800">
              <Image
                src={workout.image}
                alt={workout.name}
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Right Column: Details & Actions */}
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-white">
                  {workout.name}
                </h1>
                <p className="text-zinc-400 text-xs mt-1.5 leading-relaxed">
                  {workout.description}
                </p>
              </div>

              {/* Badges */}
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

              {/* Specifications Table */}
              <div className="bg-[#101010] border border-zinc-800/80 rounded-lg overflow-hidden text-xs">
                <div className="flex justify-between items-center px-3 py-2 border-b border-zinc-800/60">
                  <span className="text-zinc-400 font-medium uppercase tracking-wider text-[10px]">
                    Equipment
                  </span>
                  <span className="text-white font-semibold">{workout.equipment}</span>
                </div>
                <div className="flex justify-between items-center px-3 py-2 border-b border-zinc-800/60">
                  <span className="text-zinc-400 font-medium uppercase tracking-wider text-[10px]">
                    Difficulty
                  </span>
                  <span className="text-white font-semibold">{workout.difficulty}</span>
                </div>
                <div className="flex justify-between items-center px-3 py-2 border-b border-zinc-800/60">
                  <span className="text-zinc-400 font-medium uppercase tracking-wider text-[10px]">
                    Sets
                  </span>
                  <span className="text-white font-semibold">{workout.sets}</span>
                </div>
                <div className="flex justify-between items-center px-3 py-2 border-b border-zinc-800/60">
                  <span className="text-zinc-400 font-medium uppercase tracking-wider text-[10px]">
                    Reps
                  </span>
                  <span className="text-white font-semibold">{workout.reps}</span>
                </div>
                <div className="flex justify-between items-center px-3 py-2 border-b border-zinc-800/60">
                  <span className="text-zinc-400 font-medium uppercase tracking-wider text-[10px]">
                    Duration
                  </span>
                  <span className="text-white font-semibold">{workout.duration} min</span>
                </div>
                <div className="flex justify-between items-center px-3 py-2 border-b border-zinc-800/60">
                  <span className="text-zinc-400 font-medium uppercase tracking-wider text-[10px]">
                    Calories
                  </span>
                  <span className="text-white font-semibold">{workout.caloriesBurned} kcal</span>
                </div>
                <div className="flex justify-between items-center px-3 py-2">
                  <span className="text-zinc-400 font-medium uppercase tracking-wider text-[10px]">
                    Rating
                  </span>
                  <span className="text-white font-semibold">⭐ {workout.rating}</span>
                </div>
              </div>

              {/* Instructions */}
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

              {/* Client Action Buttons Component */}
              <DetailsActionButtons workout={planItemData} />

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}