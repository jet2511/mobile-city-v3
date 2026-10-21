import { db } from "@/shared/lib/db";
import type {
  ProductSummary,
  ProductDetail,
  ProductVariantDetail,
  ProductCommentItem,
} from "../types/product.types";

export function getProductList(params: {
  q?: string;
  category?: string;
  branchId?: string;
}): ProductSummary[] {
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
  const queryParams: unknown[] = [];

  if (params.q?.trim()) {
    conditions.push(`p.name LIKE ?`);
    queryParams.push(`%${params.q.trim()}%`);
  }

  if (params.category) {
    conditions.push(`c.slug = ?`);
    queryParams.push(params.category);
  }

  if (conditions.length > 0) {
    query += ` WHERE ` + conditions.join(" AND ");
  }

  query += ` GROUP BY p.id ORDER BY p.isHot DESC, p.createdAt DESC`;

  return db.prepare(query).all(...queryParams) as ProductSummary[];
}

export function getProductDetailBySlug(slug: string): ProductDetail | null {
  const product = db
    .prepare(
      `
    SELECT 
      p.*,
      b.name as brandName, b.slug as brandSlug,
      c.name as categoryName, c.slug as categorySlug
    FROM products p
    JOIN brands b ON p.brandId = b.id
    JOIN categories c ON p.categoryId = c.id
    WHERE p.slug = ?
  `,
    )
    .get(slug) as any;

  if (!product) return null;

  const variants = db
    .prepare(`SELECT * FROM product_variants WHERE productId = ? ORDER BY salePrice ASC`)
    .all(product.id) as any[];

  const getInventories = db.prepare(`
    SELECT i.quantity, b.id as branchId, b.name as branchName, b.region, b.address, b.hotline
    FROM inventories i
    JOIN branches b ON i.branchId = b.id
    WHERE i.variantId = ?
  `);

  const enrichedVariants: ProductVariantDetail[] = variants.map((v) => ({
    ...v,
    inventories: getInventories.all(v.id) as any[],
  }));

  return {
    ...product,
    images: JSON.parse(product.images || "[]"),
    specs: JSON.parse(product.specs || "{}"),
    variants: enrichedVariants,
  };
}

export function getProductComments(productId: string): ProductCommentItem[] {
  return db
    .prepare(
      `
    SELECT * FROM product_comments
    WHERE productId = ?
    ORDER BY createdAt DESC
  `,
    )
    .all(productId) as ProductCommentItem[];
}

export function addProductComment(payload: {
  productId: string;
  author: string;
  phone?: string;
  content: string;
  rating?: number;
}): ProductCommentItem {
  const id = `comment_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const stmt = db.prepare(`
    INSERT INTO product_comments (id, productId, author, phone, content, rating, reply, isStaffReply, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, NULL, 0, datetime('now'))
  `);

  stmt.run(
    id,
    payload.productId,
    payload.author,
    payload.phone || null,
    payload.content,
    payload.rating || 5,
  );

  return db.prepare(`SELECT * FROM product_comments WHERE id = ?`).get(id) as ProductCommentItem;
}
