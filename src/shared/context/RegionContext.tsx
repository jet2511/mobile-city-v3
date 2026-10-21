"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { Region } from "@/types";
import { REGIONS } from "@/lib/constants";

export interface BranchInfo {
  id: string;
  name: string;
  address: string;
  phone: string;
  region: Region;
}

export const SHOWROOM_BRANCHES: BranchInfo[] = [
  // Hà Nội
  {
    id: "hn-1",
    name: "Showroom Đống Đa",
    address: "120 Thái Hà, Q. Đống Đa, Hà Nội",
    phone: "0969.120.120",
    region: "HN",
  },
  {
    id: "hn-2",
    name: "Showroom Cầu Giấy",
    address: "398 Cầu Giấy, Q. Cầu Giấy, Hà Nội",
    phone: "096.1111.398",
    region: "HN",
  },
  {
    id: "hn-3",
    name: "Showroom Hai Bà Trưng",
    address: "42 Phố Vọng, Hai Bà Trưng, Hà Nội",
    phone: "0979.88.4242",
    region: "HN",
  },
  // TP.HCM
  {
    id: "hcm-1",
    name: "Showroom Quận 1",
    address: "123 Trần Quang Khải, Q.1, TP.HCM",
    phone: "0965.123.123",
    region: "HCM",
  },
  {
    id: "hcm-2",
    name: "Showroom Quận 10",
    address: "602 Lê Hồng Phong, P.10, Q.10, TP.HCM",
    phone: "097.1111.602",
    region: "HCM",
  },
  // Đà Nẵng
  {
    id: "dn-1",
    name: "Showroom Thanh Khê",
    address: "97 Hàm Nghi, Q. Thanh Khê, Đà Nẵng",
    phone: "096.123.9797",
    region: "DN",
  },
];

interface RegionContextType {
  region: Region;
  setRegion: (region: Region) => void;
  currentRegionName: string;
  currentHotline: string;
  currentBranches: BranchInfo[];
  primaryAddress: string;
  notification: string | null;
}

const RegionContext = createContext<RegionContextType | undefined>(undefined);

export function RegionProvider({ children }: { children: React.ReactNode }) {
  const [region, setRegionState] = useState<Region>("HN");
  const [notification, setNotification] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("mc_region") as Region;
    if (saved && ["HN", "HCM", "DN"].includes(saved)) {
      setRegionState(saved);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const setRegion = (newRegion: Region) => {
    setRegionState(newRegion);
    localStorage.setItem("mc_region", newRegion);
    document.cookie = `mc_region=${newRegion}; path=/; max-age=31536000; SameSite=Lax`;

    const regionInfo = REGIONS.find((r) => r.code === newRegion);
    const regionName = regionInfo ? regionInfo.name : newRegion;
    setNotification(`Đã chuyển khu vực xem giá & tồn kho sang: ${regionName}`);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setNotification(null);
      timerRef.current = null;
    }, 3000);
  };

  const currentRegionInfo = REGIONS.find((r) => r.code === region) || REGIONS[0];
  const currentBranches = SHOWROOM_BRANCHES.filter((b) => b.region === region);
  const primaryAddress =
    currentBranches.length > 0 ? currentBranches[0].address : "120 Thái Hà, Hà Nội";

  return (
    <RegionContext.Provider
      value={{
        region,
        setRegion,
        currentRegionName: currentRegionInfo.name,
        currentHotline: currentRegionInfo.hotline,
        currentBranches,
        primaryAddress,
        notification,
      }}
    >
      {children}
      {/* Toast Notification for Region Change */}
      {notification && (
        <div className="animate-in slide-in-from-bottom-5 fixed right-6 bottom-6 z-50 flex items-center gap-2.5 rounded-2xl border border-amber-500/40 bg-[#0b1c30] px-4 py-3 text-xs font-semibold text-white shadow-2xl duration-200 sm:text-sm">
          <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
          <span>{notification}</span>
        </div>
      )}
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
