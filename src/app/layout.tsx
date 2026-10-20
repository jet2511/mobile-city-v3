import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RegionProvider } from "@/context/RegionContext";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { FloatingContactWidget } from "@/components/layout/FloatingContactWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MobileCity - Hệ thống điện thoại chính hãng & xách tay giá RẺ nhất",
  description:
    "Hệ thống bán lẻ điện thoại Xiaomi, iPhone, Realme, Rog Phone chính hãng & xách tay uy tín, bảo hành vàng 12 tháng cả nguồn màn hình, giá tốt nhất toàn quốc.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f5f5f5] text-gray-800">
        <RegionProvider>
          <CartProvider>
            <Header />
            <div className="flex-1 pb-16 md:pb-0">{children}</div>
            <Footer />
            <FloatingContactWidget />
            <MobileBottomNav />
          </CartProvider>
        </RegionProvider>
      </body>
    </html>
  );
}
