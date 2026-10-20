"use client";

import React, { useState } from "react";
import { Search, ShieldCheck, CheckCircle2, AlertCircle, Calendar, MapPin, Smartphone } from "lucide-react";

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
    <div className="max-w-2xl mx-auto my-8 space-y-6">
      {/* Header Form Tra Cứu */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4 text-center">
        <div className="w-12 h-12 rounded-full bg-yellow-50 text-[#c69a39] flex items-center justify-center mx-auto">
          <ShieldCheck size={28} />
        </div>
        <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 uppercase">
          TRA CỨU BẢO HÀNH ĐIỆN TỬ MOBILITY
        </h1>
        <p className="text-xs text-gray-500 max-w-md mx-auto">
          Kiểm tra thời hạn bảo hành, gói Bảo Hành Vàng và lịch sử máy qua số IMEI (15 số) hoặc Số điện thoại mua hàng.
        </p>

        <form onSubmit={handleSearch} className="flex gap-2 max-w-lg mx-auto pt-2">
          <input
            type="text"
            data-testid="input-warranty-query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nhập số IMEI (15 số) hoặc SĐT (VD: 860123456789012)"
            className="flex-1 border rounded-lg px-4 py-2.5 text-xs outline-none focus:border-[#c69a39] shadow-inner"
          />
          <button
            type="submit"
            data-testid="btn-search-warranty"
            disabled={loading}
            className="bg-[#c69a39] hover:bg-[#b0872e] text-white font-bold px-6 py-2.5 rounded-lg text-xs transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Search size={14} />
            {loading ? "Đang tra..." : "Tra Cứu"}
          </button>
        </form>

        <div className="text-[11px] text-gray-400">
          💡 <em>Mẹo: Gõ cú pháp <code>*#06#</code> trên bàn phím gọi để xem số IMEI của điện thoại.</em>
        </div>
      </div>

      {/* Thẻ Kết Quả Tra Cứu */}
      {record && (
        <div data-testid="warranty-result-card" className="bg-white rounded-xl border border-yellow-300 shadow-md p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2">
              <Smartphone size={20} className="text-[#c69a39]" />
              <h2 className="font-extrabold text-base text-gray-900">{record.productName}</h2>
            </div>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <CheckCircle2 size={13} /> {record.status === "ACTIVE" ? "Đang Còn Bảo Hành" : "Hết Hạn"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-gray-500 block">Số IMEI:</span>
              <strong className="font-mono text-gray-800 text-sm">{record.imei}</strong>
            </div>

            <div>
              <span className="text-gray-500 block">Khách hàng:</span>
              <strong className="text-gray-800">{record.customerName} ({record.phone})</strong>
            </div>

            <div>
              <span className="text-gray-500 block">Phiên bản / Màu sắc:</span>
              <strong className="text-gray-800">{record.variantInfo}</strong>
            </div>

            <div>
              <span className="text-gray-500 block">Gói bảo hành:</span>
              <strong className="text-[#c69a39] font-bold">
                {record.isGoldCare ? "★ BẢO HÀNH VÀNG 12 THÁNG (Toàn diện)" : "Bảo hành Tiêu chuẩn"}
              </strong>
            </div>

            <div>
              <span className="text-gray-500 block">Ngày kích hoạt:</span>
              <strong className="text-gray-800">{record.purchaseDate}</strong>
            </div>

            <div>
              <span className="text-gray-500 block">Ngày hết hạn bảo hành:</span>
              <strong className="text-red-600 font-bold">{record.expiryDate}</strong>
            </div>

            <div className="sm:col-span-2">
              <span className="text-gray-500 block">Cửa hàng xuất bán:</span>
              <strong className="text-gray-800 flex items-center gap-1 mt-0.5">
                <MapPin size={13} className="text-[#c69a39]" /> {record.branchName}
              </strong>
            </div>
          </div>
        </div>
      )}

      {notFound && (
        <div data-testid="warranty-not-found" className="bg-white p-8 rounded-xl border border-red-100 shadow-sm text-center space-y-2">
          <AlertCircle size={32} className="text-red-500 mx-auto" />
          <h3 className="font-bold text-sm text-gray-800">Không tìm thấy thông tin bảo hành</h3>
          <p className="text-xs text-gray-500">
            Số IMEI hoặc SĐT &quot;{query}&quot; chưa có trên hệ thống hoặc đã quá hạn lưu trữ.
            Vui lòng liên hệ hotline chi nhánh để được kiểm tra trực tiếp.
          </p>
        </div>
      )}
    </div>
  );
}
