const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const crypto = require('crypto');

const dbPath = path.resolve(process.cwd(), 'dev.db');
const db = new Database(dbPath);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

function uuid() {
  return crypto.randomUUID();
}

function initSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      icon TEXT,
      parentId TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (parentId) REFERENCES categories(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS brands (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      logo TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS branches (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      region TEXT NOT NULL,
      address TEXT NOT NULL,
      hotline TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      thumbnail TEXT NOT NULL,
      images TEXT NOT NULL,
      description TEXT,
      specs TEXT,
      condition TEXT DEFAULT 'BRAND_NEW',
      isHot INTEGER DEFAULT 0,
      isFlashSale INTEGER DEFAULT 0,
      categoryId TEXT NOT NULL,
      brandId TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (categoryId) REFERENCES categories(id),
      FOREIGN KEY (brandId) REFERENCES brands(id)
    );

    CREATE TABLE IF NOT EXISTS product_variants (
      id TEXT PRIMARY KEY,
      productId TEXT NOT NULL,
      sku TEXT UNIQUE NOT NULL,
      color TEXT NOT NULL,
      ram TEXT,
      storage TEXT,
      originPrice REAL NOT NULL,
      salePrice REAL NOT NULL,
      goldCareFee REAL DEFAULT 300000,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS inventories (
      id TEXT PRIMARY KEY,
      branchId TEXT NOT NULL,
      variantId TEXT NOT NULL,
      quantity INTEGER DEFAULT 0,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(branchId, variantId),
      FOREIGN KEY (branchId) REFERENCES branches(id) ON DELETE CASCADE,
      FOREIGN KEY (variantId) REFERENCES product_variants(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS repair_services (
      id TEXT PRIMARY KEY,
      deviceModel TEXT NOT NULL,
      serviceName TEXT NOT NULL,
      price REAL NOT NULL,
      warranty TEXT NOT NULL,
      duration TEXT NOT NULL,
      notes TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

const DATA_FILE = path.join(__dirname, 'fixtures', 'mobilecity-data.json');

function main() {
  if (!fs.existsSync(DATA_FILE)) {
    console.error(`Không tìm thấy file ${DATA_FILE}`);
    process.exit(1);
  }

  initSchema();

  const { products = [], repairs = [] } = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  console.log(`[3/3] Bắt đầu Seeding: ${products.length} sản phẩm, ${repairs.length} dịch vụ sửa chữa...`);

  // 1. Tạo Branches chuẩn nếu chưa có
  const branches = [
    { name: 'MobileCity Hà Nội', region: 'HN', address: '120 Thái Hà, Q. Đống Đa, Hà Nội', hotline: '0969.120.120' },
    { name: 'MobileCity TP.HCM', region: 'HCM', address: '123 Trần Quang Khải, Q.1, TP.HCM', hotline: '0965.123.123' },
    { name: 'MobileCity Đà Nẵng', region: 'DN', address: '97 Hàm Nghi, Q. Thanh Khê, Đà Nẵng', hotline: '096.123.9797' }
  ];

  const branchRecords = [];
  const findBranch = db.prepare(`SELECT * FROM branches WHERE name = ?`);
  const insertBranch = db.prepare(`INSERT INTO branches (id, name, region, address, hotline) VALUES (@id, @name, @region, @address, @hotline)`);

  for (const b of branches) {
    let rec = findBranch.get(b.name);
    if (!rec) {
      const id = uuid();
      insertBranch.run({ id, ...b });
      rec = { id, ...b };
    }
    branchRecords.push(rec);
  }

  // Statements
  const findCat = db.prepare(`SELECT id FROM categories WHERE slug = ?`);
  const insertCat = db.prepare(`INSERT INTO categories (id, name, slug) VALUES (?, ?, ?)`);

  const findBrand = db.prepare(`SELECT id FROM brands WHERE slug = ?`);
  const insertBrand = db.prepare(`INSERT INTO brands (id, name, slug) VALUES (?, ?, ?)`);

  const findProd = db.prepare(`SELECT id FROM products WHERE slug = ?`);
  const insertProd = db.prepare(`
    INSERT INTO products (
      id, name, slug, thumbnail, images, description, specs,
      condition, isHot, isFlashSale, categoryId, brandId
    ) VALUES (
      @id, @name, @slug, @thumbnail, @images, @description, @specs,
      @condition, @isHot, @isFlashSale, @categoryId, @brandId
    )
  `);
  const updateProd = db.prepare(`
    UPDATE products SET
      name = @name, thumbnail = @thumbnail, images = @images,
      description = @description, specs = @specs, condition = @condition,
      isHot = @isHot, categoryId = @categoryId, brandId = @brandId, updatedAt = CURRENT_TIMESTAMP
    WHERE slug = @slug
  `);

  const findVariant = db.prepare(`SELECT id FROM product_variants WHERE sku = ?`);
  const insertVariant = db.prepare(`
    INSERT INTO product_variants (
      id, productId, sku, color, ram, storage, originPrice, salePrice, goldCareFee
    ) VALUES (
      @id, @productId, @sku, @color, @ram, @storage, @originPrice, @salePrice, @goldCareFee
    )
  `);
  const updateVariant = db.prepare(`
    UPDATE product_variants SET
      originPrice = @originPrice, salePrice = @salePrice, goldCareFee = @goldCareFee,
      color = @color, ram = @ram, storage = @storage, updatedAt = CURRENT_TIMESTAMP
    WHERE sku = @sku
  `);

  const insertInventory = db.prepare(`
    INSERT OR IGNORE INTO inventories (id, branchId, variantId, quantity)
    VALUES (?, ?, ?, ?)
  `);

  const findRepair = db.prepare(`SELECT id FROM repair_services WHERE deviceModel = ? AND serviceName = ?`);
  const insertRepair = db.prepare(`
    INSERT INTO repair_services (id, deviceModel, serviceName, price, warranty, duration, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  // Transaction nạp data
  const seedTransaction = db.transaction(() => {
    let pCount = 0;
    for (const p of products) {
      // Category
      let cat = findCat.get(p.categorySlug);
      let categoryId = cat ? cat.id : null;
      if (!categoryId) {
        categoryId = uuid();
        insertCat.run(categoryId, p.categoryName, p.categorySlug);
      }

      // Brand
      let br = findBrand.get(p.brandSlug);
      let brandId = br ? br.id : null;
      if (!brandId) {
        brandId = uuid();
        insertBrand.run(brandId, p.brandName, p.brandSlug);
      }

      // Product
      let existingProd = findProd.get(p.slug);
      let productId = existingProd ? existingProd.id : uuid();

      const prodData = {
        id: productId,
        name: p.name,
        slug: p.slug,
        thumbnail: p.thumbnail,
        images: p.images,
        description: p.description,
        specs: p.specs,
        condition: p.condition,
        isHot: p.isHot ? 1 : 0,
        isFlashSale: 0,
        categoryId,
        brandId
      };

      if (existingProd) {
        updateProd.run(prodData);
      } else {
        insertProd.run(prodData);
      }

      // Variants
      for (const v of p.variants) {
        let existingVar = findVariant.get(v.sku);
        let variantId = existingVar ? existingVar.id : uuid();

        const varData = {
          id: variantId,
          productId,
          sku: v.sku,
          color: v.color || 'Tiêu chuẩn',
          ram: v.ram || null,
          storage: v.storage || null,
          originPrice: v.originPrice,
          salePrice: v.salePrice,
          goldCareFee: v.goldCareFee || 300000
        };

        if (existingVar) {
          updateVariant.run(varData);
        } else {
          insertVariant.run(varData);
        }

        // Inventories
        for (const branch of branchRecords) {
          insertInventory.run(uuid(), branch.id, variantId, Math.floor(Math.random() * 8) + 2);
        }
      }

      pCount++;
    }

    // Repairs
    for (const r of repairs) {
      const existing = findRepair.get(r.deviceModel, r.serviceName);
      if (!existing) {
        insertRepair.run(uuid(), r.deviceModel, r.serviceName, r.price, r.warranty, r.duration, null);
      }
    }
  });

  seedTransaction();
  console.log(`[Hoàn thành] Database seeding hoàn tất thành công!`);
}

main();
