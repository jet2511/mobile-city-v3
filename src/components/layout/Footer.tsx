import React from "react";
import Link from "next/link";
import { MapPin, Phone, ShieldCheck, Mail, CreditCard, Award, Share2, Video } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12 text-xs text-gray-600">
      {/* Top Footer: Hệ thống showroom & Chính sách */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Cột 1: Showroom Hà Nội */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 font-bold text-sm text-gray-900 uppercase border-b pb-2 border-yellow-200">
            <MapPin size={16} className="text-[#c69a39]" />
            Hệ Thống Showroom Hà Nội
          </div>
          <ul className="space-y-2.5">
            <li>
              <strong className="block text-gray-800">120 Thái Hà, Q. Đống Đa</strong>
              <span className="text-gray-500">Điện thoại: </span>
              <a href="tel:0969120120" className="text-[#c69a39] font-bold">0969.120.120</a>
            </li>
            <li>
              <strong className="block text-gray-800">398 Cầu Giấy, Q. Cầu Giấy</strong>
              <span className="text-gray-500">Điện thoại: </span>
              <a href="tel:0961111398" className="text-[#c69a39] font-bold">096.1111.398</a>
            </li>
            <li>
              <strong className="block text-gray-800">42 Phố Vọng, Hai Bà Trưng</strong>
              <span className="text-gray-500">Điện thoại: </span>
              <a href="tel:0979884242" className="text-[#c69a39] font-bold">0979.88.4242</a>
            </li>
          </ul>
        </div>

        {/* Cột 2: Showroom TP.HCM & Đà Nẵng */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 font-bold text-sm text-gray-900 uppercase border-b pb-2 border-yellow-200">
            <MapPin size={16} className="text-[#c69a39]" />
            Showroom TP.HCM & Đà Nẵng
          </div>
          <ul className="space-y-2.5">
            <li>
              <strong className="block text-gray-800">123 Trần Quang Khải, Q.1, TP.HCM</strong>
              <span className="text-gray-500">Điện thoại: </span>
              <a href="tel:0965123123" className="text-[#c69a39] font-bold">0965.123.123</a>
            </li>
            <li>
              <strong className="block text-gray-800">602 Lê Hồng Phong, P.10, Q.10, TP.HCM</strong>
              <span className="text-gray-500">Điện thoại: </span>
              <a href="tel:0971111602" className="text-[#c69a39] font-bold">097.1111.602</a>
            </li>
            <li>
              <strong className="block text-gray-800">97 Hàm Nghi, Q. Thanh Khê, Đà Nẵng</strong>
              <span className="text-gray-500">Điện thoại: </span>
              <a href="tel:0961239797" className="text-[#c69a39] font-bold">096.123.9797</a>
            </li>
          </ul>
        </div>

        {/* Cột 3: Quy định & Chính sách */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 font-bold text-sm text-gray-900 uppercase border-b pb-2 border-yellow-200">
            <ShieldCheck size={16} className="text-[#c69a39]" />
            Quy Định & Chính Sách
          </div>
          <ul className="space-y-2">
            <li>
              <Link href="/chinh-sach-bao-hanh-vang" className="hover:text-[#c69a39] flex items-center gap-1">
                <span className="text-[#c69a39]">»</span> Chính sách Bảo Hành Vàng 12 Tháng
              </Link>
            </li>
            <li>
              <Link href="/chinh-sach-doi-tra" className="hover:text-[#c69a39] flex items-center gap-1">
                <span className="text-[#c69a39]">»</span> Chính sách đổi trả 15 ngày 1 đổi 1
              </Link>
            </li>
            <li>
              <Link href="/huong-dan-tra-gop" className="hover:text-[#c69a39] flex items-center gap-1">
                <span className="text-[#c69a39]">»</span> Hướng dẫn mua trả góp 0%
              </Link>
            </li>
            <li>
              <Link href="/chinh-sach-giao-hang" className="hover:text-[#c69a39] flex items-center gap-1">
                <span className="text-[#c69a39]">»</span> Chính sách vận chuyển toàn quốc
              </Link>
            </li>
            <li>
              <Link href="/tra-cuu-bao-hanh" className="hover:text-[#c69a39] flex items-center gap-1 font-semibold text-[#c69a39]">
                <span className="text-[#c69a39]">»</span> Tra cứu tiến độ & Bảo hành IMEI
              </Link>
            </li>
          </ul>
        </div>

        {/* Cột 4: Đăng ký nhận tin & Chứng nhận */}
        <div className="space-y-4">
          <div className="flex items-center gap-1.5 font-bold text-sm text-gray-900 uppercase border-b pb-2 border-yellow-200">
            <Mail size={16} className="text-[#c69a39]" />
            Đăng Ký Nhận Bảng Tin
          </div>
          <p className="text-[11px] text-gray-500">
            Nhận mã giảm giá 100.000đ và thông tin xả kho sớm nhất mỗi tuần.
          </p>
          <div className="flex items-center">
            <input
              type="email"
              data-testid="footer-newsletter-input"
              placeholder="Nhập email của bạn..."
              className="w-full bg-gray-50 border border-gray-300 rounded-l px-3 py-2 text-xs outline-none focus:border-[#c69a39]"
            />
            <button
              data-testid="footer-newsletter-btn"
              className="bg-[#c69a39] hover:bg-[#b0872e] text-white font-bold px-3 py-2 rounded-r transition-colors"
            >
              Gửi
            </button>
          </div>

          <div className="pt-2">
            <span className="block font-bold text-gray-700 mb-2">Kết nối với MobileCity:</span>
            <div className="flex items-center gap-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:opacity-90">
                <Share2 size={16} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center hover:opacity-90">
                <Video size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer: Copyright & Thanh toán */}
      <div className="bg-gray-100 border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4 text-[11px] text-gray-500">
          <div>
            © 2026 MobileCity - Hệ thống bán lẻ điện thoại di động chính hãng & xách tay giá RẺ nhất.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 font-medium">
              <CreditCard size={14} className="text-[#c69a39]" /> Hỗ trợ thanh toán: Visa, Master, ATM, Trả góp 0%
            </span>
            <span className="flex items-center gap-1 text-green-700 font-bold bg-green-50 px-2 py-0.5 rounded border border-green-200">
              <Award size={13} /> Đã thông báo Bộ Công Thương
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
