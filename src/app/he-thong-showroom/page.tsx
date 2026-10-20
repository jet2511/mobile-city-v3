"use client";

import React, { useState } from "react";
import { MapPin, Phone, Clock, Navigation, CheckCircle2 } from "lucide-react";
import { REGIONS } from "@/lib/constants";

const SHOWROOMS = [
  {
    region: "HN",
    city: "Hà Nội",
    branches: [
      {
        name: "MobileCity Thái Hà",
        address: "120 Thái Hà, Q. Đống Đa, Hà Nội",
        phone: "0969.120.120",
        hours: "08:00 - 21:30 (Cả CN & Lễ)",
        services: ["Bán lẻ điện thoại", "MobileCity Care", "Thu cũ đổi mới", "Bảo hành"],
      },
      {
        name: "MobileCity Cầu Giấy",
        address: "398 Cầu Giấy, Q. Cầu Giấy, Hà Nội",
        phone: "096.1111.398",
        hours: "08:00 - 21:30 (Cả CN & Lễ)",
        services: ["Bán lẻ điện thoại", "MobileCity Care", "Thu cũ đổi mới"],
      },
      {
        name: "MobileCity Phố Vọng",
        address: "42 Phố Vọng, Hai Bà Trưng, Hà Nội",
        phone: "0979.88.4242",
        hours: "08:30 - 21:00 (Cả CN & Lễ)",
        services: ["Bán lẻ điện thoại", "Ép kính lấy ngay"],
      },
    ],
  },
  {
    region: "HCM",
    city: "TP. Hồ Chí Minh",
    branches: [
      {
        name: "MobileCity Trần Quang Khải",
        address: "123 Trần Quang Khải, P. Tân Định, Quận 1, TP.HCM",
        phone: "0965.123.123",
        hours: "08:00 - 21:30 (Cả CN & Lễ)",
        services: ["Bán lẻ điện thoại", "MobileCity Care", "Thu cũ đổi mới", "Bảo hành"],
      },
      {
        name: "MobileCity Lê Hồng Phong",
        address: "602 Lê Hồng Phong, Phường 10, Quận 10, TP.HCM",
        phone: "097.1111.602",
        hours: "08:00 - 21:30 (Cả CN & Lễ)",
        services: ["Bán lẻ điện thoại", "MobileCity Care", "Thay màn hình"],
      },
    ],
  },
  {
    region: "DN",
    city: "Đà Nẵng",
    branches: [
      {
        name: "MobileCity Hàm Nghi",
        address: "97 Hàm Nghi, P. Vĩnh Trung, Q. Thanh Khê, Đà Nẵng",
        phone: "096.123.9797",
        hours: "08:00 - 21:30 (Cả CN & Lễ)",
        services: ["Bán lẻ điện thoại", "MobileCity Care", "Thu cũ đổi mới", "Bảo hành"],
      },
    ],
  },
];

export default function ShowroomSystemPage() {
  const [activeRegion, setActiveRegion] = useState<string>("ALL");

  const displayedShowrooms = activeRegion === "ALL"
    ? SHOWROOMS
    : SHOWROOMS.filter((s) => s.region === activeRegion);

  return (
    <div className="max-w-[1240px] mx-auto px-4 lg:px-8 py-8 space-y-6">
      {/* Title */}
      <div className="bg-white p-6 rounded-3xl border border-[#e2e8f0] shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#0b1c30] flex items-center gap-2.5">
            <MapPin size={28} className="text-[#8d4b00]" />
            HỆ THỐNG SHOWROOM TOÀN QUỐC
          </h1>
          <p className="text-xs text-[#887364] mt-1">
            Hệ thống cửa hàng trải nghiệm & trung tâm bảo hành sửa chữa MobileCity Care
          </p>
        </div>

        {/* Bộ lọc vùng miền */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setActiveRegion("ALL")}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              activeRegion === "ALL"
                ? "bg-[#8d4b00] text-white shadow-sm"
                : "bg-[#f8f9ff] text-gray-700 hover:bg-amber-50 border border-[#e2e8f0]"
            }`}
          >
            Tất cả (6)
          </button>
          {REGIONS.map((r) => (
            <button
              key={r.code}
              onClick={() => setActiveRegion(r.code)}
              className={`px-4 py-2 rounded-xl font-bold transition-all ${
                activeRegion === r.code
                  ? "bg-[#8d4b00] text-white shadow-sm"
                  : "bg-[#f8f9ff] text-gray-700 hover:bg-amber-50 border border-[#e2e8f0]"
              }`}
            >
              {r.name}
            </button>
          ))}
        </div>
      </div>

      {/* Danh sách Showroom theo thành phố */}
      <div className="space-y-6">
        {displayedShowrooms.map((group) => (
          <div key={group.region} className="space-y-3">
            <h2 className="text-base font-extrabold text-[#0b1c30] flex items-center gap-2 uppercase tracking-wide">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8d4b00]" />
              Khu Vực: {group.city}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {group.branches.map((b, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-sm flex flex-col justify-between space-y-3 hover:border-[#8d4b00] transition-colors"
                >
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-sm text-[#0b1c30]">{b.name}</h3>
                    <p className="text-xs text-gray-600 flex items-start gap-1.5">
                      <MapPin size={15} className="text-[#8d4b00] shrink-0 mt-0.5" />
                      {b.address}
                    </p>
                    <p className="text-xs text-gray-600 flex items-center gap-1.5">
                      <Clock size={14} className="text-[#8d4b00] shrink-0" />
                      {b.hours}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {b.services.map((svc, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] bg-[#eff4ff] text-[#554336] px-2 py-0.5 rounded-md font-medium"
                        >
                          {svc}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#e2e8f0] flex items-center justify-between">
                    <a
                      href={`tel:${b.phone.replace(/\./g, "")}`}
                      className="text-xs font-bold text-[#bb0112] flex items-center gap-1 hover:underline"
                    >
                      <Phone size={13} />
                      {b.phone}
                    </a>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(b.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#8d4b00] flex items-center gap-1 hover:underline"
                    >
                      <Navigation size={13} />
                      Chỉ đường
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
