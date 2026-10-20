import React from "react";
import Link from "next/link";
import { Product } from "@/types";
import { ShieldCheck, Star } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  const discountPercent =
    product.maxOriginPrice && product.minPrice && product.maxOriginPrice > product.minPrice
      ? Math.round(((product.maxOriginPrice - product.minPrice) / product.maxOriginPrice) * 100)
      : null;

  return (
    <div
      data-testid={`product-card-${product.slug}`}
      className="bg-white rounded-lg border border-[#e2e8f0] hover:border-[#8d4b00]/60 hover:shadow-[0_10px_20px_-5px_rgba(15,23,42,0.08)] transition-all duration-200 overflow-hidden flex flex-col group p-3.5 relative"
    >
      {/* Top Badges */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
        {product.condition === "LIKE_NEW_99" ? (
          <span className="bg-[#0b1c30] text-[#38bdf8] text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
            Cũ 99% Zin
          </span>
        ) : (
          <span className="bg-[#0b1c30] text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
            Mới 100% Nguyên Seal
          </span>
        )}
        {discountPercent ? (
          <span className="bg-[#bb0112] text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow-sm">
            -{discountPercent}%
          </span>
        ) : null}
      </div>

      {/* Image Thumbnail 1:1 Aspect ratio clean canvas */}
      <Link href={`/dien-thoai/${product.slug}`} className="block relative pt-6 pb-2 overflow-hidden flex items-center justify-center">
        <img
          src={product.thumbnail}
          alt={product.name}
          className="w-full h-44 object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </Link>

      {/* Title & Brand */}
      <div className="flex-1 flex flex-col justify-between mt-2">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#887364] uppercase tracking-wider">
              {product.brandName}
            </span>
            <div className="flex items-center gap-0.5 text-amber-500 text-[10px] font-bold">
              <Star size={11} className="fill-amber-500 text-amber-500" />
              <span>5.0</span>
            </div>
          </div>
          <Link
            href={`/dien-thoai/${product.slug}`}
            className="block text-sm font-bold text-[#0b1c30] group-hover:text-[#8d4b00] line-clamp-2 transition-colors mt-0.5 leading-snug"
          >
            {product.name}
          </Link>
        </div>

        {/* Pricing */}
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span
              data-testid={`price-${product.slug}`}
              className="text-base font-extrabold text-[#bb0112]"
            >
              {product.minPrice?.toLocaleString("vi-VN")} ₫
            </span>
            {product.maxOriginPrice && product.maxOriginPrice > (product.minPrice || 0) && (
              <span className="text-xs text-gray-400 line-through">
                {product.maxOriginPrice.toLocaleString("vi-VN")} ₫
              </span>
            )}
          </div>

          {/* Stitch Gold Warranty Badge */}
          <div className="mt-2 bg-[#fef3c7] border border-[#fde68a] rounded px-2 py-1 flex items-center gap-1.5 text-[11px] text-[#92400e] font-semibold">
            <ShieldCheck size={13} className="text-[#d97706] flex-shrink-0" />
            <span className="truncate">BH Vàng 12T nguồn, màn hình</span>
          </div>

          {/* Action button */}
          <Link
            href={`/dien-thoai/${product.slug}`}
            className="mt-3 w-full bg-[#f8f9ff] hover:bg-[#8d4b00] hover:text-white text-[#0b1c30] font-bold text-xs py-2 rounded-md text-center transition-all block border border-[#e2e8f0] hover:border-[#8d4b00]"
          >
            Xem cấu hình & Giá chi nhánh
          </Link>
        </div>
      </div>
    </div>
  );
}
