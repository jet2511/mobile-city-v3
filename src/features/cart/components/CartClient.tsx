"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useRegion } from "@/context/RegionContext";
import {
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Truck,
  Store,
  ArrowRight,
  Sparkles,
  FileText,
} from "lucide-react";

export function CartClient() {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const { currentRegionName } = useRegion();

  const [deliveryMethod, setDeliveryMethod] = useState<"home" | "store">("home");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;

    const orderCode = "MC-" + Math.floor(100000 + Math.random() * 900000);
    clearCart();
    setOrderSuccess(orderCode);
  };

  if (orderSuccess) {
    return (
      <div
        data-testid="order-success-screen"
        className="mx-auto my-12 max-w-xl space-y-4 rounded-2xl border border-[#e2e8f0] bg-white p-8 text-center shadow-sm md:p-10"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 shadow-inner">
          <CheckCircle2 size={36} />
        </div>
        <h2 className="text-2xl font-extrabold text-[#0b1c30] md:text-3xl">Đặt Hàng Thành Công!</h2>
        <p className="text-xs text-gray-600 md:text-sm">
          Cảm ơn bạn đã tin tưởng lựa chọn MobileCity. Mã tra cứu đơn hàng của bạn:
        </p>
        <div className="inline-block rounded-xl border border-red-200 bg-red-50 px-6 py-2.5 font-mono text-xl font-black text-[#bb0112] shadow-sm">
          {orderSuccess}
        </div>
        <p className="text-xs text-gray-500">
          Tổng đài viên chi nhánh {currentRegionName} sẽ liên hệ xác nhận đơn hàng trong vòng 10
          phút.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-4">
          <Link
            href="/"
            className="inline-block rounded-xl bg-[#8d4b00] px-6 py-3 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#b15f00]"
          >
            Tiếp tục mua sắm
          </Link>
          <Link
            href={`/dat-hang-thanh-cong?orderId=${orderSuccess}`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#e2e8f0] bg-[#f8f9ff] px-6 py-3 text-xs font-bold text-[#0b1c30] transition-all hover:border-[#8d4b00]"
          >
            <FileText size={14} />
            Xem chi tiết đơn hàng
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto my-12 max-w-md space-y-4 rounded-2xl border border-[#e2e8f0] bg-white p-12 text-center shadow-sm">
        <div className="text-5xl">🛒</div>
        <h2 className="text-lg font-bold text-[#0b1c30]">Giỏ hàng của bạn đang trống</h2>
        <p className="text-xs text-[#887364]">
          Hãy khám phá các sản phẩm điện thoại Xiaomi, iPhone giá rẻ nhất thị trường tại MobileCity!
        </p>
        <Link
          href="/dien-thoai"
          className="inline-block rounded-xl bg-[#8d4b00] px-6 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-[#b15f00]"
        >
          Khám phá sản phẩm ngay
        </Link>
      </div>
    );
  }

  return (
    <div className="my-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
      {/* Cột trái: Danh sách sản phẩm Stitch Style (7 cols) */}
      <div className="space-y-4 lg:col-span-7">
        <div className="flex items-center justify-between rounded-2xl border border-[#e2e8f0] bg-white p-4 shadow-sm md:p-5">
          <h1 className="text-base font-extrabold text-[#0b1c30] uppercase md:text-lg">
            Giỏ Hàng Của Bạn ({items.length} sản phẩm)
          </h1>
          <Link
            href="/dien-thoai"
            className="flex items-center gap-1 text-xs font-bold text-[#8d4b00] hover:underline"
          >
            <ArrowLeft size={14} /> Chọn thêm sản phẩm khác
          </Link>
        </div>

        <div className="space-y-3">
          {items.map((item) => {
            const itemUnitPrice = item.basePrice + (item.hasGoldCare ? item.goldCareFee : 0);
            const versionStr = [item.ram, item.storage].filter(Boolean).join(" - ");

            return (
              <div
                key={item.id}
                data-testid={`cart-item-${item.id}`}
                className="relative flex items-center gap-4 overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white p-4 shadow-sm"
              >
                {/* Thumbnail */}
                <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-[#f8f9ff] p-2">
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-bold text-[#0b1c30]">{item.name}</h3>
                  <div className="mt-0.5 flex items-center gap-2 text-[11px] text-[#887364]">
                    {item.color && (
                      <span className="rounded bg-gray-100 px-2 py-0.5">{item.color}</span>
                    )}
                    {versionStr && (
                      <span className="rounded bg-gray-100 px-2 py-0.5">{versionStr}</span>
                    )}
                  </div>

                  {item.hasGoldCare && (
                    <div className="mt-1.5 flex w-fit items-center gap-1 rounded border border-amber-200/50 bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-[#8d4b00]">
                      <ShieldCheck size={12} className="text-[#8d4b00]" />
                      Bảo Hành Vàng 12T (+{item.goldCareFee.toLocaleString("vi-VN")}₫)
                    </div>
                  )}

                  <div className="mt-2 text-sm font-black text-[#bb0112]">
                    {itemUnitPrice.toLocaleString("vi-VN")}₫
                  </div>
                </div>

                {/* Quantity Controls & Delete */}
                <div className="flex flex-shrink-0 flex-col items-end gap-3">
                  <button
                    data-testid={`btn-remove-${item.id}`}
                    onClick={() => removeFromCart(item.id)}
                    className="p-1 text-gray-400 transition-colors hover:text-red-600"
                    title="Xóa sản phẩm"
                  >
                    <Trash2 size={16} />
                  </button>

                  <div className="flex items-center overflow-hidden rounded-lg border border-[#dbc2b0] bg-[#f8f9ff]">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2.5 py-1 text-xs font-bold text-gray-600 transition-colors hover:bg-gray-200"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="min-w-[30px] bg-white px-3 py-1 text-center text-xs font-black text-[#0b1c30]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2.5 py-1 text-xs font-bold text-gray-600 transition-colors hover:bg-gray-200"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cột phải: Form đặt hàng & Thông tin thanh toán (5 cols) */}
      <div className="space-y-4 lg:col-span-5">
        {/* Tóm tắt chi phí */}
        <div className="space-y-3 rounded-2xl border border-[#e2e8f0] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-1.5 border-b border-gray-100 pb-2 text-sm font-black text-[#0b1c30] uppercase">
            <Sparkles size={16} className="text-[#8d4b00]" /> Tóm Tắt Thanh Toán
          </div>

          <div className="flex justify-between text-xs text-[#554336]">
            <span>Tổng tiền hàng ({items.reduce((acc, i) => acc + i.quantity, 0)} món):</span>
            <span className="font-bold text-[#0b1c30]">{totalPrice.toLocaleString("vi-VN")}₫</span>
          </div>

          <div className="flex justify-between text-xs text-[#554336]">
            <span>Phí giao hàng:</span>
            <span className="font-bold text-emerald-600">Miễn phí toàn quốc</span>
          </div>

          <div className="flex items-center justify-between border-t border-dashed border-gray-200 pt-3">
            <span className="text-sm font-bold text-[#0b1c30]">Tổng thanh toán:</span>
            <span className="text-xl font-black text-[#bb0112]">
              {totalPrice.toLocaleString("vi-VN")}₫
            </span>
          </div>
          <p className="text-right text-[11px] text-gray-500 italic">
            (Đã bao gồm VAT & áp dụng bảo hành tại {currentRegionName})
          </p>
        </div>

        {/* Thông tin giao nhận hàng */}
        <form
          onSubmit={handleCheckout}
          className="space-y-4 rounded-2xl border border-[#e2e8f0] bg-white p-5 shadow-sm"
        >
          <div className="border-b border-gray-100 pb-2 text-sm font-black text-[#0b1c30] uppercase">
            Thông Tin Khách Hàng
          </div>

          {/* Phương thức nhận */}
          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <button
              type="button"
              onClick={() => setDeliveryMethod("home")}
              className={`flex items-center justify-center gap-2 rounded-xl border p-3 transition-all ${
                deliveryMethod === "home"
                  ? "border-[#8d4b00] bg-amber-50 text-[#8d4b00]"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Truck size={16} /> Giao Tận Nơi
            </button>
            <button
              type="button"
              onClick={() => setDeliveryMethod("store")}
              className={`flex items-center justify-center gap-2 rounded-xl border p-3 transition-all ${
                deliveryMethod === "store"
                  ? "border-[#8d4b00] bg-amber-50 text-[#8d4b00]"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Store size={16} /> Nhận Tại Showroom
            </button>
          </div>

          {/* Input Fields */}
          <div className="space-y-3 text-xs">
            <div>
              <label className="mb-1 block font-semibold text-gray-600">
                Họ và tên người nhận *
              </label>
              <input
                type="text"
                required
                data-testid="checkout-name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Ví dụ: Nguyễn Văn A"
                className="w-full rounded-lg border border-[#cbd5e1] bg-[#f8f9ff] p-2.5 text-xs outline-none focus:border-[#8d4b00]"
              />
            </div>

            <div>
              <label className="mb-1 block font-semibold text-gray-600">
                Số điện thoại liên hệ *
              </label>
              <input
                type="tel"
                required
                data-testid="checkout-phone"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Ví dụ: 0988 123 456"
                className="w-full rounded-lg border border-[#cbd5e1] bg-[#f8f9ff] p-2.5 text-xs outline-none focus:border-[#8d4b00]"
              />
            </div>

            {deliveryMethod === "home" && (
              <div>
                <label className="mb-1 block font-semibold text-gray-600">
                  Địa chỉ nhận hàng *
                </label>
                <input
                  type="text"
                  required
                  data-testid="checkout-address"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
                  className="w-full rounded-lg border border-[#cbd5e1] bg-[#f8f9ff] p-2.5 text-xs outline-none focus:border-[#8d4b00]"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            data-testid="btn-submit-order"
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#bb0112] to-[#8d4b00] py-3.5 text-sm font-black text-white uppercase shadow-md transition-all hover:opacity-95"
          >
            <span>Xác Nhận Đặt Hàng (COD)</span>
            <ArrowRight size={16} />
          </button>
          <p className="text-center text-[11px] text-gray-400">
            Kiểm tra hàng trước khi thanh toán • Hỗ trợ đổi trả 15 ngày
          </p>
        </form>
      </div>
    </div>
  );
}
