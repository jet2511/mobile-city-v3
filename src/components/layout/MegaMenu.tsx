"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MAIN_NAVIGATION } from "@/lib/constants";
import { ChevronRight, Award, Zap, Smartphone, Tablet, Wrench, Newspaper, ShieldAlert, Sparkles } from "lucide-react";

export function MegaMenu() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <nav className="bg-[#0b1c30] text-white text-xs font-semibold select-none shadow-sm relative border-b border-[#213145]">
      <div className="max-w-[1240px] mx-auto px-4 lg:px-8 flex items-center justify-between">
        <ul className="flex items-center gap-1 overflow-x-auto whitespace-nowrap py-0.5">
          {MAIN_NAVIGATION.map((nav) => (
            <li
              key={nav.slug}
              className="relative shrink-0"
              onMouseEnter={() => nav.subCategories && setActiveMenu(nav.slug)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Link
                href={`/${nav.slug}`}
                data-testid={`nav-item-${nav.slug}`}
                className={`flex items-center gap-1.5 px-3.5 py-2.5 hover:bg-[#213145] transition-colors uppercase tracking-tight text-xs whitespace-nowrap ${
                  nav.isHighlight
                    ? "bg-[#bb0112] hover:bg-[#a10110] font-extrabold px-3 text-white rounded-t-sm"
                    : "text-gray-200 hover:text-white"
                }`}
              >
                {nav.isHighlight && <Award size={14} className="text-yellow-300 animate-pulse" />}
                {nav.title}
              </Link>

              {/* Mega Dropdown Panel (Desktop only) */}
              {nav.subCategories && activeMenu === nav.slug && (
                <div
                  data-testid={`mega-dropdown-${nav.slug}`}
                  className="hidden md:grid absolute left-0 top-full bg-white text-gray-800 shadow-2xl rounded-b-xl border border-gray-200 p-6 z-50 w-[720px] grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-1 duration-150"
                >
                  {nav.subCategories.map((col, idx) => (
                    <div key={idx} className="space-y-3">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#8d4b00] border-b pb-1.5 border-amber-100 flex items-center gap-1">
                        <Zap size={13} />
                        {col.name}
                      </div>
                      <ul className="space-y-1.5">
                        {col.items.map((item, itemIdx) => (
                          <li key={itemIdx}>
                            <Link
                              href={item.href}
                              className="text-xs text-gray-600 hover:text-[#8d4b00] hover:translate-x-1 transition-transform flex items-center gap-1 py-1"
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
          ))}
        </ul>

        {/* Cam kết nhanh cạnh menu trên desktop */}
        <div className="hidden xl:flex items-center gap-4 text-[11px] text-amber-300/90 font-medium shrink-0">
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
