"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid, Wrench, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { totalQuantity } = useCart();

  const navItems = [
    { label: "Trang chủ", href: "/", icon: Home },
    { label: "Sản phẩm", href: "/dien-thoai", icon: Grid },
    { label: "Sửa chữa", href: "/sua-chua", icon: Wrench },
    { label: "Giỏ hàng", href: "/gio-hang", icon: ShoppingCart, badge: totalQuantity },
    { label: "Tài khoản", href: "/dang-nhap", icon: User },
  ];

  return (
    <div
      data-testid="mobile-bottom-nav"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-3px_12px_rgba(0,0,0,0.06)] px-2 py-1.5 flex items-center justify-around"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          pathname === item.href ||
          (item.href !== "/" && pathname.startsWith(item.href)) ||
          (item.href === "/dang-nhap" && pathname.startsWith("/tai-khoan"));

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] relative rounded-lg px-2 transition-colors ${
              isActive ? "text-[#8d4b00] font-bold" : "text-gray-500 hover:text-gray-800"
            }`}
          >
            <div className="relative">
              <Icon size={20} className={isActive ? "stroke-[2.5]" : "stroke-2"} />
              {typeof item.badge === "number" && item.badge > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                  {item.badge > 99 ? "99+" : item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight leading-none">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
