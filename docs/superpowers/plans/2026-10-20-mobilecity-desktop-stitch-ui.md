# MobileCity Desktop UI Transformation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Chuyển đổi toàn diện giao diện MobileCity Next.js 15 sang ngôn ngữ thiết kế Stitch Desktop (Kinetic Amber Retail), tối ưu hóa trải nghiệm thị giác, typography, màu sắc semantic và các luồng tương tác thực tế.

**Architecture:** Áp dụng hệ thống Design Tokens (Màu sắc Material 3, font Be Vietnam Pro, max-width 1240px) vào `globals.css` và `layout.tsx`. Cập nhật các component nền tảng Header/Footer, nâng cấp các trang hiện tại (Trang chủ, Danh mục, Chi tiết sản phẩm, Giỏ hàng, Sửa chữa) và bổ sung 4 trang dịch vụ chuyên biệt (Bảo hành vàng, Showroom, Trả góp 0%, Thu cũ đổi mới).

**Tech Stack:** Next.js 15 (App Router), React 19, Tailwind CSS v4, Lucide React, TypeScript, Prisma (SQLite).

---

### Task 1: Setup Stitch Design Tokens & Font Be Vietnam Pro

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Cập nhật Google Font Be Vietnam Pro và Design Tokens trong `globals.css`**

Thêm định nghĩa font `Be Vietnam Pro` cùng biến màu Stitch theme (Kinetic Amber):
```css
@import "tailwindcss";

@layer base {
  :root {
    --background: #f8f9ff;
    --foreground: #0b1c30;
    --font-be-vietnam-pro: 'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, sans-serif;
  }
}

body {
  background-color: var(--background);
  color: var(--foreground);
  font-family: var(--font-be-vietnam-pro);
  -webkit-font-smoothing: antialiased;
}
```

- [ ] **Step 2: Nhúng Google Font vào `src/app/layout.tsx`**

Cập nhật head links nạp font `Be Vietnam Pro` weights 400, 500, 600, 700, 800.

- [ ] **Step 3: Kiểm tra biên dịch**
Run: `npm run build`
Expected: Compile thành công không có lỗi font hoặc style.

- [ ] **Step 4: Commit**
```bash
git add src/app/layout.tsx src/app/globals.css
git commit -m "style: setup Be Vietnam Pro font and Stitch design tokens"
```

---

### Task 2: Nâng cấp Header Toàn Cục & MegaMenu theo Chuẩn Stitch Desktop

**Files:**
- Modify: `src/components/layout/HeaderTop.tsx`
- Modify: `src/components/layout/HeaderMain.tsx`
- Modify: `src/components/layout/MegaMenu.tsx`
- Test: `tests/e2e/header-navigation.spec.ts`

- [ ] **Step 1: Nâng cấp HeaderTop với thanh thông tin showroom đa vùng và hotline nổi bật**
- [ ] **Step 2: Nâng cấp HeaderMain với nền trắng tinh tế `bg-white shadow-[0_1px_8px_rgba(0,0,0,0.04)]`, logo sắc nét, search box bo góc kỹ thuật, nút Sửa chữa & Giỏ hàng có badge count**
- [ ] **Step 3: Cập nhật MegaMenu với hệ thống icon & highlight Bảo Hành Vàng**
- [ ] **Step 4: Chạy test xác minh E2E Header**
Run: `npx playwright test tests/e2e/header-navigation.spec.ts`
Expected: PASS
- [ ] **Step 5: Commit**
```bash
git add src/components/layout/
git commit -m "feat(layout): modernize header and mega menu with stitch desktop theme"
```

---

### Task 3: Hiện Đại Hóa Trang Chủ (Home Page) & Product Cards

**Files:**
- Modify: `src/components/home/HeroSlider.tsx`
- Modify: `src/components/home/FlashSaleSection.tsx`
- Modify: `src/components/home/ProductCard.tsx`
- Modify: `src/components/home/CategorySection.tsx`
- Modify: `src/app/page.tsx`
- Test: `tests/e2e/homepage.spec.ts`

- [ ] **Step 1: Cập nhật ProductCard theo Stitch Spec**
  - Tỷ lệ ảnh 1:1, border hairline `border-[#E2E8F0]`, hover elevation nhẹ `hover:shadow-md`.
  - Hiển thị badge Bảo Hành Vàng, nhãn Hàng Mới / Nhập Khẩu, mức giá gốc gạch ngang và giá bán đậm.
- [ ] **Step 2: Nâng cấp HeroSlider & Khối Cam Kết Dịch Vụ**
- [ ] **Step 3: Tối ưu khối Flash Sale với badge đếm ngược và thanh tiến trình**
- [ ] **Step 4: Chạy test xác minh E2E Trang Chủ**
Run: `npx playwright test tests/e2e/homepage.spec.ts`
Expected: PASS
- [ ] **Step 5: Commit**
```bash
git add src/components/home/ src/app/page.tsx
git commit -m "feat(home): modernize homepage with stitch kinetic amber design"
```

---

### Task 4: Nâng Cấp Trang Chi Tiết Sản Phẩm (PDP) & Gói Bảo Hành Vàng

**Files:**
- Modify: `src/components/product/ProductDetailClient.tsx`
- Test: `tests/e2e/product-detail.spec.ts`

- [ ] **Step 1: Nâng cấp giao diện PDP theo Stitch Redmi K70 screen**
  - Box chọn dung lượng RAM/ROM và Màu sắc với trạng thái active viền Amber.
  - Box chọn **Gói Bảo Hành Vàng (BHV 12 tháng)** nổi bật với quyền lợi bảo hành cả Nguồn, Màn hình, Cảm ứng.
  - Bảng thông số kỹ thuật zebra striping (`#f8fafc` / `#ffffff`).
  - Nút Mua ngay (đỏ) & Mua trả góp 0% / Thu cũ đổi mới.
- [ ] **Step 2: Chạy test xác minh E2E Product Detail**
Run: `npx playwright test tests/e2e/product-detail.spec.ts`
Expected: PASS
- [ ] **Step 3: Commit**
```bash
git add src/components/product/ProductDetailClient.tsx
git commit -m "feat(pdp): update product detail page matching stitch layout"
```

---

### Task 5: Nâng Cấp Trang Danh Mục & Giỏ Hàng

**Files:**
- Modify: `src/components/catalog/CategoryListingClient.tsx`
- Modify: `src/components/cart/CartClient.tsx`
- Test: `tests/e2e/category-listing.spec.ts`
- Test: `tests/e2e/cart-checkout.spec.ts`

- [ ] **Step 1: Cập nhật CategoryListingClient với bộ lọc chuẩn Stitch (Filter bar, sort, brand chips)**
- [ ] **Step 2: Nâng cấp CartClient với layout 2 cột rõ ràng, hiển thị gói BHV đính kèm từng máy, lựa chọn nhận tại Showroom hoặc Giao tận nhà**
- [ ] **Step 3: Chạy test xác minh E2E Category & Cart**
Run: `npx playwright test tests/e2e/category-listing.spec.ts tests/e2e/cart-checkout.spec.ts`
Expected: PASS
- [ ] **Step 4: Commit**
```bash
git add src/components/catalog/ src/components/cart/
git commit -m "feat(catalog,cart): modernize category listing and checkout flow"
```

---

### Task 6: Bổ Sung 4 Trang Dịch Vụ Mới từ Thiết Kế Stitch

**Files:**
- Create: `src/app/chinh-sach-bao-hanh-vang/page.tsx`
- Create: `src/app/he-thong-showroom/page.tsx`
- Create: `src/app/huong-dan-tra-gop/page.tsx`
- Create: `src/app/thu-cu-doi-moi/page.tsx`
- Modify: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Tạo trang Chính Sách Bảo Hành Vàng (`/chinh-sach-bao-hanh-vang`)**
  - Bảng so sánh quyền lợi BH Thường vs BH Vàng, quy trình bảo hành 15 ngày 1 đổi 1.
- [ ] **Step 2: Tạo trang Hệ Thống Showroom (`/he-thong-showroom`)**
  - Tab lọc tỉnh thành (Hà Nội, TP.HCM, Đà Nẵng), hotline, bản đồ và ảnh cửa hàng.
- [ ] **Step 3: Tạo trang Dự Toán Trả Góp 0% (`/huong-dan-tra-gop`)**
  - Công cụ tính toán trả trước & trả góp hàng tháng theo % và kỳ hạn tương tác trực tiếp.
- [ ] **Step 4: Tạo trang Thu Cũ Đổi Mới (`/thu-cu-doi-moi`)**
  - Form chọn máy cũ, báo giá trợ giá lên đến 2.000.000đ.
- [ ] **Step 5: Cập nhật footer kết nối toàn bộ các đường link chính xác**
- [ ] **Step 6: Kiểm tra biên dịch toàn bộ dự án**
Run: `npm run build`
Expected: Compiled successfully with 0 errors.
- [ ] **Step 7: Commit**
```bash
git add src/app/ src/components/layout/Footer.tsx
git commit -m "feat: add warranty, showroom, installment and trade-in pages from stitch"
```

---

### Task 7: Full Verification & E2E Testing Suite

**Files:**
- Test: `tests/e2e/*.spec.ts`

- [ ] **Step 1: Chạy toàn bộ test suites Playwright**
Run: `npx playwright test`
Expected: All tests pass.
- [ ] **Step 2: Chụp so sánh snapshot giao diện mới**
- [ ] **Step 3: Commit kết quả hoàn thiện**
```bash
git commit -m "chore: verify all stitch desktop ui implementations pass tests"
```
