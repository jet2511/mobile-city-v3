# Design Specification: MobileCity Data Crawler & Project Enrichment

## 1. Overview
Dự án nhằm thu thập toàn diện dữ liệu sản phẩm (Điện thoại, Máy tính bảng, Phụ kiện) và dịch vụ sửa chữa từ website chính thức [https://mobilecity.vn/](https://mobilecity.vn/) để làm giàu database cho hệ thống eCommerce MobileCity v3.

## 2. Architecture & Data Flow
Quy trình được tổ chức thành Pipeline 2 giai đoạn tách bạch:
```
[MobileCity Sitemaps]
   │
   ├─► sitemap-danhmucdienthoai.xml ──┐
   ├─► sitemap-danhmuctablet.xml    ──┼─► [Stage 1: Link Collector & Filter]
   ├─► sitemap-danhmucphukien.xml   ──┤          │
   └─► sitemap-danhmucsuachua.xml   ──┘          ▼
                                          Queue URLs (Deduped)
                                                 │
                                                 ▼
                                        [Stage 2: Cheerio Scraper Worker Pool]
                                                 │ (Parse HTML & Normalize)
                                                 ▼
                                        [scripts/fixtures/mobilecity-data.json]
                                                 │
                                                 ▼
                                        [Stage 3: Prisma Upsert Seeder]
                                                 │
                                                 ▼
                                        [SQLite Database (dev.db)]
```

### Components:
1. **Link Collector (`scripts/crawl-links.cjs`)**:
   - Tải và parse các sitemap XML của MobileCity.
   - Lọc và trích xuất danh sách link sản phẩm và dịch vụ sửa chữa hợp lệ, loại bỏ các link bài viết không cần thiết.
2. **Detail Scraper Worker (`scripts/crawl-data.cjs`)**:
   - Sử dụng `axios` và `cheerio` để parse nội dung chi tiết từng sản phẩm và dịch vụ.
   - Concurrency: 3-5 workers đồng thời, jitter delay 300ms - 800ms.
   - Cơ chế Checkpoint: Lưu danh sách URL đã hoàn thành vào `scripts/fixtures/.crawl-checkpoint.json` để có thể resume nếu bị ngắt quãng.
   - Retry logic: Exponential backoff 3 lần cho các lỗi mạng (429, 502, 503, timeout 15s).
   - Xuất dữ liệu đã chuẩn hóa vào `scripts/fixtures/mobilecity-data.json`.
3. **Database Seeder (`scripts/seed-crawled.cjs`)**:
   - Nạp dữ liệu từ `scripts/fixtures/mobilecity-data.json` vào SQLite database thông qua Prisma Client.
   - Thao tác Idempotent (`upsert`) trên Category, Brand, Product, ProductVariant, Inventory, RepairService.

## 3. Data Mapping Specification

### 3.1 Category & Brand
- **Category**: Map danh mục chính (Điện thoại, Máy tính bảng, Phụ kiện, Sửa chữa). Phân cấp cha-con theo breadcrumb.
- **Brand**: Tự động nhận diện từ tên sản phẩm (Apple, Samsung, Xiaomi, Realme, Vivo, Asus, OnePlus, Google...) và chuẩn hóa slug.

### 3.2 Product
- `name`: Tên đầy đủ từ thẻ tiêu đề `<h1>` của trang chi tiết.
- `slug`: Chuẩn hóa từ URL path.
- `thumbnail`: URL ảnh đại diện gốc (MobileCity CDN).
- `images`: Mảng JSON các URL ảnh chi tiết sản phẩm.
- `description`: Tóm tắt đặc điểm nổi bật.
- `specs`: Bảng thông số kỹ thuật JSON (Màn hình, Chipset, RAM/ROM, Camera, Pin/Sạc, Hệ điều hành...).
- `condition`: Mặc định `BRAND_NEW` (hoặc `LIKE_NEW_99` nếu sản phẩm qua sử dụng).
- `isHot`: Mặc định `true` cho các dòng flagship mới nhất.

### 3.3 ProductVariant & Inventory
- Phân tích các tùy chọn phiên bản bộ nhớ (RAM/Storage) và màu sắc từ trang chi tiết:
  - `color`: Tên màu sắc (Đen, Trắng, Titan Xanh...).
  - `ram`: Dung lượng RAM (ví dụ: `8GB`, `12GB`, `16GB`).
  - `storage`: Bộ nhớ trong (ví dụ: `128GB`, `256GB`, `512GB`, `1TB`).
  - `originPrice`: Giá niêm yết (VND).
  - `salePrice`: Giá khuyến mãi hiện hành (VND).
  - `goldCareFee`: Phí Bảo Hành Vàng (mặc định 300,000đ).
  - `sku`: Mã định danh duy nhất `{product_slug}-{color}-{storage}`.
- `Inventory`: Phân bổ số lượng ngẫu nhiên (1-10 sản phẩm) cho 3 chi nhánh mẫu: Hà Nội, TP.HCM, Đà Nẵng.

### 3.4 RepairService
- Trích xuất bảng giá từ các trang sửa chữa:
  - `deviceModel`: Tên dòng máy (ví dụ: "iPhone 15 Pro Max").
  - `serviceName`: Loại dịch vụ (ví dụ: "Thay Màn Hình", "Thay Pin", "Ép Kính").
  - `price`: Giá dịch vụ (VND).
  - `warranty`: Thời gian bảo hành (ví dụ: "6 tháng").
  - `duration`: Thời gian xử lý (ví dụ: "45 phút").

## 4. Error Handling & Edge Cases
- **Missing Variants**: Nếu trang không có nút chọn biến thể, tự động tạo 1 variant mặc định với màu "Tiêu chuẩn" và giá chính của sản phẩm.
- **Missing Specs**: Fallback parse từ danh sách mô tả rút gọn hoặc lưu rỗng an toàn, không làm gián đoạn pipeline.
- **Rate Limit (429) & IP Ban**: Tự động tạm dừng 5 giây khi phát hiện HTTP 429 và thử lại tối đa 3 lần.
- **SQLite Concurrency**: Thực hiện seeding theo từng batch 50 records có bọc `$transaction` để tránh khóa database.

## 5. Verification & Testing
1. **Sample Crawl Test**: Chạy thử nghiệm với 10 sản phẩm và 5 dịch vụ sửa chữa để kiểm tra độ chính xác của bộ trích xuất HTML.
2. **Schema & Integrity Validation**: Kiểm tra dữ liệu JSON xuất ra đảm bảo không bị thiếu các trường bắt buộc (name, slug, thumbnail, salePrice).
3. **Database Seeding Validation**: Chạy seed vào SQLite, xác minh số lượng count qua Prisma Studio hoặc script kiểm tra.
4. **UI Verification**: Khởi chạy ứng dụng Next.js và kiểm tra hiển thị trang chủ, danh mục và chi tiết sản phẩm trên trình duyệt.
