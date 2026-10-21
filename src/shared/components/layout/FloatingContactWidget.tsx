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
      className="fixed right-3 bottom-18 z-40 flex flex-col items-center gap-2.5 select-none md:right-6 md:bottom-6"
    >
      {/* Nút Cuộn Lên Đầu Trang */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          title="Cuộn lên đầu trang"
          aria-label="Cuộn lên đầu trang"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-lg transition-all duration-200 hover:scale-105 hover:text-[#8d4b00] active:scale-95"
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
        aria-label="Chat Zalo tư vấn MobileCity"
        className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-[#0068ff] text-white shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 md:h-12 md:w-12"
      >
        <MessageCircle size={22} className="transition-transform group-hover:rotate-12" />
        <span className="absolute right-full mr-2.5 hidden rounded bg-gray-900 px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap text-white shadow-md md:group-hover:block">
          Chat Zalo
        </span>
      </a>

      {/* Nút Gọi Hotline Nhanh */}
      <a
        href={`tel:${hotline.replace(/[^0-9]/g, "")}`}
        title={`Gọi Hotline MobileCity: ${hotline}`}
        aria-label={`Gọi Hotline MobileCity: ${hotline}`}
        className="group relative flex h-11 w-11 animate-bounce items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 md:h-12 md:w-12"
      >
        <PhoneCall size={22} className="animate-pulse" />
        <span className="absolute right-full mr-2.5 hidden rounded bg-gray-900 px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap text-white shadow-md md:group-hover:block">
          Hotline: {hotline}
        </span>
      </a>
    </div>
  );
}
