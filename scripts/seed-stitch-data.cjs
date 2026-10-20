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

console.log("⚡ Bắt đầu cập nhật dữ liệu fake khớp chuẩn giao diện Stitch Desktop...");

// 1. Kiểm tra / lấy danh mục và nhãn hàng
let catPhone = db.prepare("SELECT id FROM categories WHERE slug = 'dien-thoai'").get();
if (!catPhone) {
  const id = uuid();
  db.prepare("INSERT INTO categories (id, name, slug, icon) VALUES (?, 'Điện thoại', 'dien-thoai', 'Smartphone')").run(id);
  catPhone = { id };
}

function getBrandId(slug, name) {
  let b = db.prepare("SELECT id FROM brands WHERE slug = ?").get(slug);
  if (!b) {
    const id = uuid();
    db.prepare("INSERT INTO brands (id, name, slug) VALUES (?, ?, ?)").run(id, name, slug);
    return id;
  }
  return b.id;
}

const brandXiaomi = getBrandId("xiaomi", "Xiaomi");
const brandApple = getBrandId("apple", "Apple");
const brandSamsung = getBrandId("samsung", "Samsung");
const brandRealme = getBrandId("realme", "Realme");
const brandAsus = getBrandId("asus-rog", "Asus ROG");

// 2. Danh sách sản phẩm mô phỏng chuẩn Stitch Desktop
const stitchProducts = [
  {
    name: "Xiaomi Redmi K70 (Snapdragon 8 Gen 2 - Màn 2K)",
    slug: "xiaomi-redmi-k70",
    thumbnail: "https://cdn.mobilecity.vn/mobilecity-vn/images/2023/11/w300/redmi-k70-den.png.webp",
    images: JSON.stringify([
      "https://cdn.mobilecity.vn/mobilecity-vn/images/2023/11/w300/redmi-k70-den.png.webp",
      "https://cdn.mobilecity.vn/mobilecity-vn/images/2023/11/w300/redmi-k70-trang.png.webp",
      "https://cdn.mobilecity.vn/mobilecity-vn/images/2023/11/w300/redmi-k70-xanh.png.webp"
    ]),
    description: "Xiaomi Redmi K70 sở hữu chip Snapdragon 8 Gen 2 siêu mạnh mẽ, màn hình OLED 2K 120Hz độ sáng 4000 nits đỉnh cao, pin 5000mAh sạc siêu nhanh 120W, camera 50MP OIS bắt nét vượt trội.",
    specs: JSON.stringify({
      screen: "6.67 inch, OLED, 2K (1440 x 3200 pixels), 120Hz, 4000 nits",
      cpu: "Snapdragon 8 Gen 2 (4 nm)",
      ram: "12GB - 16GB LPDDR5X",
      storage: "256GB - 512GB - 1TB UFS 4.0",
      camera: "50 MP (OIS, Light Hunter 800) + 8 MP + 2 MP, Selfie 16 MP",
      battery: "5000 mAh, Sạc siêu nhanh 120W HyperCharge"
    }),
    condition: "BRAND_NEW",
    isHot: 1,
    isFlashSale: 1,
    categoryId: catPhone.id,
    brandId: brandXiaomi,
    variants: [
      { color: "Đen", ram: "12GB", storage: "256GB", originPrice: 7990000, salePrice: 6850000, goldCareFee: 450000 },
      { color: "Trắng Băng", ram: "12GB", storage: "256GB", originPrice: 7990000, salePrice: 6890000, goldCareFee: 450000 },
      { color: "Xanh Mint", ram: "16GB", storage: "256GB", originPrice: 8490000, salePrice: 7350000, goldCareFee: 450000 },
      { color: "Đen", ram: "16GB", storage: "512GB", originPrice: 9190000, salePrice: 7990000, goldCareFee: 500000 }
    ]
  },
  {
    name: "Xiaomi Redmi K70 Pro 5G (Snapdragon 8 Gen 3)",
    slug: "xiaomi-redmi-k70-pro-5g",
    thumbnail: "https://cdn.mobilecity.vn/mobilecity-vn/images/2023/11/w300/redmi-k70-pro-den.png.webp",
    images: JSON.stringify([
      "https://cdn.mobilecity.vn/mobilecity-vn/images/2023/11/w300/redmi-k70-pro-den.png.webp"
    ]),
    description: "Redmi K70 Pro trang bị chip Snapdragon 8 Gen 3 mạnh nhất, camera telephoto 2x chân dung chuyên nghiệp, màn hình 2K viền siêu mỏng.",
    specs: JSON.stringify({
      screen: "6.67 inch, OLED 2K 120Hz",
      cpu: "Snapdragon 8 Gen 3 (4 nm)",
      ram: "12GB - 16GB - 24GB",
      storage: "256GB - 512GB - 1TB",
      camera: "50 MP + 50 MP (Tele 2x) + 12 MP",
      battery: "5000 mAh, Sạc nhanh 120W"
    }),
    condition: "BRAND_NEW",
    isHot: 1,
    isFlashSale: 1,
    categoryId: catPhone.id,
    brandId: brandXiaomi,
    variants: [
      { color: "Đen", ram: "12GB", storage: "256GB", originPrice: 10490000, salePrice: 8950000, goldCareFee: 500000 },
      { color: "Trắng", ram: "16GB", storage: "256GB", originPrice: 11290000, salePrice: 9650000, goldCareFee: 500000 }
    ]
  },
  {
    name: "Xiaomi 14 5G Chính Hãng / Xách Tay (Leica Summilux)",
    slug: "xiaomi-14-5g",
    thumbnail: "https://cdn.mobilecity.vn/mobilecity-vn/images/2023/10/w300/xiaomi-14-xanh.png.webp",
    images: JSON.stringify([
      "https://cdn.mobilecity.vn/mobilecity-vn/images/2023/10/w300/xiaomi-14-xanh.png.webp"
    ]),
    description: "Flagship nhỏ gọn đỉnh cao với camera Leica Summilux, chip Snapdragon 8 Gen 3 và màn hình LTPO OLED 1.5K 3000 nits rực rỡ.",
    specs: JSON.stringify({
      screen: "6.36 inch, LTPO OLED 1.5K, 120Hz",
      cpu: "Snapdragon 8 Gen 3 (4 nm)",
      ram: "12GB",
      storage: "256GB",
      camera: "3x 50 MP Leica Summilux",
      battery: "4610 mAh, Sạc dây 90W, Không dây 50W"
    }),
    condition: "BRAND_NEW",
    isHot: 1,
    isFlashSale: 1,
    categoryId: catPhone.id,
    brandId: brandXiaomi,
    variants: [
      { color: "Xanh Ngọc", ram: "12GB", storage: "256GB", originPrice: 14990000, salePrice: 12850000, goldCareFee: 550000 },
      { color: "Đen", ram: "12GB", storage: "256GB", originPrice: 14990000, salePrice: 12850000, goldCareFee: 550000 }
    ]
  },
  {
    name: "iPhone 14 Pro Max Cũ 99% Nguyên Bản",
    slug: "iphone-14-pro-max-cu-99",
    thumbnail: "https://cdn.mobilecity.vn/mobilecity-vn/images/2022/09/w300/iphone-14-pro-max-tim.png.webp",
    images: JSON.stringify([
      "https://cdn.mobilecity.vn/mobilecity-vn/images/2022/09/w300/iphone-14-pro-max-tim.png.webp"
    ]),
    description: "iPhone 14 Pro Max cũ 99% zin nguyên bản, pin 9x-100%, màn hình Dynamic Island 120Hz mượt mà, chip Apple A16 Bionic cực mạnh.",
    specs: JSON.stringify({
      screen: "6.7 inch, Super Retina XDR OLED 120Hz ProMotion",
      cpu: "Apple A16 Bionic (4 nm)",
      ram: "6GB",
      storage: "128GB - 256GB - 512GB",
      camera: "48 MP + 12 MP + 12 MP (Tele 3x)",
      battery: "4323 mAh, Sạc nhanh 20W"
    }),
    condition: "LIKE_NEW_99",
    isHot: 1,
    isFlashSale: 1,
    categoryId: catPhone.id,
    brandId: brandApple,
    variants: [
      { color: "Tím Deep Purple", ram: "6GB", storage: "128GB", originPrice: 20990000, salePrice: 18450000, goldCareFee: 550000 },
      { color: "Vàng Gold", ram: "6GB", storage: "256GB", originPrice: 22490000, salePrice: 19850000, goldCareFee: 600000 },
      { color: "Đen Space Black", ram: "6GB", storage: "128GB", originPrice: 20500000, salePrice: 18150000, goldCareFee: 550000 }
    ]
  },
  {
    name: "Samsung Galaxy S24 Ultra 5G (Snapdragon 8 Gen 3 for Galaxy)",
    slug: "samsung-galaxy-s24-ultra-5g",
    thumbnail: "https://cdn.mobilecity.vn/mobilecity-vn/images/2024/01/w300/galaxy-s24-ultra-xam.png.webp",
    images: JSON.stringify([
      "https://cdn.mobilecity.vn/mobilecity-vn/images/2024/01/w300/galaxy-s24-ultra-xam.png.webp"
    ]),
    description: "Galaxy S24 Ultra trang bị khung viền Titan cao cấp, màn hình phẳng chống phản chói vượt trội, bút S-Pen tích hợp và quyền năng Galaxy AI.",
    specs: JSON.stringify({
      screen: "6.8 inch, Dynamic AMOLED 2X, 120Hz, 2600 nits, Corning Gorilla Armor",
      cpu: "Snapdragon 8 Gen 3 for Galaxy",
      ram: "12GB",
      storage: "256GB - 512GB - 1TB",
      camera: "200 MP + 50 MP (5x) + 10 MP (3x) + 12 MP",
      battery: "5000 mAh, Sạc nhanh 45W"
    }),
    condition: "BRAND_NEW",
    isHot: 1,
    isFlashSale: 1,
    categoryId: catPhone.id,
    brandId: brandSamsung,
    variants: [
      { color: "Xám Titan", ram: "12GB", storage: "256GB", originPrice: 25990000, salePrice: 21950000, goldCareFee: 650000 },
      { color: "Đen Titan", ram: "12GB", storage: "512GB", originPrice: 28990000, salePrice: 24650000, goldCareFee: 700000 }
    ]
  },
  {
    name: "Realme GT Neo 5 (Sạc Nhanh 150W - Snap 8+ Gen 1)",
    slug: "realme-gt-neo-5",
    thumbnail: "https://cdn.mobilecity.vn/mobilecity-vn/images/2023/02/w300/realme-gt-neo-5-trang.png.webp",
    images: JSON.stringify([
      "https://cdn.mobilecity.vn/mobilecity-vn/images/2023/02/w300/realme-gt-neo-5-trang.png.webp"
    ]),
    description: "Quái thú gaming tầm trung với dải LED RGB Halo độc đáo, sạc nhanh 150W nạp đầy pin chỉ trong 16 phút, màn hình 144Hz siêu mượt.",
    specs: JSON.stringify({
      screen: "6.74 inch, AMOLED 1.5K 144Hz",
      cpu: "Snapdragon 8+ Gen 1",
      ram: "12GB - 16GB",
      storage: "256GB",
      camera: "50 MP Sony IMX890 OIS",
      battery: "5000 mAh, Sạc siêu tốc 150W"
    }),
    condition: "BRAND_NEW",
    isHot: 1,
    isFlashSale: 1,
    categoryId: catPhone.id,
    brandId: brandRealme,
    variants: [
      { color: "Trắng Thánh Khiết", ram: "12GB", storage: "256GB", originPrice: 6890000, salePrice: 5650000, goldCareFee: 350000 },
      { color: "Tím Cyberpunk", ram: "16GB", storage: "256GB", originPrice: 7490000, salePrice: 6150000, goldCareFee: 350000 }
    ]
  },
  {
    name: "Asus ROG Phone 8 Pro (Snapdragon 8 Gen 3 - 165Hz)",
    slug: "asus-rog-phone-8-pro",
    thumbnail: "https://cdn.mobilecity.vn/mobilecity-vn/images/2024/01/w300/rog-phone-8-pro.png.webp",
    images: JSON.stringify([
      "https://cdn.mobilecity.vn/mobilecity-vn/images/2024/01/w300/rog-phone-8-pro.png.webp"
    ]),
    description: "Điện thoại gaming chuyên nghiệp đỉnh cao với màn hình phụ AniMe Vision Mini-LED mặt lưng, phím bấm AirTrigger siêu nhạy, kháng nước IP68.",
    specs: JSON.stringify({
      screen: "6.78 inch, Samsung E6 AMOLED 165Hz, LTPO",
      cpu: "Snapdragon 8 Gen 3 (4 nm)",
      ram: "16GB - 24GB",
      storage: "512GB - 1TB",
      camera: "50 MP Gimbal OIS + 32 MP Tele 3x + 13 MP",
      battery: "5500 mAh, Sạc nhanh 65W HyperCharge"
    }),
    condition: "BRAND_NEW",
    isHot: 1,
    isFlashSale: 0,
    categoryId: catPhone.id,
    brandId: brandAsus,
    variants: [
      { color: "Đen Phantom", ram: "16GB", storage: "512GB", originPrice: 21990000, salePrice: 18450000, goldCareFee: 650000 }
    ]
  }
];

const branches = db.prepare("SELECT id FROM branches").all();

const insertProduct = db.prepare(`
  INSERT INTO products (id, name, slug, thumbnail, images, description, specs, condition, isHot, isFlashSale, categoryId, brandId)
  VALUES (@id, @name, @slug, @thumbnail, @images, @description, @specs, @condition, @isHot, @isFlashSale, @categoryId, @brandId)
  ON CONFLICT(slug) DO UPDATE SET
    name = excluded.name,
    thumbnail = excluded.thumbnail,
    images = excluded.images,
    description = excluded.description,
    specs = excluded.specs,
    condition = excluded.condition,
    isHot = excluded.isHot,
    isFlashSale = excluded.isFlashSale,
    brandId = excluded.brandId
`);

const insertVariant = db.prepare(`
  INSERT INTO product_variants (id, productId, sku, color, ram, storage, originPrice, salePrice, goldCareFee)
  VALUES (@id, @productId, @sku, @color, @ram, @storage, @originPrice, @salePrice, @goldCareFee)
  ON CONFLICT(sku) DO UPDATE SET
    originPrice = excluded.originPrice,
    salePrice = excluded.salePrice,
    goldCareFee = excluded.goldCareFee
`);

const insertInventory = db.prepare(`
  INSERT INTO inventories (id, branchId, variantId, quantity)
  VALUES (@id, @branchId, @variantId, @quantity)
  ON CONFLICT(branchId, variantId) DO UPDATE SET
    quantity = excluded.quantity
`);

stitchProducts.forEach(prod => {
  const { variants, ...prodData } = prod;
  let p = db.prepare("SELECT id FROM products WHERE slug = ?").get(prod.slug);
  const prodId = p ? p.id : uuid();
  insertProduct.run({ ...prodData, id: prodId });

  variants.forEach(v => {
    const sku = `${prod.slug}-${v.ram}-${v.storage}-${v.color}`.toLowerCase().replace(/[\s%]+/g, "-");
    let existingVar = db.prepare("SELECT id FROM product_variants WHERE sku = ?").get(sku);
    const varId = existingVar ? existingVar.id : uuid();

    insertVariant.run({
      id: varId,
      productId: prodId,
      sku,
      color: v.color,
      ram: v.ram,
      storage: v.storage,
      originPrice: v.originPrice,
      salePrice: v.salePrice,
      goldCareFee: v.goldCareFee
    });

    branches.forEach(b => {
      insertInventory.run({
        id: uuid(),
        branchId: b.id,
        variantId: varId,
        quantity: Math.floor(Math.random() * 6) + 4
      });
    });
  });
});

console.log("✓ Đã nạp thành công các sản phẩm trọng tâm (Redmi K70, K70 Pro, Xiaomi 14, iPhone 14 Pro Max...)");

// 3. Dịch vụ sửa chữa khớp chuẩn Stitch Screen 8 (Thay Màn Hình iPhone 14 Pro Max)
const stitchRepairs = [
  { deviceModel: "iPhone 14 Pro Max", serviceName: "Thay Màn Hình Chính Hãng", price: 6950000, warranty: "6 Tháng", duration: "45 - 60 phút", notes: "Màn hình Super Retina XDR Zin bóc máy / Zin new 100%, hỗ trợ TrueTone & 120Hz" },
  { deviceModel: "iPhone 14 Pro Max", serviceName: "Ép Kính Màn Hình", price: 1250000, warranty: "12 Tháng", duration: "60 - 90 phút", notes: "Kính cường lực Ceramic Shield chuẩn zin, bảo hành bọt keo trọn đời" },
  { deviceModel: "iPhone 14 Pro Max", serviceName: "Thay Pin Dung Lượng Chuẩn", price: 950000, warranty: "12 Tháng", duration: "30 Phút", notes: "Pin dung lượng chuẩn 4323mAh, hỗ trợ sàng cổ cáp hiển thị 100% pin" },
  { deviceModel: "iPhone 14 Pro Max", serviceName: "Thay Kính Lưng Sau", price: 750000, warranty: "12 Tháng", duration: "45 Phút", notes: "Kính lưng chuẩn màu Deep Purple, Gold, Space Black bằng laser không tháo máy" },
  { deviceModel: "Xiaomi Redmi K70", serviceName: "Thay Màn Hình 2K OLED 120Hz", price: 2250000, warranty: "6 Tháng", duration: "60 Phút", notes: "Màn hình zin hiển thị chuẩn 4000 nits, cảm ứng siêu nhạy" },
  { deviceModel: "Xiaomi Redmi K70", serviceName: "Ép Kính Cường Lực", price: 450000, warranty: "12 Tháng", duration: "45 Phút", notes: "Lấy ngay sau 45 phút, bảo hành bụi bọt vĩnh viễn" },
  { deviceModel: "Xiaomi Redmi K70", serviceName: "Thay Pin Chuẩn 5000mAh", price: 420000, warranty: "12 Tháng", duration: "30 Phút", notes: "Tương thích sạc nhanh 120W HyperCharge" },
  { deviceModel: "Samsung Galaxy S24 Ultra", serviceName: "Thay Màn Hình Dynamic AMOLED 2X", price: 5450000, warranty: "6 Tháng", duration: "60 Phút", notes: "Màn hình chính hãng chuẩn Corning Armor chống chói" },
  { deviceModel: "Samsung Galaxy S24 Ultra", serviceName: "Ép Mặt Kính Màn Hình", price: 1450000, warranty: "12 Tháng", duration: "60 Phút", notes: "Kính cường lực zin cong phẳng hoàn hảo" }
];

const insertRepair = db.prepare(`
  INSERT INTO repair_services (id, deviceModel, serviceName, price, warranty, duration, notes)
  VALUES (@id, @deviceModel, @serviceName, @price, @warranty, @duration, @notes)
`);

stitchRepairs.forEach(r => {
  const existing = db.prepare("SELECT id FROM repair_services WHERE deviceModel = ? AND serviceName = ?").get(r.deviceModel, r.serviceName);
  if (!existing) {
    insertRepair.run({ ...r, id: uuid() });
  }
});

console.log("✓ Đã nạp bảng giá dịch vụ sửa chữa iPhone 14 Pro Max, Redmi K70, S24 Ultra...");

// 4. Bài viết tin tức & Cẩm nang ROM chuẩn Stitch Screen 10 & 11
const stitchArticles = [
  {
    title: "Hướng Dẫn Unlock Bootloader & Cài ROM Vietsub Xiaomi Mới Nhất",
    slug: "huong-dan-unlock-bootloader-cai-rom-vietsub-xiaomi",
    thumbnail: "https://cdn.mobilecity.vn/mobilecity-vn/images/2023/11/w300/redmi-k70-den.png.webp",
    summary: "Hướng dẫn chi tiết toàn bộ các bước xin cấp quyền Unlock Bootloader trên HyperOS và cài đặt bản ROM Vietsub quốc tế không chậm thông báo, đầy đủ tiếng Việt và dịch vụ Google.",
    content: `
      <h2>1. Giới thiệu về HyperOS và cơ chế Unlock Bootloader mới</h2>
      <p>Kể từ phiên bản HyperOS, Xiaomi áp dụng chính sách cấp quyền mở khóa Bootloader qua ứng dụng Xiaomi Community. Đối với các dòng máy xách tay như Redmi K70, Redmi Note 13 Pro hay Xiaomi 14, việc cài đặt bản ROM Vietsub ổn định giúp máy nhận trọn vẹn thông báo Zalo, Facebook Messenger và hoạt động các ứng dụng ngân hàng mượt mà.</p>
      <h2>2. Quy trình chuẩn bị</h2>
      <ul>
        <li>Tài khoản Mi có thâm niên hoạt động trên 30 ngày.</li>
        <li>Cáp kết nối Type-C zin truyền dữ liệu ổn định và máy tính Windows đã cài Mi Flash Tool.</li>
        <li>Bản ROM Vietsub hoặc ROM Global chính thức từ cộng đồng MobileCity Dev.</li>
      </ul>
      <h2>3. Dịch vụ hỗ trợ miễn phí trọn đời tại MobileCity</h2>
      <p>Khi quý khách mua điện thoại Xiaomi tại bất kỳ showroom MobileCity nào trên toàn quốc và kích hoạt gói Bảo Hành Vàng, quý khách sẽ được đội ngũ kỹ thuật viên hỗ trợ Unlock Bootloader, cài đặt ROM Tiếng Việt, fix trễ thông báo hoàn toàn miễn phí trọn đời sản phẩm.</p>
    `,
    author: "KTV Phần Mềm MobileCity",
    views: 12450
  },
  {
    title: "Đánh Giá Chi Tiết Xiaomi Redmi K70: Ông Vua Hiệu Năng Phân Khúc 7 Triệu",
    slug: "danh-gia-chi-tiet-xiaomi-redmi-k70",
    thumbnail: "https://cdn.mobilecity.vn/mobilecity-vn/images/2023/11/w300/redmi-k70-trang.png.webp",
    summary: "Với chip Snapdragon 8 Gen 2, màn hình 2K OLED 120Hz và sạc siêu tốc 120W, Redmi K70 thực sự là chiếc máy không có đối thủ trong tầm giá cận trung cấp.",
    content: `
      <h2>1. Thiết kế đột phá với khung viền nhôm vuông vức</h2>
      <p>Khác biệt hoàn toàn so với thế hệ K60 tiền nhiệm, Redmi K70 sở hữu khung viền kim loại sáng bóng, cụm camera Deco kính cực kỳ sang trọng và cảm giác cầm nắm đầm tay, chắc chắn.</p>
      <h2>2. Hiệu năng đỉnh cao với Snapdragon 8 Gen 2</h2>
      <p>Điểm số AnTuTu Benchmark dễ dàng vượt mốc 1.6 triệu điểm. Thử nghiệm thực tế với tựa game Genshin Impact hay Liên Quân Mobile max setting đều duy trì tốc độ khung hình 60fps - 120fps ổn định.</p>
      <h2>3. Màn hình 2K đỉnh nóc kịch trần 4000 nits</h2>
      <p>Độ phân giải 1440 x 3200 pixels cho chi tiết sắc nét đến từng điểm ảnh. Tần số PWM dimming 3840Hz giúp bảo vệ mắt tuyệt đối khi sử dụng trong bóng tối.</p>
    `,
    author: "Ban Biên Tập MobileCity",
    views: 8930
  },
  {
    title: "Bảng Giá Thay Màn Hình iPhone 14 Pro Max Chính Hãng 2026 tại MobileCity Care",
    slug: "bang-gia-thay-man-hinh-iphone-14-pro-max-chinh-hang",
    thumbnail: "https://cdn.mobilecity.vn/mobilecity-vn/images/2022/09/w300/iphone-14-pro-max-tim.png.webp",
    summary: "Cập nhật bảng giá thay màn hình, ép kính màn hình iPhone 14 Pro Max zin chính hãng lấy ngay sau 45 phút, bảo hành 6 - 12 tháng tại hệ thống MobileCity Care.",
    content: `
      <h2>1. Khi nào cần thay màn hình iPhone 14 Pro Max?</h2>
      <p>Màn hình bị sọc xanh, sọc trắng, chớp nháy hoặc chảy mực loang màu do va đập. Trường hợp kính ngoài nứt vỡ nhưng hiển thị và cảm ứng vẫn bình thường thì chỉ cần ép lại mặt kính với chi phí tiết kiệm đến 80%.</p>
      <h2>2. Cam kết chất lượng tại MobileCity Care</h2>
      <p>Linh kiện màn hình Zin 100%, giữ nguyên tính năng TrueTone và độ mượt 120Hz ProMotion. Khách hàng trực tiếp quan sát toàn bộ quá trình thay thế từ camera phòng kỹ thuật.</p>
    `,
    author: "KTV Trưởng MobileCity Care",
    views: 6510
  }
];

const insertNews = db.prepare(`
  INSERT INTO news_articles (id, title, slug, thumbnail, summary, content, author, views)
  VALUES (@id, @title, @slug, @thumbnail, @summary, @content, @author, @views)
  ON CONFLICT(slug) DO UPDATE SET
    title = excluded.title,
    thumbnail = excluded.thumbnail,
    summary = excluded.summary,
    content = excluded.content,
    views = excluded.views
`);

stitchArticles.forEach(a => {
  let existing = db.prepare("SELECT id FROM news_articles WHERE slug = ?").get(a.slug);
  insertNews.run({ ...a, id: existing ? existing.id : uuid() });
});

console.log("✓ Đã nạp các bài viết cẩm nang ROM & đánh giá công nghệ...");

// 5. Bản ghi bảo hành điện tử chuẩn Stitch Screen 12
const stitchWarranties = [
  {
    imei: "867891234567890",
    phone: "0988776655",
    customerName: "Nguyễn Văn Tuấn",
    productName: "Xiaomi Redmi K70",
    variantInfo: "12GB/256GB - Màu Đen",
    branchName: "120 Thái Hà, Q. Đống Đa, Hà Nội",
    purchaseDate: "2026-02-10",
    expiryDate: "2027-02-10",
    isGoldCare: 1,
    status: "ACTIVE"
  },
  {
    imei: "359876543210987",
    phone: "0909123456",
    customerName: "Trần Thị Mai",
    productName: "iPhone 14 Pro Max Cũ 99%",
    variantInfo: "256GB - Màu Tím Deep Purple",
    branchName: "123 Trần Quang Khải, Q.1, TP.HCM",
    purchaseDate: "2026-01-20",
    expiryDate: "2027-01-20",
    isGoldCare: 1,
    status: "ACTIVE"
  },
  {
    imei: "354321098765432",
    phone: "0969120120",
    customerName: "Lê Quốc Hưng",
    productName: "Samsung Galaxy S24 Ultra 5G",
    variantInfo: "12GB/256GB - Xám Titan",
    branchName: "97 Hàm Nghi, Q. Thanh Khê, Đà Nẵng",
    purchaseDate: "2026-03-01",
    expiryDate: "2027-03-01",
    isGoldCare: 1,
    status: "ACTIVE"
  }
];

const insertWarranty = db.prepare(`
  INSERT INTO warranty_records (id, imei, phone, customerName, productName, variantInfo, branchName, purchaseDate, expiryDate, isGoldCare, status)
  VALUES (@id, @imei, @phone, @customerName, @productName, @variantInfo, @branchName, @purchaseDate, @expiryDate, @isGoldCare, @status)
  ON CONFLICT(imei) DO UPDATE SET
    phone = excluded.phone,
    customerName = excluded.customerName,
    productName = excluded.productName,
    variantInfo = excluded.variantInfo,
    branchName = excluded.branchName,
    status = excluded.status
`);

stitchWarranties.forEach(w => {
  let existing = db.prepare("SELECT id FROM warranty_records WHERE imei = ?").get(w.imei);
  insertWarranty.run({ ...w, id: existing ? existing.id : uuid() });
});

console.log("✓ Đã nạp hồ sơ bảo hành điện tử cho IMEI và SĐT tra cứu...");

// 6. Bình luận & phản hồi thực tế cho sản phẩm (Redmi K70, iPhone 14 Pro Max, v.v.)
const k70Prod = db.prepare("SELECT id FROM products WHERE slug = 'xiaomi-redmi-k70'").get();
if (k70Prod) {
  const insertComment = db.prepare(`
    INSERT INTO product_comments (id, productId, author, phone, content, rating, reply, isStaffReply)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const comments = [
    {
      author: "Hoàng Minh Đức",
      phone: "0912***456",
      content: "Máy nguyên seal có sẵn tiếng Việt không shop hay phải đợi xin unlock bootloader?",
      rating: 5,
      reply: "Chào anh Đức! Máy nguyên seal bản nội địa bên em sẽ hỗ trợ đăng ký xin unlock bootloader và cài đặt ROM Quốc tế/Vietsub đầy đủ miễn phí ngay khi mua kèm gói Bảo Hành Vàng ạ!",
      isStaffReply: 1
    },
    {
      author: "Vũ Hải Đăng",
      phone: "0984***789",
      content: "Màn hình 2K nhìn cực nét và sáng ngoài trời nắng, pin 5000 sạc 120W tầm 20 phút là đầy. Rất ưng ý!",
      rating: 5,
      reply: "MobileCity cảm ơn anh Đăng đã tin tưởng lựa chọn mua sắm! Chúc anh có trải nghiệm tuyệt vời với chiếc Redmi K70 ạ.",
      isStaffReply: 1
    }
  ];

  db.prepare("DELETE FROM product_comments WHERE productId = ?").run(k70Prod.id);
  comments.forEach(c => {
    insertComment.run(uuid(), k70Prod.id, c.author, c.phone, c.content, c.rating, c.reply, c.isStaffReply);
  });
  console.log("✓ Đã nạp bình luận & tư vấn cho Redmi K70...");
}

console.log("🎉 Hoàn tất nạp dữ liệu Stitch hoàn chỉnh!");
