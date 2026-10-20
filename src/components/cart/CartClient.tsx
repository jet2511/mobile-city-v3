"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useRegion } from "@/context/RegionContext";
import { Trash2, Plus, Minus, ArrowLeft, ShieldCheck, CheckCircle2, Truck, Store, ArrowRight, Sparkles } from "lucide-react";

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

    const fakeOrderCode = `MC-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderSuccess(fakeOrderCode);
    clearCart();
  };

  if (orderSuccess) {
    return (
      <div data-testid="order-success-screen" className="bg-white rounded-2xl p-8 md:p-10 border border-[#e2e8f0] shadow-sm max-w-xl mx-auto my-12 text-center space-y-4">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 size={36} />
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#0b1c30]">Đặt Hàng Thành Công!</h2>
        <p className="text-xs md:text-sm text-gray-600">
          Cảm ơn bạn đã tin tưởng lựa chọn MobileCity. Mã tra cứu đơn hàng của bạn:
        </p>
        <div className="text-xl font-mono font-black text-[#bb0112] bg-red-50 py-2.5 px-6 rounded-xl border border-red-200 inline-block shadow-sm">
          {orderSuccess}
        </div>
        <p className="text-xs text-gray-500">
          Tổng đài viên chi nhánh {currentRegionName} sẽ liên hệ xác nhận đơn hàng trong vòng 10 phút.
        </p>
        <div className="pt-4 flex justify-center gap-3">
          <Link
            href="/"
            className="inline-block bg-[#8d4b00] hover:bg-[#b15f00] text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-sm"
          >
            Tiếp tục mua sắm
          </Link>
          <Link
            href="/tra-cuu-bao-hanh"
            className="inline-block bg-[#f8f9ff] border border-[#e2e8f0] hover:border-[#8d4b00] text-[#0b1c30] font-bold text-xs px-6 py-3 rounded-xl transition-all"
          >
            Tra cứu đơn hàng
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 border border-[#e2e8f0] shadow-sm text-center max-w-md mx-auto my-12 space-y-4">
        <div className="text-5xl">🛒</div>
        <h2 className="text-lg font-bold text-[#0b1c30]">Giỏ hàng của bạn đang trống</h2>
        <p className="text-xs text-[#887364]">
          Hãy khám phá các sản phẩm điện thoại Xiaomi, iPhone giá rẻ nhất thị trường tại MobileCity!
        </p>
        <Link
          href="/dien-thoai"
          className="inline-block bg-[#8d4b00] hover:bg-[#b15f00] text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-colors shadow-sm"
        >
          Khám phá sản phẩm ngay
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-6">
      {/* Cột trái: Danh sách sản phẩm Stitch Style (7 cols) */}
      <div className="lg:col-span-7 space-y-4">
        <div className="bg-white p-4 md:p-5 rounded-2xl border border-[#e2e8f0] shadow-sm flex items-center justify-between">
          <h1 className="font-extrabold text-base md:text-lg text-[#0b1c30] uppercase">
            Giỏ Hàng Của Bạn ({items.length} sản phẩm)
          </h1>
          <Link href="/dien-thoai" className="text-xs text-[#8d4b00] hover:underline flex items-center gap-1 font-bold">
            <ArrowLeft size={14} /> Chọn thêm sản phẩm khác
          </Link>
        </div>

        <div className="space-y-3">
          {items.map((item) => {
            const itemUnitPrice = item.basePrice + (item.hasGoldCare ? item.goldCareFee : 0);
            return (
              <div
                key={item.id}
                data-testid={`cart-item-${item.id}`}
                className="bg-white p-4 rounded-2xl border border-[#e2e8f0] shadow-sm flex items-center gap-4 relative overflow-hidden"
              >
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-18 h-18 object-contain rounded-xl border border-gray-100 bg-[#f8f9ff] p-1.5"
                />

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm text-[#0b1c30] truncate">{item.name}</h3>
                  <div className="text-xs text-[#887364] mt-0.5">
                    Phân loại: <strong className="text-[#0b1c30]">{item.ram || ""} {item.storage || ""}</strong> • Màu: <strong className="text-[#0b1c30]">{item.color}</strong>
                  </div>
                  {item.hasGoldCare && (
                    <div className="flex items-center gap-1 text-[11px] text-[#92400e] bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-semibold mt-1 w-fit">
                      <ShieldCheck size={13} className="text-[#d97706]" />
                      Đã kèm Gói Bảo Hành Vàng (+{item.goldCareFee.toLocaleString("vi-VN")} đ)
                    </div>
                  )}
                  <div className="text-sm font-extrabold text-[#bb0112] mt-1.5">
                    {itemUnitPrice.toLocaleString("vi-VN")} đ
                  </div>
                </div>

                {/* Bộ chỉnh số lượng */}
                <div className="flex items-center border border-[#cbd5e1] rounded-lg overflow-hidden bg-[#f8f9ff]">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="p-1.5 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
                  >
                    <Minus size={13} />
                  </button>
                  <span data-testid={`cart-qty-${item.id}`} className="px-3 text-xs font-bold text-[#0b1c30]">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="p-1.5 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
                  >
                    <Plus size={13} />
                  </button>
                </div>

                <button
                  data-testid={`btn-remove-${item.id}`}
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-400 hover:text-red-500 p-1.5 transition-colors cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cột phải: Form Đặt Hàng & Checkout Stitch Style (5 cols) */}
      <div className="lg:col-span-5">
        <form onSubmit={handleCheckout} className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm space-y-4">
          <h2 className="font-extrabold text-base text-[#0b1c30] uppercase border-b pb-2.5">
            Thông Tin Nhận Hàng & Thanh Toán
          </h2>

          {/* Phương thức nhận hàng */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setDeliveryMethod("home")}
              className={`p-3 rounded-xl border font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                deliveryMethod === "home"
                  ? "border-[#8d4b00] bg-amber-50 text-[#8d4b00] ring-1 ring-[#8d4b00]"
                  : "border-[#e2e8f0] text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Truck size={15} /> Giao tận nơi (COD)
            </button>
            <button
              type="button"
              onClick={() => setDeliveryMethod("store")}
              className={`p-3 rounded-xl border font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                deliveryMethod === "store"
                  ? "border-[#8d4b00] bg-amber-50 text-[#8d4b00] ring-1 ring-[#8d4b00]"
                  : "border-[#e2e8f0] text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Store size={15} /> Nhận tại Shop ({currentRegionName})
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-[#0b1c30] mb-1">Họ và tên người nhận *</label>
              <input
                type="text"
                data-testid="checkout-name"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Nguyễn Văn A"
                className="w-full border border-[#cbd5e1] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#8d4b00] bg-[#f8f9ff] focus:bg-white transition-all text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#0b1c30] mb-1">Số điện thoại liên hệ *</label>
              <input
                type="tel"
                data-testid="checkout-phone"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="0987 654 321"
                className="w-full border border-[#cbd5e1] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#8d4b00] bg-[#f8f9ff] focus:bg-white transition-all text-xs"
              />
            </div>

            {deliveryMethod === "home" ? (
              <div>
                <label className="block font-semibold text-[#0b1c30] mb-1">Địa chỉ giao hàng nhận máy</label>
                <input
                  type="text"
                  data-testid="checkout-address"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="Số nhà, Tên đường, Phường/Xã, Quận/Huyện"
                  className="w-full border border-[#cbd5e1] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#8d4b00] bg-[#f8f9ff] focus:bg-white transition-all text-xs"
                />
              </div>
            ) : (
              <div className="bg-[#eff4ff] p-3 rounded-xl border border-[#dce9ff] text-[11px] text-[#554336] font-medium leading-relaxed">
                📍 Bạn sẽ đến nhận máy và thanh toán trực tiếp tại showroom chi nhánh <strong>{currentRegionName}</strong>. Quản trị viên chi nhánh sẽ giữ máy cho bạn trong 24 giờ.
              </div>
            )}
          </div>

          {/* Tóm tắt tổng tiền */}
          <div className="border-t border-[#e2e8f0] pt-3.5 space-y-2 text-xs">
            <div className="flex justify-between text-gray-600">
              <span>Tạm tính:</span>
              <span className="font-semibold text-[#0b1c30]">{totalPrice.toLocaleString("vi-VN")} đ</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Phí vận chuyển:</span>
              <span className="text-emerald-600 font-bold">Miễn phí toàn quốc</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-[#0b1c30] border-t border-[#e2e8f0] pt-2.5">
              <span>Tổng thanh toán:</span>
              <span data-testid="checkout-total-price" className="text-[#bb0112] text-xl font-black">
                {totalPrice.toLocaleString("vi-VN")} đ
              </span>
            </div>
          </div>

          <button
            type="submit"
            data-testid="btn-submit-order"
            className="w-full bg-[#bb0112] hover:bg-[#a10110] text-white font-black py-3.5 rounded-xl text-sm transition-all shadow-md uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
          >
            TIẾN HÀNH ĐẶT HÀNG NGAY
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
