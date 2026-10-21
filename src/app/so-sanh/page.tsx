"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowLeftRight, Check, X, Smartphone, Plus, Trophy, Zap, ShieldAlert, Cpu, Battery, Camera } from "lucide-react";

interface PhoneSpec {
  name: string;
  brand: string;
  price: string;
  image: string;
  screen: string;
  cpu: string;
  ramRom: string;
  rearCamera: string;
  batteryCharge: string;
  antutu: string;
  os: string;
  weight: string;
}

const COMPARISON_DATA: PhoneSpec[] = [
  {
    name: "Xiaomi Redmi K70 5G",
    brand: "Xiaomi",
    price: "7.890.000₫",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300&auto=format&fit=crop&q=80",
    screen: "OLED 6.67 inch, 2K (1440 x 3200 px), 120Hz, 4000 nits",
    cpu: "Snapdragon 8 Gen 2 (4nm)",
    ramRom: "12GB RAM - 256GB UFS 4.0",
    rearCamera: "50 MP (chính OIS) + 8 MP (góc rộng) + 2 MP (macro)",
    batteryCharge: "5.000 mAh • Sạc nhanh 120W (18 phút đầy)",
    antutu: "1.710.000 điểm",
    os: "Xiaomi HyperOS (Android 14)",
    weight: "209g, Khung viền kim loại",
  },
  {
    name: "Realme GT Neo 5 (240W)",
    brand: "Realme",
    price: "7.450.000₫",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&auto=format&fit=crop&q=80",
    screen: "AMOLED 6.74 inch, 1.5K, 144Hz, 1400 nits",
    cpu: "Snapdragon 8+ Gen 1 (4nm)",
    ramRom: "16GB RAM - 256GB UFS 3.1",
    rearCamera: "50 MP (Sony IMX890 OIS) + 8 MP + 2 MP",
    batteryCharge: "4.600 mAh • Sạc siêu tốc 240W (9.5 phút đầy)",
    antutu: "1.340.000 điểm",
    os: "Realme UI 5.0 (Android 14)",
    weight: "199g, Mặt lưng kính đèn LED Halo",
  },
  {
    name: "iPhone 13 128GB (Cũ 99%)",
    brand: "Apple",
    price: "9.990.000₫",
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=300&auto=format&fit=crop&q=80",
    screen: "Super Retina XDR OLED 6.1 inch, 60Hz, 1200 nits",
    cpu: "Apple A15 Bionic (5nm)",
    ramRom: "4GB RAM - 128GB NVMe",
    rearCamera: "Kép 12 MP (chính sensor-shift OIS) + 12 MP",
    batteryCharge: "3.240 mAh • Sạc nhanh 20W",
    antutu: "1.280.000 điểm",
    os: "iOS 18 (Hỗ trợ lâu dài)",
    weight: "174g, Khung nhôm, Chuẩn IP68",
  },
];

export default function ComparePage() {
  const [selectedIdxA, setSelectedIdxA] = useState(0);
  const [selectedIdxB, setSelectedIdxB] = useState(1);

  const handleSelectA = (newIdx: number) => {
    setSelectedIdxA(newIdx);
    if (newIdx === selectedIdxB) {
      const nextB = (newIdx + 1) % COMPARISON_DATA.length;
      setSelectedIdxB(nextB);
    }
  };

  const handleSelectB = (newIdx: number) => {
    setSelectedIdxB(newIdx);
    if (newIdx === selectedIdxA) {
      const nextA = (newIdx + 1) % COMPARISON_DATA.length;
      setSelectedIdxA(nextA);
    }
  };

  const phoneA = COMPARISON_DATA[selectedIdxA];
  const phoneB = COMPARISON_DATA[selectedIdxB];

  return (
    <div className="max-w-[1240px] mx-auto px-4 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 bg-orange-100 text-[#994700] text-xs font-bold px-3 py-1 rounded-full uppercase">
          <ArrowLeftRight size={14} />
          Công Cụ So Sánh Đối Đầu
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#0b1c30]">
          So Sánh Smartphone Chi Tiết
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Đặt lên bàn cân thông số cấu hình, chip xử lý, pin, sạc và camera giữa các dòng máy hot nhất tại MobileCity.
        </p>
      </div>

      {/* Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Device A */}
        <div className="bg-white border border-[#e2e8f0] p-5 rounded-3xl shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-700 uppercase">Thiết Bị 1</span>
            <select
              value={selectedIdxA}
              onChange={(e) => handleSelectA(Number(e.target.value))}
              className="text-xs font-bold text-[#0b1c30] bg-gray-50 border border-gray-200 rounded-lg p-2 focus:outline-none"
            >
              {COMPARISON_DATA.map((p, idx) => (
                <option key={idx} value={idx}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-20 h-20 relative rounded-xl overflow-hidden border border-gray-100 shrink-0">
              <Image src={phoneA.image} alt={phoneA.name} fill className="object-cover" sizes="80px" unoptimized />
            </div>
            <div>
              <h3 className="font-black text-[#0b1c30] text-lg">{phoneA.name}</h3>
              <p className="text-[#994700] font-black text-xl">{phoneA.price}</p>
              <span className="text-[11px] text-gray-500">{phoneA.brand}</span>
            </div>
          </div>
        </div>

        {/* Device B */}
        <div className="bg-white border border-[#e2e8f0] p-5 rounded-3xl shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-700 uppercase">Thiết Bị 2</span>
            <select
              value={selectedIdxB}
              onChange={(e) => handleSelectB(Number(e.target.value))}
              className="text-xs font-bold text-[#0b1c30] bg-gray-50 border border-gray-200 rounded-lg p-2 focus:outline-none"
            >
              {COMPARISON_DATA.map((p, idx) => (
                <option key={idx} value={idx}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-20 h-20 relative rounded-xl overflow-hidden border border-gray-100 shrink-0">
              <Image src={phoneB.image} alt={phoneB.name} fill className="object-cover" sizes="80px" unoptimized />
            </div>
            <div>
              <h3 className="font-black text-[#0b1c30] text-lg">{phoneB.name}</h3>
              <p className="text-[#994700] font-black text-xl">{phoneB.price}</p>
              <span className="text-[11px] text-gray-500">{phoneB.brand}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Specifications Table */}
      <div className="bg-white border border-[#e2e8f0] rounded-3xl shadow-sm overflow-hidden">
        <div className="bg-[#0b1c30] text-white p-4 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
          <Zap size={18} className="text-yellow-400" />
          Bảng So Sánh Thông Số Kỹ Thuật
        </div>

        <div className="divide-y divide-gray-100 text-xs">
          {/* Màn hình */}
          <div className="grid grid-cols-1 md:grid-cols-3 p-4 hover:bg-gray-50 items-center">
            <div className="font-bold text-gray-500 mb-1 md:mb-0 flex items-center gap-2">
              <Smartphone size={16} className="text-[#994700]" />
              Màn hình hiển thị
            </div>
            <div className="font-semibold text-[#0b1c30] pr-2">
              <span className="md:hidden block text-[10px] font-bold text-amber-700 mb-0.5">{phoneA.name}:</span>
              {phoneA.screen}
            </div>
            <div className="font-semibold text-[#0b1c30] pl-2 border-t md:border-t-0 md:border-l border-gray-100 pt-2 md:pt-0">
              <span className="md:hidden block text-[10px] font-bold text-blue-700 mb-0.5">{phoneB.name}:</span>
              {phoneB.screen}
            </div>
          </div>

          {/* Vi xử lý */}
          <div className="grid grid-cols-1 md:grid-cols-3 p-4 hover:bg-gray-50 items-center bg-gray-50/40">
            <div className="font-bold text-gray-500 mb-1 md:mb-0 flex items-center gap-2">
              <Cpu size={16} className="text-[#994700]" />
              Vi xử lý (CPU)
            </div>
            <div className="font-semibold text-[#0b1c30] pr-2">
              <span className="md:hidden block text-[10px] font-bold text-amber-700 mb-0.5">{phoneA.name}:</span>
              {phoneA.cpu}
            </div>
            <div className="font-semibold text-[#0b1c30] pl-2 border-t md:border-t-0 md:border-l border-gray-100 pt-2 md:pt-0">
              <span className="md:hidden block text-[10px] font-bold text-blue-700 mb-0.5">{phoneB.name}:</span>
              {phoneB.cpu}
            </div>
          </div>

          {/* Điểm Antutu */}
          <div className="grid grid-cols-1 md:grid-cols-3 p-4 hover:bg-gray-50 items-center">
            <div className="font-bold text-gray-500 mb-1 md:mb-0 flex items-center gap-2">
              <Trophy size={16} className="text-amber-500" />
              Hiệu năng AnTuTu
            </div>
            <div className="font-black text-[#994700] text-sm pr-2">
              <span className="md:hidden block text-[10px] font-bold text-amber-700 mb-0.5">{phoneA.name}:</span>
              {phoneA.antutu}
            </div>
            <div className="font-black text-[#994700] text-sm pl-2 border-t md:border-t-0 md:border-l border-gray-100 pt-2 md:pt-0">
              <span className="md:hidden block text-[10px] font-bold text-blue-700 mb-0.5">{phoneB.name}:</span>
              {phoneB.antutu}
            </div>
          </div>

          {/* RAM & Bộ nhớ trong */}
          <div className="grid grid-cols-1 md:grid-cols-3 p-4 hover:bg-gray-50 items-center bg-gray-50/40">
            <div className="font-bold text-gray-500 mb-1 md:mb-0 flex items-center gap-2">
              <Zap size={16} className="text-[#994700]" />
              Bộ nhớ RAM - ROM
            </div>
            <div className="font-semibold text-[#0b1c30] pr-2">
              <span className="md:hidden block text-[10px] font-bold text-amber-700 mb-0.5">{phoneA.name}:</span>
              {phoneA.ramRom}
            </div>
            <div className="font-semibold text-[#0b1c30] pl-2 border-t md:border-t-0 md:border-l border-gray-100 pt-2 md:pt-0">
              <span className="md:hidden block text-[10px] font-bold text-blue-700 mb-0.5">{phoneB.name}:</span>
              {phoneB.ramRom}
            </div>
          </div>

          {/* Camera sau */}
          <div className="grid grid-cols-1 md:grid-cols-3 p-4 hover:bg-gray-50 items-center">
            <div className="font-bold text-gray-500 mb-1 md:mb-0 flex items-center gap-2">
              <Camera size={16} className="text-[#994700]" />
              Hệ thống Camera
            </div>
            <div className="font-semibold text-[#0b1c30] pr-2">
              <span className="md:hidden block text-[10px] font-bold text-amber-700 mb-0.5">{phoneA.name}:</span>
              {phoneA.rearCamera}
            </div>
            <div className="font-semibold text-[#0b1c30] pl-2 border-t md:border-t-0 md:border-l border-gray-100 pt-2 md:pt-0">
              <span className="md:hidden block text-[10px] font-bold text-blue-700 mb-0.5">{phoneB.name}:</span>
              {phoneB.rearCamera}
            </div>
          </div>

          {/* Pin & Sạc nhanh */}
          <div className="grid grid-cols-1 md:grid-cols-3 p-4 hover:bg-gray-50 items-center bg-gray-50/40">
            <div className="font-bold text-gray-500 mb-1 md:mb-0 flex items-center gap-2">
              <Battery size={16} className="text-[#994700]" />
              Dung lượng Pin & Sạc
            </div>
            <div className="font-semibold text-[#0b1c30] pr-2">
              <span className="md:hidden block text-[10px] font-bold text-amber-700 mb-0.5">{phoneA.name}:</span>
              {phoneA.batteryCharge}
            </div>
            <div className="font-semibold text-[#0b1c30] pl-2 border-t md:border-t-0 md:border-l border-gray-100 pt-2 md:pt-0">
              <span className="md:hidden block text-[10px] font-bold text-blue-700 mb-0.5">{phoneB.name}:</span>
              {phoneB.batteryCharge}
            </div>
          </div>

          {/* Hệ điều hành */}
          <div className="grid grid-cols-1 md:grid-cols-3 p-4 hover:bg-gray-50 items-center">
            <div className="font-bold text-gray-500 mb-1 md:mb-0">Hệ điều hành</div>
            <div className="font-semibold text-gray-700 pr-2">
              <span className="md:hidden block text-[10px] font-bold text-amber-700 mb-0.5">{phoneA.name}:</span>
              {phoneA.os}
            </div>
            <div className="font-semibold text-gray-700 pl-2 border-t md:border-t-0 md:border-l border-gray-100 pt-2 md:pt-0">
              <span className="md:hidden block text-[10px] font-bold text-blue-700 mb-0.5">{phoneB.name}:</span>
              {phoneB.os}
            </div>
          </div>

          {/* Trọng lượng & Thiết kế */}
          <div className="grid grid-cols-1 md:grid-cols-3 p-4 hover:bg-gray-50 items-center bg-gray-50/40">
            <div className="font-bold text-gray-500 mb-1 md:mb-0">Trọng lượng & Hoàn thiện</div>
            <div className="font-semibold text-gray-700 pr-2">
              <span className="md:hidden block text-[10px] font-bold text-amber-700 mb-0.5">{phoneA.name}:</span>
              {phoneA.weight}
            </div>
            <div className="font-semibold text-gray-700 pl-2 border-t md:border-t-0 md:border-l border-gray-100 pt-2 md:pt-0">
              <span className="md:hidden block text-[10px] font-bold text-blue-700 mb-0.5">{phoneB.name}:</span>
              {phoneB.weight}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
