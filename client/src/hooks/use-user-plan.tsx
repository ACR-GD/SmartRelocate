import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserPlan = "free" | "starter" | "pro" | "premium";

interface UserPlanContextType {
  userPlan: UserPlan;
  setUserPlan: (plan: UserPlan) => void;
  hasAccess: (requiredPlan: UserPlan) => boolean;
}

const UserPlanContext = createContext<UserPlanContextType | undefined>(undefined);

const planHierarchy: Record<UserPlan, number> = {
  free: 0,
  starter: 1,
  pro: 2,
  premium: 3,
};

interface UserPlanProviderProps {
  children: ReactNode;
}

export function UserPlanProvider({ children }: UserPlanProviderProps) {
  const [userPlan, setUserPlanState] = useState<UserPlan>("free");

  // Load user plan from localStorage
  useEffect(() => {
    const savedPlan = localStorage.getItem("userPlan") as UserPlan;
    if (savedPlan && Object.keys(planHierarchy).includes(savedPlan)) {
      setUserPlanState(savedPlan);
    }
  }, []);

  const setUserPlan = (plan: UserPlan) => {
    setUserPlanState(plan);
    localStorage.setItem("userPlan", plan);
  };

  const hasAccess = (requiredPlan: UserPlan): boolean => {
    return planHierarchy[userPlan] >= planHierarchy[requiredPlan];
  };

  const value = {
    userPlan,
    setUserPlan,
    hasAccess,
  };

  return (
    <UserPlanContext.Provider value={value}>
      {children}
    </UserPlanContext.Provider>
  );
}

export function useUserPlan() {
  const context = useContext(UserPlanContext);
  if (context === undefined) {
    throw new Error('useUserPlan must be used within a UserPlanProvider');
  }
  return context;
}