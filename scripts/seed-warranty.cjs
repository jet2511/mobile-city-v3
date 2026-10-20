const Database = require("better-sqlite3");
const path = require("path");
const crypto = require("crypto");

const dbPath = path.resolve(process.cwd(), "dev.db");
const db = new Database(dbPath);

console.log("🛠️ Tạo bảng warranty_records và seed dữ liệu...");

db.exec(`
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
    status TEXT DEFAULT 'ACTIVE'
  );
`);

const insertWarranty = db.prepare(`
  INSERT OR REPLACE INTO warranty_records (
    id, imei, phone, customerName, productName, variantInfo, branchName,
    purchaseDate, expiryDate, isGoldCare, status
  ) VALUES (
    @id, @imei, @phone, @customerName, @productName, @variantInfo, @branchName,
    @purchaseDate, @expiryDate, @isGoldCare, @status
  )
`);

const sampleWarranties = [
  {
    id: crypto.randomUUID(),
    imei: "860123456789012",
    phone: "0912345678",
    customerName: "Nguyễn Hoàng Nam",
    productName: "Xiaomi Redmi Note 13 Pro 5G",
    variantInfo: "8GB/128GB - Màu Đen",
    branchName: "120 Thái Hà, Q. Đống Đa, Hà Nội",
    purchaseDate: "2026-01-15",
    expiryDate: "2027-01-15",
    isGoldCare: 1,
    status: "ACTIVE"
  },
  {
    id: crypto.randomUUID(),
    imei: "359876543210987",
    phone: "0987654321",
    customerName: "Lê Thu Trang",
    productName: "iPhone 15 Pro Max Cũ 99%",
    variantInfo: "256GB - Titan Tự Nhiên",
    branchName: "123 Trần Quang Khải, Q.1, TP.HCM",
    purchaseDate: "2026-03-10",
    expiryDate: "2027-03-10",
    isGoldCare: 1,
    status: "ACTIVE"
  }
];

sampleWarranties.forEach((w) => insertWarranty.run(w));
console.log("✓ Đã nạp thành công 2 bản ghi bảo hành mẫu!");
