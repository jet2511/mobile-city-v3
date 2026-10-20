import { db, initDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
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
    return NextResponse.json({ success: false, message: "Không tìm thấy sản phẩm" }, { status: 404 });
  }

  const variants = db.prepare(`
    SELECT * FROM product_variants WHERE productId = ? ORDER BY salePrice ASC
  `).all(product.id) as any[];

  // Lấy chi tiết tồn kho theo chi nhánh cho từng variant
  const getInventories = db.prepare(`
    SELECT i.quantity, b.id as branchId, b.name as branchName, b.region, b.address, b.hotline
    FROM inventories i
    JOIN branches b ON i.branchId = b.id
    WHERE i.variantId = ?
  `);

  const enrichedVariants = variants.map(v => ({
    ...v,
    inventories: getInventories.all(v.id)
  }));

  return NextResponse.json({
    success: true,
    data: {
      ...product,
      images: JSON.parse(product.images || "[]"),
      specs: JSON.parse(product.specs || "{}"),
      variants: enrichedVariants
    }
  });
}
