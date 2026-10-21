"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Package, ShieldCheck, Clock, Phone, MapPin, ChevronRight, LogOut, CheckCircle2, AlertCircle } from "lucide-react";

const MOCK_ORDERS = [
  {
    id: "MC-893241",
    date: "18/10/2026",
    product: "Xiaomi Redmi K70 5G (12GB - 256GB)",
    price: "7.890.000₫",
    status: "Đang giao hàng",
    statusCode: "shipping",
    hasWarranty: true,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=160&auto=format&fit=crop&q=80",
  },
  {
    id: "MC-741290",
    date: "12/08/2026",
    product: "Thay Màn Hình iPhone 14 Pro Max Chính Hãng",
    price: "5.800.000₫",
    status: "Đã hoàn thành",
    statusCode: "completed",
    hasWarranty: true,
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=160&auto=format&fit=crop&q=80",
  },
  {
    id: "MC-512039",
    date: "05/03/2026",
    product: "Tai Nghe Xiaomi Buds 5 Pro",
    price: "1.450.000₫",
    status: "Đã hoàn thành",
    statusCode: "completed",
    hasWarranty: false,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=160&auto=format&fit=crop&q=80",
  },
];

export default function AccountCenterPage() {
  const [activeTab, setActiveTab] = useState<"orders" | "warranty" | "profile">("orders");

  return (
    <div className="max-w-[1240px] mx-auto px-4 lg:px-8 py-8 space-y-8">
      {/* User Header Profile */}
      <div className="bg-[#0b1c30] text-white p-6 sm:p-8 rounded-3xl border border-[#213145] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-[#0b1c30] font-black text-2xl flex items-center justify-center ring-4 ring-white/10">
            A
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="text-xl sm:text-2xl font-black">Nguyễn Văn An</h1>
              <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                VIP Gold
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">SĐT: 0988.xxx.888 • Điểm tích lũy: <span className="text-amber-400 font-bold">3.200 điểm (320k)</span></p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dang-nhap"
            className="flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 text-gray-300 text-xs font-semibold rounded-xl backdrop-blur transition"
          >
            <LogOut size={14} />
            Đổi tài khoản
          </Link>
        </div>
      </div>

      {/* Main Grid: Navigation Sidebar + Tab Contents */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Nav */}
        <div className="space-y-2">
          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-xs font-bold transition text-left cursor-pointer ${
              activeTab === "orders"
                ? "bg-[#994700] text-white shadow-md shadow-orange-900/10"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <Package size={16} />
              <span>Lịch Sử Đơn Hàng</span>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/20">3</span>
          </button>

          <button
            onClick={() => setActiveTab("warranty")}
            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-xs font-bold transition text-left cursor-pointer ${
              activeTab === "warranty"
                ? "bg-[#994700] text-white shadow-md shadow-orange-900/10"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <ShieldCheck size={16} />
              <span>Thiết Bị & Bảo Hành Vàng</span>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/20">2</span>
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-xs font-bold transition text-left cursor-pointer ${
              activeTab === "profile"
                ? "bg-[#994700] text-white shadow-md shadow-orange-900/10"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <User size={16} />
              <span>Sổ Địa Chỉ & Thông Tin</span>
            </div>
          </button>
        </div>

        {/* Content Panel */}
        <div className="lg:col-span-3">
          {activeTab === "orders" && (
            <div className="space-y-4">
              <h2 className="text-base font-black text-[#0b1c30]">Danh Sách Đơn Hàng Gần Đây</h2>
              <div className="space-y-3">
                {MOCK_ORDERS.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white border border-[#e2e8f0] p-5 rounded-2xl shadow-sm space-y-4 hover:border-gray-300 transition"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#994700]">{order.id}</span>
                        <span className="text-gray-400">• {order.date}</span>
                      </div>
                      <span
                        className={`font-bold px-2.5 py-0.5 rounded-full text-[11px] ${
                          order.statusCode === "shipping"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className="flex gap-4 items-center">
                      <div className="w-14 h-14 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0">
                        <img src={order.image} alt={order.product} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-[#0b1c30] truncate">{order.product}</h4>
                        {order.hasWarranty && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded mt-1">
                            <ShieldCheck size={12} /> Đang kích hoạt BH Vàng 12 Tháng
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-black text-[#994700]">{order.price}</div>
                        <Link
                          href={`/tra-cuu-bao-hanh?orderId=${order.id}`}
                          className="text-[11px] text-gray-500 hover:text-[#994700] underline mt-1 inline-block"
                        >
                          Theo dõi vận chuyển
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "warranty" && (
            <div className="space-y-4">
              <h2 className="text-base font-black text-[#0b1c30]">Thiết Bị Kích Hoạt Bảo Hành Vàng</h2>
              <div className="bg-white border border-[#e2e8f0] p-6 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-black text-[#0b1c30] text-sm sm:text-base">Xiaomi Redmi K70 5G</h3>
                    <p className="text-xs text-gray-500 font-mono mt-0.5">IMEI: 864520061298451</p>
                  </div>
                  <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
                    Còn 358 ngày
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-gray-50 p-4 rounded-xl">
                  <div>
                    <span className="text-gray-400 block">Gói bảo hành:</span>
                    <strong className="text-amber-800">Bảo Hành Vàng 12T</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Ngày mua:</span>
                    <strong className="text-gray-700">18/10/2026</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Hết hạn:</span>
                    <strong className="text-gray-700">18/10/2027</strong>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Link
                    href="/chinh-sach-bao-hanh-vang"
                    className="text-xs text-[#994700] font-bold hover:underline"
                  >
                    Xem chính sách đổi mới 1-đổi-1 →
                  </Link>
                </div>
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="bg-white border border-[#e2e8f0] p-6 rounded-2xl shadow-sm space-y-6">
              <h2 className="text-base font-black text-[#0b1c30]">Thông Tin Khách Hàng</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-gray-400 font-bold mb-1">Họ và tên</label>
                  <input
                    type="text"
                    defaultValue="Nguyễn Văn An"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-medium"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 font-bold mb-1">Số điện thoại</label>
                  <input
                    type="text"
                    defaultValue="0988.123.456"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-medium"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-gray-400 font-bold mb-1">Địa chỉ nhận hàng mặc định</label>
                  <input
                    type="text"
                    defaultValue="120 Thái Hà, Phường Trung Liệt, Quận Đống Đa, Hà Nội"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-medium"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => alert("Đã lưu thông tin khách hàng thành công!")}
                className="px-5 py-2.5 bg-[#994700] hover:bg-[#803b00] text-white text-xs font-bold rounded-xl transition cursor-pointer"
              >
                Cập Nhật Thông Tin
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
