import type { ComponentProps } from "react";
import WorkoutCard from "@/component/WorkoutCard";

type Workout = ComponentProps<typeof WorkoutCard>["workout"];

async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export default async function WorkoutLibrary() {
  const workouts = await getWorkouts();

  return (
    <section className="w-full container mx-auto px-4 sm:px-6 py-8">
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-black tracking-tight text-white uppercase">
          THE LIBRARY
        </h2>
        <p className="text-zinc-400 text-xs sm:text-sm mt-1">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* 3 Column Grid Matching Figma */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </section>
  );
}
