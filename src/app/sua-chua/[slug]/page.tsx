"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Wrench, ShieldCheck, Clock, CheckCircle2, ChevronRight, PhoneCall, Sparkles, AlertCircle } from "lucide-react";

// Danh mục các dịch vụ phổ biến đã được chuẩn hóa nội dung
const KNOWN_SERVICES: Record<
  string,
  {
    title: string;
    badge: string;
    desc: string;
    price: string;
    originalPrice: string;
    duration: string;
    warranty: string;
    image: string;
    options: { name: string; note: string; quality: string; warranty: string; price: string }[];
  }
> = {
  "thay-man-hinh-iphone-14-pro-max": {
    title: "Thay Màn Hình iPhone 14 Pro Max Chính Hãng",
    badge: "Dịch vụ chuẩn Apple Care",
    desc: "Lấy ngay sau 45 - 60 phút. Màn hình Super Retina XDR 120Hz ProMotion sắc nét, giữ nguyên chức năng Dynamic Island, TrueTone và Face ID.",
    price: "5.800.000₫",
    originalPrice: "7.200.000₫",
    duration: "45 phút",
    warranty: "12 tháng",
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&auto=format&fit=crop&q=80",
    options: [
      { name: "Màn hình Bóc Máy Chính Hãng", note: "Màn zin tháo máy, nguyên TrueTone", quality: "100% chuẩn Apple", warranty: "12 Tháng", price: "5.800.000₫" },
      { name: "Màn hình GX / OLED Cao Cấp", note: "Tương thích 120Hz mượt mà", quality: "95% chuẩn Apple", warranty: "06 Tháng", price: "3.950.000₫" },
      { name: "Ép Kính / Thay Kính Cảm Ứng", note: "Áp dụng khi màn hiển thị vẫn bình thường", quality: "Giữ màn zin gốc", warranty: "12 Tháng", price: "1.250.000₫" },
    ],
  },
  "thay-pin-iphone-14-pro-max": {
    title: "Thay Pin iPhone 14 Pro Max Dung Lượng Chuẩn & Siêu Cao",
    badge: "Chuẩn EU / Deji Certified",
    desc: "Khôi phục 100% dung lượng pin đỉnh, hiển thị tình trạng pin, không báo pin lạ. Đảm bảo an toàn chống cháy nổ.",
    price: "850.000₫",
    originalPrice: "1.100.000₫",
    duration: "30 phút",
    warranty: "12 tháng",
    image: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=600&auto=format&fit=crop&q=80",
    options: [
      { name: "Pin Zin Chuẩn Apple", note: "Hiển thị 100% pin trong cài đặt", quality: "Chuẩn Zin 100%", warranty: "12 Tháng", price: "850.000₫" },
      { name: "Pin Deji Siêu Cao +15%", note: "Tăng thêm 2-3 tiếng onscreen", quality: "Dung lượng cao", warranty: "12 Tháng", price: "950.000₫" },
    ],
  },
};

function getServiceData(slug: string) {
  if (KNOWN_SERVICES[slug]) return KNOWN_SERVICES[slug];

  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: title,
    badge: "MobileCity Care Uy Tín",
    desc: `Dịch vụ ${title} chuyên nghiệp tại MobileCity Care. Linh kiện chính hãng chất lượng cao, quy trình thay thế minh bạch lấy ngay sau 30 - 60 phút.`,
    price: "1.250.000₫",
    originalPrice: "1.600.000₫",
    duration: "45 phút",
    warranty: "12 tháng",
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&auto=format&fit=crop&q=80",
    options: [
      { name: "Linh Kiện Chính Hãng Loại 1", note: "Độ bền & độ tương thích cao nhất", quality: "Loại 1 Chuẩn Zin", warranty: "12 Tháng", price: "1.250.000₫" },
      { name: "Linh Kiện Tiêu Chuẩn OEM", note: "Tiết kiệm chi phí, độ tương thích 98%", quality: "Chuẩn OEM", warranty: "06 Tháng", price: "850.000₫" },
    ],
  };
}

export default function RepairDetailPage({ params }: { params?: Promise<{ slug: string }> }) {
  const unwrappedParams = params ? use(params) : null;
  const pathParams = useParams();
  const slug = unwrappedParams?.slug || (typeof pathParams?.slug === "string" ? pathParams.slug : "thay-man-hinh-iphone-14-pro-max");
  const service = getServiceData(slug);

  const [selectedBranch, setSelectedBranch] = useState("120-thai-ha");
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!bookingPhone || !bookingName) {
      setErrorMsg("Vui lòng điền đầy đủ họ tên và số điện thoại liên hệ!");
      return;
    }
    setIsBooked(true);
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-[#994700]">Trang chủ</Link>
        <ChevronRight size={14} />
        <Link href="/sua-chua" className="hover:text-[#994700]">MobileCity Care</Link>
        <ChevronRight size={14} />
        <span className="text-gray-800 font-bold truncate max-w-[280px] sm:max-w-none">{service.title}</span>
      </div>

      {/* Main Intro Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Media & Service info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-[#e2e8f0] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="w-full sm:w-64 h-64 rounded-2xl bg-gray-50 border border-gray-100 overflow-hidden flex items-center justify-center shrink-0 relative">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="256px"
                  unoptimized
                />
              </div>

              <div className="space-y-3 flex-1">
                <div className="inline-flex items-center gap-1.5 bg-orange-100 text-[#994700] text-xs font-bold px-3 py-1 rounded-full uppercase">
                  <Wrench size={13} />
                  {service.badge}
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-[#0b1c30] leading-snug">
                  {service.title}
                </h1>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {service.desc}
                </p>

                <div className="pt-2">
                  <div className="text-xs text-gray-400">Giá trọn gói linh kiện & công thay thế:</div>
                  <div className="text-3xl font-black text-[#994700]">
                    {service.price}{" "}
                    <span className="text-xs line-through text-gray-400 font-normal">{service.originalPrice}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                  <div className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    <Clock size={16} className="text-[#994700]" />
                    <span>Thời gian: <strong>{service.duration}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    <ShieldCheck size={16} className="text-emerald-600" />
                    <span>Bảo hành: <strong>{service.warranty}</strong></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Commitment badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-gray-100 pt-6">
              <div className="flex items-center gap-2 text-xs text-gray-700">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                <span>Xem trực tiếp quá trình thay thế</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-700">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                <span>Ký tên lên linh kiện gốc của máy</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-700">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                <span>Hoàn tiền 100% nếu không hài lòng</span>
              </div>
            </div>
          </div>

          {/* Quy Trình & So Sánh Bảng Giá Các Loại Linh Kiện */}
          <div className="bg-white border border-[#e2e8f0] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="text-lg font-black text-[#0b1c30] uppercase">
              Bảng Giá Các Lựa Chọn Linh Kiện
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="py-3 px-4 font-bold text-gray-600">Loại Linh Kiện</th>
                    <th className="py-3 px-4 font-bold text-gray-600">Chất lượng hiển thị/hoạt động</th>
                    <th className="py-3 px-4 font-bold text-gray-600">Bảo Hành</th>
                    <th className="py-3 px-4 font-bold text-gray-600 text-right">Chi phí trọn gói</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {service.options.map((opt, idx) => (
                    <tr key={idx} className={idx === 0 ? "bg-amber-50/50" : ""}>
                      <td className="py-3.5 px-4 font-bold text-[#0b1c30]">
                        {opt.name}
                        <span className="block text-[10px] text-gray-500 font-normal">{opt.note}</span>
                      </td>
                      <td className="py-3.5 px-4 text-emerald-700 font-semibold">{opt.quality}</td>
                      <td className="py-3.5 px-4 font-bold">{opt.warranty}</td>
                      <td className="py-3.5 px-4 text-right font-black text-[#994700]">{opt.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Đặt Lịch Hẹn Ngay */}
        <div className="space-y-6">
          <div className="bg-[#0b1c30] text-white rounded-3xl p-6 sm:p-8 border border-[#213145] shadow-lg sticky top-20">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={18} className="text-yellow-400" />
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Đặt Lịch Giữ Chỗ & Giảm 50K</span>
            </div>
            <h3 className="text-xl font-black">Đặt Lịch Sửa Chữa</h3>
            <p className="text-xs text-gray-300 mt-1 mb-6">
              Đến là làm ngay, không phải chờ đợi tại cửa hàng.
            </p>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 text-red-200 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle size={15} className="shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {isBooked ? (
              <div className="bg-emerald-500/20 border border-emerald-500/30 p-5 rounded-2xl text-center space-y-3">
                <CheckCircle2 size={36} className="text-emerald-400 mx-auto" />
                <h4 className="font-bold text-emerald-200">Đặt Lịch Thành Công!</h4>
                <p className="text-xs text-gray-300">
                  Cửa hàng MobileCity Care đã lưu thông tin lịch hẹn của quý khách ({bookingName} - {bookingPhone}).
                </p>
                <button
                  type="button"
                  onClick={() => setIsBooked(false)}
                  className="text-xs text-amber-300 underline font-semibold mt-2 block mx-auto cursor-pointer"
                >
                  Đặt lịch máy khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">Họ tên của bạn</label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-xl text-xs text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">Số điện thoại liên hệ</label>
                  <input
                    type="tel"
                    required
                    placeholder="0988 xxx xxx"
                    value={bookingPhone}
                    onChange={(e) => setBookingPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-xl text-xs text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">Chọn chi nhánh gần bạn</label>
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0b1c30] border border-white/20 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="120-thai-ha">120 Thái Hà, Q. Đống Đa, Hà Nội</option>
                    <option value="398-cau-giay">398 Cầu Giấy, Q. Cầu Giấy, Hà Nội</option>
                    <option value="123-tran-quang-khai">123 Trần Quang Khải, Q.1, TP.HCM</option>
                    <option value="602-le-hong-phong">602 Lê Hồng Phong, Q.10, TP.HCM</option>
                    <option value="97-ham-nghi">97 Hàm Nghi, Thanh Khê, Đà Nẵng</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">Thời gian dự kiến đến</label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-[#994700] hover:opacity-95 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer mt-2"
                >
                  Xác Nhận Đặt Lịch Giữ Linh Kiện
                </button>

                <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400 pt-1">
                  <PhoneCall size={14} className="text-amber-400" />
                  <span>Tổng đài kỹ thuật: <strong>037.437.9999</strong></span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
