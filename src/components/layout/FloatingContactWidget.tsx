"use client";

import React, { useState, useEffect } from "react";
import { PhoneCall, MessageCircle, ArrowUp } from "lucide-react";
import { useRegion } from "@/context/RegionContext";

export function FloatingContactWidget() {
  const { currentHotline } = useRegion();
  const [showBackToTop, setShowBackToTop] = useState(false);

  const hotline = currentHotline || "0969.120.120";

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      data-testid="floating-contact-widget"
      className="fixed bottom-18 md:bottom-6 right-3 md:right-6 z-40 flex flex-col items-center gap-2.5 select-none"
    >
      {/* Nút Cuộn Lên Đầu Trang */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          title="Cuộn lên đầu trang"
          className="w-10 h-10 rounded-full bg-white text-gray-700 hover:text-[#c69a39] shadow-lg border border-gray-200 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
          aria-label="Cuộn lên đầu trang"
        >
          <ArrowUp size={18} />
        </button>
      )}

      {/* Nút Chat Zalo */}
      <a
        href="https://zalo.me"
        target="_blank"
        rel="noopener noreferrer"
        title="Chat Zalo tư vấn MobileCity"
        className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#0068ff] text-white shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 group relative"
      >
        <MessageCircle size={22} className="group-hover:rotate-12 transition-transform" />
        <span className="hidden md:group-hover:block absolute right-full mr-2.5 bg-gray-900 text-white text-[11px] font-semibold py-1 px-2.5 rounded whitespace-nowrap shadow-md">
          Chat Zalo
        </span>
      </a>

      {/* Nút Gọi Hotline Nhanh */}
      <a
        href={`tel:${hotline.replace(/[^0-9]/g, "")}`}
        title={`Gọi Hotline MobileCity: ${hotline}`}
        className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-red-600 text-white shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 animate-bounce group relative"
      >
        <PhoneCall size={22} className="animate-pulse" />
        <span className="hidden md:group-hover:block absolute right-full mr-2.5 bg-gray-900 text-white text-[11px] font-semibold py-1 px-2.5 rounded whitespace-nowrap shadow-md">
          Hotline: {hotline}
        </span>
      </a>
    </div>
  );
}
