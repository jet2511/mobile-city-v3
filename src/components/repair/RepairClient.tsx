"use client";

import React, { useState } from "react";
import { RepairService } from "@/types";
import { Wrench, Shield, Clock, Search, Calendar, Check, X } from "lucide-react";
import { useRegion } from "@/context/RegionContext";

interface RepairClientProps {
  initialServices: RepairService[];
  models: string[];
}

export function RepairClient({ initialServices, models }: RepairClientProps) {
  const { currentRegionName } = useRegion();
  const [selectedModel, setSelectedModel] = useState<string>("Tất cả");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [bookingService, setBookingService] = useState<RepairService | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Form states
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [bookingTime, setBookingTime] = useState("");

  const filteredServices = initialServices.filter((s) => {
    const matchModel = selectedModel === "Tất cả" || s.deviceModel === selectedModel;
    const normKeyword = searchKeyword.toLowerCase().trim();
    const matchKeyword =
      !normKeyword ||
      s.serviceName.toLowerCase().includes(normKeyword) ||
      s.deviceModel.toLowerCase().includes(normKeyword) ||
      (normKeyword.includes("ép kính") && s.serviceName.toLowerCase().includes("kính"));
    return matchModel && matchKeyword;
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingService(null);
      setCustomerName("");
      setCustomerPhone("");
      setBookingTime("");
    }, 2500);
  };

  return (
    <div className="space-y-6 my-6">
      {/* Banner Giới thiệu dịch vụ */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 md:p-8 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="bg-[#8d4b00] text-white text-xs font-bold uppercase px-2.5 py-1 rounded">
            MobileCity Care
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold">
            TRUNG TÂM SỬA CHỮA ĐIỆN THOẠI TOÀN QUỐC
          </h1>
          <p className="text-gray-300 text-xs md:text-sm max-w-xl">
            Thay màn hình, ép kính, thay pin linh kiện chuẩn Zin 100%. Xem trực tiếp lấy ngay sau 30-60 phút.
            Bảo hành dài hạn 6-12 tháng tại chi nhánh {currentRegionName}.
          </p>
        </div>
        <div className="flex gap-4 text-center">
          <div className="bg-white/10 p-3 rounded-lg border border-white/10">
            <div className="text-xl font-bold text-yellow-400">100%</div>
            <div className="text-[11px] text-gray-300">Linh kiện Zin</div>
          </div>
          <div className="bg-white/10 p-3 rounded-lg border border-white/10">
            <div className="text-xl font-bold text-yellow-400">30 - 60P</div>
            <div className="text-[11px] text-gray-300">Lấy ngay</div>
          </div>
          <div className="bg-white/10 p-3 rounded-lg border border-white/10">
            <div className="text-xl font-bold text-yellow-400">12T</div>
            <div className="text-[11px] text-gray-300">Bảo hành</div>
          </div>
        </div>
      </div>

      {/* Bộ Lọc & Tìm kiếm bảng giá */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <span className="text-xs font-bold text-gray-500 whitespace-nowrap mr-1">Dòng máy:</span>
            {["Tất cả", ...models.slice(0, 12)].map((m) => (
              <button
                key={m}
                data-testid={`filter-model-${m.replace(/\s+/g, "-")}`}
                onClick={() => setSelectedModel(m)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                  selectedModel === m
                    ? "bg-[#8d4b00] text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <input
              type="text"
              data-testid="repair-search-input"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Nhập tên máy hoặc lỗi (vd: iPhone 15, thay pin...)"
              className="w-full pl-8 pr-8 py-2 text-xs border rounded-lg outline-none focus:border-[#8d4b00] bg-gray-50 focus:bg-white"
            />
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            {searchKeyword && (
              <button
                onClick={() => setSearchKeyword("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Quick Tag Gợi ý dịch vụ phổ biến */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-gray-100 text-xs">
          <span className="text-gray-500 text-[11px] font-semibold mr-1">Dịch vụ phổ biến:</span>
          {["Thay màn hình", "Ép kính", "Thay pin", "Thay camera", "Sửa nguồn"].map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchKeyword(tag)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors ${
                searchKeyword.toLowerCase() === tag.toLowerCase()
                  ? "bg-yellow-50 text-[#8d4b00] border-[#8d4b00]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
              }`}
            >
              {tag}
            </button>
          ))}
          {searchKeyword && (
            <button
              onClick={() => setSearchKeyword("")}
              className="text-[#8d4b00] text-[11px] font-semibold hover:underline ml-2"
            >
              Xóa lọc dịch vụ
            </button>
          )}
        </div>
      </div>

      {/* Bảng Báo Giá Minh Bạch */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
          <h2 className="font-bold text-sm text-gray-800 uppercase flex items-center gap-2">
            <Wrench size={16} className="text-[#8d4b00]" />
            Bảng Giá Dịch Vụ Sửa Chữa Minh Bạch ({filteredServices.length} dịch vụ)
          </h2>
          <span className="text-xs text-green-600 font-bold">✓ Giá đã gồm công tháo lắp</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 uppercase font-semibold border-b">
              <tr>
                <th className="p-3">Dòng Máy</th>
                <th className="p-3">Dịch Vụ Sửa Chữa</th>
                <th className="p-3">Giá Trọn Gói</th>
                <th className="p-3">Bảo Hành</th>
                <th className="p-3">Thời Gian</th>
                <th className="p-3 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredServices.length > 0 ? (
                filteredServices.map((s) => (
                  <tr
                    key={s.id}
                    data-testid={`repair-row-${s.id}`}
                    className="hover:bg-yellow-50/40 transition-colors"
                  >
                    <td className="p-3 font-semibold text-gray-900">{s.deviceModel}</td>
                    <td className="p-3">
                      <div className="font-bold text-gray-800">{s.serviceName}</div>
                      {s.notes && <p className="text-[11px] text-gray-400 mt-0.5">{s.notes}</p>}
                    </td>
                    <td className="p-3">
                      <span className="text-red-600 font-extrabold text-sm">
                        {s.price.toLocaleString("vi-VN")} đ
                      </span>
                    </td>
                    <td className="p-3 font-medium text-gray-700">
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-[11px] font-bold">
                        {s.warranty}
                      </span>
                    </td>
                    <td className="p-3 text-gray-600 flex items-center gap-1 mt-1">
                      <Clock size={12} className="text-gray-400" />
                      {s.duration}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        data-testid={`btn-book-${s.id}`}
                        onClick={() => setBookingService(s)}
                        className="bg-[#8d4b00] hover:bg-[#b15f00] text-white font-bold px-3 py-1.5 rounded transition-colors"
                      >
                        Đặt Lịch
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-400">
                    Không tìm thấy dịch vụ phù hợp với từ khóa
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Đặt Lịch Hẹn */}
      {bookingService && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div
            data-testid="booking-modal"
            className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative animate-in fade-in zoom-in-95 duration-150"
          >
            <button
              onClick={() => setBookingService(null)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 p-1"
            >
              <X size={18} />
            </button>

            {bookingSuccess ? (
              <div data-testid="booking-success-message" className="py-6 text-center space-y-3">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                  <Check size={28} />
                </div>
                <h3 className="font-extrabold text-lg text-gray-900">Đặt Lịch Thành Công!</h3>
                <p className="text-xs text-gray-600">
                  MobileCity đã tiếp nhận yêu cầu sửa chữa cho máy <strong>{bookingService.deviceModel}</strong>.
                  Nhân viên chi nhánh {currentRegionName} sẽ liên hệ xác nhận trong 5 phút.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-[#8d4b00] uppercase">Đặt lịch sửa chữa</span>
                  <h3 className="font-extrabold text-base text-gray-900">{bookingService.serviceName}</h3>
                  <p className="text-xs text-gray-500">
                    Dòng máy: <strong>{bookingService.deviceModel}</strong> • Giá:{" "}
                    <strong className="text-red-600">{bookingService.price.toLocaleString("vi-VN")} đ</strong>
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Họ và tên *</label>
                    <input
                      type="text"
                      data-testid="input-customer-name"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Nguyễn Văn A"
                      className="w-full border rounded-lg px-3 py-2 outline-none focus:border-[#8d4b00]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Số điện thoại *</label>
                    <input
                      type="tel"
                      data-testid="input-customer-phone"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="0912 345 678"
                      className="w-full border rounded-lg px-3 py-2 outline-none focus:border-[#8d4b00]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Khung giờ dự kiến đến</label>
                    <input
                      type="text"
                      data-testid="input-booking-time"
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      placeholder="VD: 14h30 chiều nay"
                      className="w-full border rounded-lg px-3 py-2 outline-none focus:border-[#8d4b00]"
                    />
                  </div>
                </div>

                <div className="bg-yellow-50 p-2.5 rounded text-[11px] text-yellow-900 font-medium">
                  🎁 <strong>Ưu đãi:</strong> Đặt lịch trước được giảm ngay 50.000đ và ưu tiên sửa ngay không
                  phải xếp hàng!
                </div>

                <button
                  type="submit"
                  data-testid="btn-submit-booking"
                  className="w-full bg-[#8d4b00] hover:bg-[#b15f00] text-white font-black py-2.5 rounded-lg text-xs transition-colors shadow-md uppercase tracking-wider"
                >
                  Xác Nhận Đặt Lịch Lấy Ngay
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
