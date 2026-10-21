"use client";

import React from "react";
import { useToast } from "@/context/ToastContext";
import { CheckCircle2, X, ShoppingBag } from "lucide-react";
import Link from "next/link";

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      data-testid="toast-container"
      className="fixed top-20 right-4 md:right-8 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className="bg-white border border-[#e2e8f0] shadow-[0_10px_25px_-5px_rgba(15,23,42,0.15)] rounded-2xl p-3.5 flex items-center gap-3 pointer-events-auto animate-in slide-in-from-top-2 fade-in duration-200"
        >
          {t.thumbnail ? (
            <img
              src={t.thumbnail}
              alt=""
              className="w-12 h-12 object-contain rounded-lg border border-gray-100 bg-[#f8f9ff] p-1 flex-shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 size={20} />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-[#0b1c30] truncate">{t.title}</h4>
            {t.message && <p className="text-[11px] text-gray-500 mt-0.5 truncate">{t.message}</p>}
            <Link
              href="/gio-hang"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8d4b00] hover:underline mt-1"
            >
              <ShoppingBag size={12} /> Xem giỏ hàng & thanh toán
            </Link>
          </div>

          <button
            onClick={() => removeToast(t.id)}
            className="text-gray-400 hover:text-gray-600 p-1 flex-shrink-0 cursor-pointer"
            aria-label="Đóng thông báo"
          >
            <X size={15} />
          </button>
        </div>
      ))}
    </div>
  );
}
