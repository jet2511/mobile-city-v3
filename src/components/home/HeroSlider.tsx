import React from "react";
import Link from "next/link";
import { ShieldCheck, Truck, RotateCcw, Wrench, Sparkles, ArrowRight, Flame } from "lucide-react";

export function HeroSlider() {
  return (
    <div className="space-y-4 my-4">
      {/* Main Banner Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Main Hero Card Stitch Style */}
        <div className="lg:col-span-3 bg-[#0b1c30] rounded-2xl overflow-hidden shadow-md p-6 md:p-10 flex flex-col justify-between relative min-h-[320px] border border-[#213145]">
          <div className="max-w-md z-10 space-y-3.5">
            <div className="inline-flex items-center gap-1.5 bg-[#8d4b00] text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider shadow-sm">
              <Sparkles size={12} className="text-yellow-300" />
              Đại Tiệc Công Nghệ
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
              XIAOMI REDMI NOTE 13 PRO 5G
            </h1>
            <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
              Snapdragon 8 Gen 2 • Màn 2K OLED 120Hz 4000 nits • Sạc siêu tốc 120W. Tặng trọn gói Gói Bảo Hành Vàng 12 Tháng bao cả Nguồn & Màn hình!
            </p>
            <div className="pt-2 flex items-center gap-4">
              <span className="text-2xl md:text-3xl font-black text-amber-400">
                6.990.000 ₫
              </span>
              <span className="text-sm text-gray-400 line-through">
                7.990.000 ₫
              </span>
            </div>
            <div className="pt-2 flex items-center gap-3">
              <Link
                href="/dien-thoai/xiaomi-redmi-note-13-pro-5g"
                className="inline-flex items-center gap-2 bg-[#8d4b00] hover:bg-[#b15f00] text-white font-bold text-sm px-6 py-2.5 rounded-lg transition-all shadow-md"
              >
                Mua Ngay Giá Sốc
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/huong-dan-tra-gop"
                className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-medium text-xs px-4 py-2.5 rounded-lg transition-colors border border-white/10"
              >
                Trả góp 0%
              </Link>
            </div>
          </div>

          {/* Decorative Product Shot */}
          <div className="absolute right-2 bottom-2 md:right-8 md:bottom-6 opacity-35 md:opacity-95 pointer-events-none">
            <img
              src="https://cdn.mobilecity.vn/mobilecity-vn/images/2023/11/w300/xiaomi-redmi-k70-den.png.webp"
              alt="Xiaomi Redmi K70"
              className="w-52 md:w-72 object-contain filter drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Side Promotion Banners */}
        <div className="flex flex-col gap-4 justify-between">
          <div className="bg-gradient-to-br from-[#8d4b00] to-[#b15f00] rounded-2xl p-5 text-white shadow-sm flex flex-col justify-between h-full border border-amber-800/20">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider bg-black/20 px-2.5 py-1 rounded-full inline-block">
                iPhone Cũ Zin 99%
              </span>
              <h3 className="font-extrabold text-base mt-2.5 leading-snug">iPhone 15 Pro Max</h3>
              <p className="text-xs text-amber-100 mt-1">Titan tự nhiên, Pin 9x-100%, bảo hành 12T</p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-extrabold text-lg text-yellow-200">24.950.000 ₫</span>
              <Link
                href="/dien-thoai/iphone-15-pro-max-cu-99"
                className="text-xs font-bold bg-white text-[#8d4b00] px-3 py-1.5 rounded-md hover:bg-amber-50 transition-colors shadow-sm"
              >
                Xem ngay
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-5 text-white shadow-sm flex flex-col justify-between h-full border border-slate-700">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider bg-white/10 px-2.5 py-1 rounded-full inline-block text-amber-400">
                MobileCity Care
              </span>
              <h3 className="font-extrabold text-base mt-2.5 leading-snug">Báo Giá Sửa Chữa</h3>
              <p className="text-xs text-slate-300 mt-1">Thay màn hình, ép kính, pin lấy ngay 30P</p>
            </div>
            <div className="mt-4">
              <Link
                href="/sua-chua"
                className="block w-full text-center bg-[#8d4b00] hover:bg-[#b15f00] text-white text-xs font-bold py-2 rounded-md transition-colors shadow-sm"
              >
                Tra cứu bảng giá linh kiện
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Bar Stitch Style */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-[#e2e8f0] shadow-sm text-xs">
        <Link href="/chinh-sach-bao-hanh-vang" className="flex items-center gap-3 p-2 hover:bg-amber-50/50 rounded-lg transition-colors">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-[#8d4b00] flex items-center justify-center flex-shrink-0">
            <ShieldCheck size={20} />
          </div>
          <div>
            <strong className="block text-[#0b1c30]">Bảo Hành Vàng 12T</strong>
            <span className="text-gray-500 text-[11px]">Bao cả nguồn, màn hình</span>
          </div>
        </Link>

        <div className="flex items-center gap-3 p-2 rounded-lg">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <Truck size={20} />
          </div>
          <div>
            <strong className="block text-[#0b1c30]">Giao Hàng Hỏa Tốc</strong>
            <span className="text-gray-500 text-[11px]">Đồng kiểm trước thanh toán</span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2 rounded-lg">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
            <RotateCcw size={20} />
          </div>
          <div>
            <strong className="block text-[#0b1c30]">Đổi Mới 15 Ngày</strong>
            <span className="text-gray-500 text-[11px]">Lỗi là đổi không chờ đợi</span>
          </div>
        </div>

        <Link href="/sua-chua" className="flex items-center gap-3 p-2 hover:bg-amber-50/50 rounded-lg transition-colors">
          <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
            <Wrench size={20} />
          </div>
          <div>
            <strong className="block text-[#0b1c30]">MobileCity Care</strong>
            <span className="text-gray-500 text-[11px]">Sửa chữa chuyên sâu uy tín</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
