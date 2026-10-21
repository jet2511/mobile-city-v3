"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRegion } from "@/context/RegionContext";
import { REGIONS } from "@/lib/constants";
import { MapPin, Phone, ShieldCheck, ChevronDown, User, Scale, ArrowLeftRight } from "lucide-react";
import Link from "next/link";

export function HeaderTop() {
  const { region, setRegion, currentRegionName, currentHotline } = useRegion();
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
    <div className="w-full bg-[#dce9ff]/60 border-b border-[#cbd5e1]/40 py-1 px-4 lg:px-8 text-[#554336] text-[12px] leading-tight">
      <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-4">
        {/* Dải địa chỉ showroom & Selector khu vực */}
        <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap py-0.5">
          <div className="flex items-center gap-1.5" ref={dropdownRef}>
            <MapPin size={14} className="text-[#8d4b00] shrink-0" />
            <span className="text-gray-600 hidden sm:inline">Xem giá, tồn kho tại:</span>
            <div className="relative">
              <button
                data-testid="header-region-selector"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 font-bold text-[#8d4b00] bg-white/80 hover:bg-white px-2 py-0.5 rounded border border-[#dbc2b0] transition-colors"
              >
                <span data-testid="selected-region-text">{currentRegionName}</span>
                <ChevronDown size={12} />
              </button>

              {dropdownOpen && (
                <div
                  data-testid="region-dropdown-menu"
                  className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-xl py-1 z-50 min-w-[150px]"
                >
                  {REGIONS.map((r) => (
                    <button
                      key={r.code}
                      data-testid={`select-region-${r.code}`}
                      onClick={() => {
                        setRegion(r.code);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-amber-50 ${
                        region === r.code ? "font-bold text-[#8d4b00] bg-amber-50/70" : "text-gray-700"
                      }`}
                    >
                      {r.name}
                      {region === r.code && <span className="text-[#8d4b00]">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <span className="text-gray-300 hidden md:inline">|</span>

          {/* Tiện ích tra cứu & Showroom */}
          <div className="hidden lg:flex items-center gap-3 text-gray-600 text-[11px]">
            <Link href="/he-thong-showroom" className="hover:text-[#8d4b00] transition-colors">
              Hệ thống 6 showroom toàn quốc
            </Link>
            <span>•</span>
            <Link href="/huong-dan-tra-gop" className="hover:text-[#8d4b00] transition-colors">
              Trả góp 0%
            </Link>
            <span>•</span>
            <Link href="/so-sanh" className="hover:text-[#8d4b00] transition-colors flex items-center gap-1">
              <ArrowLeftRight size={11} className="text-[#8d4b00]" />
              So sánh máy
            </Link>
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
            className="flex items-center gap-1 text-[#0b1c30] font-semibold hover:text-[#8d4b00] transition-colors bg-white/70 px-2 py-0.5 rounded border border-[#dbc2b0]/50"
          >
            <User size={13} className="text-[#8d4b00]" />
            <span>Tài khoản</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
