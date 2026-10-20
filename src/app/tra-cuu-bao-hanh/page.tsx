import { WarrantyLookupClient } from "@/components/warranty/WarrantyLookupClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tra Cứu Bảo Hành Điện Tử IMEI & Số Điện Thoại | MobileCity",
  description: "Hệ thống tra cứu thời hạn bảo hành, thông tin gói Bảo Hành Vàng chính hãng tại MobileCity",
};

export default function WarrantyPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 pb-12">
      <div className="text-xs text-gray-500 py-3 flex items-center gap-1.5 border-b border-gray-200 mb-2">
        <a href="/" className="hover:text-[#8d4b00]">Trang chủ</a>
        <span>/</span>
        <span className="text-gray-800 font-semibold">Tra cứu bảo hành</span>
      </div>

      <WarrantyLookupClient />
    </main>
  );
}
