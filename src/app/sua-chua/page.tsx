import { db, initDatabase } from "@/lib/db";
import { RepairService } from "@/types";
import { RepairClient } from "@/components/repair/RepairClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bảng Giá Sửa Chữa, Thay Màn Hình, Ép Kính, Thay Pin Điện Thoại | MobileCity Care",
  description:
    "Hệ thống sửa chữa điện thoại uy tín toàn quốc. Thay màn hình, thay pin, ép kính iPhone, Xiaomi, Samsung lấy ngay sau 30-60 phút, bảo hành lên tới 12 tháng.",
};

export default async function RepairPage() {
  initDatabase();

  const services = db.prepare(`SELECT * FROM repair_services ORDER BY price DESC`).all() as RepairService[];

  // Lấy danh sách các dòng máy độc lập
  const models = Array.from(new Set(services.map((s) => s.deviceModel)));

  return (
    <main className="max-w-7xl mx-auto px-4 pb-12">
      <div className="text-xs text-gray-500 py-3 flex items-center gap-1.5 border-b border-gray-200 mb-2">
        <a href="/" className="hover:text-[#8d4b00]">Trang chủ</a>
        <span>/</span>
        <span className="text-gray-800 font-semibold">Dịch vụ sửa chữa MobileCity Care</span>
      </div>

      <RepairClient initialServices={services} models={models} />
    </main>
  );
}
