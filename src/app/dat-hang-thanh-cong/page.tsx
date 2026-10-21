import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, PackageCheck, Truck, ShieldCheck, MapPin, Phone, Home, FileText } from "lucide-react";

export const metadata = {
  title: "Đặt Hàng Thành Công - MobileCity",
  description: "Cảm ơn quý khách đã tin tưởng mua sắm tại MobileCity.",
};

export default function OrderSuccessPage() {
  const orderId = "MC-" + Math.floor(100000 + Math.random() * 900000);
  const now = new Date();
  const dateStr = `${now.getHours()}:${now.getMinutes()} ngày ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;

  return (
    <div className="max-w-[800px] mx-auto px-4 py-10 space-y-8">
      {/* Hero Success Badge */}
      <div className="bg-white border border-[#e2e8f0] rounded-3xl p-6 sm:p-10 shadow-sm text-center relative overflow-hidden">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200 shadow-sm">
          <CheckCircle2 size={44} className="stroke-[2.5]" />
        </div>

        <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-2">
          ĐƠN HÀNG ĐÃ ĐƯỢC XÁC NHẬN
        </span>

        <h1 className="text-2xl sm:text-3xl font-black text-[#0b1c30]">
          Cảm Ơn Quý Khách Đã Mua Hàng!
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-lg mx-auto leading-relaxed">
          Đơn hàng của bạn đã được tiếp nhận. Đội ngũ tư vấn viên MobileCity sẽ liên hệ trong vòng <strong>15 - 30 phút</strong> để xác nhận thời gian giao hàng.
        </p>

        {/* Order Meta Box */}
        <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 bg-gray-50 border border-gray-200 px-6 py-3.5 rounded-2xl text-xs sm:text-sm">
          <div>
            <span className="text-gray-400">Mã đơn hàng: </span>
            <strong className="text-[#994700] font-mono text-base">{orderId}</strong>
          </div>
          <div className="hidden sm:block text-gray-300">|</div>
          <div>
            <span className="text-gray-400">Thời gian: </span>
            <strong className="text-[#0b1c30]">{dateStr}</strong>
          </div>
        </div>
      </div>

      {/* Details Card */}
      <div className="bg-white border border-[#e2e8f0] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <h2 className="text-lg font-black text-[#0b1c30] flex items-center gap-2">
          <PackageCheck size={20} className="text-[#994700]" />
          Chi Tiết Đơn Hàng Mua Sắm
        </h2>

        {/* Items List */}
        <div className="divide-y divide-gray-100">
          <div className="py-4 flex gap-4 items-center">
            <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
              <img
                src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=160&auto=format&fit=crop&q=80"
                alt="Xiaomi Redmi K70"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-[#0b1c30] truncate">
                Xiaomi Redmi K70 5G (12GB - 256GB)
              </h4>
              <p className="text-xs text-gray-500">Màu sắc: Đen Nhám • Bản Quốc Tế</p>
              <div className="mt-1 flex items-center gap-1.5 text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded w-fit">
                <ShieldCheck size={13} />
                Kèm Bảo Hành Vàng 12 Tháng
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-black text-[#994700]">7.890.000₫</div>
              <div className="text-xs text-gray-400">Số lượng: 1</div>
            </div>
          </div>
        </div>

        {/* Delivery & Payment Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100 text-xs">
          <div className="bg-gray-50 p-4 rounded-2xl space-y-2">
            <div className="font-bold text-gray-700 flex items-center gap-1.5">
              <MapPin size={15} className="text-[#994700]" />
              Địa chỉ nhận hàng
            </div>
            <p className="text-gray-600 font-medium leading-relaxed">
              Nguyễn Văn An - 0988.xxx.888<br />
              120 Thái Hà, Phường Trung Liệt, Quận Đống Đa, Hà Nội
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-2xl space-y-2">
            <div className="font-bold text-gray-700 flex items-center gap-1.5">
              <Truck size={15} className="text-[#994700]" />
              Hình thức giao hàng & Thanh toán
            </div>
            <p className="text-gray-600 font-medium leading-relaxed">
              Giao hỏa tốc nội thành Hà Nội (1-2 giờ)<br />
              Thanh toán khi nhận hàng (COD) • Miễn phí vận chuyển
            </p>
          </div>
        </div>

        {/* Total Price Summary */}
        <div className="bg-[#0b1c30] text-white p-5 rounded-2xl flex flex-wrap justify-between items-center gap-4">
          <div>
            <div className="text-xs text-gray-400">Tổng thanh toán dự kiến</div>
            <div className="text-2xl font-black text-amber-400">7.890.000₫</div>
          </div>
          <div className="text-xs text-gray-300 text-right">
            <span>(Đã bao gồm VAT & Voucher giảm 100k)</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <Link
          href="/"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs sm:text-sm transition"
        >
          <Home size={16} />
          Tiếp tục mua hàng
        </Link>
        <Link
          href="/tai-khoan"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-[#994700] hover:bg-[#803b00] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition"
        >
          <FileText size={16} />
          Xem tình trạng đơn hàng
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
