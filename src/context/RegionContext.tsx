"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Region } from "@/types";
import { REGIONS } from "@/lib/constants";

interface RegionContextType {
  region: Region;
  setRegion: (region: Region) => void;
  currentRegionName: string;
  currentHotline: string;
}

const RegionContext = createContext<RegionContextType | undefined>(undefined);

export function RegionProvider({ children }: { children: React.ReactNode }) {
  const [region, setRegionState] = useState<Region>("HN");

  useEffect(() => {
    // Đọc từ cookie hoặc localStorage
    const saved = localStorage.getItem("mc_region") as Region;
    if (saved && ["HN", "HCM", "DN"].includes(saved)) {
      setRegionState(saved);
    }
  }, []);

  const setRegion = (newRegion: Region) => {
    setRegionState(newRegion);
    localStorage.setItem("mc_region", newRegion);
    document.cookie = `mc_region=${newRegion}; path=/; max-age=31536000; SameSite=Lax`;
  };

  const currentRegionInfo = REGIONS.find((r) => r.code === region) || REGIONS[0];

  return (
    <RegionContext.Provider
      value={{
        region,
        setRegion,
        currentRegionName: currentRegionInfo.name,
        currentHotline: currentRegionInfo.hotline,
      }}
    >
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const context = useContext(RegionContext);
  if (!context) {
    throw new Error("useRegion must be used within a RegionProvider");
  }
  return context;
}
