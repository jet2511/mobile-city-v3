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
    <div className="my-6 space-y-6">
      {/* Banner Giới thiệu dịch vụ */}
      <div className="flex flex-col items-center justify-between gap-6 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 p-6 text-white shadow-md md:flex-row md:p-8">
        <div className="space-y-2">
          <span className="rounded bg-[#8d4b00] px-2.5 py-1 text-xs font-bold text-white uppercase">
            MobileCity Care
          </span>
          <h1 className="text-2xl font-extrabold md:text-3xl">
            TRUNG TÂM SỬA CHỮA ĐIỆN THOẠI TOÀN QUỐC
          </h1>
          <p className="max-w-xl text-xs text-gray-300 md:text-sm">
            Thay màn hình, ép kính, thay pin linh kiện chuẩn Zin 100%. Xem trực tiếp lấy ngay sau
            30-60 phút. Bảo hành dài hạn 6-12 tháng tại chi nhánh {currentRegionName}.
          </p>
        </div>
        <div className="flex gap-4 text-center">
          <div className="rounded-lg border border-white/10 bg-white/10 p-3">
            <div className="text-xl font-bold text-yellow-400">100%</div>
            <div className="text-[11px] text-gray-300">Linh kiện Zin</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/10 p-3">
            <div className="text-xl font-bold text-yellow-400">30 - 60P</div>
            <div className="text-[11px] text-gray-300">Lấy ngay</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/10 p-3">
            <div className="text-xl font-bold text-yellow-400">12T</div>
            <div className="text-[11px] text-gray-300">Bảo hành</div>
          </div>
        </div>
      </div>

      {/* Bộ Lọc & Tìm kiếm bảng giá */}
      <div className="space-y-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex w-full items-center gap-1.5 overflow-x-auto pb-1 md:w-auto md:pb-0">
            <span className="mr-1 text-xs font-bold whitespace-nowrap text-gray-500">
              Dòng máy:
            </span>
            {["Tất cả", ...models.slice(0, 12)].map((m) => (
              <button
                key={m}
                data-testid={`filter-model-${m.replace(/\s+/g, "-")}`}
                onClick={() => setSelectedModel(m)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap transition-colors ${
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
              className="w-full rounded-lg border bg-gray-50 py-2 pr-8 pl-8 text-xs outline-none focus:border-[#8d4b00] focus:bg-white"
            />
            <Search
              size={14}
              className="absolute top-1/2 left-2.5 -translate-y-1/2 text-gray-400"
            />
            {searchKeyword && (
              <button
                onClick={() => setSearchKeyword("")}
                className="absolute top-1/2 right-2.5 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Quick Tag Gợi ý dịch vụ phổ biến */}
        <div className="flex flex-wrap items-center gap-1.5 border-t border-gray-100 pt-2 text-xs">
          <span className="mr-1 text-[11px] font-semibold text-gray-500">Dịch vụ phổ biến:</span>
          {["Thay màn hình", "Ép kính", "Thay pin", "Thay camera", "Sửa nguồn"].map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchKeyword(tag)}
              className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors ${
                searchKeyword.toLowerCase() === tag.toLowerCase()
                  ? "border-[#8d4b00] bg-yellow-50 text-[#8d4b00]"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
              }`}
            >
              {tag}
            </button>
          ))}
          {searchKeyword && (
            <button
              onClick={() => setSearchKeyword("")}
              className="ml-2 text-[11px] font-semibold text-[#8d4b00] hover:underline"
            >
              Xóa lọc dịch vụ
            </button>
          )}
        </div>
      </div>

      {/* Bảng Báo Giá Minh Bạch */}
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b bg-gray-50 p-4">
          <h2 className="flex items-center gap-2 text-sm font-bold text-gray-800 uppercase">
            <Wrench size={16} className="text-[#8d4b00]" />
            Bảng Giá Dịch Vụ Sửa Chữa Minh Bạch ({filteredServices.length} dịch vụ)
          </h2>
          <span className="text-xs font-bold text-green-600">✓ Giá đã gồm công tháo lắp</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b bg-gray-50 font-semibold text-gray-500 uppercase">
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
                    className="transition-colors hover:bg-yellow-50/40"
                  >
                    <td className="p-3 font-semibold text-gray-900">{s.deviceModel}</td>
                    <td className="p-3">
                      <div className="font-bold text-gray-800">{s.serviceName}</div>
                      {s.notes && <p className="mt-0.5 text-[11px] text-gray-400">{s.notes}</p>}
                    </td>
                    <td className="p-3">
                      <span className="text-sm font-extrabold text-red-600">
                        {s.price.toLocaleString("vi-VN")} đ
                      </span>
                    </td>
                    <td className="p-3 font-medium text-gray-700">
                      <span className="rounded bg-yellow-100 px-2 py-0.5 text-[11px] font-bold text-yellow-800">
                        {s.warranty}
                      </span>
                    </td>
                    <td className="mt-1 flex items-center gap-1 p-3 text-gray-600">
                      <Clock size={12} className="text-gray-400" />
                      {s.duration}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        data-testid={`btn-book-${s.id}`}
                        onClick={() => setBookingService(s)}
                        className="rounded bg-[#8d4b00] px-3 py-1.5 font-bold text-white transition-colors hover:bg-[#b15f00]"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div
            data-testid="booking-modal"
            className="animate-in fade-in zoom-in-95 relative w-full max-w-md rounded-xl bg-white p-6 shadow-2xl duration-150"
          >
            <button
              onClick={() => setBookingService(null)}
              className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>

            {bookingSuccess ? (
              <div data-testid="booking-success-message" className="space-y-3 py-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <Check size={28} />
                </div>
                <h3 className="text-lg font-extrabold text-gray-900">Đặt Lịch Thành Công!</h3>
                <p className="text-xs text-gray-600">
                  MobileCity đã tiếp nhận yêu cầu sửa chữa cho máy{" "}
                  <strong>{bookingService.deviceModel}</strong>. Nhân viên chi nhánh{" "}
                  {currentRegionName} sẽ liên hệ xác nhận trong 5 phút.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-[#8d4b00] uppercase">
                    Đặt lịch sửa chữa
                  </span>
                  <h3 className="text-base font-extrabold text-gray-900">
                    {bookingService.serviceName}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Dòng máy: <strong>{bookingService.deviceModel}</strong> • Giá:{" "}
                    <strong className="text-red-600">
                      {bookingService.price.toLocaleString("vi-VN")} đ
                    </strong>
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="mb-1 block font-semibold text-gray-700">Họ và tên *</label>
                    <input
                      type="text"
                      data-testid="input-customer-name"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Nguyễn Văn A"
                      className="w-full rounded-lg border px-3 py-2 outline-none focus:border-[#8d4b00]"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block font-semibold text-gray-700">
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      data-testid="input-customer-phone"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="0912 345 678"
                      className="w-full rounded-lg border px-3 py-2 outline-none focus:border-[#8d4b00]"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block font-semibold text-gray-700">
                      Khung giờ dự kiến đến
                    </label>
                    <input
                      type="text"
                      data-testid="input-booking-time"
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      placeholder="VD: 14h30 chiều nay"
                      className="w-full rounded-lg border px-3 py-2 outline-none focus:border-[#8d4b00]"
                    />
                  </div>
                </div>

                <div className="rounded bg-yellow-50 p-2.5 text-[11px] font-medium text-yellow-900">
                  🎁 <strong>Ưu đãi:</strong> Đặt lịch trước được giảm ngay 50.000đ và ưu tiên sửa
                  ngay không phải xếp hàng!
                </div>

                <button
                  type="submit"
                  data-testid="btn-submit-booking"
                  className="w-full rounded-lg bg-[#8d4b00] py-2.5 text-xs font-black tracking-wider text-white uppercase shadow-md transition-colors hover:bg-[#b15f00]"
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
