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
    <div className="bg-white border-b border-[#e2e8f0] py-3.5 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="max-w-[1240px] mx-auto px-4 lg:px-8 flex items-center justify-between gap-6">
        {/* Brand Logo Stitch Style */}
        <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
          <div className="w-10 h-10 rounded-lg bg-[#8d4b00] flex items-center justify-center text-white font-black text-xl shadow-sm tracking-tight group-hover:bg-[#b15f00] transition-colors">
            MC
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-2xl tracking-tight leading-none text-[#0b1c30]">
              Mobile<span className="text-[#8d4b00]">City</span>
            </span>
            <span className="text-[10px] tracking-wider text-[#887364] uppercase font-semibold mt-0.5">
              ĐIỆN THOẠI GIÁ RẺ NHẤT
            </span>
          </div>
        </Link>

        {/* Smart Search Bar Stitch Style */}
        <div className="flex-1 max-w-2xl relative" ref={searchRef}>
          <div className="relative flex items-center">
            <input
              type="text"
              data-testid="header-search-input"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onFocus={() => results.length > 0 && setShowPopup(true)}
              placeholder="Bạn cần tìm gì... (VD: Redmi K70, iPhone 15 Pro Max)"
              className="w-full bg-[#f8f9ff] text-[#0b1c30] placeholder-gray-400 pl-4 pr-11 py-2.5 rounded-lg border border-[#dbc2b0]/70 text-sm outline-none transition-all focus:border-[#8d4b00] focus:bg-white focus:ring-2 focus:ring-[#8d4b00]/15"
            />
            {keyword ? (
              <button
                onClick={() => {
                  setKeyword("");
                  setShowPopup(false);
                }}
                className="absolute right-12 text-gray-400 hover:text-gray-600 p-1"
              >
                <X size={16} />
              </button>
            ) : null}
            <button
              data-testid="header-search-btn"
              className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-[#8d4b00] hover:bg-[#b15f00] text-white rounded-md flex items-center justify-center transition-colors"
            >
              <Search size={16} />
            </button>
          </div>

          {/* Quick search tags dưới search input */}
          <div className="hidden lg:flex items-center gap-2 mt-1 text-[11px] text-gray-500">
            <span className="text-[#887364]">Gợi ý:</span>
            {["Redmi K70", "iPhone 13 99%", "ROG Phone 8", "Sửa màn hình"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setKeyword(tag)}
                className="hover:text-[#8d4b00] transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Search Results Dropdown Popup */}
          {showPopup && (
            <div
              data-testid="header-search-results"
              className="absolute left-0 right-0 top-full mt-2 bg-white border border-[#e2e8f0] rounded-xl shadow-2xl z-50 overflow-hidden text-[#0b1c30] max-h-[380px] overflow-y-auto"
            >
              <div className="bg-[#eff4ff] px-3.5 py-2 text-xs font-semibold text-[#554336] border-b border-[#e2e8f0]">
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
                      className="p-3 flex items-center gap-3.5 hover:bg-amber-50/50 transition-colors"
                    >
                      <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="w-12 h-12 object-contain rounded-md border border-gray-100 bg-white p-1"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-[#0b1c30] truncate">
                          {item.name}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[#bb0112] font-bold text-xs">
                            {item.minPrice?.toLocaleString("vi-VN")} ₫
                          </span>
                          {item.maxOriginPrice && item.maxOriginPrice > (item.minPrice || 0) && (
                            <span className="text-gray-400 line-through text-[11px]">
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
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            href="/sua-chua"
            className="hidden md:flex items-center gap-2 text-xs font-semibold border border-[#e2e8f0] hover:border-[#8d4b00] hover:bg-amber-50/40 text-[#0b1c30] px-3.5 py-2 rounded-lg transition-all"
          >
            <div className="w-7 h-7 rounded bg-amber-100 text-[#8d4b00] flex items-center justify-center">
              <Wrench size={14} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-gray-500 leading-none">Báo giá</span>
              <strong className="text-xs text-[#0b1c30]">Sửa chữa</strong>
            </div>
          </Link>

          <Link
            href="/gio-hang"
            data-testid="header-cart-btn"
            className="flex items-center gap-2.5 bg-[#8d4b00] hover:bg-[#b15f00] text-white px-4 py-2.5 rounded-lg shadow-sm transition-all relative font-bold"
          >
            <ShoppingBag size={18} />
            <span className="text-xs hidden sm:inline">Giỏ hàng</span>
            <span
              data-testid="header-cart-count"
              className="bg-[#bb0112] text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center absolute -top-1.5 -right-1.5 shadow"
            >
              {totalQuantity}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
