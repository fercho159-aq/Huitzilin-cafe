"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { BRANCHES, type Branch } from "@/lib/data";

interface BranchContextValue {
  branch: Branch;
  setBranch: (branch: Branch) => void;
}

const BranchContext = createContext<BranchContextValue | null>(null);

export function BranchProvider({ children }: { children: ReactNode }) {
  const [branch, setBranchState] = useState<Branch>(BRANCHES[0]);

  useEffect(() => {
    try {
      const id = localStorage.getItem("boreal_branch");
      const found = BRANCHES.find((b) => b.id === id);
      if (found) setBranchState(found);
    } catch {}
  }, []);

  const setBranch = (b: Branch) => {
    setBranchState(b);
    try {
      localStorage.setItem("boreal_branch", b.id);
    } catch {}
  };

  return (
    <BranchContext.Provider value={{ branch, setBranch }}>
      {children}
    </BranchContext.Provider>
  );
}

export function useBranch() {
  const ctx = useContext(BranchContext);
  if (!ctx) throw new Error("useBranch must be used within BranchProvider");
  return ctx;
}
