"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Product, ProductVariant } from "@/types";
import { useRegion } from "@/context/RegionContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { ShieldCheck, MapPin, CheckCircle2, ShoppingCart, Truck, Sparkles, RefreshCw, CreditCard, ChevronRight } from "lucide-react";
import Link from "next/link";

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const { region, currentRegionName } = useRegion();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const variants = product.variants || [];

  // Active Image Gallery
  const allImages = useMemo(() => {
    const list = Array.isArray(product.images) && product.images.length > 0 ? product.images : [product.thumbnail];
    return Array.from(new Set([product.thumbnail, ...list]));
  }, [product.thumbnail, product.images]);

  const [activeImage, setActiveImage] = useState<string>(allImages[0] || product.thumbnail);

  // 1. Phân nhóm RAM/ROM và Màu sắc độc lập
  const memoryOptions = useMemo(() => {
    const set = new Set<string>();
    variants.forEach((v) => {
      const label = `${v.ram || ""} ${v.storage || ""}`.trim();
      if (label) set.add(label);
    });
    return Array.from(set);
  }, [variants]);

  const [selectedMemory, setSelectedMemory] = useState<string>(memoryOptions[0] || "");

  // Các biến thể theo Memory đang chọn
  const availableVariantsForMemory = useMemo(() => {
    return variants.filter((v) => `${v.ram || ""} ${v.storage || ""}`.trim() === selectedMemory);
  }, [variants, selectedMemory]);

  const colorOptions = useMemo(() => {
    return Array.from(new Set(availableVariantsForMemory.map((v) => v.color)));
  }, [availableVariantsForMemory]);

  const [selectedColor, setSelectedColor] = useState<string>(colorOptions[0] || "");

  // Cập nhật selectedColor nếu không khớp memory mới
  const activeVariant: ProductVariant = useMemo(() => {
    return (
      availableVariantsForMemory.find((v) => v.color === selectedColor) ||
      availableVariantsForMemory[0] ||
      variants[0]
    );
  }, [availableVariantsForMemory, selectedColor, variants]);

  // 2. Bảo Hành Vàng Add-on Toggle
  const [hasGoldCare, setHasGoldCare] = useState<boolean>(true);

  const finalPrice = activeVariant
    ? activeVariant.salePrice + (hasGoldCare ? activeVariant.goldCareFee : 0)
    : 0;

  // 3. Tồn kho chi nhánh theo Region hiện tại
  const branchInventories = useMemo(() => {
    if (!activeVariant?.inventories) return [];
    return activeVariant.inventories.filter((inv) => inv.region === region);
  }, [activeVariant, region]);

  const totalStockInRegion = branchInventories.reduce((acc, curr) => acc + curr.quantity, 0);

  const handleAddToCart = (redirect: boolean = false) => {
    if (!activeVariant) return;

    addToCart({
      productId: product.id,
      variantId: activeVariant.id,
      name: product.name,
      slug: product.slug,
      thumbnail: product.thumbnail,
      color: activeVariant.color,
      ram: activeVariant.ram,
      storage: activeVariant.storage,
      basePrice: activeVariant.salePrice,
      goldCareFee: activeVariant.goldCareFee,
      hasGoldCare,
      quantity: 1,
    });

    showToast({
      title: "Đã thêm vào giỏ hàng!",
      message: `${product.name} - ${activeVariant.color} (${hasGoldCare ? "Kèm BH Vàng" : "BH Tiêu chuẩn"})`,
      thumbnail: product.thumbnail,
      type: "success",
    });

    if (redirect) {
      router.push("/gio-hang");
    }
  };

  return (
    <div className="space-y-6 my-6">
      {/* Breadcrumb Stitch Style */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#887364]">
        <Link href="/" className="hover:text-[#8d4b00] transition-colors">Trang chủ</Link>
        <ChevronRight size={12} />
        <Link href="/dien-thoai" className="hover:text-[#8d4b00] transition-colors">Điện thoại</Link>
        <ChevronRight size={12} />
        <span className="text-[#0b1c30] font-semibold">{product.brandName}</span>
        <ChevronRight size={12} />
        <span className="text-gray-500 truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cột trái: Ảnh Gallery & Specs (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm flex items-center justify-center relative overflow-hidden">
            <span className="absolute top-3 left-3 bg-[#0b1c30] text-[#38bdf8] text-[10px] font-bold px-2 py-0.5 rounded shadow-sm z-10">
              {product.condition === "LIKE_NEW_99" ? "Cũ 99% Zin Đẹp" : "Mới 100% Nguyên Seal"}
            </span>
            <img
              data-testid="pdp-main-image"
              src={activeImage}
              alt={product.name}
              className="w-full max-h-[380px] object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Dải ảnh Thumbnail đa góc nhìn */}
          {allImages.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-16 rounded-xl border p-1 bg-white flex items-center justify-center transition-all cursor-pointer flex-shrink-0 ${
                    activeImage === img
                      ? "border-[#8d4b00] ring-2 ring-[#8d4b00]/25 shadow-sm"
                      : "border-[#e2e8f0] hover:border-gray-400 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}

          {/* Hỗ trợ kỹ thuật & ROM box */}
          <div className="bg-[#eff4ff] p-4 rounded-xl border border-[#dce9ff] text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#8d4b00]">
              <Sparkles size={16} />
              Đặc quyền tại MobileCity
            </div>
            <ul className="space-y-1 text-gray-700 list-disc list-inside text-[11px]">
              <li>Hỗ trợ Unlock Bootloader & Cài ROM Tiếng Việt trọn đời máy</li>
              <li>Tặng củ sạc nhanh chuẩn zin theo máy</li>
              <li>Hỗ trợ thu cũ đổi mới trợ giá lên tới 2.000.000đ</li>
            </ul>
          </div>

          {/* Thông số kỹ thuật tóm tắt zebra striping */}
          {product.specs && (
            <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-sm">
              <h3 className="font-bold text-sm text-[#0b1c30] border-b pb-2.5 mb-3 flex items-center justify-between">
                <span>Thông số kỹ thuật phần cứng</span>
                <span className="text-[10px] font-normal text-gray-500">Chính xác 100%</span>
              </h3>
              <dl className="text-xs space-y-1">
                {Object.entries(product.specs).map(([key, val], idx) => (
                  <div
                    key={key}
                    className={`flex justify-between py-2 px-2.5 rounded ${
                      idx % 2 === 0 ? "bg-[#f8f9ff]" : "bg-white"
                    }`}
                  >
                    <dt className="text-[#887364] capitalize font-medium">{key}:</dt>
                    <dd className="font-bold text-[#0b1c30] text-right max-w-[65%]">{val as string}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>

        {/* Cột phải: Chọn Cấu Hình & Mua Hàng (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase font-extrabold text-[#8d4b00] tracking-wider bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                {product.brandName}
              </span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500 font-medium">Mã SKU: MC-{product.slug}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#0b1c30] mt-1.5 leading-snug">
              {product.name}
            </h1>
          </div>

          {/* Khối giá hiển thị tức thời Stitch Style */}
          <div className="bg-[#eff4ff] border border-[#dce9ff] rounded-2xl p-4 flex flex-wrap items-baseline gap-4 shadow-sm">
            <span data-testid="pdp-final-price" className="text-3xl md:text-4xl font-black text-[#bb0112]">
              {finalPrice.toLocaleString("vi-VN")} đ
            </span>
            {activeVariant?.originPrice > activeVariant?.salePrice && (
              <span className="text-sm text-gray-400 line-through">
                {(activeVariant.originPrice + (hasGoldCare ? activeVariant.goldCareFee : 0)).toLocaleString("vi-VN")}{" "}
                đ
              </span>
            )}
            {hasGoldCare && (
              <span className="text-xs bg-[#fef3c7] text-[#92400e] border border-[#fde68a] font-bold px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1">
                <ShieldCheck size={13} className="text-[#d97706]" />
                Đã kèm Gói Bảo Hành Vàng
              </span>
            )}
          </div>

          {/* 1. Chọn Phiên bản Bộ nhớ */}
          {memoryOptions.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#0b1c30] uppercase tracking-wide">
                1. Chọn Phiên bản RAM - Dung lượng:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {memoryOptions.map((mem) => {
                  const isSelected = selectedMemory === mem;
                  return (
                    <button
                      key={mem}
                      type="button"
                      data-testid={`option-mem-${mem.replace(/\s+/g, "-")}`}
                      onClick={() => setSelectedMemory(mem)}
                      className={`p-3 rounded-xl text-left border transition-all relative cursor-pointer ${
                        isSelected
                          ? "border-[#8d4b00] bg-amber-50/70 text-[#0b1c30] ring-1 ring-[#8d4b00] shadow-sm"
                          : "border-[#e2e8f0] hover:border-[#dbc2b0] bg-white text-[#0b1c30]"
                      }`}
                    >
                      <div className="text-xs font-bold">{mem}</div>
                      <div className="text-[11px] text-[#bb0112] font-semibold mt-0.5">
                        {availableVariantsForMemory[0]?.salePrice?.toLocaleString("vi-VN")} ₫
                      </div>
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-3.5 h-3.5 bg-[#8d4b00] rounded-full flex items-center justify-center text-white text-[9px]">
                          ✓
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. Chọn Màu Sắc */}
          {colorOptions.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#0b1c30] uppercase tracking-wide">
                2. Chọn Màu sắc máy:
              </label>
              <div className="flex flex-wrap gap-2.5">
                {colorOptions.map((col) => {
                  const isSelected = selectedColor === col;
                  return (
                    <button
                      key={col}
                      type="button"
                      data-testid={`option-color-${col.replace(/\s+/g, "-")}`}
                      onClick={() => setSelectedColor(col)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#8d4b00] bg-amber-50 text-[#8d4b00] ring-1 ring-[#8d4b00] shadow-sm"
                          : "border-[#e2e8f0] hover:border-gray-300 bg-white text-gray-700"
                      }`}
                    >
                      {col}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. Gói Bảo Hành Vàng (Đặc trưng cốt lõi MobileCity) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#0b1c30] uppercase tracking-wide">
                3. Chọn Gói Bảo Hành Khuyên Dùng:
              </label>
              <Link href="/chinh-sach-bao-hanh-vang" className="text-[11px] text-[#8d4b00] hover:underline font-semibold">
                Xem chi tiết quyền lợi BHV »
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                data-testid="warranty-standard"
                onClick={() => setHasGoldCare(false)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  !hasGoldCare
                    ? "border-[#8d4b00] bg-amber-50/50 text-[#0b1c30] ring-1 ring-[#8d4b00]"
                    : "border-[#e2e8f0] bg-white hover:border-gray-300 text-gray-600"
                }`}
              >
                <div className="font-bold text-xs">BH Tiêu Chuẩn (Mặc định)</div>
                <div className="text-[11px] text-gray-500 mt-1">Bảo hành 12 tháng phần cứng cơ bản</div>
                <div className="font-bold text-xs mt-1.5 text-gray-800">Miễn phí theo máy</div>
              </div>

              <div
                data-testid="warranty-gold"
                onClick={() => setHasGoldCare(true)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all relative ${
                  hasGoldCare
                    ? "border-[#d97706] bg-[#fef3c7]/60 text-[#0b1c30] ring-2 ring-[#d97706]/40 shadow-sm"
                    : "border-[#e2e8f0] bg-white hover:border-gray-300 text-gray-600"
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs text-[#92400e]">
                  <ShieldCheck size={16} className="text-[#d97706]" />
                  BẢO HÀNH VÀNG (99% Khách chọn)
                </div>
                <div className="text-[11px] text-gray-700 mt-1">
                  Bảo hành toàn diện cả <strong>Nguồn, Màn hình, Cảm ứng, Rơi vỡ</strong>
                </div>
                <div className="font-black text-xs text-[#bb0112] mt-1.5">
                  +{activeVariant?.goldCareFee?.toLocaleString("vi-VN")} ₫
                </div>
              </div>
            </div>
          </div>

          {/* 4. Tình trạng Tồn kho theo Khu vực */}
          <div className="bg-[#f8f9ff] rounded-2xl p-4 border border-[#e2e8f0] space-y-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-bold text-[#0b1c30]">
                <MapPin size={15} className="text-[#8d4b00]" />
                Tình trạng tồn kho tại khu vực: <strong className="text-[#8d4b00]">{currentRegionName}</strong>
              </span>
              <span
                data-testid="pdp-stock-status"
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  totalStockInRegion > 0 ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                }`}
              >
                {totalStockInRegion > 0 ? `Còn hàng (${totalStockInRegion} máy sẵn sàng)` : "Tạm hết hàng"}
              </span>
            </div>

            <div className="space-y-1.5">
              {branchInventories.map((inv) => (
                <div
                  key={inv.branchId}
                  className="flex items-center justify-between text-xs py-1.5 px-3 bg-white rounded-lg border border-[#e2e8f0]"
                >
                  <div>
                    <span className="font-bold text-[#0b1c30]">{inv.branchName}</span>
                    <p className="text-[11px] text-gray-500">{inv.address}</p>
                  </div>
                  <span className="font-bold text-emerald-600 flex items-center gap-1 text-[11px]">
                    <CheckCircle2 size={13} /> Sẵn máy
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons Stitch Style */}
          <div className="space-y-2.5 pt-2">
            <div className="flex gap-3">
              <button
                data-testid="btn-buy-now"
                type="button"
                onClick={() => handleAddToCart(true)}
                className="flex-1 bg-[#bb0112] hover:bg-[#a10110] text-white font-black py-3.5 rounded-xl shadow-md transition-all flex flex-col items-center justify-center cursor-pointer"
              >
                <span className="text-base uppercase tracking-wider font-extrabold">MUA NGAY GIÁ TỐT</span>
                <span className="text-[11px] font-normal text-red-100">Giao hàng hỏa tốc hoặc nhận tại Showroom</span>
              </button>

              <button
                data-testid="btn-add-cart"
                type="button"
                onClick={() => handleAddToCart(false)}
                className="px-5 bg-white border-2 border-[#8d4b00] hover:bg-amber-50 text-[#8d4b00] font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <ShoppingCart size={20} />
                <span className="text-xs font-bold hidden sm:inline">Thêm Giỏ</span>
              </button>
            </div>

            {/* Sub CTAs: Trả góp & Thu cũ */}
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/huong-dan-tra-gop"
                className="p-2.5 rounded-xl border border-[#cbd5e1] hover:border-[#8d4b00] bg-white text-center transition-colors block"
              >
                <div className="flex items-center justify-center gap-1 text-xs font-bold text-[#0b1c30]">
                  <CreditCard size={14} className="text-[#8d4b00]" />
                  TRẢ GÓP 0% LÃI SUẤT
                </div>
                <div className="text-[10px] text-gray-500 mt-0.5">Duyệt hồ sơ nhanh qua CCCD</div>
              </Link>

              <Link
                href="/thu-cu-doi-moi"
                className="p-2.5 rounded-xl border border-[#cbd5e1] hover:border-[#8d4b00] bg-white text-center transition-colors block"
              >
                <div className="flex items-center justify-center gap-1 text-xs font-bold text-[#0b1c30]">
                  <RefreshCw size={14} className="text-emerald-600" />
                  THU CŨ ĐỔI MỚI
                </div>
                <div className="text-[10px] text-gray-500 mt-0.5">Trợ giá lên đời đến 2.000.000₫</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
