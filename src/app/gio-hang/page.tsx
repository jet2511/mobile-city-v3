import { CartClient } from "@/components/cart/CartClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giỏ Hàng & Thanh Toán | MobileCity",
  description: "Xác nhận đơn hàng điện thoại chính hãng, xách tay, bảo hành vàng tại MobileCity",
};

export default function CartPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 pb-12">
      <div className="text-xs text-gray-500 py-3 flex items-center gap-1.5 border-b border-gray-200 mb-2">
        <a href="/" className="hover:text-[#c69a39]">Trang chủ</a>
        <span>/</span>
        <span className="text-gray-800 font-semibold">Giỏ hàng của bạn</span>
      </div>

      <CartClient />
    </main>
  );
}
