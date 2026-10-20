import { db, initDatabase } from "@/lib/db";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/product/ProductDetailClient";
import { ProductComments } from "@/components/product/ProductComments";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  initDatabase();
  const { slug } = await params;
  const product = db.prepare(`SELECT name, description, thumbnail FROM products WHERE slug = ?`).get(slug) as any;

  if (!product) return { title: "Không tìm thấy sản phẩm" };

  return {
    title: `${product.name} - Giá Rẻ Nhất, Trả Góp 0%, Tặng BH Vàng | MobileCity`,
    description: product.description || `Mua ${product.name} giá rẻ, bảo hành 12 tháng tại MobileCity`,
    openGraph: {
      images: [product.thumbnail],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  initDatabase();
  const { slug } = await params;

  const product = db.prepare(`
    SELECT 
      p.*,
      b.name as brandName, b.slug as brandSlug,
      c.name as categoryName, c.slug as categorySlug
    FROM products p
    JOIN brands b ON p.brandId = b.id
    JOIN categories c ON p.categoryId = c.id
    WHERE p.slug = ?
  `).get(slug) as any;

  if (!product) {
    notFound();
  }

  const variants = db.prepare(`
    SELECT * FROM product_variants WHERE productId = ? ORDER BY salePrice ASC
  `).all(product.id) as any[];

  const getInventories = db.prepare(`
    SELECT i.quantity, b.id as branchId, b.name as branchName, b.region, b.address, b.hotline
    FROM inventories i
    JOIN branches b ON i.branchId = b.id
    WHERE i.variantId = ?
  `);

  const enrichedVariants = variants.map((v) => ({
    ...v,
    inventories: getInventories.all(v.id),
  }));

  const fullProduct = {
    ...product,
    images: JSON.parse(product.images || "[]"),
    specs: JSON.parse(product.specs || "{}"),
    variants: enrichedVariants,
  };

  return (
    <main className="max-w-7xl mx-auto px-4 pb-12">
      <div className="text-xs text-gray-500 py-3 flex items-center gap-1.5 border-b border-gray-200 mb-2">
        <a href="/" className="hover:text-[#c69a39]">Trang chủ</a>
        <span>/</span>
        <a href="/dien-thoai" className="hover:text-[#c69a39]">Điện thoại</a>
        <span>/</span>
        <span className="text-gray-800 font-semibold">{fullProduct.name}</span>
      </div>

      <ProductDetailClient product={fullProduct} />

      <ProductComments productId={fullProduct.id} productName={fullProduct.name} />
    </main>
  );
}
