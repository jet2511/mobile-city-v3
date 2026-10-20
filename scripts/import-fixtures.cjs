const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const dbPath = path.resolve(process.cwd(), "dev.db");
const db = new Database(dbPath);

function uuid() {
  return crypto.randomUUID();
}

console.log("📦 Bắt đầu nạp thêm fixture dữ liệu MobileCity...");

const fixturesPath = path.resolve(__dirname, "fixtures/catalog.json");
const rawData = fs.readFileSync(fixturesPath, "utf-8");
const products = JSON.parse(rawData);

const branches = db.prepare(`SELECT id FROM branches`).all();

const insertProduct = db.prepare(`
  INSERT OR REPLACE INTO products (
    id, name, slug, thumbnail, images, description, specs,
    condition, isHot, isFlashSale, categoryId, brandId
  ) VALUES (
    @id, @name, @slug, @thumbnail, @images, @description, @specs,
    @condition, @isHot, @isFlashSale, @categoryId, @brandId
  )
`);

const insertVariant = db.prepare(`
  INSERT OR REPLACE INTO product_variants (
    id, productId, sku, color, ram, storage, originPrice, salePrice, goldCareFee
  ) VALUES (
    @id, @productId, @sku, @color, @ram, @storage, @originPrice, @salePrice, @goldCareFee
  )
`);

const insertInventory = db.prepare(`
  INSERT OR REPLACE INTO inventories (id, branchId, variantId, quantity)
  VALUES (@id, @branchId, @variantId, @quantity)
`);

products.forEach((prod) => {
  const brand = db.prepare(`SELECT id FROM brands WHERE slug = ?`).get(prod.brand);
  const category = db.prepare(`SELECT id FROM categories WHERE slug = ?`).get(prod.category);

  if (!brand || !category) {
    console.warn(`Bỏ qua ${prod.name} do không tìm thấy brand/category`);
    return;
  }

  const prodId = uuid();
  insertProduct.run({
    id: prodId,
    name: prod.name,
    slug: prod.slug,
    thumbnail: prod.thumbnail,
    images: JSON.stringify(prod.images),
    description: prod.description,
    specs: JSON.stringify(prod.specs),
    condition: prod.condition,
    isHot: prod.isHot,
    isFlashSale: prod.isFlashSale,
    categoryId: category.id,
    brandId: brand.id,
  });

  prod.variants.forEach((v) => {
    const variantId = uuid();
    const sku = `${prod.slug}-${v.ram}-${v.storage}-${v.color}`.toLowerCase().replace(/[\s%]+/g, "-");

    insertVariant.run({
      id: variantId,
      productId: prodId,
      sku,
      color: v.color,
      ram: v.ram,
      storage: v.storage,
      originPrice: v.originPrice,
      salePrice: v.salePrice,
      goldCareFee: v.goldCareFee,
    });

    branches.forEach((b) => {
      insertInventory.run({
        id: uuid(),
        branchId: b.id,
        variantId,
        quantity: Math.floor(Math.random() * 5) + 3,
      });
    });
  });

  console.log(`✓ Đã nạp sản phẩm: ${prod.name}`);
});

console.log("🎉 Hoàn tất nạp dữ liệu fixture!");
