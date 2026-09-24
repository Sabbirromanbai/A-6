"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
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

export type SortOption = "duration" | "calories" | "rating";

interface PlanContextType {
  activeTab: "today" | "saved";
  setActiveTab: (tab: "today" | "saved") => void;

  todayPlans: PlanItem[];
  savedPlans: PlanItem[];

  sortBy: SortOption;
  setSortBy: (sortBy: SortOption) => void;

  hydrated: boolean;

  addToTodayPlan: (item: PlanItem) => void;
  addToSavedPlan: (item: PlanItem) => void;

  markAsDone: (id: string, name: string) => void;

  removeItem: (
    id: string,
    name: string,
    type: "today" | "saved",
  ) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(
  undefined,
);

const TODAY_PLANS_KEY = "fitlog-today-plans";
const SAVED_PLANS_KEY = "fitlog-saved-plans";

const DEFAULT_IMAGE =
  "https://img.magnific.com/free-photo/portrait-anime-character-doing-fitness-exercising_23-2151666664.jpg?w=740";

function loadPlans(key: string): PlanItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const data = localStorage.getItem(key);
    const parsed = data ? JSON.parse(data) : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to load FitLog data:", error);
    return [];
  }
}

export function PlanProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [activeTab, setActiveTab] =
    useState<"today" | "saved">("today");

  const [todayPlans, setTodayPlans] = useState<PlanItem[]>(() =>
    loadPlans(TODAY_PLANS_KEY),
  );
  const [savedPlans, setSavedPlans] = useState<PlanItem[]>(() =>
    loadPlans(SAVED_PLANS_KEY),
  );

  const [sortBy, setSortBy] =
    useState<SortOption>("duration");

  const [hydrated] = useState(true);

  // ==============================
  // SAVE TO LOCAL STORAGE
  // ==============================

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    try {
      localStorage.setItem(
        TODAY_PLANS_KEY,
        JSON.stringify(todayPlans),
      );

      localStorage.setItem(
        SAVED_PLANS_KEY,
        JSON.stringify(savedPlans),
      );
    } catch (error) {
      console.error(
        "Failed to save FitLog data:",
        error,
      );
    }
  }, [todayPlans, savedPlans, hydrated]);

  // ==============================
  // ADD TO TODAY PLAN
  // ==============================

  const addToTodayPlan = (item: PlanItem) => {
    if (todayPlans.some((plan) => plan.id === item.id)) {
      toast.warning(
        "This workout is already in today's plan!",
      );
      return;
    }

    if (todayPlans.length >= 5) {
      toast.warning(
        "Today's plan can contain maximum 5 workouts!",
      );
      return;
    }

    const newItem: PlanItem = {
      ...item,
      image:
        item.image && item.image.trim() !== ""
          ? item.image
          : DEFAULT_IMAGE,
      isDone: false,
    };

    setTodayPlans((previousPlans) => [
      ...previousPlans,
      newItem,
    ]);

    toast.success(
      `${item.name} added to today's plan!`,
    );
  };

  // ==============================
  // ADD TO SAVED
  // ==============================

  const addToSavedPlan = (item: PlanItem) => {
    if (savedPlans.some((plan) => plan.id === item.id)) {
      toast.warning(
        "This workout is already saved!",
      );
      return;
    }

    const newItem: PlanItem = {
      ...item,
      image:
        item.image && item.image.trim() !== ""
          ? item.image
          : DEFAULT_IMAGE,
    };

    setSavedPlans((previousPlans) => [
      ...previousPlans,
      newItem,
    ]);

    toast.success(
      `${item.name} saved successfully!`,
    );
  };

  // ==============================
  // MARK AS DONE
  // ==============================

  const markAsDone = (
    id: string,
    name: string,
  ) => {
    setTodayPlans((previousPlans) =>
      previousPlans.map((item) =>
        item.id === id
          ? {
              ...item,
              isDone: true,
            }
          : item,
      ),
    );

    toast.success(`${name} marked as done!`);
  };

  // ==============================
  // REMOVE
  // ==============================

  const removeItem = (
    id: string,
    name: string,
    type: "today" | "saved",
  ) => {
    if (type === "today") {
      setTodayPlans((previousPlans) =>
        previousPlans.filter(
          (item) => item.id !== id,
        ),
      );
    }

    if (type === "saved") {
      setSavedPlans((previousPlans) =>
        previousPlans.filter(
          (item) => item.id !== id,
        ),
      );
    }

    toast.success(`${name} removed!`);
  };

  return (
    <PlanContext.Provider
      value={{
        activeTab,
        setActiveTab,

        todayPlans,
        savedPlans,

        sortBy,
        setSortBy,

        hydrated,

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
    throw new Error(
      "usePlan must be used inside PlanProvider",
    );
  }

  return context;
}