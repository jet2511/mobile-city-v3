# Design Specification: MobileCity Desktop UI Transformation (Stitch Design System)

- **Date:** 2026-10-20
- **Project:** MobileCity Next.js 15 E-commerce Platform
- **Source Theme:** Stitch Project `15455095120920507347` (Kinetic Amber Retail)
- **Status:** Approved

---

## 1. Mục Tiêu & Phạm Vi
Đưa toàn bộ ngôn ngữ thiết kế từ 14 màn hình Desktop trên Google Stitch MCP vào dự án Next.js 15 hiện tại của MobileCity:
- Thay thế toàn bộ phong cách giao diện cũ (nền vàng phẳng thô) bằng ngôn ngữ **Kinetic Amber Retail**: hiện đại, cấu trúc thẻ tinh gọn, phân tầng độ sâu thị giác (Tonal Layering), viền hairline kỹ thuật, font chữ **Be Vietnam Pro**.
- Đồng bộ hệ thống nhận diện thương hiệu: Amber Gold (`#d97706`), Deep Amber (`#8d4b00`), Crimson Alert (`#bb0112`), Navy Text (`#0b1c30`), và nền slate nhẹ (`#f8f9ff`).
- Đảm bảo tính tương tác thực tế với dynamic state (giỏ hàng, chọn cấu hình, tính trả góp, tra cứu đơn hàng/bảo hành, định giá thu cũ).

---

## 2. Design Tokens & Styling Foundation

### 2.1 Bảng màu Semantic (Material 3 Derived)
- `background`: `#f8f9ff`
- `surface`: `#f8f9ff`
- `surface-container-lowest`: `#ffffff` (Nền card & header chính)
- `surface-container-low`: `#eff4ff`
- `surface-container`: `#e5eeff`
- `surface-container-high`: `#dce9ff`
- `on-surface`: `#0b1c30` (Text chính)
- `on-surface-variant`: `#554336` (Text phụ)
- `outline-variant`: `#dbc2b0` / `#e2e8f0` (Đường kẻ hairline)
- `primary`: `#8d4b00` (Tone Amber trầm kỹ thuật)
- `primary-accent`: `#d97706` (Vàng kim nhận diện MobileCity)
- `tertiary`: `#bb0112` (Đỏ khuyến mãi / Flash sale)

### 2.2 Typography & Grid
- **Font:** `Be Vietnam Pro` (weights: 400, 500, 600, 700, 800)
- **Container Max-Width:** `1240px` centered
- **Spacing:** Quy chuẩn gutter 16px - 20px, section padding 24px - 32px

---

## 3. Kiến Trúc Thành Phần Giao Diện (Components & Pages)

### 3.1 Hệ Thống Layout Toàn Cục (`src/components/layout`)
- **HeaderTop (`HeaderTop.tsx`)**:
  - Dải thanh tiện ích trên cùng: Hotline đa vùng (Hà Nội, TP.HCM, Đà Nẵng) kết hợp selector khu vực real-time.
  - Shortcut tra cứu bảo hành, phản hồi khiếu nại.
- **HeaderMain (`HeaderMain.tsx`)**:
  - Nền trắng tinh tế `bg-surface-container-lowest`, đổ bóng nhẹ `shadow-[0_1px_8px_rgba(0,0,0,0.04)]`.
  - Brand Logo MobileCity sắc nét kết hợp khẩu hiệu.
  - Smart Search input với thanh công cụ tìm kiếm nhanh & kết quả dynamic dropdown.
  - Nút Báo giá Sửa chữa & Giỏ hàng với counter badge động.
- **MegaMenu (`MegaMenu.tsx`)**:
  - Thanh menu điều hướng với icon các ngành hàng: Xiaomi, iPhone, Samsung, Gaming Phone, Sửa Chữa Care, Tin Tức, Bảo Hành Vàng (nổi bật).
- **Footer (`Footer.tsx`)**:
  - Hệ thống 4 cột chuẩn Stitch: Danh sách showroom chi tiết 3 miền, Quy định chính sách, Dịch vụ & Hướng dẫn, Đăng ký nhận tin & Chứng nhận BCT.

### 3.2 Cập Nhật Các Trang Hiện Tại
1. **Trang Chủ (`src/app/page.tsx` + `src/components/home`)**:
   - Hero Section: Banner slider kép chuyên nghiệp kết hợp thanh cam kết dịch vụ.
   - Flash Sale Section: Bộ đếm ngược thời gian, thanh tiến trình bán hàng, giá sốc.
   - Grid Danh mục sản phẩm nổi bật (Xiaomi, iPhone, ROG Phone...) với card sản phẩm viền hairline, tag nguồn gốc, badge Bảo Hành Vàng, rating.
   - MobileCity Care Section: Báo giá nhanh thay màn/ép kính/thay pin.
2. **Trang Danh Mục Sản Phẩm (`src/app/dien-thoai/page.tsx` + `src/components/catalog`)**:
   - Bộ lọc đa chiều: Hãng sản xuất, khoảng giá, nhu cầu, tình trạng máy (Mới nguyên seal / Cũ 99%).
   - Sắp xếp giá tăng/giảm, hàng mới về, bán chạy.
   - Lưới sản phẩm chuẩn 4-5 cột desktop.
3. **Trang Chi Tiết Sản Phẩm (`src/app/dien-thoai/[slug]` + `src/components/product`)**:
   - Gallery hình ảnh sản phẩm với thumbnail tương tác.
   - Selector chọn cấu hình RAM/ROM và Màu sắc với giá biến đổi tương ứng.
   - Box chọn Gói Bảo Hành Vàng (Mặc định thường vs Gói Vàng bảo hành toàn diện cả Nguồn, Màn hình, Cảm ứng).
   - Nút hành động nổi bật: "Mua Ngay", "Mua Trả Góp 0%", "Thu Cũ Lên Đời".
   - Bảng thông số kỹ thuật zebra striping & khối cam kết chính hãng.
4. **Trang Giỏ Hàng & Thanh Toán (`src/app/gio-hang/page.tsx` + `src/components/cart`)**:
   - Quản lý số lượng, xóa item, kèm hiển thị gói Bảo Hành Vàng đi kèm từng máy.
   - Form thông tin khách hàng, lựa chọn Showroom nhận hàng hoặc Giao hàng tận nơi.
   - Box nhập Voucher giảm giá & tóm tắt chi phí rõ ràng.
5. **Trang Sửa Chữa Care (`src/app/sua-chua/page.tsx` + `src/components/repair`)**:
   - Bảng tra cứu giá dịch vụ sửa chữa theo model thiết bị.
   - Quy trình dịch vụ 5 bước minh bạch.

### 3.3 Tạo Mới Các Trang Theo Mẫu Thiết Kế Stitch
1. **Trang Chính Sách Bảo Hành Vàng (`src/app/chinh-sach-bao-hanh-vang/page.tsx`)**:
   - Bảng so sánh trực quan quyền lợi Bảo hành Tiêu chuẩn vs Bảo Hành Vàng (Nguồn, Màn hình, Face ID, Vân tay, Rơi vỡ).
   - Quy trình thẩm định và đổi trả 15 ngày 1 đổi 1.
2. **Trang Hệ Thống Showroom (`src/app/he-thong-showroom/page.tsx`)**:
   - Bộ lọc chi nhánh theo khu vực (Hà Nội, Đà Nẵng, TP.HCM).
   - Thông tin chi tiết từng showroom: Địa chỉ, hotline, thời gian mở cửa, bản đồ hướng dẫn.
3. **Trang Dự Toán & Hướng Dẫn Trả Góp 0% (`src/app/huong-dan-tra-gop/page.tsx`)**:
   - Công cụ tính toán tiền trả góp tương tác: Giá trị máy, % trả trước (10% - 70%), kỳ hạn (6, 9, 12 tháng), hiển thị số tiền thanh toán hàng tháng qua công ty tài chính / thẻ tín dụng.
4. **Trang Thu Cũ Đổi Mới (`src/app/thu-cu-doi-moi/page.tsx`)**:
   - Công cụ định giá máy cũ nhanh chóng, chính sách trợ giá lên đời đến 2.000.000đ.

---

## 4. Kế Hoạch Xác Minh & Kiểm Thử (Verification Plan)
1. **Xây dựng & Compile:** Chạy `npm run build` để kiểm tra TypeScript type check và bundle integrity.
2. **Kiểm thử E2E Playwright:** Chạy toàn bộ test suites hiện có trong `tests/e2e/` (homepage, header-navigation, product-detail, cart-checkout, repair-service) để đảm bảo không bị vỡ selector hoặc regression logic.
3. **Visual Verification:** Đảm bảo responsive desktop đạt độ phân giải 1240px - 2560px theo đúng mẫu Stitch.
