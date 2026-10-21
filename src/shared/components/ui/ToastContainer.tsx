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
      className="pointer-events-none fixed top-20 right-4 z-50 flex w-full max-w-sm flex-col gap-2.5 md:right-8"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className="animate-in slide-in-from-top-2 fade-in pointer-events-auto flex items-center gap-3 rounded-2xl border border-[#e2e8f0] bg-white p-3.5 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.15)] duration-200"
        >
          {t.thumbnail ? (
            <img
              src={t.thumbnail}
              alt=""
              className="h-12 w-12 flex-shrink-0 rounded-lg border border-gray-100 bg-[#f8f9ff] object-contain p-1"
            />
          ) : (
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={20} />
            </div>
          )}

          <div className="min-w-0 flex-1">
            <h4 className="truncate text-xs font-bold text-[#0b1c30]">{t.title}</h4>
            {t.message && <p className="mt-0.5 truncate text-[11px] text-gray-500">{t.message}</p>}
            <Link
              href="/gio-hang"
              className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-[#8d4b00] hover:underline"
            >
              <ShoppingBag size={12} /> Xem giỏ hàng & thanh toán
            </Link>
          </div>

          <button
            onClick={() => removeToast(t.id)}
            className="flex-shrink-0 cursor-pointer p-1 text-gray-400 hover:text-gray-600"
            aria-label="Đóng thông báo"
          >
            <X size={15} />
          </button>
        </div>
      ))}
    </div>
  );
}
