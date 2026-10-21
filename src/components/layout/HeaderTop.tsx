"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRegion } from "@/context/RegionContext";
import { REGIONS } from "@/lib/constants";
import { MapPin, Phone, ShieldCheck, ChevronDown, User, ArrowLeftRight, Check } from "lucide-react";
import Link from "next/link";

export function HeaderTop() {
  const { region, setRegion, currentRegionName, currentHotline, currentBranches } = useRegion();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full bg-[#f1f5f9] border-b border-[#cbd5e1]/60 py-1.5 px-4 lg:px-8 text-[#554336] text-[12px] leading-tight">
      <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-4">
        {/* Dải địa chỉ showroom & Selector khu vực */}
        <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap py-0.5">
          <div className="flex items-center gap-1.5" ref={dropdownRef}>
            <MapPin size={14} className="text-[#8d4b00] shrink-0" />
            <span className="text-gray-600 hidden sm:inline font-medium">Xem giá, tồn kho tại:</span>
            <div className="relative">
              <button
                type="button"
                data-testid="header-region-selector"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 font-extrabold text-[#8d4b00] bg-white hover:bg-amber-50/50 px-2.5 py-1 rounded-md border border-[#dbc2b0] shadow-sm transition-all cursor-pointer"
              >
                <span data-testid="selected-region-text">{currentRegionName}</span>
                <ChevronDown size={13} className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {dropdownOpen && (
                <div
                  data-testid="region-dropdown-menu"
                  className="absolute left-0 top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-2xl py-1.5 z-50 min-w-[180px] animate-in fade-in slide-in-from-top-1 duration-150"
                >
                  <div className="px-3 py-1 text-[10px] uppercase font-bold text-gray-400 border-b border-gray-100">
                    Chọn khu vực của bạn
                  </div>
                  {REGIONS.map((r) => {
                    const isSelected = region === r.code;
                    return (
                      <button
                        key={r.code}
                        type="button"
                        data-testid={`select-region-${r.code}`}
                        onClick={() => {
                          setRegion(r.code);
                          setDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                          isSelected
                            ? "font-bold text-[#8d4b00] bg-amber-50"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span>{r.name}</span>
                        {isSelected && <Check size={14} className="text-[#8d4b00]" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <span className="text-gray-300 hidden md:inline">|</span>

          {/* Địa chỉ chi nhánh động theo khu vực đang chọn */}
          <div className="hidden lg:flex items-center gap-2 text-gray-600 text-[11px]">
            <span className="text-gray-400">Chi nhánh {currentRegionName}:</span>
            {currentBranches.map((branch, idx) => (
              <span key={branch.id} className="flex items-center gap-2">
                {idx > 0 && <span className="text-gray-300">•</span>}
                <strong className="text-gray-800 font-semibold">{branch.address.split(",")[0]}</strong>
              </span>
            ))}
          </div>
        </div>

        {/* Hotline & Tài khoản / Tra cứu */}
        <div className="flex items-center gap-3.5 shrink-0 text-[12px]">
          <div className="flex items-center gap-1">
            <Phone size={13} className="text-[#8d4b00]" />
            <span className="hidden sm:inline text-gray-500">Hotline:</span>
            <a
              href={`tel:${currentHotline.replace(/\./g, "")}`}
              data-testid="header-hotline"
              className="font-bold text-[#bb0112] hover:underline"
            >
              {currentHotline}
            </a>
          </div>

          <span className="text-gray-300">|</span>

          <Link
            href="/tra-cuu-bao-hanh"
            className="flex items-center gap-1 text-gray-700 hover:text-[#8d4b00] transition-colors"
          >
            <ShieldCheck size={13} className="text-[#8d4b00]" />
            <span className="hidden sm:inline">Tra cứu</span> bảo hành
          </Link>

          <span className="text-gray-300">|</span>

          <Link
            href="/dang-nhap"
            className="flex items-center gap-1 text-[#0b1c30] font-semibold hover:text-[#8d4b00] transition-colors bg-white px-2.5 py-0.5 rounded-md border border-gray-200 shadow-sm"
          >
            <User size={13} className="text-[#8d4b00]" />
            <span>Tài khoản</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
