# Technical Specification: Codebase Restructuring & Engineering Standards

- **Project:** MobileCity v3 (`mobile-cityv3`)
- **Status:** Approved / In Spec
- **Target Architecture:** Screaming Feature-Based Architecture (Next.js 16 App Router + React 19)
- **Author/Owner:** Lead Architect & Agent Pair

---

## 1. Mục tiêu & Phạm vi (Objectives & Scope)

Dự án hiện đang sử dụng Next.js 16.4.2 (Turbopack), React 19.3.0, Tailwind CSS v4, Prisma 5.22 (SQLite) và Playwright. Sau các đợt phát triển nhanh, codebase xuất hiện các điểm cần tái cấu trúc:

1. Thiếu các công cụ chuẩn hóa commit, code style tự động (Husky, commitlint, Prettier Tailwind).
2. Các file hệ thống (`AGENTS.md`, `.gitignore`, `.env.example`) chưa phản ánh đầy đủ kiến trúc và quy ước chuẩn.
3. Cấu trúc thư mục `src/` hiện phân chia theo kiểu phân tầng phẳng (`components/layout`, `components/product`, `lib/`), dẫn tới các file client component nguyên khối (>600 dòng như `ProductDetailClient.tsx`, >400 dòng như `RepairClient.tsx`).
4. Logic truy vấn Prisma phân tán trực tiếp trong Route Handlers (`app/api/*`) hoặc gọi trực tiếp ở một số page, thiếu ranh giới Service Layer và Type-safe validation (Zod).

Mục tiêu kỹ thuật:

- **Tự động hóa chất lượng mã (DevEx & Git Conventions):** Cài đặt commitlint, Husky, lint-staged, Prettier Tailwind v4 plugin, ESLint 9 rules.
- **Chuẩn hóa cấu hình hệ thống:** Hoàn thiện `AGENTS.md` (bảo tồn an toàn block của Next.js), `.env.example`, `.gitignore`.
- **Thiết kế lại cấu trúc thư mục theo Screaming Feature-Based Architecture:** Đóng gói độc lập theo Domain Module (`src/features/*`), tách biệt `src/shared/*` và giữ `src/app/` là Thin Routing Layer.
- **Ranh giới Server/Client & Service Layer:** Tách các component khổng lồ thành leaf interactive components, chuẩn hóa Service Layer và Zod validation cho toàn bộ endpoints.

---

## 2. Thiết kế chi tiết Hệ thống & Tooling (System & Tooling Design)

### 2.1. Git Conventions & Commit Standards

- **Tiêu chuẩn:** Tuân thủ chuẩn [Conventional Commits](https://www.conventionalcommits.org/):
  - `feat`: Tính năng mới cho người dùng.
  - `fix`: Sửa lỗi phát sinh.
  - `refactor`: Tái cấu trúc mã không thay đổi hành vi nghiệp vụ.
  - `perf`: Tối ưu hiệu năng, giảm bundle size, cải thiện LCP/FID.
  - `chore`: Cập nhật build tools, dependencies, git hooks.
  - `docs`: Thêm hoặc sửa đổi tài liệu kỹ thuật, specs.
  - `test`: Bổ sung hoặc refactor unit/e2e tests.
- **Công cụ áp dụng:**
  - `@commitlint/cli` & `@commitlint/config-conventional`
  - `husky` v9
  - `lint-staged`
- **Tập lệnh hooks:**
  - `.husky/commit-msg`: Thực thi `npx --no -- commitlint --edit "$1"`
  - `.husky/pre-commit`: Kích hoạt `npx lint-staged`

### 2.2. Formatting & Linting Pipeline

- **Prettier:** Cài đặt `prettier` cùng `prettier-plugin-tailwindcss`. Cấu hình `.prettierrc.mjs`:
  - `singleQuote: false`
  - `semi: true`
  - `tabWidth: 2`
  - `trailingComma: "all"`
  - `plugins: ["prettier-plugin-tailwindcss"]`
- **Lint-staged:** Cấu hình trong `package.json` hoặc `.lintstagedrc.json`:
  ```json
  {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md,css}": ["prettier --write"]
  }
  ```
- **ESLint 9 Flat Config (`eslint.config.mjs`):** Tích hợp Next.js Core Web Vitals, TypeScript ESLint và vô hiệu hóa các xung đột với Prettier.

### 2.3. System Files & Rules

- **`.env.example`:** Tạo tài liệu cấu hình chuẩn:
  ```bash
  DATABASE_URL="file:./dev.db"
  NEXT_PUBLIC_APP_URL="http://localhost:3000"
  ```
- **`.gitignore`:** Bổ sung các mẫu bỏ qua an toàn:
  - SQLite temp files (`*.db-shm`, `*.db-wal`)
  - Tooling cache (`.husky/_`, `skills-lock.json`, `.agents/`, `.claude/`, `.windsurf/` nếu không muốn commit cache công cụ)
  - Next build and test report files.
- **`AGENTS.md`:**
  - Giữ nguyên vẹn 100% block tự sinh ở đầu file:
    ```markdown
    <!-- BEGIN:nextjs-agent-rules -->

    ...
    <!-- END:nextjs-agent-rules -->
    ```
  - Bổ sung các section hướng dẫn chi tiết dành cho Developer / AI Agents:
    1. Project Stack & Architecture Overview.
    2. Feature-based Directory Structure & File Placement Rules.
    3. Server Component vs Client Component Rules (RSC First).
    4. Service Layer & Database Access Rules (Prisma via Service only).
    5. Git Workflow & Conventional Commits.
    6. Essential CLI Commands (`npm run dev`, `npm run build`, `npm run lint`, `npm test:e2e`).

---

## 3. Kiến trúc Codebase & Mô hình Thư mục (Codebase Architecture)

### 3.1. Sơ đồ Cấu trúc `src/`

```
src/
├── app/                                # THIN ROUTING LAYER (Next.js 16 App Router)
│   ├── (catalog)/
│   │   ├── dien-thoai/                 # Category & Filter Pages (RSC)
│   │   └── dien-thoai/[slug]/          # Product Detail Page (RSC)
│   ├── sua-chua/
│   │   ├── page.tsx                    # Repair Landing Page (RSC)
│   │   └── [slug]/page.tsx             # Repair Service Detail Page (RSC)
│   ├── tra-cuu-bao-hanh/page.tsx       # Warranty Lookup Page (RSC)
│   ├── gio-hang/page.tsx               # Cart Page
│   ├── api/                            # Thin Route Handlers
│   │   ├── products/route.ts
│   │   ├── repair-services/route.ts
│   │   ├── comments/route.ts
│   │   └── warranty/route.ts
│   ├── layout.tsx                      # Root Layout (Server)
│   ├── globals.css                     # Tailwind v4 styles
│   └── error.tsx / not-found.tsx
│
├── features/                           # DOMAIN MODULES (Self-contained)
│   ├── products/                       # Module Quản lý Sản phẩm
│   │   ├── components/
│   │   │   ├── ProductCard.tsx         # Card item trong danh sách
│   │   │   ├── ProductGrid.tsx         # Lưới sản phẩm & phân trang
│   │   │   ├── ProductGallery.tsx      # Carousel / Zoom ảnh chi tiết (Client)
│   │   │   ├── ProductPriceSummary.tsx # Khối giá, bảo hành vàng, khuyến mãi
│   │   │   ├── ProductOptions.tsx      # Chọn biến thể màu / dung lượng (Client)
│   │   │   └── ProductComments.tsx     # Form đánh giá & danh sách comment (Client)
│   │   ├── services/
│   │   │   └── product.service.ts      # Query Prisma: findProducts, getProductBySlug, createComment
│   │   ├── schemas/
│   │   │   └── product.schema.ts       # Zod schemas: productFilterSchema, commentInputSchema
│   │   └── types/
│   │       └── product.types.ts        # ProductWithRelations, VariantOption
│   │
│   ├── repairs/                        # Module Dịch vụ Sửa chữa
│   │   ├── components/
│   │   │   ├── RepairSearch.tsx        # Tìm kiếm thiết bị/dịch vụ (Client)
│   │   │   ├── RepairServiceTable.tsx  # Bảng giá dịch vụ theo dòng máy
│   │   │   ├── RepairBookingModal.tsx  # Modal đặt hẹn sửa chữa (Client)
│   │   │   └── RepairProcessSteps.tsx  # Quy trình sửa chữa chuẩn 5 bước
│   │   ├── services/
│   │   │   └── repair.service.ts       # Query Prisma: getRepairServices, getServiceById
│   │   ├── schemas/
│   │   │   └── repair.schema.ts        # Zod schemas: repairBookingSchema
│   │   └── types/
│   │       └── repair.types.ts
│   │
│   ├── warranty/                       # Module Tra cứu & Chính sách Bảo hành
│   │   ├── components/
│   │   │   ├── WarrantyLookupForm.tsx  # Form nhập IMEI/Số điện thoại (Client)
│   │   │   └── WarrantyResultCard.tsx  # Hiển thị thông tin bảo hành vàng/tiêu chuẩn
│   │   ├── services/
│   │   │   └── warranty.service.ts     # Query Prisma: lookupWarrantyPackage
│   │   ├── schemas/
│   │   │   └── warranty.schema.ts      # Zod schemas: warrantyLookupSchema
│   │   └── types/
│   │       └── warranty.types.ts
│   │
│   └── cart/                           # Module Giỏ hàng & Thanh toán
│       ├── components/
│       │   ├── CartItemList.tsx
│       │   ├── CartSummary.tsx
│       │   └── CheckoutModal.tsx
│       └── types/
│           └── cart.types.ts
│
└── shared/                             # CROSS-CUTTING CONCERNS (Dùng chung)
    ├── components/
    │   ├── ui/                         # Design System Primitives
    │   │   ├── Button.tsx
    │   │   ├── Input.tsx
    │   │   ├── Modal.tsx
    │   │   ├── Badge.tsx
    │   │   ├── Skeleton.tsx
    │   │   └── Toast.tsx
    │   └── layout/                     # Global Shell & Navigation
    │       ├── Header/
    │       │   ├── Header.tsx          # Sticky wrapper
    │       │   ├── HeaderTop.tsx       # Thanh phụ trợ (khu vực, hotline, đăng nhập)
    │       │   ├── HeaderMain.tsx      # Thanh điều hướng chính & search
    │       │   └── MegaMenu.tsx        # Danh mục đa cấp
    │       ├── Footer.tsx              # Chân trang hệ thống showroom
    │       ├── MobileBottomNav.tsx     # Navigation bar mobile
    │       └── FloatingContactWidget.tsx # Zalo / Hotline speed dial
    ├── context/                        # Global State Providers
    │   ├── CartContext.tsx
    │   ├── RegionContext.tsx           # Quản lý khu vực (HN, HCM, DN)
    │   └── ToastContext.tsx
    ├── lib/                            # Infrastructure & Helpers
    │   ├── db.ts                       # Prisma Client Singleton (Safe Hot-Reload)
    │   ├── formatters.ts               # formatVND, formatDate, formatPhoneNumber
    │   └── constants.ts                # Config constants, nav links, hotlines
    └── types/                          # Generic App Types (ApiResponse, Pagination)
        └── index.ts
```

### 3.2. Quy ước Server vs Client Components (RSC Boundary Rules)

1. **Server Components by Default:** Tất cả các component trong `src/app/` và các sub-component hiển thị dữ liệu tĩnh/SEO đều là Server Components (không có chỉ thị `"use client"`).
2. **Client Leaf Components:** Chỉ thêm `"use client"` vào component cấp thấp nhất thực sự cần:
   - State (`useState`, `useReducer`).
   - Browser Event Listeners (`onClick`, `onChange`, `onSubmit`).
   - Browser APIs (`localStorage`, `window.addEventListener`).
   - Context Consumers (`useCart`, `useRegion`, `useToast`).
3. **Tránh Monolithic Client Component:** Chia nhỏ `ProductDetailClient.tsx` (~640 dòng) thành:
   - `ProductGallery.tsx` (`"use client"`: swipe ảnh, thumbnail preview).
   - `ProductPriceSummary.tsx` (RSC: render giá gốc, giá KM, quyền lợi bảo hành).
   - `ProductOptions.tsx` (`"use client"`: chọn màu, dung lượng, thay đổi URL param hoặc state).
   - `ProductComments.tsx` (`"use client"`: form gửi đánh giá, list comment).

### 3.3. Service Layer & Data Access Pattern

- **Không gọi Prisma trực tiếp trong Route Handlers hoặc Components:** Mọi thao tác Database phải thông qua Service Function tương ứng.
- **Service Signature:**
  - Nhận tham số rõ ràng với kiểu dữ liệu TypeScript.
  - Xử lý mapping dữ liệu hoặc parse JSON trường phức tạp (`images`, `specs`).
  - Trả về DTO (Data Transfer Object) chuẩn.
- **Route Handler Pattern:**
  ```typescript
  // src/app/api/products/route.ts
  import { NextRequest, NextResponse } from "next/server";
  import { getProductsService } from "@/features/products/services/product.service";
  import { productQuerySchema } from "@/features/products/schemas/product.schema";

  export async function GET(req: NextRequest) {
    try {
      const searchParams = Object.fromEntries(req.nextUrl.searchParams.entries());
      const query = productQuerySchema.parse(searchParams);
      const data = await getProductsService(query);
      return NextResponse.json({ success: true, data });
    } catch (error) {
      return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
    }
  }
  ```

---

## 4. Chiến lược Thực thi & Di chuyển (Migration Strategy)

Để đảm bảo không phát sinh regression, quá trình tái cấu trúc chia làm 4 giai đoạn độc lập:

1. **Giai đoạn 1: System Files, Git Conventions & Tooling (Zero Code Disruption)**
   - Cài đặt devDependencies: `prettier`, `prettier-plugin-tailwindcss`, `husky`, `lint-staged`, `@commitlint/cli`, `@commitlint/config-conventional`, `zod`.
   - Khởi tạo `.husky/` hooks và `commitlint.config.mjs`.
   - Cấu hình `.prettierrc.mjs`, cập nhật `eslint.config.mjs` và `.gitignore`.
   - Tạo `.env.example` và cập nhật `AGENTS.md`.
   - Thêm scripts vào `package.json` (`format`, `format:check`, `prepare`).
   - Chạy format toàn dự án và verify qua test suite.

2. **Giai đoạn 2: Trích xuất Shared Layer (`src/shared/`)**
   - Di chuyển components dùng chung từ `src/components/ui/` và `src/components/layout/` sang `src/shared/components/`.
   - Chuẩn hóa `src/shared/lib/db.ts`, `src/shared/lib/formatters.ts`, `src/shared/lib/constants.ts`.
   - Chuẩn hóa `src/shared/context/` và types dùng chung trong `src/shared/types/`.
   - Cập nhật import paths thông qua alias `@/shared/*`. Kiểm tra TypeScript compile (`npm run build`).

3. **Giai đoạn 3: Module hóa Features (`src/features/*`)**
   - **Feature Warranty & Repairs:**
     - Tạo `src/features/repairs/` và `src/features/warranty/`.
     - Chuyển `WarrantyLookupClient.tsx` và `RepairClient.tsx`, tách nhỏ các components con.
     - Tạo `repair.service.ts` và `warranty.service.ts` bao bọc logic DB.
   - **Feature Products & Cart:**
     - Tạo `src/features/products/` và `src/features/cart/`.
     - Tách nhỏ `ProductDetailClient.tsx` thành `ProductGallery`, `ProductOptions`, `ProductPriceSummary`.
     - Tạo `product.service.ts` bao bọc toàn bộ Prisma product queries.
   - Cập nhật các Route Handlers trong `src/app/api/` sử dụng Services và Zod validation.

4. **Giai đoạn 4: Hoàn thiện App Router Thin Layer & Verification**
   - Refactor các file `page.tsx` trong `src/app/` thành Server Components tinh gọn gọi trực tiếp Service.
   - Chạy `npm run lint` và `npm run build` để xác thực toàn bộ TypeScript types và Next.js build.
   - Chạy E2E tests (`npm run test:e2e`) bằng Playwright để kiểm tra toàn bộ luồng người dùng (Trang chủ, Chi tiết sản phẩm, Giỏ hàng, Sửa chữa, Tra cứu bảo hành).

---

## 5. Tiêu chí Nghiệm thu (Acceptance Criteria)

- [ ] Cú pháp git commit được kiểm soát bởi commitlint; pre-commit hook tự động format và lint file staged.
- [ ] `AGENTS.md` được bổ sung đầy đủ conventions nhưng giữ nguyên block Next.js do framework sinh ra.
- [ ] Thư mục `src/features/` và `src/shared/` được tổ chức ngăn nắp, không còn file component monolithic vượt quá 300 dòng.
- [ ] Không có query Prisma raw nằm rải rác trong các route handlers; 100% API input được validate bằng Zod schemas.
- [ ] Lệnh `npm run lint` và `npm run build` chạy thành công mà không có lỗi TypeScript hay warning nghiêm trọng.
- [ ] Toàn bộ bộ test E2E Playwright hiện có pass 100%.
