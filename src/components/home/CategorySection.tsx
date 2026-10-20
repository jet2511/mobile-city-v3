import React from "react";
import Link from "next/link";
import { Smartphone, ChevronRight } from "lucide-react";
import { Product } from "@/types";
import { ProductCard } from "./ProductCard";

interface CategorySectionProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  brandSlug?: string;
  categorySlug?: string;
  products: Product[];
  filterTags?: { name: string; href: string }[];
}

export function CategorySection({
  title,
  subtitle,
  icon,
  products,
  filterTags = [],
}: CategorySectionProps) {
  return (
    <section className="bg-white rounded-2xl p-5 shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-[#e2e8f0] my-6">
      {/* Title Bar Stitch Style */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#e2e8f0] mb-4">
        <div className="flex items-center gap-2.5">
          {icon || <Smartphone size={22} className="text-[#8d4b00]" />}
          <div>
            <h2 className="text-lg md:text-xl font-extrabold text-[#0b1c30] uppercase tracking-tight">
              {title}
            </h2>
            {subtitle && <p className="text-xs text-[#887364] mt-0.5">{subtitle}</p>}
          </div>
        </div>

        {/* Filter Quick Tags */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          {filterTags.map((tag, idx) => (
            <Link
              key={idx}
              href={tag.href}
              className="bg-[#f8f9ff] hover:bg-amber-50 hover:text-[#8d4b00] text-[#554336] px-3 py-1 rounded-full font-medium transition-colors border border-[#e2e8f0] hover:border-[#dbc2b0]"
            >
              {tag.name}
            </Link>
          ))}
          <Link
            href="/dien-thoai"
            className="text-xs font-bold text-[#8d4b00] hover:underline flex items-center gap-0.5 ml-2"
          >
            Xem tất cả <ChevronRight size={14} />
          </Link>
        </div>
      </div>

      {/* Product Grid - 4 Columns */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
