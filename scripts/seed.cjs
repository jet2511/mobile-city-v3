const Database = require("better-sqlite3");
const path = require("path");
const crypto = require("crypto");

const dbPath = path.resolve(process.cwd(), "dev.db");
const db = new Database(dbPath);

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

function uuid() {
  return crypto.randomUUID();
}

console.log("🚀 Khởi tạo Database Schema...");
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
`);

console.log("🌱 Bắt đầu nạp dữ liệu mẫu (Seed Data) chuẩn MobileCity...");

// 1. Branches (Hà Nội, TP.HCM, Đà Nẵng)
const branches = [
  { id: uuid(), name: "120 Thái Hà, Q. Đống Đa", region: "HN", address: "120 Thái Hà, Q. Đống Đa, Hà Nội", hotline: "0969.120.120" },
  { id: uuid(), name: "398 Cầu Giấy, Q. Cầu Giấy", region: "HN", address: "398 Cầu Giấy, Q. Cầu Giấy, Hà Nội", hotline: "096.1111.398" },
  { id: uuid(), name: "123 Trần Quang Khải, Q.1", region: "HCM", address: "123 Trần Quang Khải, Q.1, TP.HCM", hotline: "0965.123.123" },
  { id: uuid(), name: "602 Lê Hồng Phong, P.10, Q.10", region: "HCM", address: "602 Lê Hồng Phong, P.10, Q.10, TP.HCM", hotline: "097.1111.602" },
  { id: uuid(), name: "97 Hàm Nghi, Q. Thanh Khê", region: "DN", address: "97 Hàm Nghi, Q. Thanh Khê, Đà Nẵng", hotline: "096.123.9797" }
];

const insertBranch = db.prepare(`
  INSERT OR REPLACE INTO branches (id, name, region, address, hotline)
  VALUES (@id, @name, @region, @address, @hotline)
`);

branches.forEach(b => insertBranch.run(b));

// 2. Brands
const brands = [
  { id: uuid(), name: "Apple", slug: "apple", logo: "/brands/apple.png" },
  { id: uuid(), name: "Xiaomi", slug: "xiaomi", logo: "/brands/xiaomi.png" },
  { id: uuid(), name: "Realme", slug: "realme", logo: "/brands/realme.png" },
  { id: uuid(), name: "Samsung", slug: "samsung", logo: "/brands/samsung.png" },
  { id: uuid(), name: "Asus ROG", slug: "asus-rog", logo: "/brands/asus.png" }
];

const insertBrand = db.prepare(`
  INSERT OR REPLACE INTO brands (id, name, slug, logo)
  VALUES (@id, @name, @slug, @logo)
`);

brands.forEach(b => insertBrand.run(b));

// 3. Categories
const categories = [
  { id: uuid(), name: "Điện thoại", slug: "dien-thoai", icon: "Smartphone" },
  { id: uuid(), name: "Máy tính bảng", slug: "may-tinh-bang", icon: "Tablet" },
  { id: uuid(), name: "Phụ kiện", slug: "phu-kien", icon: "Headphones" },
  { id: uuid(), name: "Sửa chữa", slug: "sua-chua", icon: "Wrench" }
];

const insertCategory = db.prepare(`
  INSERT OR REPLACE INTO categories (id, name, slug, icon)
  VALUES (@id, @name, @slug, @icon)
`);

categories.forEach(c => insertCategory.run(c));

// 4. Products & Variants (Đặc thù MobileCity: Redmi Note, iPhone, ROG Phone)
const appleBrand = brands.find(b => b.slug === "apple");
const xiaomiBrand = brands.find(b => b.slug === "xiaomi");
const phoneCat = categories.find(c => c.slug === "dien-thoai");

const sampleProducts = [
  {
    id: uuid(),
    name: "Xiaomi Redmi Note 13 Pro 5G",
    slug: "xiaomi-redmi-note-13-pro-5g",
    thumbnail: "https://cdn.mobilecity.vn/mobilecity-vn/images/2023/09/w300/redmi-note-13-pro-den.png.webp",
    images: JSON.stringify([
      "https://cdn.mobilecity.vn/mobilecity-vn/images/2023/09/w300/redmi-note-13-pro-den.png.webp",
      "https://cdn.mobilecity.vn/mobilecity-vn/images/2023/09/w300/redmi-note-13-pro-xanh.png.webp"
    ]),
    description: "Xiaomi Redmi Note 13 Pro 5G trang bị chip Snapdragon 7s Gen 2 mạnh mẽ, màn hình OLED 1.5K 120Hz sắc nét cùng camera 200MP chống rung OIS.",
    specs: JSON.stringify({
      screen: "6.67 inch, OLED, 1.5K (1220 x 2712 pixels), 120Hz",
      cpu: "Snapdragon 7s Gen 2 (4 nm)",
      ram: "8GB - 12GB - 16GB",
      storage: "128GB - 256GB - 512GB",
      camera: "200 MP + 8 MP + 2 MP, Selfie 16 MP",
      battery: "5100 mAh, Sạc nhanh 67W"
    }),
    condition: "BRAND_NEW",
    isHot: 1,
    isFlashSale: 1,
    categoryId: phoneCat.id,
    brandId: xiaomiBrand.id,
    variants: [
      { color: "Đen", ram: "8GB", storage: "128GB", originPrice: 5150000, salePrice: 4650000, goldCareFee: 350000 },
      { color: "Xanh", ram: "8GB", storage: "256GB", originPrice: 5650000, salePrice: 5050000, goldCareFee: 350000 },
      { color: "Trắng", ram: "12GB", storage: "256GB", originPrice: 6250000, salePrice: 5650000, goldCareFee: 350000 }
    ]
  },
  {
    id: uuid(),
    name: "iPhone 15 Pro Max Cũ 99%",
    slug: "iphone-15-pro-max-cu-99",
    thumbnail: "https://cdn.mobilecity.vn/mobilecity-vn/images/2023/09/w300/iphone-15-pro-max-titan-tu-nhien.png.webp",
    images: JSON.stringify([
      "https://cdn.mobilecity.vn/mobilecity-vn/images/2023/09/w300/iphone-15-pro-max-titan-tu-nhien.png.webp"
    ]),
    description: "iPhone 15 Pro Max Cũ 99% nguyên bản đẹp như mới, pin 9x-100%, chip A17 Pro cực đỉnh, khung viền Titan sang trọng siêu nhẹ.",
    specs: JSON.stringify({
      screen: "6.7 inch, LTPO Super Retina XDR OLED, 120Hz",
      cpu: "Apple A17 Pro (3 nm)",
      ram: "8GB",
      storage: "256GB - 512GB - 1TB",
      camera: "48 MP + 12 MP + 12 MP (Periscope 5x)",
      battery: "4422 mAh, Sạc nhanh 25W"
    }),
    condition: "LIKE_NEW_99",
    isHot: 1,
    isFlashSale: 0,
    categoryId: phoneCat.id,
    brandId: appleBrand.id,
    variants: [
      { color: "Titan Tự Nhiên", ram: "8GB", storage: "256GB", originPrice: 26500000, salePrice: 24950000, goldCareFee: 650000 },
      { color: "Titan Xanh", ram: "8GB", storage: "256GB", originPrice: 25900000, salePrice: 24350000, goldCareFee: 650000 },
      { color: "Titan Trắng", ram: "8GB", storage: "512GB", originPrice: 29500000, salePrice: 27950000, goldCareFee: 750000 }
    ]
  }
];

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

sampleProducts.forEach(prod => {
  const { variants, ...prodData } = prod;
  insertProduct.run(prodData);

  variants.forEach((v) => {
    const variantId = uuid();
    const sku = `${prod.slug}-${v.ram}-${v.storage}-${v.color}`.toLowerCase().replace(/[\s%]+/g, "-");
    insertVariant.run({
      id: variantId,
      productId: prod.id,
      sku,
      color: v.color,
      ram: v.ram,
      storage: v.storage,
      originPrice: v.originPrice,
      salePrice: v.salePrice,
      goldCareFee: v.goldCareFee
    });

    // Seed inventory for all branches
    branches.forEach(branch => {
      insertInventory.run({
        id: uuid(),
        branchId: branch.id,
        variantId,
        quantity: Math.floor(Math.random() * 8) + 2
      });
    });
  });
});

// 5. Repair Services (Dịch vụ sửa chữa đặc trưng MobileCity)
const repairServices = [
  { id: uuid(), deviceModel: "iPhone 15 Pro Max", serviceName: "Thay Màn Hình Chính Hãng", price: 8500000, warranty: "6 Tháng", duration: "60 Phút", notes: "Linh kiện zin bóc máy / Zin new 100%" },
  { id: uuid(), deviceModel: "iPhone 15 Pro Max", serviceName: "Ép Kính Màn Hình", price: 1550000, warranty: "12 Tháng", duration: "90 Phút", notes: "Kính cường lực chuẩn zin, không ảnh hưởng hiển thị" },
  { id: uuid(), deviceModel: "iPhone 15 Pro Max", serviceName: "Thay Pin Dung Lượng Chuẩn", price: 1250000, warranty: "12 Tháng", duration: "30 Phút", notes: "Bảo hành chai phồng 1 đổi 1" },
  { id: uuid(), deviceModel: "Xiaomi Redmi Note 13 Pro 5G", serviceName: "Thay Màn Hình OLED 1.5K", price: 1850000, warranty: "6 Tháng", duration: "45 Phút", notes: "Màn hình 120Hz siêu mượt" },
  { id: uuid(), deviceModel: "Xiaomi Redmi Note 13 Pro 5G", serviceName: "Ép Mặt Kính", price: 450000, warranty: "12 Tháng", duration: "60 Phút", notes: "Bảo hành bọt keo, bụi bẩn vĩnh viễn" }
];

const insertRepair = db.prepare(`
  INSERT OR REPLACE INTO repair_services (id, deviceModel, serviceName, price, warranty, duration, notes)
  VALUES (@id, @deviceModel, @serviceName, @price, @warranty, @duration, @notes)
`);

repairServices.forEach(r => insertRepair.run(r));

console.log("✅ Seed database hoàn tất thành công!");
console.log(`- Chi nhánh: ${branches.length}`);
console.log(`- Thương hiệu: ${brands.length}`);
console.log(`- Danh mục: ${categories.length}`);
console.log(`- Sản phẩm & Biến thể SKU: ${sampleProducts.length}`);
console.log(`- Dịch vụ sửa chữa: ${repairServices.length}`);
