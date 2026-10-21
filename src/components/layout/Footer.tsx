import React from "react";
import Link from "next/link";
import { MapPin, Phone, ShieldCheck, Mail, CreditCard, Award, Share2, Video, ChevronRight, Briefcase, ArrowLeftRight, RotateCcw, Wrench } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-[#e2e8f0] mt-16 text-xs text-[#554336]">
      {/* Top Footer: Hệ thống showroom & Chính sách */}
      <div className="max-w-[1240px] mx-auto px-4 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Cột 1: Showroom Hà Nội */}
        <div className="space-y-3.5">
          <div className="flex items-center gap-1.5 font-bold text-sm text-[#0b1c30] uppercase border-b pb-2 border-amber-200">
            <MapPin size={16} className="text-[#8d4b00]" />
            Hệ Thống Showroom Hà Nội
          </div>
          <ul className="space-y-3">
            <li>
              <strong className="block text-[#0b1c30]">120 Thái Hà, Q. Đống Đa</strong>
              <span className="text-gray-500">Điện thoại: </span>
              <a href="tel:0969120120" className="text-[#8d4b00] font-bold">0969.120.120</a>
            </li>
            <li>
              <strong className="block text-[#0b1c30]">398 Cầu Giấy, Q. Cầu Giấy</strong>
              <span className="text-gray-500">Điện thoại: </span>
              <a href="tel:0961111398" className="text-[#8d4b00] font-bold">096.1111.398</a>
            </li>
            <li>
              <strong className="block text-[#0b1c30]">42 Phố Vọng, Hai Bà Trưng</strong>
              <span className="text-gray-500">Điện thoại: </span>
              <a href="tel:0979884242" className="text-[#8d4b00] font-bold">0979.88.4242</a>
            </li>
          </ul>
        </div>

        {/* Cột 2: Showroom TP.HCM & Đà Nẵng */}
        <div className="space-y-3.5">
          <div className="flex items-center gap-1.5 font-bold text-sm text-[#0b1c30] uppercase border-b pb-2 border-amber-200">
            <MapPin size={16} className="text-[#8d4b00]" />
            Showroom TP.HCM & Đà Nẵng
          </div>
          <ul className="space-y-3">
            <li>
              <strong className="block text-[#0b1c30]">123 Trần Quang Khải, Q.1, TP.HCM</strong>
              <span className="text-gray-500">Điện thoại: </span>
              <a href="tel:0965123123" className="text-[#8d4b00] font-bold">0965.123.123</a>
            </li>
            <li>
              <strong className="block text-[#0b1c30]">602 Lê Hồng Phong, P.10, Q.10, TP.HCM</strong>
              <span className="text-gray-500">Điện thoại: </span>
              <a href="tel:0971111602" className="text-[#8d4b00] font-bold">097.1111.602</a>
            </li>
            <li>
              <strong className="block text-[#0b1c30]">97 Hàm Nghi, Q. Thanh Khê, Đà Nẵng</strong>
              <span className="text-gray-500">Điện thoại: </span>
              <a href="tel:0961239797" className="text-[#8d4b00] font-bold">096.123.9797</a>
            </li>
          </ul>
        </div>

        {/* Cột 3: Dịch Vụ & Tiện Ích Khách Hàng */}
        <div className="space-y-3.5">
          <div className="flex items-center gap-1.5 font-bold text-sm text-[#0b1c30] uppercase border-b pb-2 border-amber-200">
            <ShieldCheck size={16} className="text-[#8d4b00]" />
            Dịch Vụ & Khách Hàng
          </div>
          <ul className="space-y-2">
            <li>
              <Link href="/chinh-sach-bao-hanh-vang" className="hover:text-[#8d4b00] flex items-center gap-1 font-semibold text-[#8d4b00]">
                <ChevronRight size={13} className="text-[#8d4b00]" /> Chính sách Bảo Hành Vàng 12T
              </Link>
            </li>
            <li>
              <Link href="/so-sanh" className="hover:text-[#8d4b00] flex items-center gap-1">
                <ChevronRight size={13} className="text-gray-400" /> So sánh đối đầu điện thoại
              </Link>
            </li>
            <li>
              <Link href="/sua-chua/thay-man-hinh-iphone-14-pro-max" className="hover:text-[#8d4b00] flex items-center gap-1">
                <ChevronRight size={13} className="text-gray-400" /> Thay màn hình iPhone chính hãng
              </Link>
            </li>
            <li>
              <Link href="/huong-dan-tra-gop" className="hover:text-[#8d4b00] flex items-center gap-1">
                <ChevronRight size={13} className="text-gray-400" /> Dự toán mua trả góp 0%
              </Link>
            </li>
            <li>
              <Link href="/thu-cu-doi-moi" className="hover:text-[#8d4b00] flex items-center gap-1">
                <ChevronRight size={13} className="text-gray-400" /> Thu cũ đổi mới trợ giá 2 triệu
              </Link>
            </li>
            <li>
              <Link href="/tra-cuu-bao-hanh" className="hover:text-[#8d4b00] flex items-center gap-1 font-semibold text-[#8d4b00]">
                <ChevronRight size={13} className="text-[#8d4b00]" /> Tra cứu tiến độ & Bảo hành IMEI
              </Link>
            </li>
          </ul>
        </div>

        {/* Cột 4: Đăng Ký, Tuyển Dụng & Chứng Nhận */}
        <div className="space-y-4">
          <div className="flex items-center gap-1.5 font-bold text-sm text-[#0b1c30] uppercase border-b pb-2 border-amber-200">
            <Briefcase size={16} className="text-[#8d4b00]" />
            Tuyển Dụng & Bản Tin
          </div>
          
          <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200/60 space-y-2">
            <div className="font-bold text-[#0b1c30] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
              MobileCity Đang Tuyển Dụng!
            </div>
            <p className="text-[11px] text-gray-600">
              Kỹ thuật viên sửa chữa, reviewer video & chuyên viên tư vấn bán hàng.
            </p>
            <Link
              href="/tuyen-dung"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8d4b00] hover:underline"
            >
              Gia nhập đội ngũ ngay →
            </Link>
          </div>

          <p className="text-[11px] text-gray-500">
            Nhận thông báo ưu đãi giá sốc hoặc hàng hot mới về:
          </p>
          <div className="flex items-center gap-1.5">
            <input
              type="email"
              data-testid="footer-newsletter-input"
              placeholder="Nhập email của bạn..."
              className="flex-1 bg-[#f8f9ff] border border-[#cbd5e1] rounded-lg px-3 py-2 text-xs outline-none focus:border-[#8d4b00]"
            />
            <button
              data-testid="footer-newsletter-btn"
              className="bg-[#8d4b00] hover:bg-[#b15f00] text-white px-3.5 py-2 rounded-lg font-bold text-xs transition-colors shadow-sm"
            >
              Gửi
            </button>
          </div>

          <div className="pt-1 flex items-center gap-3">
            <div className="border border-red-200 bg-red-50 text-[#bb0112] px-2.5 py-1 rounded text-[11px] font-bold flex items-center gap-1">
              <Award size={14} /> ĐÃ THÔNG BÁO BỘ CÔNG THƯƠNG
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-[#e2e8f0] bg-[#f8f9ff] py-4 text-center text-[11px] text-[#887364]">
        <div className="max-w-[1240px] mx-auto px-4 flex flex-wrap items-center justify-between gap-2">
          <span>© 2026 MobileCity - Hệ thống bán lẻ điện thoại di động & sửa chữa uy tín toàn quốc.</span>
          <div className="flex items-center gap-4">
            <Link href="/tuyen-dung" className="hover:underline">Tuyển dụng</Link>
            <span>•</span>
            <Link href="/dang-nhap" className="hover:underline">Tài khoản</Link>
            <span>•</span>
            <Link href="/he-thong-showroom" className="hover:underline">Showroom</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
