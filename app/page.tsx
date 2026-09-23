import HeroBanner from "@/component/HeroBanner";
import WorkoutLibrary from "@/component/WorkoutLibrary";

export default function Home() {
  return (
    <div className="container mx-auto">
        <HeroBanner />
        <WorkoutLibrary />
    </div>
  );
}
