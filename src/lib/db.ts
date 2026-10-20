import Database from "better-sqlite3";
import path from "path";

const dbPath = path.resolve(process.cwd(), "dev.db");

const globalForDb = global as unknown as { db: Database.Database };

export const db =
  globalForDb.db ||
  new Database(dbPath, {
    // verbose: console.log,
  });

if (process.env.NODE_ENV !== "production") globalForDb.db = db;

// Enable foreign keys and WAL mode for high performance
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

export function initDatabase() {
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
      region TEXT NOT NULL, -- 'HN', 'HCM', 'DN'
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
      images TEXT NOT NULL, -- JSON array
      description TEXT,
      specs TEXT,          -- JSON object specs
      condition TEXT DEFAULT 'BRAND_NEW', -- 'BRAND_NEW', 'LIKE_NEW_99', 'REFURBISHED'
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

    CREATE TABLE IF NOT EXISTS warranty_records (
      id TEXT PRIMARY KEY,
      imei TEXT UNIQUE NOT NULL,
      phone TEXT NOT NULL,
      customerName TEXT NOT NULL,
      productName TEXT NOT NULL,
      variantInfo TEXT NOT NULL,
      branchName TEXT NOT NULL,
      purchaseDate DATETIME NOT NULL,
      expiryDate DATETIME NOT NULL,
      isGoldCare INTEGER DEFAULT 1,
      status TEXT DEFAULT 'ACTIVE' -- 'ACTIVE', 'EXPIRED'
    );

    CREATE TABLE IF NOT EXISTS product_comments (
      id TEXT PRIMARY KEY,
      productId TEXT NOT NULL,
      author TEXT NOT NULL,
      phone TEXT,
      content TEXT NOT NULL,
      rating INTEGER DEFAULT 5,
      reply TEXT,
      isStaffReply INTEGER DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS news_articles (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      thumbnail TEXT NOT NULL,
      summary TEXT NOT NULL,
      content TEXT NOT NULL,
      author TEXT DEFAULT 'Kỹ thuật viên MobileCity',
      views INTEGER DEFAULT 1250,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
}
