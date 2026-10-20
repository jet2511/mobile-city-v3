import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { RegionProvider } from "@/context/RegionContext";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { FloatingContactWidget } from "@/components/layout/FloatingContactWidget";

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
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
      className={`${beVietnamPro.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f8f9ff] text-[#0b1c30] font-sans">
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
