import React from "react";
import Link from "next/link";
import { ShieldCheck, Award, CheckCircle2, AlertTriangle, Clock, RefreshCw, Smartphone } from "lucide-react";

export const metadata = {
  title: "Chính Sách Bảo Hành Vàng - MobileCity",
  description: "Bảo hiểm toàn diện nguồn, màn hình, cảm ứng, rơi vỡ, vào nước lên đến 12 tháng tại MobileCity.",
};

export default function WarrantyPolicyPage() {
  return (
    <div className="max-w-[1240px] mx-auto px-4 lg:px-8 py-8 space-y-8">
      {/* Hero Header */}
      <div className="bg-[#0b1c30] text-white p-8 md:p-12 rounded-3xl relative overflow-hidden border border-[#213145]">
        <div className="max-w-2xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-[#8d4b00] text-amber-200 text-xs font-bold uppercase px-3.5 py-1 rounded-full tracking-wider">
            <Award size={14} className="text-yellow-300" />
            ĐẶC QUYỀN SỐ 1 TẠI VIỆT NAM
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            CHÍNH SÁCH BẢO HÀNH VÀNG
          </h1>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            An tâm tuyệt đối khi sử dụng điện thoại xách tay và chính hãng. Bảo hành toàn diện cả <strong>Nguồn, Màn hình, Cảm ứng, Rơi vỡ, Vào nước</strong> và hỗ trợ đổi máy mới trong 15 ngày đầu nếu có lỗi nhà sản xuất.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold">
            <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl backdrop-blur">
              <CheckCircle2 size={16} className="text-emerald-400" />
              1 Đổi 1 trong 15 ngày
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl backdrop-blur">
              <CheckCircle2 size={16} className="text-emerald-400" />
              Bao cả Màn hình & Cảm ứng
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl backdrop-blur">
              <CheckCircle2 size={16} className="text-emerald-400" />
              Hỗ trợ cài ROM trọn đời
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Matrix: Tiêu Chuẩn vs Bảo Hành Vàng */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#e2e8f0] shadow-sm space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-black text-[#0b1c30] uppercase">
            So Sánh Quyền Lợi Bảo Hành
          </h2>
          <p className="text-xs text-[#887364]">
            MobileCity khuyến nghị 100% khách hàng nâng cấp Bảo Hành Vàng để được bảo vệ trước các rủi ro đắt đỏ nhất của smartphone.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#e2e8f0]">
                <th className="py-3 px-4 font-bold text-gray-500 uppercase">Hạng mục quyền lợi</th>
                <th className="py-3 px-4 font-bold text-gray-500 uppercase bg-gray-50/60 rounded-t-lg">
                  Bảo Hành Thường (Mặc định)
                </th>
                <th className="py-3 px-4 font-extrabold text-[#8d4b00] uppercase bg-amber-50/60 rounded-t-lg">
                  Bảo Hành Vàng (Khuyên dùng)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              <tr>
                <td className="py-3.5 px-4 font-semibold text-[#0b1c30]">Thời hạn bảo hành</td>
                <td className="py-3.5 px-4 text-gray-600 bg-gray-50/30">12 Tháng</td>
                <td className="py-3.5 px-4 font-bold text-[#8d4b00] bg-amber-50/30">12 Tháng toàn diện</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-[#0b1c30]">Lỗi đổi mới 1 - 1</td>
                <td className="py-3.5 px-4 text-gray-600 bg-gray-50/30">7 ngày đầu</td>
                <td className="py-3.5 px-4 font-bold text-emerald-600 bg-amber-50/30">15 ngày đầu lấy máy ngay</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-[#0b1c30]">Bảo hành Nguồn (IC Nguồn, Cháy nổ sạc)</td>
                <td className="py-3.5 px-4 text-red-500 bg-gray-50/30">Không hỗ trợ</td>
                <td className="py-3.5 px-4 font-bold text-emerald-600 bg-amber-50/30">Bảo hành 100% miễn phí</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-[#0b1c30]">Màn hình & Cảm ứng (Sọc màn, Liệt cảm ứng)</td>
                <td className="py-3.5 px-4 text-red-500 bg-gray-50/30">Không hỗ trợ</td>
                <td className="py-3.5 px-4 font-bold text-emerald-600 bg-amber-50/30">Thay thế linh kiện chính hãng</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-[#0b1c30]">Vân tay / Face ID / Cảm biến</td>
                <td className="py-3.5 px-4 text-gray-600 bg-gray-50/30">Bảo hành có điều kiện</td>
                <td className="py-3.5 px-4 font-bold text-emerald-600 bg-amber-50/30">Bảo hành đầy đủ</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-[#0b1c30]">Hỗ trợ rơi vỡ, móp méo va đập</td>
                <td className="py-3.5 px-4 text-gray-400 bg-gray-50/30">Từ chối bảo hành</td>
                <td className="py-3.5 px-4 font-bold text-[#8d4b00] bg-amber-50/30">Trợ giá thay linh kiện đến 50%</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-[#0b1c30]">Cài đặt phần mềm & Tiếng Việt (ROM)</td>
                <td className="py-3.5 px-4 text-gray-600 bg-gray-50/30">Miễn phí</td>
                <td className="py-3.5 px-4 font-bold text-emerald-600 bg-amber-50/30">Trọn đời máy tại mọi Showroom</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA hướng dẫn tra cứu */}
      <div className="bg-[#eff4ff] p-6 rounded-2xl border border-[#dce9ff] flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-extrabold text-[#0b1c30] text-base">Bạn đang cần kiểm tra hạn bảo hành của máy?</h3>
          <p className="text-xs text-[#887364] mt-0.5">Nhập số điện thoại mua hàng hoặc mã IMEI để kiểm tra tức thì lịch sử sửa chữa.</p>
        </div>
        <Link
          href="/tra-cuu-bao-hanh"
          className="bg-[#8d4b00] hover:bg-[#b15f00] text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-colors shadow-sm"
        >
          Tra cứu IMEI ngay
        </Link>
      </div>
    </div>
  );
}
