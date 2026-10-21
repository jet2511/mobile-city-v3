"use client";

import React, { useState, useEffect } from "react";
import { HeaderTop } from "./HeaderTop";
import { HeaderMain } from "./HeaderMain";
import { MegaMenu } from "./MegaMenu";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Khi cuộn xuống quá 90px thì chuyển sang chế độ Compact Sticky Header
      if (window.scrollY > 90) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-md transition-all duration-300">
      {/* Khi cuộn chuột, ẩn tầng TopBar để tiết kiệm không gian màn hình */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isScrolled ? "pointer-events-none max-h-0 opacity-0" : "max-h-12 opacity-100"
        }`}
      >
        <HeaderTop />
      </div>

      {/* Tầng tìm kiếm chính & giỏ hàng luôn hiển thị rõ ràng */}
      <HeaderMain />

      {/* Tầng MegaMenu */}
      <MegaMenu />
    </header>
  );
}
