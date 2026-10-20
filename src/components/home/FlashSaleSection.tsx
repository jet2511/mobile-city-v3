import React from "react";
import Link from "next/link";
import { Zap, Clock, ChevronRight, Flame } from "lucide-react";
import { Product } from "@/types";
import { ProductCard } from "./ProductCard";

export function FlashSaleSection({ products }: { products: Product[] }) {
  const flashProducts = products.filter((p) => p.isFlashSale);

  if (flashProducts.length === 0) return null;

  return (
    <section className="bg-white rounded-2xl border border-[#e2e8f0] p-5 shadow-[0_4px_12px_rgba(0,0,0,0.03)] my-6">
      {/* Header Stitch Style */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5 pb-3 border-b border-[#e2e8f0]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-[#bb0112] text-white px-3.5 py-1 rounded-full font-black text-xs tracking-wider uppercase shadow-sm">
            <Flame size={15} className="text-yellow-300 animate-pulse" />
            FLASH SALE GIÁ SỐC
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#554336]">
            <Clock size={14} className="text-[#8d4b00]" />
            <span>Kết thúc trong:</span>
            <div className="flex items-center gap-1 font-mono font-bold text-xs">
              <span className="bg-[#0b1c30] text-white px-1.5 py-0.5 rounded">08</span>:
              <span className="bg-[#0b1c30] text-white px-1.5 py-0.5 rounded">45</span>:
              <span className="bg-[#0b1c30] text-white px-1.5 py-0.5 rounded">12</span>
            </div>
          </div>
        </div>

        <Link
          href="/dien-thoai?flash_sale=true"
          className="text-xs font-bold text-[#8d4b00] hover:text-[#b15f00] flex items-center gap-0.5 transition-colors"
        >
          Xem tất cả <ChevronRight size={14} />
        </Link>
      </div>

      {/* Grid of Flash Sale items */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {flashProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
