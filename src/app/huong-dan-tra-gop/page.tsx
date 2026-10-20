"use client";

import React, { useState } from "react";
import { CreditCard, Calculator, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function InstallmentGuidePage() {
  const [devicePrice, setDevicePrice] = useState<number>(7000000);
  const [prepayPercent, setPrepayPercent] = useState<number>(30);
  const [loanMonths, setLoanMonths] = useState<number>(6);

  const prepayAmount = (devicePrice * prepayPercent) / 100;
  const loanAmount = devicePrice - prepayAmount;
  // 0% interest estimate (chỉ phụ phí quản lý hồ sơ ~1.5%/tháng)
  const monthlyPayment = Math.round(loanAmount / loanMonths + loanAmount * 0.015);

  return (
    <div className="max-w-[1240px] mx-auto px-4 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="bg-white p-6 rounded-3xl border border-[#e2e8f0] shadow-sm">
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#0b1c30] flex items-center gap-2.5">
          <Calculator size={28} className="text-[#8d4b00]" />
          DỰ TOÁN & HƯỚNG DẪN MUA TRẢ GÓP 0% LÃI SUẤT
        </h1>
        <p className="text-xs text-[#887364] mt-1">
          Hỗ trợ xét duyệt hồ sơ trực tuyến trong 5 phút chỉ cần CCCD gắn chip hoặc thẻ tín dụng ngân hàng
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Máy tính trả góp tương tác */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-[#e2e8f0] shadow-sm space-y-5">
          <h2 className="text-base font-extrabold text-[#0b1c30] uppercase border-b pb-3">
            Bảng Tính Số Tiền Trả Góp Ước Tính
          </h2>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-[#0b1c30] mb-1.5">
                Giá trị thiết bị (₫): {devicePrice.toLocaleString("vi-VN")} ₫
              </label>
              <input
                type="range"
                min="3000000"
                max="35000000"
                step="500000"
                value={devicePrice}
                onChange={(e) => setDevicePrice(Number(e.target.value))}
                className="w-full accent-[#8d4b00] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                <span>3.000.000₫</span>
                <span>35.000.000₫</span>
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#0b1c30] mb-1.5">
                Tỷ lệ trả trước: {prepayPercent}% ({prepayAmount.toLocaleString("vi-VN")} ₫)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[10, 20, 30, 50].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPrepayPercent(p)}
                    className={`p-2.5 rounded-xl font-bold transition-all ${
                      prepayPercent === p
                        ? "bg-[#8d4b00] text-white shadow-sm"
                        : "bg-[#f8f9ff] text-gray-700 hover:bg-amber-50 border border-[#e2e8f0]"
                    }`}
                  >
                    {p}%
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#0b1c30] mb-1.5">
                Kỳ hạn vay: {loanMonths} tháng
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[6, 9, 12].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setLoanMonths(m)}
                    className={`p-2.5 rounded-xl font-bold transition-all ${
                      loanMonths === m
                        ? "bg-[#8d4b00] text-white shadow-sm"
                        : "bg-[#f8f9ff] text-gray-700 hover:bg-amber-50 border border-[#e2e8f0]"
                    }`}
                  >
                    {m} Tháng
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tóm tắt thanh toán */}
          <div className="bg-[#eff4ff] p-5 rounded-2xl border border-[#dce9ff] space-y-2.5 text-xs">
            <div className="flex justify-between text-gray-700">
              <span>Số tiền trả trước ban đầu:</span>
              <strong className="text-[#0b1c30]">{prepayAmount.toLocaleString("vi-VN")} ₫</strong>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Số tiền vay qua hồ sơ:</span>
              <strong className="text-[#0b1c30]">{loanAmount.toLocaleString("vi-VN")} ₫</strong>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-[#0b1c30] border-t border-[#dce9ff] pt-2.5">
              <span>Mỗi tháng góp ước tính:</span>
              <span className="text-[#bb0112] text-xl font-black">
                {monthlyPayment.toLocaleString("vi-VN")} ₫/tháng
              </span>
            </div>
          </div>
        </div>

        {/* Thủ tục & Điều kiện */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-[#e2e8f0] shadow-sm space-y-4">
          <h2 className="text-base font-extrabold text-[#0b1c30] uppercase border-b pb-3">
            Điều Kiện & Giấy Tờ Cần Chuẩn Bị
          </h2>
          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#0b1c30]">Độ tuổi:</strong> Từ đủ 18 tuổi đến 60 tuổi.
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#0b1c30]">Giấy tờ:</strong> Căn cước công dân gắn chip (bản gốc để đối chiếu).
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#0b1c30]">Thẻ tín dụng:</strong> Hỗ trợ hơn 25 ngân hàng (VPBank, Techcombank, VIB, Sacombank...), duyệt online 0% lãi suất.
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#0b1c30]">Thời gian xét duyệt:</strong> 5 - 10 phút nhận máy ngay tại cửa hàng.
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#e2e8f0]">
            <Link
              href="/dien-thoai"
              className="w-full bg-[#8d4b00] hover:bg-[#b15f00] text-white font-bold py-3 rounded-xl text-center block text-xs transition-colors shadow-sm"
            >
              Chọn máy để làm hồ sơ trả góp ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
