import React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  ShieldCheck,
  Mail,
  CreditCard,
  Award,
  Share2,
  Video,
  ChevronRight,
  Briefcase,
  ArrowLeftRight,
  RotateCcw,
  Wrench,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-[#e2e8f0] bg-white text-xs text-[#554336]">
      {/* Top Footer: Hệ thống showroom & Chính sách */}
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-8 px-4 py-12 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Cột 1: Showroom Hà Nội */}
        <div className="space-y-3.5">
          <div className="flex items-center gap-1.5 border-b border-amber-200 pb-2 text-sm font-bold text-[#0b1c30] uppercase">
            <MapPin size={16} className="text-[#8d4b00]" />
            Hệ Thống Showroom Hà Nội
          </div>
          <ul className="space-y-3">
            <li>
              <strong className="block text-[#0b1c30]">120 Thái Hà, Q. Đống Đa</strong>
              <span className="text-gray-500">Điện thoại: </span>
              <a href="tel:0969120120" className="font-bold text-[#8d4b00]">
                0969.120.120
              </a>
            </li>
            <li>
              <strong className="block text-[#0b1c30]">398 Cầu Giấy, Q. Cầu Giấy</strong>
              <span className="text-gray-500">Điện thoại: </span>
              <a href="tel:0961111398" className="font-bold text-[#8d4b00]">
                096.1111.398
              </a>
            </li>
            <li>
              <strong className="block text-[#0b1c30]">42 Phố Vọng, Hai Bà Trưng</strong>
              <span className="text-gray-500">Điện thoại: </span>
              <a href="tel:0979884242" className="font-bold text-[#8d4b00]">
                0979.88.4242
              </a>
            </li>
          </ul>
        </div>

        {/* Cột 2: Showroom TP.HCM & Đà Nẵng */}
        <div className="space-y-3.5">
          <div className="flex items-center gap-1.5 border-b border-amber-200 pb-2 text-sm font-bold text-[#0b1c30] uppercase">
            <MapPin size={16} className="text-[#8d4b00]" />
            Showroom TP.HCM & Đà Nẵng
          </div>
          <ul className="space-y-3">
            <li>
              <strong className="block text-[#0b1c30]">123 Trần Quang Khải, Q.1, TP.HCM</strong>
              <span className="text-gray-500">Điện thoại: </span>
              <a href="tel:0965123123" className="font-bold text-[#8d4b00]">
                0965.123.123
              </a>
            </li>
            <li>
              <strong className="block text-[#0b1c30]">
                602 Lê Hồng Phong, P.10, Q.10, TP.HCM
              </strong>
              <span className="text-gray-500">Điện thoại: </span>
              <a href="tel:0971111602" className="font-bold text-[#8d4b00]">
                097.1111.602
              </a>
            </li>
            <li>
              <strong className="block text-[#0b1c30]">97 Hàm Nghi, Q. Thanh Khê, Đà Nẵng</strong>
              <span className="text-gray-500">Điện thoại: </span>
              <a href="tel:0961239797" className="font-bold text-[#8d4b00]">
                096.123.9797
              </a>
            </li>
          </ul>
        </div>

        {/* Cột 3: Dịch Vụ & Tiện Ích Khách Hàng */}
        <div className="space-y-3.5">
          <div className="flex items-center gap-1.5 border-b border-amber-200 pb-2 text-sm font-bold text-[#0b1c30] uppercase">
            <ShieldCheck size={16} className="text-[#8d4b00]" />
            Dịch Vụ & Khách Hàng
          </div>
          <ul className="space-y-2">
            <li>
              <Link
                href="/chinh-sach-bao-hanh-vang"
                className="flex items-center gap-1 font-semibold text-[#8d4b00] hover:text-[#8d4b00]"
              >
                <ChevronRight size={13} className="text-[#8d4b00]" /> Chính sách Bảo Hành Vàng 12
                Tháng
              </Link>
            </li>
            <li>
              <Link href="/so-sanh" className="flex items-center gap-1 hover:text-[#8d4b00]">
                <ChevronRight size={13} className="text-gray-400" /> So sánh đối đầu điện thoại
              </Link>
            </li>
            <li>
              <Link
                href="/sua-chua/thay-man-hinh-iphone-14-pro-max"
                className="flex items-center gap-1 hover:text-[#8d4b00]"
              >
                <ChevronRight size={13} className="text-gray-400" /> Thay màn hình iPhone chính hãng
              </Link>
            </li>
            <li>
              <Link
                href="/huong-dan-tra-gop"
                className="flex items-center gap-1 hover:text-[#8d4b00]"
              >
                <ChevronRight size={13} className="text-gray-400" /> Dự toán mua trả góp 0%
              </Link>
            </li>
            <li>
              <Link href="/thu-cu-doi-moi" className="flex items-center gap-1 hover:text-[#8d4b00]">
                <ChevronRight size={13} className="text-gray-400" /> Thu cũ đổi mới trợ giá 2 triệu
              </Link>
            </li>
            <li>
              <Link
                href="/tra-cuu-bao-hanh"
                className="flex items-center gap-1 font-semibold text-[#8d4b00] hover:text-[#8d4b00]"
              >
                <ChevronRight size={13} className="text-[#8d4b00]" /> Tra cứu tiến độ & Bảo hành
                IMEI
              </Link>
            </li>
          </ul>
        </div>

        {/* Cột 4: Đăng Ký, Tuyển Dụng & Chứng Nhận */}
        <div className="space-y-4">
          <div className="flex items-center gap-1.5 border-b border-amber-200 pb-2 text-sm font-bold text-[#0b1c30] uppercase">
            <Briefcase size={16} className="text-[#8d4b00]" />
            Tuyển Dụng & Bản Tin
          </div>

          <div className="space-y-2 rounded-xl border border-amber-200/60 bg-amber-50/70 p-3">
            <div className="flex items-center gap-1 font-bold text-[#0b1c30]">
              <span className="inline-block h-2 w-2 animate-ping rounded-full bg-emerald-500" />
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
              className="flex-1 rounded-lg border border-[#cbd5e1] bg-[#f8f9ff] px-3 py-2 text-xs outline-none focus:border-[#8d4b00]"
            />
            <button
              data-testid="footer-newsletter-btn"
              className="rounded-lg bg-[#8d4b00] px-3.5 py-2 text-xs font-bold text-white shadow-sm transition-colors hover:bg-[#b15f00]"
            >
              Gửi
            </button>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <div className="flex items-center gap-1 rounded border border-red-200 bg-red-50 px-2.5 py-1 text-[11px] font-bold text-[#bb0112]">
              <Award size={14} /> Đã thông báo Bộ Công Thương
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-[#e2e8f0] bg-[#f8f9ff] py-4 text-center text-[11px] text-[#887364]">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-2 px-4">
          <span>
            © 2026 MobileCity - Hệ thống bán lẻ điện thoại di động & sửa chữa uy tín toàn quốc.
          </span>
          <div className="flex items-center gap-4">
            <Link href="/tuyen-dung" className="hover:underline">
              Tuyển dụng
            </Link>
            <span>•</span>
            <Link href="/dang-nhap" className="hover:underline">
              Tài khoản
            </Link>
            <span>•</span>
            <Link href="/he-thong-showroom" className="hover:underline">
              Showroom
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
