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

  hydrated: boolean;

  sortBy: SortOption;
  setSortBy: (sortBy: SortOption) => void;

  addToTodayPlan: (item: PlanItem) => void;
  addToSavedPlan: (item: PlanItem) => void;

  markAsDone: (id: string, name: string) => void;

  removeItem: (
    id: string,
    name: string,
    type: "today" | "saved",
  ) => void;
}

const PlanContext = createContext<
  PlanContextType | undefined
>(undefined);

const TODAY_KEY = "fitlog-today-plans";
const SAVED_KEY = "fitlog-saved-plans";

export function PlanProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [activeTab, setActiveTab] = useState<
    "today" | "saved"
  >("today");

  const [todayPlans, setTodayPlans] = useState<PlanItem[]>([]);
  const [savedPlans, setSavedPlans] = useState<PlanItem[]>([]);

  const [sortBy, setSortBy] =
    useState<SortOption>("duration");

  const [hydrated, setHydrated] = useState(false);

  // Load data from localStorage
  useEffect(() => {
    try {
      const todayData =
        localStorage.getItem(TODAY_KEY);

      const savedData =
        localStorage.getItem(SAVED_KEY);

      if (todayData) {
        const parsedToday = JSON.parse(todayData);

        if (Array.isArray(parsedToday)) {
          setTodayPlans(parsedToday);
        }
      }

      if (savedData) {
        const parsedSaved = JSON.parse(savedData);

        if (Array.isArray(parsedSaved)) {
          setSavedPlans(parsedSaved);
        }
      }
    } catch (error) {
      console.error(
        "Failed to load FitLog data:",
        error,
      );
    } finally {
      setHydrated(true);
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    if (!hydrated) return;

    try {
      localStorage.setItem(
        TODAY_KEY,
        JSON.stringify(todayPlans),
      );

      localStorage.setItem(
        SAVED_KEY,
        JSON.stringify(savedPlans),
      );
    } catch (error) {
      console.error(
        "Failed to save FitLog data:",
        error,
      );
    }
  }, [todayPlans, savedPlans, hydrated]);

  // Add workout to today's plan
  const addToTodayPlan = (item: PlanItem) => {
    if (todayPlans.length >= 5) {
      toast.warning(
        "Today's plan can contain maximum 5 workouts!",
      );
      return;
    }

    const alreadyExists = todayPlans.some(
      (plan) => plan.id === item.id,
    );

    if (alreadyExists) {
      toast.warning(
        "This workout is already in today's plan!",
      );
      return;
    }

    setTodayPlans((previous) => [
      ...previous,
      {
        ...item,
        isDone: false,
      },
    ]);

    toast.success(
      `${item.name} added to today's plan!`,
    );
  };

  // Save workout
  const addToSavedPlan = (item: PlanItem) => {
    const alreadyExists = savedPlans.some(
      (plan) => plan.id === item.id,
    );

    if (alreadyExists) {
      toast.warning(
        "This workout is already saved!",
      );
      return;
    }

    setSavedPlans((previous) => [
      ...previous,
      item,
    ]);

    toast.success(
      `${item.name} saved successfully!`,
    );
  };

  // Mark workout as done
  const markAsDone = (
    id: string,
    name: string,
  ) => {
    setTodayPlans((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              isDone: true,
            }
          : item,
      ),
    );

    toast.success(
      `${name} marked as done!`,
    );
  };

  // Remove workout
  const removeItem = (
    id: string,
    name: string,
    type: "today" | "saved",
  ) => {
    if (type === "today") {
      setTodayPlans((previous) =>
        previous.filter(
          (item) => item.id !== id,
        ),
      );
    }

    if (type === "saved") {
      setSavedPlans((previous) =>
        previous.filter(
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

        hydrated,

        sortBy,
        setSortBy,

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