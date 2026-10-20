import { db, initDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  initDatabase();
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category");
  const branchId = searchParams.get("branchId");

  let query = `
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
  `;

  const conditions: string[] = [];
  const params: unknown[] = [];

  if (q) {
    conditions.push(`p.name LIKE ?`);
    params.push(`%${q}%`);
  }

  if (category) {
    conditions.push(`c.slug = ?`);
    params.push(category);
  }

  if (conditions.length > 0) {
    query += ` WHERE ` + conditions.join(" AND ");
  }

  query += ` GROUP BY p.id ORDER BY p.isHot DESC, p.createdAt DESC`;

  const products = db.prepare(query).all(...params);

  return NextResponse.json({
    success: true,
    data: products
  });
}
