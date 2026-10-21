"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { MAIN_NAVIGATION } from "@/lib/constants";
import { ChevronRight, Award, Zap, Sparkles, ShieldAlert } from "lucide-react";

export function MegaMenu() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (slug: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveMenu(slug);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  return (
    <nav
      className="relative border-b border-[#213145] bg-[#0b1c30] text-xs font-semibold text-white shadow-sm select-none"
      onMouseLeave={handleMouseLeave}
    >
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-4 lg:px-8">
        <ul className="flex items-center gap-1 overflow-x-auto py-0.5 whitespace-nowrap">
          {MAIN_NAVIGATION.map((nav) => {
            const hasSub = Boolean(nav.subCategories && nav.subCategories.length > 0);
            const isOpen = activeMenu === nav.slug;

            return (
              <li
                key={nav.slug}
                className="shrink-0"
                onMouseEnter={() => hasSub && handleMouseEnter(nav.slug)}
              >
                <Link
                  href={`/${nav.slug}`}
                  data-testid={`nav-item-${nav.slug}`}
                  className={`flex items-center gap-1.5 px-3.5 py-2.5 text-xs tracking-tight whitespace-nowrap uppercase transition-colors ${
                    nav.isHighlight
                      ? "rounded-t-sm bg-[#bb0112] px-3 font-extrabold text-white hover:bg-[#a10110]"
                      : isOpen
                        ? "bg-[#213145] text-amber-300"
                        : "text-gray-200 hover:bg-[#213145] hover:text-white"
                  }`}
                >
                  {nav.isHighlight && <Award size={14} className="animate-pulse text-yellow-300" />}
                  {nav.title}
                </Link>

                {/* Mega Dropdown Panel */}
                {hasSub && isOpen && (
                  <div
                    data-testid={`mega-dropdown-${nav.slug}`}
                    onMouseEnter={() => handleMouseEnter(nav.slug)}
                    className="animate-in fade-in slide-in-from-top-1 absolute top-full left-4 z-50 hidden w-[780px] grid-cols-3 gap-6 rounded-b-2xl border border-gray-200 bg-white p-6 text-gray-800 shadow-2xl duration-150 md:grid lg:left-8"
                  >
                    {nav.subCategories?.map((col, idx) => (
                      <div key={idx} className="space-y-3">
                        <div className="flex items-center gap-1 border-b border-amber-100 pb-1.5 text-[11px] font-bold tracking-wider text-[#8d4b00] uppercase">
                          <Zap size={13} />
                          {col.name}
                        </div>
                        <ul className="space-y-1.5">
                          {col.items.map((item, itemIdx) => (
                            <li key={itemIdx}>
                              <Link
                                href={item.href}
                                onClick={() => setActiveMenu(null)}
                                className="flex items-center gap-1 py-1 text-xs text-gray-600 transition-transform hover:translate-x-1 hover:text-[#8d4b00]"
                              >
                                <ChevronRight size={12} className="text-gray-400" />
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {/* Cam kết nhanh cạnh menu trên desktop */}
        <div className="hidden shrink-0 items-center gap-4 text-[11px] font-medium text-amber-300/90 xl:flex">
          <span className="flex items-center gap-1">
            <Sparkles size={12} className="text-yellow-400" />
            100% Nguyên Seal
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <ShieldAlert size={12} className="text-yellow-400" />
            Bảo Hành Cả Nguồn & Màn
          </span>
        </div>
      </div>
    </nav>
  );
}
