# Kế Hoạch Bổ Sung Giao Diện & Tính Năng Chuyên Sâu MobileCity (Phase 2)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Mỗi Task bắt buộc phải đi kèm Playwright E2E Test để kiểm chứng tự động trước khi coi là hoàn thành.

**Goal:** Hoàn thiện trải nghiệm thương mại điện tử trọn vẹn của MobileCity (mobilecity.vn), khắc phục tình trạng thiếu các trang và tính năng cốt lõi: Footer đa chi nhánh & chính sách, Trang danh sách sản phẩm với bộ lọc đa chiều (Filter Facets), Giỏ hàng & Checkout (Giao tận nơi hoặc Click-and-Collect nhận tại shop), Tra cứu bảo hành qua IMEI/Số điện thoại, Hệ thống Hỏi đáp / Đánh giá sản phẩm, và Chuyên mục Tin tức / Cẩm nang công nghệ.

**Architecture:** Mở rộng Next.js 15 App Router, bổ sung schema SQLite (Orders, OrderItems, Comments, NewsArticles, WarrantyRecords), tách biệt các UI component độc lập có state management client-side đồng bộ `RegionContext`, và kiểm thử Playwright tự động cho từng flow.

---

## 1. Phân Tích Những Điểm Thiếu Cần Bổ Sung (Gap Analysis)

| Module / Tính năng | Hiện trạng | Cần bổ sung theo chuẩn MobileCity gốc |
| :--- | :--- | :--- |
| **Footer & Hệ thống cửa hàng** | Chưa có Footer | Footer 4 cột: Danh sách 8+ showroom (HN, HCM, ĐN), Chính sách bảo hành & đổi trả, Hướng dẫn mua trả góp, Đăng ký bảng tin, Chứng nhận Bộ Công Thương. |
| **Trang Danh Mục (Category / Listing)** | Chưa có `/dien-thoai` | Bộ lọc đa chiều: Lọc theo Hãng (Apple, Xiaomi...), Mức giá (Dưới 3tr, 3-6tr...), Tình trạng (Mới 100%, 99%), Sắp xếp (Giá tăng/giảm, Mới nhất, Bán chạy). |
| **Giỏ Hàng & Đặt Hàng (Cart & Checkout)** | Chỉ có icon giỏ hàng header | Trang `/gio-hang` & `/thanh-toan`: Tăng giảm số lượng, Áp mã giảm giá, Tùy chọn Nhận tại showroom chi nhánh hoặc Giao hàng thu tiền tận nơi (COD). |
| **Tra Cứu Bảo Hành (IMEI Lookup)** | Chưa có trang tra cứu | Trang `/tra-cuu-bao-hanh`: Tra cứu số IMEI / Serial / Số điện thoại để xem lịch sử mua máy, tình trạng Bảo Hành Vàng, thời hạn còn lại. |
| **Đánh Giá & Bình Luận / Hỏi Đáp (Q&A)** | PDP chưa có phần hỏi đáp | Khối Bình luận & Hỏi đáp kỹ thuật trực tiếp ngay dưới chi tiết sản phẩm, có phản hồi từ Kỹ thuật viên MobileCity. |
| **Tin Tức / Đánh Giá Công Nghệ (Blog/News)** | Chưa có | Trang `/tin-tuc`: Cẩm nang công nghệ, Hướng dẫn cài ROM Tiếng Việt cho máy xách tay, Mở hộp & Review chi tiết. |

---

## 2. Implementation Tasks (Bổ Sung Chi Tiết)

### Task 8: Hệ Thống Footer Toàn Diện & Thông Tin Cửa Hàng 3 Miền
**Files:**
- Create: `src/components/layout/Footer.tsx`
- Modify: `src/app/layout.tsx`
- Test: `tests/e2e/footer.spec.ts`

- [ ] **Step 8.1: Xây dựng Footer component chuẩn phong cách MobileCity:**
  - Cột 1: Thông tin công ty, chi nhánh Hà Nội (120 Thái Hà, 398 Cầu Giấy, 42 Phố Vọng).
  - Cột 2: Chi nhánh TP.HCM (123 Trần Quang Khải, 602 Lê Hồng Phong) & Đà Nẵng (97 Hàm Nghi).
  - Cột 3: Chính sách bảo hành (Chính sách Bảo Hành Vàng, Đổi trả 15 ngày, Mua trả góp 0%).
  - Cột 4: Form đăng ký nhận tin khuyến mãi, Mạng xã hội, Logo chứng nhận Bộ Công Thương.
- [ ] **Step 8.2: Tích hợp Footer vào `src/app/layout.tsx`**
- [ ] **Step 8.3: Playwright E2E Test cho Footer**
  - Viết `tests/e2e/footer.spec.ts`: Verify xuất hiện đủ địa chỉ showroom 3 miền, link chính sách bảo hành, form đăng ký email hoạt động.
  - Chạy `npm run test:e2e tests/e2e/footer.spec.ts` đảm bảo pass.

---

### Task 9: Trang Danh Mục Sản Phẩm (Listing Page) & Bộ Lọc Đa Chiều (Facets Filter)
**Files:**
- Create: `src/app/dien-thoai/page.tsx`
- Create: `src/components/catalog/ProductFilterBar.tsx`
- Create: `src/components/catalog/CategoryListingClient.tsx`
- Test: `tests/e2e/category-listing.spec.ts`

- [ ] **Step 9.1: Xây dựng Bộ Lọc Facets:**
  - Lọc theo Hãng (Tất cả, Xiaomi, Apple, Realme, Asus ROG).
  - Lọc theo Khoảng giá (Dưới 5 triệu, 5-10 triệu, 10-20 triệu, Trên 20 triệu).
  - Lọc theo Tình trạng máy (Mới nguyên seal / Cũ 99%).
  - Sắp xếp (Giá thấp đến cao, Giá cao đến thấp, Mới nhất).
- [ ] **Step 9.2: Xây dựng CategoryListingClient:**
  - Hiển thị danh sách sản phẩm dạng lưới responsive, cập nhật kết quả lọc tức thì mà không giật trang.
  - Phân trang hoặc hiển thị tổng số kết quả tìm thấy.
- [ ] **Step 9.3: Playwright E2E Test cho Trang Danh Mục**
  - Viết `tests/e2e/category-listing.spec.ts`: Test chọn lọc hãng "Xiaomi" chỉ ra máy Xiaomi, lọc giá < 5 triệu hiển thị đúng Redmi Note 13 Pro.
  - Chạy `npm run test:e2e tests/e2e/category-listing.spec.ts` đảm bảo pass.

---

### Task 10: Giỏ Hàng & Quy Trình Đặt Hàng (Cart & Checkout Flow)
**Files:**
- Create: `src/context/CartContext.tsx`
- Create: `src/app/gio-hang/page.tsx`
- Create: `src/app/api/orders/route.ts`
- Modify: `src/components/product/ProductDetailClient.tsx` (nối nút Mua Ngay / Thêm Giỏ Hàng)
- Modify: `src/components/layout/HeaderMain.tsx` (cập nhật badge số lượng giỏ hàng thực tế)
- Test: `tests/e2e/cart-checkout.spec.ts`

- [ ] **Step 10.1: Tạo CartContext lưu trữ LocalStorage:**
  - Quản lý danh sách sản phẩm: id, name, variant, color, ram/storage, hasGoldCare, price, quantity.
  - Cập nhật số lượng hiển thị trên icon giỏ hàng Header theo thời gian thực.
- [ ] **Step 10.2: Xây dựng Trang Giỏ Hàng `/gio-hang`:**
  - Bảng danh sách sản phẩm, tăng/giảm số lượng, xóa sản phẩm.
  - Tóm tắt tổng tiền hàng, phí Bảo Hành Vàng đính kèm.
- [ ] **Step 10.3: Form Đặt Hàng & Checkout:**
  - Thông tin khách hàng (Họ tên, SĐT, Địa chỉ).
  - Hình thức nhận hàng: "Giao tận nơi (COD)" hoặc "Nhận tại showroom gần nhất" (gợi ý showroom theo `RegionContext`).
  - Gửi dữ liệu về API `POST /api/orders` lưu trữ đơn hàng và sinh Mã đơn hàng (VD: `MC-83921`).
- [ ] **Step 10.4: Playwright E2E Test cho Cart & Checkout**
  - Viết `tests/e2e/cart-checkout.spec.ts`: Vào PDP bấm "Thêm Giỏ Hàng", vào `/gio-hang` kiểm tra đúng số lượng, điền form đặt hàng và hiển thị màn hình Đặt Hàng Thành Công kèm Mã Đơn.
  - Chạy `npm run test:e2e tests/e2e/cart-checkout.spec.ts` đảm bảo pass.

---

### Task 11: Trang Tra Cứu Bảo Hành (IMEI / Số Điện Thoại Lookup)
**Files:**
- Create: `src/app/tra-cuu-bao-hanh/page.tsx`
- Create: `src/app/api/warranty/route.ts`
- Modify: `src/lib/db.ts` (thêm bảng `warranty_records`)
- Modify: `scripts/seed.cjs` (seed dữ liệu mẫu IMEI để tra cứu)
- Test: `tests/e2e/warranty-lookup.spec.ts`

- [ ] **Step 11.1: Tạo Model & API Warranty Records:**
  - Bảng `warranty_records`: imei, phone, customerName, productName, variantInfo, purchaseDate, expiryDate, isGoldCare, status.
- [ ] **Step 11.2: Xây dựng Giao Diện Tra Cứu:**
  - Ô nhập IMEI hoặc Số điện thoại mua hàng.
  - Hiển thị thẻ bảo hành điện tử: Tên máy, Gói bảo hành (Bảo Hành Vàng hay Tiêu Chuẩn), Ngày kích hoạt, Thời gian bảo hành còn lại (VD: Còn 245 ngày), Chi nhánh đã mua.
- [ ] **Step 11.3: Playwright E2E Test cho Tra Cứu Bảo Hành**
  - Viết `tests/e2e/warranty-lookup.spec.ts`: Tra cứu IMEI mẫu kiểm tra xuất hiện thông tin bảo hành máy chính xác.
  - Chạy `npm run test:e2e tests/e2e/warranty-lookup.spec.ts` đảm bảo pass.

---

### Task 12: Hệ Thống Hỏi Đáp & Đánh Giá Sản Phẩm (Q&A / Comments)
**Files:**
- Create: `src/components/product/ProductComments.tsx`
- Create: `src/app/api/comments/route.ts`
- Modify: `src/app/dien-thoai/[slug]/page.tsx`
- Test: `tests/e2e/product-comments.spec.ts`

- [ ] **Step 12.1: Tạo API lưu và lấy bình luận / hỏi đáp theo sản phẩm:**
  - Bảng `product_comments`: id, productId, author, phone, content, rating, reply, isStaffReply, createdAt.
- [ ] **Step 12.2: Component ProductComments trong PDP:**
  - Form gửi câu hỏi / đánh giá nhanh (Họ tên, SĐT, Nội dung thắc mắc).
  - Danh sách câu hỏi đã được giải đáp kèm nhãn "Quản trị viên MobileCity" trả lời.
- [ ] **Step 12.3: Playwright E2E Test cho Comments**
  - Viết `tests/e2e/product-comments.spec.ts`: Gửi câu hỏi thắc mắc mới trên PDP và kiểm tra hiển thị ngay trên danh sách hỏi đáp.
  - Chạy `npm run test:e2e tests/e2e/product-comments.spec.ts` đảm bảo pass.

---

### Task 13: Chuyên Mục Tin Tức & Cẩm Nang Công Nghệ (Tech News & ROM Guides)
**Files:**
- Create: `src/app/tin-tuc/page.tsx`
- Create: `src/app/tin-tuc/[slug]/page.tsx`
- Modify: `src/lib/constants.ts` (thêm link Tin Tức vào MegaMenu)
- Test: `tests/e2e/news.spec.ts`

- [ ] **Step 13.1: Database Schema & API Tin Tức:**
  - Bảng `news_articles`: id, title, slug, thumbnail, summary, content, author, views, createdAt.
  - Seed bài viết thực tế MobileCity: "Hướng dẫn cài ROM Tiếng Việt cho Xiaomi", "Đánh giá chi tiết Snapdragon 8 Gen 3 trên Xiaomi 14 Pro".
- [ ] **Step 13.2: Giao diện Trang Tin Tức & Chi Tiết Bài Viết:**
  - Tin nổi bật, danh sách bài viết cẩm nang công nghệ, đánh giá điện thoại.
  - Bài viết chi tiết có mục lục TOC (Table of Contents), sản phẩm liên quan đính kèm.
- [ ] **Step 13.3: Playwright E2E Test cho Tin Tức**
  - Viết `tests/e2e/news.spec.ts`: Vào `/tin-tuc`, click đọc bài viết và verify render đúng tiêu đề, nội dung và sản phẩm liên quan.
  - Chạy `npm run test:e2e tests/e2e/news.spec.ts` đảm bảo pass.

---

### Task 14: Final Full Regression Test & Performance Audit (Phase 2)
**Files:**
- Run: `npm run test:e2e` (toàn bộ hơn 30 tests)
- Run: `npm run build`

- [ ] **Step 14.1: Chạy toàn bộ Playwright E2E Test Suite.**
- [ ] **Step 14.2: Chạy `npm run build` verify không có bất kỳ lỗi biên dịch nào.**
