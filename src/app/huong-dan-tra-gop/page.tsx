"use client";

import React, { useState } from "react";
import { CreditCard, Calculator, CheckCircle2, ShieldCheck, ArrowRight, Building2, Smartphone, FileText } from "lucide-react";
import Link from "next/link";

export default function InstallmentGuidePage() {
  const [devicePrice, setDevicePrice] = useState<number>(7000000);
  const [prepayPercent, setPrepayPercent] = useState<number>(30);
  const [loanMonths, setLoanMonths] = useState<number>(6);
  const [activeTab, setActiveTab] = useState<"finance" | "credit-card">("finance");

  const prepayAmount = (devicePrice * prepayPercent) / 100;
  const loanAmount = devicePrice - prepayAmount;
  // 0% interest estimate (chỉ phụ phí quản lý hồ sơ ~1.2% - 1.5%/tháng)
  const monthlyPaymentFinance = Math.round(loanAmount / loanMonths + loanAmount * 0.015);
  // Trả góp thẻ tín dụng 0% qua 25 ngân hàng
  const monthlyPaymentCreditCard = Math.round(loanAmount / loanMonths);

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

      {/* Tabs chuyển đổi phương thức trả góp */}
      <div className="flex border-b border-[#e2e8f0] gap-4">
        <button
          onClick={() => setActiveTab("finance")}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === "finance"
              ? "border-[#8d4b00] text-[#8d4b00]"
              : "border-transparent text-gray-500 hover:text-gray-800"
          }`}
        >
          <Building2 size={16} /> Qua Công Ty Tài Chính (CCCD)
        </button>
        <button
          onClick={() => setActiveTab("credit-card")}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === "credit-card"
              ? "border-[#8d4b00] text-[#8d4b00]"
              : "border-transparent text-gray-500 hover:text-gray-800"
          }`}
        >
          <CreditCard size={16} /> Qua Thẻ Tín Dụng 0% (25 Ngân hàng)
        </button>
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
                Giá trị thiết bị (₫): <span className="text-[#8d4b00] font-black">{devicePrice.toLocaleString("vi-VN")} ₫</span>
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
                {[10, 20, 30, 50].map((percent) => (
                  <button
                    key={percent}
                    type="button"
                    onClick={() => setPrepayPercent(percent)}
                    className={`p-2.5 rounded-xl border font-bold transition-all cursor-pointer ${
                      prepayPercent === percent
                        ? "border-[#8d4b00] bg-amber-50 text-[#8d4b00] ring-1 ring-[#8d4b00]"
                        : "border-[#e2e8f0] text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {percent}%
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#0b1c30] mb-1.5">Kỳ hạn trả góp:</label>
              <div className="grid grid-cols-3 gap-2">
                {[6, 9, 12].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setLoanMonths(m)}
                    className={`p-2.5 rounded-xl border font-bold transition-all cursor-pointer ${
                      loanMonths === m
                        ? "border-[#8d4b00] bg-amber-50 text-[#8d4b00] ring-1 ring-[#8d4b00]"
                        : "border-[#e2e8f0] text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {m} Tháng
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Kết quả tính toán */}
          <div className="bg-[#f8f9ff] p-5 rounded-2xl border border-[#e2e8f0] space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500">Số tiền vay lại:</span>
              <span className="font-bold text-[#0b1c30]">{loanAmount.toLocaleString("vi-VN")} ₫</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500">Số tiền trả trước:</span>
              <span className="font-bold text-[#0b1c30]">{prepayAmount.toLocaleString("vi-VN")} ₫</span>
            </div>
            <div className="border-t border-[#e2e8f0] pt-3 flex justify-between items-baseline">
              <div>
                <span className="text-xs font-bold text-gray-700 block">Số tiền góp mỗi tháng:</span>
                <span className="text-[11px] text-gray-400">
                  {activeTab === "finance" ? "Đã gồm phí quản lý hồ sơ" : "Lãi suất 0% cố định"}
                </span>
              </div>
              <span className="text-2xl font-black text-[#bb0112]">
                {(activeTab === "finance" ? monthlyPaymentFinance : monthlyPaymentCreditCard).toLocaleString("vi-VN")} ₫
                <span className="text-xs text-gray-500 font-normal">/tháng</span>
              </span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/dien-thoai"
              className="w-full bg-[#8d4b00] hover:bg-[#b15f00] text-white font-bold py-3.5 rounded-xl text-center block transition-all shadow-md text-xs uppercase tracking-wider"
            >
              Chọn máy & Đăng ký trả góp online ngay
            </Link>
          </div>
        </div>

        {/* Giải thích & Bảng so sánh đối tác tài chính */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-[#e2e8f0] shadow-sm space-y-4">
            <h3 className="text-base font-extrabold text-[#0b1c30] flex items-center gap-2">
              <ShieldCheck size={20} className="text-[#8d4b00]" />
              {activeTab === "finance" ? "Đối Tác Tài Chính Uy Tín" : "Danh Sách 25 Ngân Hàng Hỗ Trợ"}
            </h3>

            {activeTab === "finance" ? (
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl border border-[#e2e8f0] bg-[#f8f9ff]">
                  <strong className="block text-[#0b1c30]">1. Home Credit</strong>
                  <p className="text-gray-500 text-[11px] mt-0.5">Duyệt nhanh 5 phút, chỉ cần CCCD gắn chip từ 18 tuổi.</p>
                </div>
                <div className="p-3 rounded-xl border border-[#e2e8f0] bg-[#f8f9ff]">
                  <strong className="block text-[#0b1c30]">2. FE Credit</strong>
                  <p className="text-gray-500 text-[11px] mt-0.5">Hạn mức cao đến 30 triệu, không cần chứng minh thu nhập.</p>
                </div>
                <div className="p-3 rounded-xl border border-[#e2e8f0] bg-[#f8f9ff]">
                  <strong className="block text-[#0b1c30]">3. HD Saison</strong>
                  <p className="text-gray-500 text-[11px] mt-0.5">Hỗ trợ trả trước 0 đồng cho sản phẩm dưới 10 triệu.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <p className="text-gray-600 text-xs">
                  Áp dụng cho chủ thẻ tín dụng quốc tế (Credit Card) mang thương hiệu Visa, Mastercard, JCB của các ngân hàng:
                </p>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-gray-700">
                  <div className="bg-[#f8f9ff] p-2 rounded border border-[#e2e8f0]">Vietcombank</div>
                  <div className="bg-[#f8f9ff] p-2 rounded border border-[#e2e8f0]">Techcombank</div>
                  <div className="bg-[#f8f9ff] p-2 rounded border border-[#e2e8f0]">MB Bank</div>
                  <div className="bg-[#f8f9ff] p-2 rounded border border-[#e2e8f0]">VPBank</div>
                  <div className="bg-[#f8f9ff] p-2 rounded border border-[#e2e8f0]">TPBank</div>
                  <div className="bg-[#f8f9ff] p-2 rounded border border-[#e2e8f0]">Sacombank</div>
                </div>
              </div>
            )}

            <div className="border-t border-[#e2e8f0] pt-4 text-xs space-y-2">
              <span className="font-bold text-[#0b1c30] block">Hồ sơ cần chuẩn bị:</span>
              <ul className="space-y-1.5 text-gray-600 text-[11px]">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  Căn cước công dân gắn chip bản gốc (trên 18 tuổi).
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  Không nợ xấu trên hệ thống tín dụng quốc gia CIC.
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  Số điện thoại chính chủ để nhận mã OTP xác thực.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
