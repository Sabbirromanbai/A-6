import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/Type/Type";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link 
      href={`/Details/${workout.id}`}
      className="bg-[#121212] border border-zinc-800/80 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-zinc-700 transition-all duration-200 group"
    >
      {/* Card Body Container */}
      <div>
        {/* Top Image Container with Fixed Aspect Ratio */}
        <div className="relative w-full aspect-[16/10] bg-zinc-900 overflow-hidden">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content Area */}
        <div className="p-5 flex flex-col gap-3">
          
          {/* Muscle Groups Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            {workout.muscleGroups.map((muscle, index) => (
              <span
                key={index}
                className="bg-[#cfff04] text-black text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider"
              >
                {muscle}
              </span>
            ))}
          </div>

          {/* Workout Name & Equipment */}
          <div>
            <h3 className="text-white font-black text-lg tracking-wide uppercase leading-tight group-hover:text-[#cfff04] transition-colors">
              {workout.name}
            </h3>
            <p className="text-zinc-400 text-xs mt-1 font-medium">
              {workout.equipment}
            </p>
          </div>

        </div>
      </div>

      {/* Bottom Metadata Bar */}
      <div className="px-5 pb-5 pt-1 text-xs text-zinc-400 font-medium flex items-center gap-3">
        {/* Duration */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs">🕒</span>
          <span>{workout.duration} min</span>
        </div>

        {/* Bullet Separator */}
        <span className="text-zinc-600 text-[8px]">•</span>

        {/* Calories */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs">🔥</span>
          <span>{workout.caloriesBurned} kcal</span>
        </div>

        {/* Bullet Separator */}
        <span className="text-zinc-600 text-[8px]">•</span>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-zinc-400">⭐</span>
          <span>{workout.rating}</span>
        </div>
      </div>
    </Link>
  );
}