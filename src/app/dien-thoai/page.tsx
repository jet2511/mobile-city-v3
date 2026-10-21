import { db, initDatabase } from "@/lib/db";
import { Product } from "@/types";
import { CategoryListingClient } from "@/components/catalog/CategoryListingClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Điện Thoại Di Động Chính Hãng & Xách Tay Giá Rẻ Nhất | MobileCity",
  description:
    "Danh mục điện thoại Xiaomi, iPhone, Samsung, Realme, Asus ROG chính hãng & xách tay mới 100%, cũ 99% giá rẻ nhất thị trường, tặng kèm Bảo Hành Vàng 12T.",
};

export default async function CategoryPage() {
  initDatabase();

  const products = db.prepare(`
    SELECT 
      p.id, p.name, p.slug, p.thumbnail, p.condition, p.isHot, p.isFlashSale,
      b.name as brandName, b.slug as brandSlug,
      c.name as categoryName, c.slug as categorySlug,
      MIN(pv.salePrice) as minPrice,
      MAX(pv.originPrice) as maxOriginPrice
    FROM products p
    JOIN brands b ON p.brandId = b.id
    JOIN categories c ON p.categoryId = c.id
    JOIN product_variants pv ON p.id = pv.productId
    GROUP BY p.id
    ORDER BY p.isHot DESC, p.createdAt DESC
  `).all() as Product[];

  const brands = db.prepare(`SELECT name, slug FROM brands ORDER BY name ASC`).all() as {
    name: string;
    slug: string;
  }[];

  return (
    <main className="max-w-7xl mx-auto px-4 pb-12">
      <div className="text-xs text-gray-500 py-3 flex items-center gap-1.5 border-b border-gray-200 mb-2">
        <a href="/" className="hover:text-[#8d4b00]">Trang chủ</a>
        <span>/</span>
        <span className="text-gray-800 font-semibold">Điện thoại</span>
      </div>

      <CategoryListingClient initialProducts={products} brands={brands} />
    </main>
  );
}
