"use client";

import React, { useState } from "react";
import {
  Search,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Calendar,
  MapPin,
  Smartphone,
} from "lucide-react";

export function WarrantyLookupClient() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [record, setRecord] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setNotFound(false);
    setRecord(null);

    try {
      const res = await fetch(`/api/warranty?q=${encodeURIComponent(query)}`);
      const json = await res.json();
      if (json.success && json.data) {
        setRecord(json.data);
      } else {
        setNotFound(true);
      }
    } catch (err) {
      console.error(err);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto my-8 max-w-2xl space-y-6">
      {/* Header Form Tra Cứu */}
      <div className="space-y-4 rounded-2xl border border-[#e2e8f0] bg-white p-6 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-amber-200 bg-amber-50 text-[#8d4b00]">
          <ShieldCheck size={28} />
        </div>
        <h1 className="text-xl font-extrabold text-[#0b1c30] uppercase md:text-2xl">
          TRA CỨU BẢO HÀNH ĐIỆN TỬ MOBILECITY
        </h1>
        <p className="mx-auto max-w-md text-xs text-[#887364]">
          Kiểm tra thời hạn bảo hành, gói Bảo Hành Vàng và lịch sử máy qua số IMEI (15 số) hoặc Số
          điện thoại mua hàng.
        </p>

        <form onSubmit={handleSearch} className="mx-auto flex max-w-lg gap-2 pt-2">
          <input
            type="text"
            data-testid="input-warranty-query"
            aria-label="Nhập số IMEI hoặc SĐT"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nhập số IMEI (15 số) hoặc SĐT (VD: 860123456789012)"
            className="flex-1 rounded-xl border border-[#cbd5e1] bg-[#f8f9ff] px-4 py-2.5 text-xs text-[#0b1c30] transition-colors outline-none focus:border-[#8d4b00] focus:bg-white focus:ring-1 focus:ring-[#8d4b00]/20"
          />
          <button
            type="submit"
            data-testid="btn-search-warranty"
            disabled={loading}
            className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-[#8d4b00] px-6 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-[#b15f00]"
          >
            <Search size={14} />
            {loading ? "Đang tra..." : "Tra Cứu"}
          </button>
        </form>

        <div className="text-[11px] text-[#887364]">
          💡{" "}
          <em>
            Mẹo: Gõ cú pháp <code>*#06#</code> trên bàn phím gọi để xem số IMEI của điện thoại.
          </em>
        </div>
      </div>

      {/* Thẻ Kết Quả Tra Cứu */}
      {record && (
        <div
          data-testid="warranty-result-card"
          className="animate-in fade-in zoom-in-95 space-y-4 rounded-2xl border border-amber-300 bg-white p-6 shadow-md duration-200"
        >
          <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-3">
            <div className="flex items-center gap-2">
              <Smartphone size={20} className="text-[#8d4b00]" />
              <h2 className="text-base font-extrabold text-[#0b1c30]">{record.productName}</h2>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
              <CheckCircle2 size={13} />{" "}
              {record.status === "ACTIVE" ? "Đang Còn Bảo Hành" : "Hết Hạn"}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 text-xs sm:grid-cols-2">
            <div>
              <span className="block text-gray-500">Số IMEI:</span>
              <strong className="font-mono text-sm text-[#0b1c30]">{record.imei}</strong>
            </div>

            <div>
              <span className="block text-gray-500">Khách hàng:</span>
              <strong className="text-[#0b1c30]">
                {record.customerName} ({record.phone})
              </strong>
            </div>

            <div>
              <span className="block text-gray-500">Phiên bản / Màu sắc:</span>
              <strong className="text-[#0b1c30]">{record.variantInfo}</strong>
            </div>

            <div>
              <span className="block text-gray-500">Gói bảo hành:</span>
              <strong className="font-bold text-[#8d4b00]">
                {record.isGoldCare ? "★ BẢO HÀNH VÀNG 12 THÁNG (Toàn diện)" : "Bảo hành Tiêu chuẩn"}
              </strong>
            </div>

            <div>
              <span className="block text-gray-500">Ngày kích hoạt:</span>
              <strong className="text-[#0b1c30]">{record.purchaseDate}</strong>
            </div>

            <div>
              <span className="block text-gray-500">Ngày hết hạn bảo hành:</span>
              <strong className="font-bold text-[#bb0112]">{record.expiryDate}</strong>
            </div>

            <div className="sm:col-span-2">
              <span className="block text-gray-500">Cửa hàng xuất bán:</span>
              <strong className="mt-0.5 flex items-center gap-1 text-[#0b1c30]">
                <MapPin size={13} className="text-[#8d4b00]" /> {record.branchName}
              </strong>
            </div>
          </div>
        </div>
      )}

      {notFound && (
        <div
          data-testid="warranty-not-found"
          className="space-y-2 rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm"
        >
          <AlertCircle size={32} className="mx-auto text-red-500" />
          <h3 className="text-sm font-bold text-[#0b1c30]">Không tìm thấy thông tin bảo hành</h3>
          <p className="text-xs text-gray-500">
            Số IMEI hoặc SĐT &quot;{query}&quot; chưa có trên hệ thống hoặc đã quá hạn lưu trữ. Vui
            lòng liên hệ hotline chi nhánh để được kiểm tra trực tiếp.
          </p>
        </div>
      )}
    </div>
  );
}
