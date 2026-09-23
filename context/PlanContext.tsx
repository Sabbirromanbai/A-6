"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "react-toastify";

export interface PlanItem {
  id: string;
  name: string;
  equipment: string;
  duration: number;
  calories: number;
  rating: number;
  image: string;
  isDone?: boolean;
}

interface PlanContextType {
  activeTab: "today" | "saved";
  setActiveTab: (tab: "today" | "saved") => void;
  todayPlans: PlanItem[];
  savedPlans: PlanItem[];
  addToTodayPlan: (item: PlanItem) => void;
  addToSavedPlan: (item: PlanItem) => void;
  markAsDone: (id: string, name: string) => void;
  removeItem: (id: string, name: string, type: "today" | "saved") => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

// Default image URL (যাতে কোনো অবস্থাতেই empty string না থাকে)
const DEFAULT_IMAGE =
  "https://img.magnific.com/free-photo/portrait-anime-character-doing-fitness-exercising_23-2151666664.jpg?w=740";

const initialTodayPlans: PlanItem[] = [
  {
    id: "1",
    name: "RUSSIAN TWIST",
    equipment: "Medicine Ball",
    duration: 8,
    calories: 70,
    rating: 4.1,
    image: DEFAULT_IMAGE,
    isDone: false,
  },
  {
    id: "2",
    name: "PULL-UP",
    equipment: "Pull-up Bar",
    duration: 15,
    calories: 120,
    rating: 4.7,
    image: DEFAULT_IMAGE, // এখানে ফাঁকা স্ট্রিং ("") বাদ দিয়ে Image URL দেওয়া হয়েছে
    isDone: false,
  },
];

const initialSavedPlans: PlanItem[] = [
  {
    id: "1",
    name: "RUSSIAN TWIST",
    equipment: "Medicine Ball",
    duration: 8,
    calories: 70,
    rating: 4.1,
    image: DEFAULT_IMAGE,
  },
];

export function PlanProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");
  const [todayPlans, setTodayPlans] = useState<PlanItem[]>(initialTodayPlans);
  const [savedPlans, setSavedPlans] = useState<PlanItem[]>(initialSavedPlans);

  // Add to today's plan
  const addToTodayPlan = (item: PlanItem) => {
    if (todayPlans.some((p) => p.id === item.id)) {
      toast.warning(`'${item.name}' is already in today's plan!`, {
        style: { backgroundColor: "#1c1c1c", color: "#ffffff" },
      });
      return;
    }
    // Fallback URL handle if item.image is empty
    const safeItem = {
      ...item,
      image:
        item.image && item.image.trim() !== "" ? item.image : DEFAULT_IMAGE,
      isDone: false,
    };
    setTodayPlans((prev) => [...prev, safeItem]);
    toast.success(`Added '${item.name}' to today's plan! 🎉`, {
      style: { backgroundColor: "#1c1c1c", color: "#ffffff" },
    });
  };

  // Add to saved plan
  const addToSavedPlan = (item: PlanItem) => {
    if (savedPlans.some((p) => p.id === item.id)) {
      toast.warning(`'${item.name}' is already saved!`, {
        style: { backgroundColor: "#1c1c1c", color: "#ffffff" },
      });
      return;
    }
    // Fallback URL handle if item.image is empty
    const safeItem = {
      ...item,
      image:
        item.image && item.image.trim() !== "" ? item.image : DEFAULT_IMAGE,
    };
    setSavedPlans((prev) => [...prev, safeItem]);
    toast.success(`Saved '${item.name}' for later! 🔖`, {
      style: { backgroundColor: "#1c1c1c", color: "#ffffff" },
    });
  };

  // Mark as Done
  const markAsDone = (id: string, name: string) => {
    setTodayPlans((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isDone: true } : item)),
    );
    toast.success(`'${name}' marked as done! Great job! 🎉`, {
      style: { backgroundColor: "#1c1c1c", color: "#ffffff" },
    });
  };

  // Remove Item
  const removeItem = (id: string, name: string, type: "today" | "saved") => {
    if (type === "today") {
      setTodayPlans((prev) => prev.filter((item) => item.id !== id));
      toast.info(`Removed '${name}' from Today's Plan`, {
        style: { backgroundColor: "#1c1c1c", color: "#ffffff" },
      });
    } else {
      setSavedPlans((prev) => prev.filter((item) => item.id !== id));
      toast.info(`Removed '${name}' from Saved`, {
        style: { backgroundColor: "#1c1c1c", color: "#ffffff" },
      });
    }
  };

  return (
    <PlanContext.Provider
      value={{
        activeTab,
        setActiveTab,
        todayPlans,
        savedPlans,
        addToTodayPlan,
        addToSavedPlan,
        markAsDone,
        removeItem,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
}
