# Tái Thiết Kế Website MobileCity (mobilecity.vn) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Mỗi Task bắt buộc phải đi kèm Playwright E2E Test để kiểm chứng tự động trước khi coi là hoàn thành.

**Goal:** Xây dựng website bán lẻ điện thoại và dịch vụ sửa chữa chuẩn thương hiệu MobileCity, tối ưu SEO, hỗ trợ đổi giá/tồn kho động theo 3 miền (HN, HCM, ĐN), chọn biến thể SKU đa chiều và tích hợp bảng giá dịch vụ kỹ thuật.

**Architecture:** Fullstack Next.js 15 (App Router, Server Components + Route Handlers), SQLite WAL mode (better-sqlite3) hỗ trợ transaction an toàn. Phân tách kiến trúc Hybrid: Static/ISR Shell cho SEO và Dynamic Island Component xử lý giá/tồn kho dựa trên cookie vùng miền (`mc_region`). Gói Bảo Hành Vàng được thiết kế dạng Add-on Service Line Item để tránh SKU explosion.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, Lucide React, better-sqlite3, Cheerio / Axios, Playwright Test.

---

## File Structure & Responsibilities

- `playwright.config.ts`: Cấu hình Playwright Test runner với WebServer Next.js tự động.
- `tests/e2e/`: Chứa toàn bộ test spec tương ứng cho từng task.
- `src/lib/db.ts`: Kết nối Database SQLite, WAL mode, Schema definition & migration script.
- `src/lib/constants.ts`: Định nghĩa thông tin nhận diện thương hiệu MobileCity (Theme color `#c69a39`, Hotlines, Chi nhánh, Menu items).
- `src/types/index.ts`: TypeScript interfaces cho Product, Variant, Branch, Inventory, RepairService, Cart.
- `src/context/RegionContext.tsx`: React Context quản lý vùng miền hiện tại (HN/HCM/DN) được đồng bộ qua Cookie và LocalStorage.
- `src/components/layout/Header.tsx`: Header đa tầng (Top bar Hotline/Chi nhánh, Main bar Logo/Search thông minh, Navigation Mega Menu).
- `src/components/layout/Footer.tsx`: Hệ thống chân trang đầy đủ thông tin pháp nhân, danh sách cửa hàng toàn quốc, chính sách bảo hành.
- `src/components/home/HeroBanner.tsx`: Slider banner khuyến mãi & Flash Sale giá sốc.
- `src/components/home/ProductGrid.tsx`: Lưới hiển thị sản phẩm theo chuyên mục (Điện thoại xách tay, iPhone cũ 99%, Điện thoại gaming).
- `src/components/product/ProductDetailClient.tsx`: Giao diện chi tiết máy, bộ chọn cấu hình RAM/ROM/Màu, Add-on Bảo Hành Vàng, hiển thị tồn kho chi nhánh theo vùng miền.
- `src/components/repair/RepairPriceTable.tsx`: Bảng tra cứu giá linh kiện thay thế & dịch vụ sửa chữa theo model.
- `src/app/api/products/route.ts`: API tìm kiếm, lọc theo brand, category, keyword.
- `src/app/api/products/[slug]/route.ts`: API lấy thông tin chi tiết SKU & tồn kho.
- `src/app/api/branches/route.ts`: API lấy danh sách chi nhánh và số hotline.
- `src/app/api/repair-services/route.ts`: API tra cứu bảng giá sửa chữa.

---

## Implementation Tasks

### Task 1: Setup Types, Region Context & Playwright Infrastructure
**Files:**
- Create: `src/types/index.ts`
- Create: `src/lib/constants.ts`
- Create: `src/context/RegionContext.tsx`
- Modify: `src/app/layout.tsx`
- Test: `tests/e2e/region-context.spec.ts`

- [ ] **Step 1.1: Tạo Type Definitions**
  - Định nghĩa interface `Branch`, `Product`, `ProductVariant`, `Inventory`, `RepairService`, `Region` ('HN' | 'HCM' | 'DN').
- [ ] **Step 1.2: Tạo Constants**
  - Cấu hình màu chủ đạo (`#c69a39`), danh sách hotline 3 miền, danh sách menu phân cấp (Apple, Xiaomi, Realme, Sửa chữa...).
- [ ] **Step 1.3: Tạo RegionContext Provider**
  - Hỗ trợ lưu và đọc region từ Cookie `mc_region` (mặc định `'HN'`).
  - Cung cấp hook `useRegion()` để các component con subscribe tự động cập nhật giá/tồn kho.
- [ ] **Step 1.4: Bọc RegionContext vào `src/app/layout.tsx`**
- [ ] **Step 1.5: Playwright E2E Test cho Region Switcher**
  - Viết `tests/e2e/region-context.spec.ts` kiểm tra Cookie `mc_region` được set đúng khi chuyển đổi giữa Hà Nội, TP.HCM và Đà Nẵng.
  - Chạy `npx playwright test tests/e2e/region-context.spec.ts` đảm bảo pass.

---

### Task 2: Xây Dựng Header Chuẩn Thương Hiệu & Mega Menu
**Files:**
- Create: `src/components/layout/HeaderTop.tsx`
- Create: `src/components/layout/HeaderMain.tsx`
- Create: `src/components/layout/MegaMenu.tsx`
- Create: `src/components/layout/Header.tsx`
- Modify: `src/app/page.tsx`
- Test: `tests/e2e/header-navigation.spec.ts`

- [ ] **Step 2.1: HeaderTop Component**
  - Selector đổi vùng miền kích hoạt `useRegion()`, hotline động theo vùng.
- [ ] **Step 2.2: HeaderMain Component**
  - Logo MobileCity, Thanh Search debounced gợi ý nhanh popup sản phẩm có ảnh/giá, icon giỏ hàng.
- [ ] **Step 2.3: MegaMenu Component**
  - Menu ngang màu vàng `#c69a39`, hover hiển thị danh mục cấp 2-3 phân chia thương hiệu.
- [ ] **Step 2.4: Gộp Header vào layout**
- [ ] **Step 2.5: Playwright E2E Test cho Header & Search**
  - Viết `tests/e2e/header-navigation.spec.ts`: Test hover mở Mega Menu, nhập từ khóa "Xiaomi" vào thanh search hiện popup kết quả gợi ý, click chọn vùng miền thay đổi hotline hiển thị.
  - Chạy `npx playwright test tests/e2e/header-navigation.spec.ts` đảm bảo pass.

---

### Task 3: Homepage Showcase (Flash Sale, Banners & Product Blocks)
**Files:**
- Create: `src/components/home/HeroSlider.tsx`
- Create: `src/components/home/FlashSaleSection.tsx`
- Create: `src/components/home/ProductCard.tsx`
- Create: `src/components/home/CategorySection.tsx`
- Modify: `src/app/page.tsx`
- Test: `tests/e2e/homepage.spec.ts`

- [ ] **Step 3.1: ProductCard Component**
  - Hiển thị badge: `Chính hãng` / `Cũ 99%` / `BH Vàng 12T`.
  - Giá sốc, giá gốc gạch ngang, phần trăm giảm giá, specs tóm tắt (Chip, Pin, Sạc).
- [ ] **Step 3.2: FlashSaleSection Component**
  - Countdown timer, progress bar số lượng đã bán.
- [ ] **Step 3.3: CategorySection Component**
  - Khối Xiaomi xách tay giá rẻ, Khối iPhone cũ 99% zin all.
- [ ] **Step 3.4: Tích hợp vào `src/app/page.tsx`** kết nối Database.
- [ ] **Step 3.5: Playwright E2E Test cho Homepage**
  - Viết `tests/e2e/homepage.spec.ts`: Verify render đầy đủ hero banner, countdown flash sale, danh sách card sản phẩm kèm giá, click vào card điều hướng đúng slug.
  - Chạy `npx playwright test tests/e2e/homepage.spec.ts` đảm bảo pass.

---

### Task 4: Product Detail Page (PDP) & Dynamic Variant Matrix
**Files:**
- Create: `src/app/dien-thoai/[slug]/page.tsx`
- Create: `src/components/product/ProductGallery.tsx`
- Create: `src/components/product/VariantSelector.tsx`
- Create: `src/components/product/GoldCareAddon.tsx`
- Create: `src/components/product/StoreAvailability.tsx`
- Create: `src/components/product/SpecsTable.tsx`
- Test: `tests/e2e/product-detail.spec.ts`

- [ ] **Step 4.1: Static/ISR Product Page Shell**
  - Server Component render SSR SEO (Meta tags, OpenGraph, JSON-LD Schema).
- [ ] **Step 4.2: VariantSelector Component**
  - Tùy chọn cấu hình RAM/ROM và Màu sắc với giá tương ứng.
- [ ] **Step 4.3: GoldCareAddon Component**
  - Toggle chọn Bảo Hành Thường vs Bảo Hành Vàng (Gold Care), tự động cộng phí hiển thị tức thời.
- [ ] **Step 4.4: StoreAvailability Component**
  - Lọc danh sách cửa hàng còn hàng theo vùng miền `region` từ Context.
- [ ] **Step 4.5: SpecsTable Component**
  - Bảng thông số kỹ thuật chi tiết.
- [ ] **Step 4.6: Playwright E2E Test cho Trang Chi Tiết Sản Phẩm (PDP)**
  - Viết `tests/e2e/product-detail.spec.ts`:
    1. Click chọn các option RAM/ROM khác nhau kiểm tra giá thay đổi tương ứng.
    2. Check toggle "Bảo Hành Vàng" kiểm tra tổng giá cộng thêm chính xác `goldCareFee`.
    3. Đổi chi nhánh vùng miền kiểm tra danh sách kho còn hàng cập nhật đúng cửa hàng ở vùng đó.
  - Chạy `npx playwright test tests/e2e/product-detail.spec.ts` đảm bảo pass.

---

### Task 5: Chuyên Trang Dịch Vụ Sửa Chữa (Thay Màn, Ép Kính, Thay Pin)
**Files:**
- Create: `src/app/sua-chua/page.tsx`
- Create: `src/components/repair/RepairSearch.tsx`
- Create: `src/components/repair/RepairPriceList.tsx`
- Create: `src/components/repair/BookingModal.tsx`
- Test: `tests/e2e/repair-service.spec.ts`

- [ ] **Step 5.1: Dựng trang tổng quan dịch vụ sửa chữa**
  - Bộ lọc chọn theo Dòng máy (iPhone, Xiaomi...) và Loại dịch vụ.
- [ ] **Step 5.2: RepairPriceList Component**
  - Bảng giá minh bạch (Linh kiện, Công tháo lắp, Bảo hành, Thời gian chờ).
- [ ] **Step 5.3: BookingModal Component**
  - Form đặt lịch hẹn trước nhận ưu đãi giảm 50k, chọn chi nhánh và giờ hẹn.
- [ ] **Step 5.4: Playwright E2E Test cho Dịch Vụ Sửa Chữa**
  - Viết `tests/e2e/repair-service.spec.ts`: Lọc tìm bảng giá theo model "iPhone 15 Pro Max", mở modal đặt lịch, điền form đặt hẹn và kiểm tra alert/toast xác nhận thành công.
  - Chạy `npx playwright test tests/e2e/repair-service.spec.ts` đảm bảo pass.

---

### Task 6: Data Enrichment & Scraper Fixture Tool
**Files:**
- Create: `scripts/crawler.cjs`
- Create: `scripts/fixtures/mobilecity_catalog.json`
- Test: `tests/e2e/data-catalog.spec.ts`

- [ ] **Step 6.1: Viết script scraper tôn trọng Cloudflare WAF**
- [ ] **Step 6.2: Đồng bộ dữ liệu vào `dev.db`**
- [ ] **Step 6.3: Playwright E2E Test Catalog Data**
  - Viết `tests/e2e/data-catalog.spec.ts` kiểm tra API trả về dữ liệu catalog đầy đủ, không bị rỗng các trường quan trọng (sku, thumbnail, specs).
  - Chạy `npx playwright test tests/e2e/data-catalog.spec.ts` đảm bảo pass.

---

### Task 7: Build Verification, Full E2E Test Suite & Performance Audit
**Files:**
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Test: Chạy toàn bộ Playwright test suite `npx playwright test`

- [ ] **Step 7.1: Setup Dynamic Sitemap & Robots.txt**
- [ ] **Step 7.2: Chạy toàn bộ Playwright E2E test suite**
  - `npx playwright test` đảm bảo 100% tests passed không flaky.
- [ ] **Step 7.3: Build verification**
  - `npm run build` đảm bảo không có cảnh báo hoặc lỗi compile nào.
