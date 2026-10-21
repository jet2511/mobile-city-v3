"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Smartphone, Lock, ArrowRight, CheckCircle2, ShieldCheck, RefreshCw, KeyRound, UserCheck } from "lucide-react";

export default function LoginPage() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      alert("Vui lòng nhập số điện thoại hợp lệ (10 số)!");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
      setResendTimer(60);
    }, 600);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      alert("Vui lòng nhập đủ 6 chữ số OTP!");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 800);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-6 sm:p-10 rounded-3xl border border-[#e2e8f0] shadow-xl relative overflow-hidden">
        {/* Background glow badge */}
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#994700] to-[#b35700] text-white shadow-lg shadow-orange-500/20 mb-2">
            <Smartphone size={28} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0b1c30] tracking-tight">
            {isSuccess ? "Đăng Nhập Thành Công!" : "MobileCity Xin Chào!"}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            {isSuccess
              ? "Hệ thống đang chuẩn bị đồng bộ thông tin của bạn..."
              : step === "phone"
              ? "Tra cứu đơn hàng, kích hoạt BH Vàng & điểm tích lũy"
              : `Mã OTP gồm 6 chữ số đã gửi tới số ${phone}`}
          </p>
        </div>

        {isSuccess ? (
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 size={36} />
            </div>
            <div className="bg-[#f8f9fb] p-4 rounded-2xl border border-gray-100 text-left text-xs space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Khách hàng:</span>
                <span className="font-bold text-[#0b1c30]">Nguyễn Văn An</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Số điện thoại:</span>
                <span className="font-bold text-[#0b1c30]">{phone || "0988.xxx.888"}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Hạng thành viên:</span>
                <span className="font-bold text-[#b35700]">VIP Gold (Tích 320.000đ)</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Link
                href="/tai-khoan"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#994700] hover:bg-[#803b00] text-white text-sm font-bold rounded-xl shadow-lg shadow-orange-700/20 transition-all"
              >
                Vào Quản Lý Đơn Hàng & Bảo Hành
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/"
                className="w-full block py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-xl transition"
              >
                Về Trang Chủ
              </Link>
            </div>
          </div>
        ) : step === "phone" ? (
          /* Bước 1: Nhập Số Điện Thoại */
          <form onSubmit={handleSendOtp} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                Số Điện Thoại Nhận OTP
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  placeholder="Ví dụ: 0988 123 456"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                  maxLength={11}
                  className="w-full px-4 py-3.5 pl-11 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#994700] focus:bg-white transition"
                />
                <Smartphone className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
              </div>
              <p className="text-[11px] text-gray-400 mt-2">
                MobileCity không yêu cầu mật khẩu phức tạp, xác minh tức thì qua SMS OTP / Zalo OTP an toàn.
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading || phone.length < 10}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#994700] hover:bg-[#803b00] disabled:bg-gray-300 text-white text-sm font-bold rounded-xl shadow-md transition-all cursor-pointer"
            >
              {isLoading ? (
                <RefreshCw size={18} className="animate-spin" />
              ) : (
                <>
                  <span>Tiếp tục với OTP</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            {/* Quick Benefits */}
            <div className="border-t border-gray-100 pt-5 space-y-2.5">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
                <span>Bảo mật 100% dữ liệu tài khoản & lịch sử máy</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <UserCheck size={16} className="text-[#994700] shrink-0" />
                <span>Đồng bộ máy mua trả góp, bảo hành vàng & phụ kiện</span>
              </div>
            </div>
          </form>
        ) : (
          /* Bước 2: Nhập Mã OTP 6 số */
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Nhập mã xác thực (6 số)
                </label>
                <button
                  type="button"
                  onClick={() => setStep("phone")}
                  className="text-xs text-[#994700] hover:underline font-semibold"
                >
                  Đổi số khác
                </button>
              </div>

              <div className="flex justify-between gap-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-11 h-13 text-center text-xl font-bold bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#994700] focus:bg-white transition"
                  />
                ))}
              </div>
              <p className="text-center text-xs text-gray-400 mt-3">
                Thử nghiệm mock: Bạn có thể nhập bất kỳ 6 chữ số nào (vd: 123456)
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading || otp.join("").length < 6}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#994700] hover:bg-[#803b00] disabled:bg-gray-300 text-white text-sm font-bold rounded-xl shadow-md transition-all cursor-pointer"
            >
              {isLoading ? (
                <RefreshCw size={18} className="animate-spin" />
              ) : (
                <>
                  <KeyRound size={16} />
                  <span>Xác Nhận & Đăng Nhập</span>
                </>
              )}
            </button>

            <div className="text-center text-xs text-gray-500">
              Không nhận được mã?{" "}
              <button
                type="button"
                onClick={() => setResendTimer(60)}
                className="text-[#994700] font-bold hover:underline"
              >
                Gửi lại mã {resendTimer > 0 ? `(${resendTimer}s)` : ""}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
