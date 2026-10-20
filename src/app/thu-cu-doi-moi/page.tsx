"use client";

import React, { useState } from "react";
import { RefreshCw, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

export default function TradeInPage() {
  const [currentBrand, setCurrentBrand] = useState("apple");
  const [modelName, setModelName] = useState("");
  const [conditionGrade, setConditionGrade] = useState("A");
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

  const handleEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modelName) return;

    // Fake estimate logic
    let base = 6000000;
    if (currentBrand === "apple") base = 12000000;
    if (conditionGrade === "A") base += 2000000;
    if (conditionGrade === "B") base += 1000000;

    setEstimatedPrice(base);
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-[#0b1c30] text-white p-8 md:p-12 rounded-3xl border border-[#213145] relative overflow-hidden">
        <div className="max-w-xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-[#8d4b00] text-amber-200 text-xs font-bold uppercase px-3.5 py-1 rounded-full tracking-wider">
            <Sparkles size={14} className="text-yellow-300" />
            CHƯƠNG TRÌNH ĐẶC BIỆT
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            THU CŨ ĐỔI MỚI - TRỢ GIÁ ĐẾN 2 TRIỆU
          </h1>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            Thu máy cũ giá cao nhất thị trường. Không phân biệt nguồn gốc, kể cả máy xách tay hoặc máy trần không phụ kiện. Định giá 5 phút nhận tiền hoặc lên đời máy mới ngay.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Định Giá Máy Cũ */}
        <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-[#e2e8f0] shadow-sm space-y-5">
          <h2 className="text-base font-extrabold text-[#0b1c30] uppercase border-b pb-3">
            Định Giá Nhanh Thiết Bị Của Bạn
          </h2>

          <form onSubmit={handleEstimate} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-[#0b1c30] mb-1.5">1. Hãng điện thoại:</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: "apple", label: "iPhone" },
                  { id: "xiaomi", label: "Xiaomi" },
                  { id: "samsung", label: "Samsung" },
                  { id: "other", label: "Khác" },
                ].map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setCurrentBrand(b.id)}
                    className={`p-2.5 rounded-xl font-bold transition-all ${
                      currentBrand === b.id
                        ? "bg-[#8d4b00] text-white shadow-sm"
                        : "bg-[#f8f9ff] text-gray-700 hover:bg-amber-50 border border-[#e2e8f0]"
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#0b1c30] mb-1.5">2. Dòng máy (Model):</label>
              <input
                type="text"
                required
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                placeholder="VD: iPhone 13 Pro 128GB, Xiaomi 13..."
                className="w-full border border-[#cbd5e1] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#8d4b00] bg-[#f8f9ff] focus:bg-white text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-[#0b1c30] mb-1.5">3. Tình trạng máy:</label>
              <div className="space-y-2">
                {[
                  { id: "A", title: "Loại 1 (Đẹp như mới)", desc: "Thân máy không trầy xước, màn hình zin đẹp, pin trên 85%" },
                  { id: "B", title: "Loại 2 (Trầy xước nhẹ)", desc: "Màn hình có xước lông mèo nhẹ, vỏ cấn nhẹ viền" },
                  { id: "C", title: "Loại 3 (Cấn móp, chai pin)", desc: "Vỏ xước nhiều, pin chai cần thay thế" },
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setConditionGrade(item.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      conditionGrade === item.id
                        ? "border-[#8d4b00] bg-amber-50/70 text-[#0b1c30] ring-1 ring-[#8d4b00]"
                        : "border-[#e2e8f0] bg-white hover:border-gray-300 text-gray-600"
                    }`}
                  >
                    <strong className="block text-xs">{item.title}</strong>
                    <span className="text-[11px] text-gray-500">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#8d4b00] hover:bg-[#b15f00] text-white font-bold py-3 rounded-xl text-xs transition-colors shadow-sm uppercase tracking-wider"
            >
              Xem Giá Thu Ước Tính
            </button>
          </form>

          {estimatedPrice && (
            <div className="bg-[#eff4ff] p-5 rounded-2xl border border-[#dce9ff] space-y-2 text-xs">
              <span className="text-gray-600">Giá thu cũ ước tính cho {modelName}:</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-[#bb0112]">
                  {estimatedPrice.toLocaleString("vi-VN")} ₫
                </span>
                <span className="text-[11px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                  + Đã cộng 1.000.000₫ trợ giá lên đời
                </span>
              </div>
              <p className="text-[11px] text-gray-500">
                Mang máy đến showroom MobileCity gần nhất để kỹ thuật viên kiểm định và nhận tiền hoặc cấn trừ tiền máy mới ngay!
              </p>
            </div>
          )}
        </div>

        {/* Quy Trình 4 Bước */}
        <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-3xl border border-[#e2e8f0] shadow-sm space-y-4">
          <h2 className="text-base font-extrabold text-[#0b1c30] uppercase border-b pb-3">
            Quy Trình Thu Cũ 4 Bước Tối Giản
          </h2>
          <div className="space-y-4 text-xs">
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-amber-100 text-[#8d4b00] flex items-center justify-center font-bold shrink-0">
                1
              </div>
              <div>
                <strong className="text-[#0b1c30]">Định giá sơ bộ:</strong> Tra cứu giá trên website hoặc gọi hotline tư vấn viên.
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-amber-100 text-[#8d4b00] flex items-center justify-center font-bold shrink-0">
                2
              </div>
              <div>
                <strong className="text-[#0b1c30]">Kiểm tra máy tại shop:</strong> Kỹ thuật viên kiểm tra phần cứng trong 5 phút.
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-amber-100 text-[#8d4b00] flex items-center justify-center font-bold shrink-0">
                3
              </div>
              <div>
                <strong className="text-[#0b1c30]">Thống nhất giá thu:</strong> Cam kết không ép giá, báo đúng giá niêm yết.
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-amber-100 text-[#8d4b00] flex items-center justify-center font-bold shrink-0">
                4
              </div>
              <div>
                <strong className="text-[#0b1c30]">Lên đời hoặc nhận tiền:</strong> Chọn máy mới nhận ngay trợ giá hoặc nhận chuyển khoản tức thì.
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#e2e8f0]">
            <Link
              href="/he-thong-showroom"
              className="w-full bg-[#0b1c30] hover:bg-[#213145] text-white font-bold py-3 rounded-xl text-center block text-xs transition-colors shadow-sm"
            >
              Tìm showroom MobileCity gần nhất
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
