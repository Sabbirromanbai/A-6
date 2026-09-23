import HeroBanner from "@/component/HeroBanner";
import WorkoutLibrary from "@/app/WorkoutLibrary/page";

export default function Home() {
  return (
    <div className="container mx-auto">
        <HeroBanner />
        <WorkoutLibrary />
    </div>
  );
}
