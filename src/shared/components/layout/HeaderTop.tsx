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
    <div className="w-full border-b border-[#cbd5e1]/60 bg-[#f1f5f9] px-4 py-1.5 text-[12px] leading-tight text-[#554336] lg:px-8">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4">
        {/* Dải địa chỉ showroom & Selector khu vực */}
        <div className="flex items-center gap-4 overflow-x-auto py-0.5 whitespace-nowrap">
          <div className="flex items-center gap-1.5" ref={dropdownRef}>
            <MapPin size={14} className="shrink-0 text-[#8d4b00]" />
            <span className="hidden font-medium text-gray-600 sm:inline">
              Xem giá, tồn kho tại:
            </span>
            <div className="relative">
              <button
                type="button"
                data-testid="header-region-selector"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex cursor-pointer items-center gap-1 rounded-md border border-[#dbc2b0] bg-white px-2.5 py-1 font-extrabold text-[#8d4b00] shadow-sm transition-all hover:bg-amber-50/50"
              >
                <span data-testid="selected-region-text">{currentRegionName}</span>
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {dropdownOpen && (
                <div
                  data-testid="region-dropdown-menu"
                  className="animate-in fade-in slide-in-from-top-1 absolute top-full left-0 z-50 mt-1.5 min-w-[180px] rounded-xl border border-gray-200 bg-white py-1.5 shadow-2xl duration-150"
                >
                  <div className="border-b border-gray-100 px-3 py-1 text-[10px] font-bold text-gray-400 uppercase">
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
                        className={`flex w-full cursor-pointer items-center justify-between px-3.5 py-2 text-left text-xs transition-colors ${
                          isSelected
                            ? "bg-amber-50 font-bold text-[#8d4b00]"
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

          <span className="hidden text-gray-300 md:inline">|</span>

          {/* Địa chỉ chi nhánh động theo khu vực đang chọn */}
          <div className="hidden items-center gap-2 text-[11px] text-gray-600 lg:flex">
            <span className="text-gray-400">Chi nhánh {currentRegionName}:</span>
            {currentBranches.map((branch, idx) => (
              <span key={branch.id} className="flex items-center gap-2">
                {idx > 0 && <span className="text-gray-300">•</span>}
                <strong className="font-semibold text-gray-800">
                  {branch.address.split(",")[0]}
                </strong>
              </span>
            ))}
          </div>
        </div>

        {/* Hotline & Tài khoản / Tra cứu */}
        <div className="flex shrink-0 items-center gap-3.5 text-[12px]">
          <div className="flex items-center gap-1">
            <Phone size={13} className="text-[#8d4b00]" />
            <span className="hidden text-gray-500 sm:inline">Hotline:</span>
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
            className="flex items-center gap-1 text-gray-700 transition-colors hover:text-[#8d4b00]"
          >
            <ShieldCheck size={13} className="text-[#8d4b00]" />
            <span className="hidden sm:inline">Tra cứu</span> bảo hành
          </Link>

          <span className="text-gray-300">|</span>

          <Link
            href="/dang-nhap"
            className="flex items-center gap-1 rounded-md border border-gray-200 bg-white px-2.5 py-0.5 font-semibold text-[#0b1c30] shadow-sm transition-colors hover:text-[#8d4b00]"
          >
            <User size={13} className="text-[#8d4b00]" />
            <span>Tài khoản</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
