"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Wrench, X, Sparkles, Smartphone, CheckCircle2 } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

export function HeaderMain() {
  const { totalQuantity } = useCart();
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!keyword.trim()) {
      setResults([]);
      setShowPopup(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?q=${encodeURIComponent(keyword)}`);
        const json = await res.json();
        if (json.success) {
          setResults(json.data.slice(0, 5));
          setShowPopup(true);
        }
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [keyword]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowPopup(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="border-b border-[#e2e8f0] bg-white py-3.5 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-4 lg:px-8">
        {/* Brand Logo Stitch Style */}
        <Link href="/" className="group flex flex-shrink-0 items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#8d4b00] text-xl font-black tracking-tight text-white shadow-sm transition-colors group-hover:bg-[#b15f00]">
            MC
          </div>
          <div className="flex flex-col">
            <span className="text-2xl leading-none font-extrabold tracking-tight text-[#0b1c30]">
              Mobile<span className="text-[#8d4b00]">City</span>
            </span>
            <span className="mt-0.5 text-[10px] font-semibold tracking-wider text-[#887364] uppercase">
              ĐIỆN THOẠI GIÁ RẺ NHẤT
            </span>
          </div>
        </Link>

        {/* Smart Search Bar Stitch Style */}
        <div className="relative max-w-2xl flex-1" ref={searchRef}>
          <div className="relative flex items-center">
            <input
              type="text"
              data-testid="header-search-input"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onFocus={() => results.length > 0 && setShowPopup(true)}
              placeholder="Bạn cần tìm gì... (VD: Redmi K70, iPhone 15 Pro Max)"
              className="w-full rounded-lg border border-[#dbc2b0]/70 bg-[#f8f9ff] py-2.5 pr-11 pl-4 text-sm text-[#0b1c30] placeholder-gray-400 transition-all outline-none focus:border-[#8d4b00] focus:bg-white focus:ring-2 focus:ring-[#8d4b00]/15"
            />
            {keyword ? (
              <button
                onClick={() => {
                  setKeyword("");
                  setShowPopup(false);
                }}
                className="absolute right-12 p-1 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            ) : null}
            <button
              data-testid="header-search-btn"
              className="absolute top-1.5 right-1.5 bottom-1.5 flex items-center justify-center rounded-md bg-[#8d4b00] px-3 text-white transition-colors hover:bg-[#b15f00]"
            >
              <Search size={16} />
            </button>
          </div>

          {/* Quick search tags dưới search input */}
          <div className="mt-1 hidden items-center gap-2 text-[11px] text-gray-500 lg:flex">
            <span className="text-[#887364]">Gợi ý:</span>
            {["Redmi K70", "iPhone 13 99%", "ROG Phone 8", "Sửa màn hình"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setKeyword(tag)}
                className="transition-colors hover:text-[#8d4b00]"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Search Results Dropdown Popup */}
          {showPopup && (
            <div
              data-testid="header-search-results"
              className="absolute top-full right-0 left-0 z-50 mt-2 max-h-[380px] overflow-hidden overflow-y-auto rounded-xl border border-[#e2e8f0] bg-white text-[#0b1c30] shadow-2xl"
            >
              <div className="border-b border-[#e2e8f0] bg-[#eff4ff] px-3.5 py-2 text-xs font-semibold text-[#554336]">
                Sản phẩm gợi ý cho &quot;{keyword}&quot;
              </div>
              {loading ? (
                <div className="p-4 text-center text-xs text-gray-500">Đang tìm kiếm...</div>
              ) : results.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {results.map((item) => (
                    <Link
                      key={item.id}
                      href={`/dien-thoai/${item.slug}`}
                      onClick={() => setShowPopup(false)}
                      className="flex items-center gap-3.5 p-3 transition-colors hover:bg-amber-50/50"
                    >
                      <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="h-12 w-12 rounded-md border border-gray-100 bg-white object-contain p-1"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-semibold text-[#0b1c30]">
                          {item.name}
                        </div>
                        <div className="mt-0.5 flex items-center gap-2">
                          <span className="text-xs font-bold text-[#bb0112]">
                            {item.minPrice?.toLocaleString("vi-VN")} ₫
                          </span>
                          {item.maxOriginPrice && item.maxOriginPrice > (item.minPrice || 0) && (
                            <span className="text-[11px] text-gray-400 line-through">
                              {item.maxOriginPrice.toLocaleString("vi-VN")} ₫
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-gray-500">
                  Không tìm thấy sản phẩm phù hợp
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick action buttons */}
        <div className="flex flex-shrink-0 items-center gap-3">
          <Link
            href="/sua-chua"
            className="hidden items-center gap-2 rounded-lg border border-[#e2e8f0] px-3.5 py-2 text-xs font-semibold text-[#0b1c30] transition-all hover:border-[#8d4b00] hover:bg-amber-50/40 md:flex"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded bg-amber-100 text-[#8d4b00]">
              <Wrench size={14} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] leading-none text-gray-500">Báo giá</span>
              <strong className="text-xs text-[#0b1c30]">Sửa chữa</strong>
            </div>
          </Link>

          <Link
            href="/gio-hang"
            data-testid="header-cart-btn"
            className="relative flex items-center gap-2.5 rounded-lg bg-[#8d4b00] px-4 py-2.5 font-bold text-white shadow-sm transition-all hover:bg-[#b15f00]"
          >
            <ShoppingBag size={18} />
            <span className="hidden text-xs sm:inline">Giỏ hàng</span>
            <span
              data-testid="header-cart-count"
              className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#bb0112] text-[10px] font-extrabold text-white shadow"
            >
              {totalQuantity}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
