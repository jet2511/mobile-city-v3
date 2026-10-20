"use client";

import React, { useState, useMemo } from "react";
import { Product } from "@/types";
import { ProductCard } from "@/components/home/ProductCard";
import { Filter, ArrowUpDown, Smartphone, Search, X, RotateCcw } from "lucide-react";

interface CategoryListingClientProps {
  initialProducts: Product[];
  brands: { name: string; slug: string }[];
}

export function CategoryListingClient({ initialProducts, brands }: CategoryListingClientProps) {
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all");
  const [selectedCondition, setSelectedCondition] = useState<string>("all");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("default");

  const hasActiveFilters =
    selectedBrand !== "all" ||
    selectedPriceRange !== "all" ||
    selectedCondition !== "all" ||
    searchKeyword.trim() !== "";

  const clearAllFilters = () => {
    setSelectedBrand("all");
    setSelectedPriceRange("all");
    setSelectedCondition("all");
    setSearchKeyword("");
    setSortBy("default");
  };

  // Filtering logic
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((p) => {
        // 1. Filter theo brand
        if (selectedBrand !== "all" && p.brandSlug !== selectedBrand) return false;

        // 2. Filter theo condition
        if (selectedCondition !== "all" && p.condition !== selectedCondition) return false;

        // 3. Filter theo từ khóa
        if (searchKeyword.trim()) {
          const kw = searchKeyword.toLowerCase().trim();
          const matchName = p.name ? p.name.toLowerCase().includes(kw) : false;
          const matchBrand = p.brandName ? p.brandName.toLowerCase().includes(kw) : false;
          if (!matchName && !matchBrand) return false;
        }

        // 4. Filter theo khoảng giá
        const price = p.minPrice || 0;
        if (selectedPriceRange === "under-5m" && price >= 5000000) return false;
        if (selectedPriceRange === "5m-8m" && (price < 5000000 || price > 8000000)) return false;
        if (selectedPriceRange === "8m-12m" && (price < 8000000 || price > 12000000)) return false;
        if (selectedPriceRange === "above-12m" && price <= 12000000) return false;

        return true;
      })
      .sort((a, b) => {
        const priceA = a.minPrice || 0;
        const priceB = b.minPrice || 0;
        if (sortBy === "price-asc") return priceA - priceB;
        if (sortBy === "price-desc") return priceB - priceA;
        if (sortBy === "hot") return (b.isHot ? 1 : 0) - (a.isHot ? 1 : 0);
        return 0;
      });
  }, [initialProducts, selectedBrand, selectedPriceRange, selectedCondition, searchKeyword, sortBy]);

  return (
    <div className="space-y-5 my-6">
      {/* Tiêu đề danh mục & Tóm tắt Stitch Style */}
      <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-[#0b1c30] flex items-center gap-2">
            <Smartphone size={24} className="text-[#8d4b00]" />
            ĐIỆN THOẠI DI ĐỘNG CHÍNH HÃNG & XÁCH TAY
          </h1>
          <p className="text-xs text-[#887364] mt-1">
            Hiển thị <strong className="text-[#0b1c30]">{filteredProducts.length}</strong> sản phẩm giá tốt nhất
          </p>
        </div>

        {/* Thanh tìm kiếm nhanh & Sắp xếp */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[200px] md:min-w-[260px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Lọc nhanh tên máy..."
              className="w-full pl-9 pr-8 py-2 text-xs bg-[#f8f9ff] border border-[#dbc2b0]/70 rounded-lg outline-none focus:border-[#8d4b00] focus:bg-white transition-colors"
            />
            {searchKeyword && (
              <button
                onClick={() => setSearchKeyword("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs">
            <ArrowUpDown size={14} className="text-gray-500" />
            <span className="font-semibold text-gray-700 hidden sm:inline">Sắp xếp:</span>
            <select
              data-testid="select-sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-[#e2e8f0] rounded-lg px-3 py-2 bg-white text-[#0b1c30] outline-none focus:border-[#8d4b00] font-medium text-xs cursor-pointer shadow-sm"
            >
              <option value="default">Mới nhất / Mặc định</option>
              <option value="hot">Sản phẩm Hot nhất</option>
              <option value="price-asc">Giá từ thấp đến cao</option>
              <option value="price-desc">Giá từ cao đến thấp</option>
            </select>
          </div>
        </div>
      </div>

      {/* Thanh Bộ Lọc Đa Chiều (Facets Filter) Stitch Style */}
      <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-sm space-y-4">
        {/* Lọc Hãng */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold text-[#0b1c30] min-w-[80px] flex items-center gap-1.5">
            <Filter size={13} className="text-[#8d4b00]" /> Hãng:
          </span>
          <button
            data-testid="filter-brand-all"
            onClick={() => setSelectedBrand("all")}
            className={`px-3.5 py-1.5 rounded-full font-semibold transition-all ${
              selectedBrand === "all"
                ? "bg-[#8d4b00] text-white shadow-sm"
                : "bg-[#f8f9ff] text-gray-700 hover:bg-amber-50 border border-[#e2e8f0]"
            }`}
          >
            Tất cả
          </button>
          {brands.map((b) => (
            <button
              key={b.slug}
              data-testid={`filter-brand-${b.slug}`}
              onClick={() => setSelectedBrand(b.slug)}
              className={`px-3.5 py-1.5 rounded-full font-semibold transition-all ${
                selectedBrand === b.slug
                  ? "bg-[#8d4b00] text-white shadow-sm"
                  : "bg-[#f8f9ff] text-gray-700 hover:bg-amber-50 border border-[#e2e8f0]"
              }`}
            >
              {b.name}
            </button>
          ))}
        </div>

        {/* Lọc Mức Giá */}
        <div className="flex flex-wrap items-center gap-2 text-xs border-t pt-3.5 border-[#e2e8f0]">
          <span className="font-bold text-[#0b1c30] min-w-[80px]">Mức giá:</span>
          {[
            { id: "all", label: "Tất cả mức giá" },
            { id: "under-5m", label: "Dưới 5 triệu" },
            { id: "5m-8m", label: "Từ 5 - 8 triệu" },
            { id: "8m-12m", label: "Từ 8 - 12 triệu" },
            { id: "above-12m", label: "Trên 12 triệu" },
          ].map((r) => (
            <button
              key={r.id}
              data-testid={`filter-price-${r.id}`}
              onClick={() => setSelectedPriceRange(r.id)}
              className={`px-3.5 py-1.5 rounded-full font-semibold transition-all ${
                selectedPriceRange === r.id
                  ? "bg-[#8d4b00] text-white shadow-sm"
                  : "bg-[#f8f9ff] text-gray-700 hover:bg-amber-50 border border-[#e2e8f0]"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Lọc Tình Trạng Máy */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs border-t pt-3.5 border-[#e2e8f0]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-[#0b1c30] min-w-[80px]">Tình trạng:</span>
            {[
              { id: "all", label: "Tất cả" },
              { id: "BRAND_NEW", label: "Mới 100% Nguyên Seal" },
              { id: "LIKE_NEW_99", label: "Máy Cũ Zin 99%" },
            ].map((c) => (
              <button
                key={c.id}
                data-testid={`filter-condition-${c.id}`}
                onClick={() => setSelectedCondition(c.id)}
                className={`px-3.5 py-1.5 rounded-full font-semibold transition-all ${
                  selectedCondition === c.id
                    ? "bg-[#8d4b00] text-white shadow-sm"
                    : "bg-[#f8f9ff] text-gray-700 hover:bg-amber-50 border border-[#e2e8f0]"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Nút reset bộ lọc */}
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-[#8d4b00] hover:text-[#b15f00] font-bold flex items-center gap-1 hover:underline ml-auto"
            >
              <RotateCcw size={12} />
              Xóa bộ lọc
            </button>
          )}
        </div>
      </div>

      {/* Lưới sản phẩm kết quả */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 text-center rounded-2xl border border-[#e2e8f0] shadow-sm space-y-3">
          <p className="text-gray-500 text-sm">Không có sản phẩm nào phù hợp với bộ lọc hiện tại.</p>
          <button
            onClick={clearAllFilters}
            className="text-xs font-bold text-[#8d4b00] hover:underline"
          >
            Xóa toàn bộ bộ lọc & Xem tất cả sản phẩm
          </button>
        </div>
      )}
    </div>
  );
}
