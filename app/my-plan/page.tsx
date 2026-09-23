import React from "react";
import MyPlanHeader from "@/component/MyPlanHeader";
import PlanList from "@/component/PlanList";

export const metadata = {
  title: "My Plan | Fit Log",
  description: "View and manage your daily workouts and saved plans.",
};

export default function MyPlanPage() {
  return (
    <main className="min-h-screen bg-[#0d0d0d] text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <MyPlanHeader />
        <PlanList />
      </div>
    </main>
  );
}
