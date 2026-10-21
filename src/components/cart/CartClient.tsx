"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useRegion } from "@/context/RegionContext";
import { Trash2, Plus, Minus, ArrowLeft, ShieldCheck, CheckCircle2, Truck, Store, ArrowRight, Sparkles, FileText } from "lucide-react";

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
        <div className="pt-4 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-block bg-[#8d4b00] hover:bg-[#b15f00] text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-sm"
          >
            Tiếp tục mua sắm
          </Link>
          <Link
            href={`/dat-hang-thanh-cong?orderId=${orderSuccess}`}
            className="inline-flex items-center gap-1.5 bg-[#f8f9ff] border border-[#e2e8f0] hover:border-[#8d4b00] text-[#0b1c30] font-bold text-xs px-6 py-3 rounded-xl transition-all"
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
            const versionStr = [item.ram, item.storage].filter(Boolean).join(" - ");

            return (
              <div
                key={item.id}
                data-testid={`cart-item-${item.id}`}
                className="bg-white p-4 rounded-2xl border border-[#e2e8f0] shadow-sm flex items-center gap-4 relative overflow-hidden"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 bg-[#f8f9ff] border border-gray-100 rounded-xl flex items-center justify-center p-2 flex-shrink-0">
                  <img src={item.thumbnail} alt={item.name} className="max-w-full max-h-full object-contain" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm text-[#0b1c30] truncate">{item.name}</h3>
                  <div className="flex items-center gap-2 text-[11px] text-[#887364] mt-0.5">
                    {item.color && <span className="bg-gray-100 px-2 py-0.5 rounded">{item.color}</span>}
                    {versionStr && <span className="bg-gray-100 px-2 py-0.5 rounded">{versionStr}</span>}
                  </div>

                  {item.hasGoldCare && (
                    <div className="mt-1.5 flex items-center gap-1 text-[11px] text-[#8d4b00] font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200/50 w-fit">
                      <ShieldCheck size={12} className="text-[#8d4b00]" />
                      Bảo Hành Vàng 12T (+{item.goldCareFee.toLocaleString("vi-VN")}₫)
                    </div>
                  )}

                  <div className="mt-2 text-[#bb0112] font-black text-sm">
                    {itemUnitPrice.toLocaleString("vi-VN")}₫
                  </div>
                </div>

                {/* Quantity Controls & Delete */}
                <div className="flex flex-col items-end gap-3 flex-shrink-0">
                  <button
                    data-testid={`btn-remove-${item.id}`}
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors p-1"
                    title="Xóa sản phẩm"
                  >
                    <Trash2 size={16} />
                  </button>

                  <div className="flex items-center border border-[#dbc2b0] rounded-lg overflow-hidden bg-[#f8f9ff]">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2.5 py-1 text-gray-600 hover:bg-gray-200 text-xs font-bold transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="px-3 py-1 text-xs font-black text-[#0b1c30] min-w-[30px] text-center bg-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2.5 py-1 text-gray-600 hover:bg-gray-200 text-xs font-bold transition-colors"
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
      <div className="lg:col-span-5 space-y-4">
        {/* Tóm tắt chi phí */}
        <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-sm space-y-3">
          <div className="font-black text-sm uppercase text-[#0b1c30] border-b pb-2 border-gray-100 flex items-center gap-1.5">
            <Sparkles size={16} className="text-[#8d4b00]" /> Tóm Tắt Thanh Toán
          </div>

          <div className="flex justify-between text-xs text-[#554336]">
            <span>Tổng tiền hàng ({items.reduce((acc, i) => acc + i.quantity, 0)} món):</span>
            <span className="font-bold text-[#0b1c30]">{totalPrice.toLocaleString("vi-VN")}₫</span>
          </div>

          <div className="flex justify-between text-xs text-[#554336]">
            <span>Phí giao hàng:</span>
            <span className="text-emerald-600 font-bold">Miễn phí toàn quốc</span>
          </div>

          <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between items-center">
            <span className="font-bold text-sm text-[#0b1c30]">Tổng thanh toán:</span>
            <span className="font-black text-xl text-[#bb0112]">{totalPrice.toLocaleString("vi-VN")}₫</span>
          </div>
          <p className="text-[11px] text-gray-500 italic text-right">
            (Đã bao gồm VAT & áp dụng bảo hành tại {currentRegionName})
          </p>
        </div>

        {/* Thông tin giao nhận hàng */}
        <form onSubmit={handleCheckout} className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-sm space-y-4">
          <div className="font-black text-sm uppercase text-[#0b1c30] border-b pb-2 border-gray-100">
            Thông Tin Khách Hàng
          </div>

          {/* Phương thức nhận */}
          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <button
              type="button"
              onClick={() => setDeliveryMethod("home")}
              className={`p-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${
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
              className={`p-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${
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
              <label className="block text-gray-600 font-semibold mb-1">Họ và tên người nhận *</label>
              <input
                type="text"
                required
                data-testid="checkout-name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Ví dụ: Nguyễn Văn A"
                className="w-full bg-[#f8f9ff] border border-[#cbd5e1] rounded-lg p-2.5 text-xs outline-none focus:border-[#8d4b00]"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-semibold mb-1">Số điện thoại liên hệ *</label>
              <input
                type="tel"
                required
                data-testid="checkout-phone"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Ví dụ: 0988 123 456"
                className="w-full bg-[#f8f9ff] border border-[#cbd5e1] rounded-lg p-2.5 text-xs outline-none focus:border-[#8d4b00]"
              />
            </div>

            {deliveryMethod === "home" && (
              <div>
                <label className="block text-gray-600 font-semibold mb-1">Địa chỉ nhận hàng *</label>
                <input
                  type="text"
                  required
                  data-testid="checkout-address"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
                  className="w-full bg-[#f8f9ff] border border-[#cbd5e1] rounded-lg p-2.5 text-xs outline-none focus:border-[#8d4b00]"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            data-testid="btn-submit-order"
            className="w-full bg-gradient-to-r from-[#bb0112] to-[#8d4b00] hover:opacity-95 text-white font-black text-sm uppercase py-3.5 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Xác Nhận Đặt Hàng (COD)</span>
            <ArrowRight size={16} />
          </button>
          <p className="text-[11px] text-gray-400 text-center">
            Kiểm tra hàng trước khi thanh toán • Hỗ trợ đổi trả 15 ngày
          </p>
        </form>
      </div>
    </div>
  );
}
