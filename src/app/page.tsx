import { db, initDatabase } from "@/lib/db";
import { Product } from "@/types";
import { HeroSlider } from "@/components/home/HeroSlider";
import { FlashSaleSection } from "@/components/home/FlashSaleSection";
import { CategorySection } from "@/components/home/CategorySection";

export default async function Home() {
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

  const xiaomiProducts = products.filter((p) => p.brandSlug === "xiaomi");
  const appleProducts = products.filter((p) => p.brandSlug === "apple");

  return (
    <main className="max-w-7xl mx-auto px-4 pb-12">
      {/* 1. Hero Banner Slider & Features */}
      <HeroSlider />

      {/* 2. Flash Sale Section */}
      <FlashSaleSection products={products} />

      {/* 3. Xiaomi Section */}
      <CategorySection
        title="ĐIỆN THOẠI XIAOMI GIÁ RẺ NHẤT"
        subtitle="Hàng xách tay nguyên seal, ROM Tiếng Việt ổn định, Tặng BH Vàng"
        products={xiaomiProducts}
        filterTags={[
          { name: "Redmi Note 13 Series", href: "/dien-thoai?tag=redmi-note-13" },
          { name: "Redmi K70 Series", href: "/dien-thoai?tag=redmi-k70" },
          { name: "Xiaomi 14 Series", href: "/dien-thoai?tag=xiaomi-14" },
        ]}
      />

      {/* 4. iPhone Section */}
      <CategorySection
        title="IPHONE CŨ ZIN 99% - CHÍNH HÃNG"
        subtitle="Máy đẹp như mới, pin trâu, bảo hành toàn diện 12 tháng"
        products={appleProducts}
        filterTags={[
          { name: "iPhone 15 Series", href: "/dien-thoai?tag=iphone-15" },
          { name: "iPhone 14 Series", href: "/dien-thoai?tag=iphone-14" },
          { name: "iPhone 13 Series", href: "/dien-thoai?tag=iphone-13" },
        ]}
      />
    </main>
  );
}
