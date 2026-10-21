# Codebase Restructuring & Engineering Standards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Chuyển đổi toàn diện dự án MobileCity v3 sang kiến trúc Screaming Feature-Based Architecture (Next.js 16 App Router + React 19), chuẩn hóa Git Conventions (Husky, commitlint, lint-staged), Formatting (Prettier Tailwind), cập nhật các file hệ thống (`AGENTS.md`, `.gitignore`, `.env.example`), và xóa bỏ các client component monolithic mà vẫn bảo toàn 100% test E2E.

**Architecture:** Áp dụng mô hình Feature-based colocation trong `src/features/*` (mỗi feature tự quản components, service layer truy vấn Prisma, Zod schemas và types), gom các tài nguyên dùng chung vào `src/shared/*` (UI atoms, layout, context, db singleton), và giữ `src/app/` là Thin Routing Layer chỉ điều phối dữ liệu Server Components.

**Tech Stack:** Next.js 16.4.2 (App Router), React 19.3.0, TypeScript 5, Tailwind CSS v4, Prisma 5.22, Zod, Prettier, Husky, Commitlint, Playwright.

---

### Task 1: Thiết lập Tooling, Git Conventions & Code Style

**Files:**

- Create: `commitlint.config.mjs`
- Create: `.prettierrc.mjs`
- Create: `.prettierignore`
- Create: `.husky/commit-msg`
- Create: `.husky/pre-commit`
- Modify: `package.json`

- [ ] **Step 1: Cài đặt các devDependencies phục vụ Git hooks, linting, formatting và validation**

Chạy lệnh cài đặt:

```bash
npm install -D @commitlint/cli @commitlint/config-conventional husky lint-staged prettier prettier-plugin-tailwindcss
npm install zod
```

- [ ] **Step 2: Tạo file cấu hình Commitlint `commitlint.config.mjs`**

Tạo file [commitlint.config.mjs](file:///d:/Projects/Personal/AI/_pet/mobile-cityv3/commitlint.config.mjs) với nội dung:

```javascript
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "refactor", "perf", "chore", "test", "docs", "style", "ci", "revert"],
    ],
    "subject-case": [0],
  },
};
```

- [ ] **Step 3: Tạo cấu hình Prettier `.prettierrc.mjs` và `.prettierignore`**

Tạo file [.prettierrc.mjs](file:///d:/Projects/Personal/AI/_pet/mobile-cityv3/.prettierrc.mjs):

```javascript
/** @type {import("prettier").Config} */
export default {
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
  printWidth: 100,
  plugins: ["prettier-plugin-tailwindcss"],
};
```

Tạo file [.prettierignore](file:///d:/Projects/Personal/AI/_pet/mobile-cityv3/.prettierignore):

```
node_modules
.next
build
dist
coverage
test-results
playwright-report
*.db*
skills-lock.json
```

- [ ] **Step 4: Khởi tạo Husky và cấu hình hooks**

Chạy lệnh khởi tạo husky:

```powershell
npx husky init
```

Tạo hook kiểm tra commit message tại [.husky/commit-msg](file:///d:/Projects/Personal/AI/_pet/mobile-cityv3/.husky/commit-msg):

```sh
npx --no -- commitlint --edit "$1"
```

Tạo hook pre-commit kiểm tra staged files tại [.husky/pre-commit](file:///d:/Projects/Personal/AI/_pet/mobile-cityv3/.husky/pre-commit):

```sh
npx lint-staged
```

- [ ] **Step 5: Bổ sung scripts và cấu hình lint-staged vào `package.json`**

Cập nhật `scripts` và `lint-staged` trong [package.json](file:///d:/Projects/Personal/AI/_pet/mobile-cityv3/package.json):

```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "prepare": "husky",
    "test:e2e": "playwright test",
    "crawl:links": "node scripts/crawl-links.cjs",
    "crawl:data": "node scripts/crawl-data.cjs",
    "seed:crawled": "node scripts/seed-crawled.cjs"
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md,css}": [
      "prettier --write"
    ]
  }
```

- [ ] **Step 6: Kiểm tra định dạng và commit**

Chạy lệnh:

```powershell
npm run format:check
```

Commit thay đổi:

```powershell
git add package.json package-lock.json commitlint.config.mjs .prettierrc.mjs .prettierignore .husky
git commit -m "chore: setup husky commitlint lint-staged and prettier"
```

---

### Task 2: Chuẩn hóa File Hệ thống (`AGENTS.md`, `.env.example`, `.gitignore`)

**Files:**

- Create: `.env.example`
- Modify: `.gitignore`
- Modify: `AGENTS.md`

- [ ] **Step 1: Tạo file mẫu môi trường `.env.example`**

Tạo file [.env.example](file:///d:/Projects/Personal/AI/_pet/mobile-cityv3/.env.example):

```bash
# SQLite Database connection URL
DATABASE_URL="file:./dev.db"

# Public Application URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

- [ ] **Step 2: Cập nhật `.gitignore` hoàn chỉnh**

Cập nhật [.gitignore](file:///d:/Projects/Personal/AI/_pet/mobile-cityv3/.gitignore):

```gitignore
# dependencies
/node_modules
/.pnp
.pnp.*

# testing & e2e
/coverage
test-results/
playwright-report/

# next.js
/.next/
/out/
/build

# environment & logs
.env*.local
.env
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# system & IDE
.DS_Store
*.pem
*.tsbuildinfo
next-env.d.ts

# database
dev.db*
scripts/fixtures/.crawl-checkpoint.json

# agent and tool caches
skills-lock.json
.agents/
.windsurf/
.claude/
```

- [ ] **Step 3: Cập nhật `AGENTS.md` (bảo toàn block Next.js)**

Cập nhật [AGENTS.md](file:///d:/Projects/Personal/AI/_pet/mobile-cityv3/AGENTS.md), giữ nguyên block tự sinh từ dòng 1 đến 9 và bổ sung phần kiến trúc:

```markdown
<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# MobileCity v3 Engineering Standards & Guidelines

## 1. Tech Stack Overview

- **Framework:** Next.js 16 (App Router + Turbopack)
- **UI:** React 19, Tailwind CSS v4, Lucide React
- **ORM & DB:** Prisma 5, SQLite (`dev.db`)
- **Validation:** Zod
- **Testing:** Playwright E2E

## 2. Architecture: Screaming Feature-Based

- `src/features/<feature-name>/`: Domain modules containing:
  - `components/`: Feature-scoped React components.
  - `services/`: Feature-scoped business logic and Prisma database access.
  - `schemas/`: Zod validation schemas for inputs and server operations.
  - `types/`: Feature-scoped TypeScript definitions.
- `src/shared/`: Cross-cutting concerns:
  - `components/ui/`: Atomic design system components (Button, Input, Modal, Badge, Toast).
  - `components/layout/`: Global layout components (Header, Footer, MegaMenu, MobileNav).
  - `context/`: React context providers (Cart, Region, Toast).
  - `lib/`: Utilities, constants, and Prisma singleton (`db.ts`).
  - `types/`: Global system types.
- `src/app/`: Strictly thin routing layer (React Server Components by default).

## 3. Server vs Client Component Boundaries

- **RSC Default:** All `page.tsx`, `layout.tsx`, and static presentations are Server Components.
- **Client Leaf Rule:** Use `"use client"` only at leaf components requiring interactivity, state, browser events, or context access. Never make entire pages client components.

## 4. Database & Service Layer Rules

- NEVER run direct Prisma queries in route handlers (`app/api/*`) or client components.
- Always encapsulate queries inside `src/features/*/services/*.service.ts`.
- Always validate incoming payload using Zod schemas before calling service methods.

## 5. Git Conventions

- All commits MUST follow Conventional Commits: `feat:`, `fix:`, `refactor:`, `perf:`, `chore:`, `test:`, `docs:`.
- Verified automatically via Husky and Commitlint hooks.

## 6. Common Commands

- `npm run dev`: Start development server with Turbopack.
- `npm run build`: Type-check and production build.
- `npm run lint`: Run ESLint checks.
- `npm run format`: Format codebase with Prettier.
- `npm run test:e2e`: Run Playwright end-to-end tests.
```

- [ ] **Step 4: Commit thay đổi file hệ thống**

```powershell
git add .env.example .gitignore AGENTS.md
git commit -m "docs: standardize AGENTS.md, gitignore and env.example"
```

---

### Task 3: Trích xuất Shared Layer (`src/shared/`)

**Files:**

- Create: `src/shared/lib/db.ts`
- Create: `src/shared/lib/formatters.ts`
- Create: `src/shared/lib/constants.ts`
- Create: `src/shared/types/index.ts`
- Move/Create: `src/shared/context/CartContext.tsx`
- Move/Create: `src/shared/context/RegionContext.tsx`
- Move/Create: `src/shared/context/ToastContext.tsx`
- Move/Create: `src/shared/components/ui/ToastContainer.tsx`
- Move/Create: `src/shared/components/ui/ProductCardSkeleton.tsx`
- Move/Create: `src/shared/components/layout/Header.tsx`
- Move/Create: `src/shared/components/layout/HeaderTop.tsx`
- Move/Create: `src/shared/components/layout/HeaderMain.tsx`
- Move/Create: `src/shared/components/layout/MegaMenu.tsx`
- Move/Create: `src/shared/components/layout/Footer.tsx`
- Move/Create: `src/shared/components/layout/MobileBottomNav.tsx`
- Move/Create: `src/shared/components/layout/FloatingContactWidget.tsx`

- [ ] **Step 1: Tạo các thư mục đích trong `src/shared/`**

Chạy lệnh tạo cây thư mục:

```powershell
New-Item -ItemType Directory -Force -Path src/shared/lib, src/shared/types, src/shared/context, src/shared/components/ui, src/shared/components/layout
```

- [ ] **Step 2: Tạo `src/shared/lib/db.ts` (Prisma singleton an toàn hot-reload)**

Tạo file [src/shared/lib/db.ts](file:///d:/Projects/Personal/AI/_pet/mobile-cityv3/src/shared/lib/db.ts):

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
```

- [ ] **Step 3: Tạo `src/shared/lib/formatters.ts`**

Tạo file [src/shared/lib/formatters.ts](file:///d:/Projects/Personal/AI/_pet/mobile-cityv3/src/shared/lib/formatters.ts):

```typescript
export function formatCurrencyVND(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("vi-VN").format(num);
}
```

- [ ] **Step 4: Chuyển constants, types và contexts sang `src/shared/`**

Chuyển đổi:

- Copy nội dung `src/lib/constants.ts` sang `src/shared/lib/constants.ts`.
- Copy `src/types/index.ts` sang `src/shared/types/index.ts`.
- Chuyển `src/context/CartContext.tsx`, `RegionContext.tsx`, `ToastContext.tsx` sang `src/shared/context/`.
- Chuyển `src/components/ui/*` sang `src/shared/components/ui/`.
- Chuyển `src/components/layout/*` sang `src/shared/components/layout/`.

- [ ] **Step 5: Tạo re-export tương thích tại các vị trí cũ để không làm gãy codebase hiện tại**

Tạo re-export tại:

- `src/lib/db.ts` re-export từ `@/shared/lib/db`.
- `src/lib/constants.ts` re-export từ `@/shared/lib/constants`.
- `src/context/*` re-export từ `@/shared/context/*`.
- `src/components/layout/*` re-export từ `@/shared/components/layout/*`.

- [ ] **Step 6: Kiểm tra biên dịch TypeScript**

Chạy lệnh:

```powershell
npm run build
```

Đảm bảo build thành công 0 lỗi.

- [ ] **Step 7: Commit task 3**

```powershell
git add src/shared src/lib src/context src/components
git commit -m "refactor(shared): extract shared infrastructure, layout and context modules"
```

---

### Task 4: Module hóa Feature Repairs & Warranty

**Files:**

- Create: `src/features/repairs/types/repair.types.ts`
- Create: `src/features/repairs/schemas/repair.schema.ts`
- Create: `src/features/repairs/services/repair.service.ts`
- Create: `src/features/repairs/components/RepairSearch.tsx`
- Create: `src/features/repairs/components/RepairServiceTable.tsx`
- Create: `src/features/repairs/components/RepairBookingModal.tsx`
- Create: `src/features/repairs/components/RepairProcessSteps.tsx`
- Create: `src/features/warranty/types/warranty.types.ts`
- Create: `src/features/warranty/schemas/warranty.schema.ts`
- Create: `src/features/warranty/services/warranty.service.ts`
- Create: `src/features/warranty/components/WarrantyLookupForm.tsx`
- Create: `src/features/warranty/components/WarrantyResultCard.tsx`
- Modify: `src/app/sua-chua/page.tsx`
- Modify: `src/app/sua-chua/[slug]/page.tsx`
- Modify: `src/app/tra-cuu-bao-hanh/page.tsx`
- Modify: `src/app/api/repair-services/route.ts`
- Modify: `src/app/api/warranty/route.ts`

- [ ] **Step 1: Tạo cấu trúc thư mục cho repairs và warranty**

```powershell
New-Item -ItemType Directory -Force -Path src/features/repairs/components, src/features/repairs/services, src/features/repairs/schemas, src/features/repairs/types, src/features/warranty/components, src/features/warranty/services, src/features/warranty/schemas, src/features/warranty/types
```

- [ ] **Step 2: Viết Repair Service, Schema & Types**

Tạo `repair.schema.ts` với Zod để validate input:

```typescript
import { z } from "zod";

export const repairQuerySchema = z.object({
  device: z.string().optional(),
  service: z.string().optional(),
});

export const repairBookingSchema = z.object({
  fullName: z.string().min(2, "Vui lòng nhập họ tên"),
  phone: z.string().min(10, "Số điện thoại không hợp lệ"),
  deviceModel: z.string().min(1, "Vui lòng chọn dòng máy"),
  serviceId: z.string().min(1, "Vui lòng chọn dịch vụ"),
  branchId: z.string().optional(),
  note: z.string().optional(),
});
```

Tạo `repair.service.ts` truy vấn từ Prisma:

```typescript
import { prisma } from "@/shared/lib/db";

export async function getRepairServices(params?: { device?: string; service?: string }) {
  const where: any = {};
  if (params?.device) {
    where.deviceModel = { contains: params.device };
  }
  if (params?.service) {
    where.serviceName = { contains: params.service };
  }
  return prisma.repairService.findMany({
    where,
    orderBy: { deviceModel: "asc" },
  });
}

export async function getRepairServiceBySlug(slug: string) {
  // Logic trích xuất dịch vụ theo model/service slug
  return prisma.repairService.findFirst({
    where: {
      deviceModel: { contains: slug.replace(/-/g, " ") },
    },
  });
}
```

- [ ] **Step 3: Tách `RepairClient.tsx` thành các leaf components**

Tách các sub-components từ `RepairClient.tsx`:

- `RepairSearch.tsx`: Input tìm kiếm thiết bị / dịch vụ.
- `RepairServiceTable.tsx`: Bảng danh mục giá và thời gian sửa.
- `RepairBookingModal.tsx`: Form đặt lịch hẹn tích hợp Toast.
- `RepairProcessSteps.tsx`: 5 bước sửa chữa chuyên nghiệp tại MobileCity.

- [ ] **Step 4: Viết Warranty Service, Schema & Types**

Tạo `warranty.schema.ts`:

```typescript
import { z } from "zod";

export const warrantyLookupSchema = z.object({
  code: z.string().trim().min(6, "Mã IMEI hoặc SĐT phải có tối thiểu 6 ký tự"),
});
```

Tạo `warranty.service.ts`:

```typescript
import { prisma } from "@/shared/lib/db";

export async function lookupWarranty(query: string) {
  // Tìm kiếm theo số điện thoại hoặc IMEI trong cơ sở dữ liệu
  return prisma.productVariant.findFirst({
    where: {
      OR: [{ sku: { contains: query } }],
    },
    include: {
      product: true,
    },
  });
}
```

Tách `WarrantyLookupClient.tsx` thành `WarrantyLookupForm.tsx` và `WarrantyResultCard.tsx`.

- [ ] **Step 5: Cập nhật App Pages và API Route Handlers**

- Cập nhật `src/app/api/repair-services/route.ts` sử dụng `getRepairServices` và `repairQuerySchema`.
- Cập nhật `src/app/api/warranty/route.ts` sử dụng `lookupWarranty` và `warrantyLookupSchema`.
- Cập nhật `src/app/sua-chua/page.tsx` và `src/app/tra-cuu-bao-hanh/page.tsx` nhập components từ `@/features/repairs` và `@/features/warranty`.

- [ ] **Step 6: Kiểm tra build**

```powershell
npm run build
```

Expected: PASS không có lỗi type.

- [ ] **Step 7: Commit task 4**

```powershell
git add src/features/repairs src/features/warranty src/app/sua-chua src/app/tra-cuu-bao-hanh src/app/api/repair-services src/app/api/warranty
git commit -m "feat(features): modularize repairs and warranty domains into dedicated feature folders"
```

---

### Task 5: Module hóa Feature Products & Cart

**Files:**

- Create: `src/features/products/types/product.types.ts`
- Create: `src/features/products/schemas/product.schema.ts`
- Create: `src/features/products/services/product.service.ts`
- Create: `src/features/products/components/ProductCard.tsx`
- Create: `src/features/products/components/ProductGallery.tsx`
- Create: `src/features/products/components/ProductPriceSummary.tsx`
- Create: `src/features/products/components/ProductOptions.tsx`
- Create: `src/features/products/components/ProductComments.tsx`
- Create: `src/features/cart/types/cart.types.ts`
- Create: `src/features/cart/components/CartItemList.tsx`
- Create: `src/features/cart/components/CartSummary.tsx`
- Modify: `src/app/dien-thoai/page.tsx`
- Modify: `src/app/dien-thoai/[slug]/page.tsx`
- Modify: `src/app/gio-hang/page.tsx`
- Modify: `src/app/api/products/route.ts`
- Modify: `src/app/api/comments/route.ts`

- [ ] **Step 1: Tạo cấu trúc thư mục cho products và cart**

```powershell
New-Item -ItemType Directory -Force -Path src/features/products/components, src/features/products/services, src/features/products/schemas, src/features/products/types, src/features/cart/components, src/features/cart/types
```

- [ ] **Step 2: Viết Product Service, Zod Schemas & Types**

Tạo `product.schema.ts`:

```typescript
import { z } from "zod";

export const productFilterSchema = z.object({
  brand: z.string().optional(),
  category: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  sortBy: z.enum(["price_asc", "price_desc", "newest", "popular"]).optional(),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(20),
});

export const commentSubmissionSchema = z.object({
  productId: z.string().min(1),
  userName: z.string().min(2, "Họ tên phải từ 2 ký tự"),
  userPhone: z.string().optional(),
  rating: z.number().min(1).max(5),
  content: z.string().min(10, "Nội dung đánh giá tối thiểu 10 ký tự"),
});
```

Tạo `product.service.ts`:

```typescript
import { prisma } from "@/shared/lib/db";
import type { Prisma } from "@prisma/client";

export async function getProducts(filters?: {
  brand?: string;
  category?: string;
  isHot?: boolean;
  isFlashSale?: boolean;
}) {
  const where: Prisma.ProductWhereInput = {};
  if (filters?.brand) where.brand = { slug: filters.brand };
  if (filters?.category) where.category = { slug: filters.category };
  if (filters?.isHot) where.isHot = true;
  if (filters?.isFlashSale) where.isFlashSale = true;

  return prisma.product.findMany({
    where,
    include: {
      brand: true,
      category: true,
      variants: {
        include: { inventories: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      brand: true,
      category: true,
      variants: {
        include: { inventories: true },
      },
      reviews: {
        orderBy: { createdAt: "desc" },
      },
    },
  });
}

export async function addProductReview(data: {
  productId: string;
  userName: string;
  userPhone?: string;
  rating: number;
  content: string;
}) {
  return prisma.productReview.create({
    data: {
      productId: data.productId,
      userName: data.userName,
      userPhone: data.userPhone ?? "",
      rating: data.rating,
      comment: data.content,
    },
  });
}
```

- [ ] **Step 3: Tách `ProductDetailClient.tsx` (>640 dòng) thành các Leaf Components**

- `ProductGallery.tsx`: Quản lý thumbnails, active preview, zoom ảnh.
- `ProductPriceSummary.tsx`: Hiển thị giá sốc, chênh lệch giá gốc, gói Bảo Hành Vàng 12 tháng.
- `ProductOptions.tsx`: Lựa chọn biến thể màu sắc (Titan Tự Nhiên, Đen, Trắng), bộ nhớ (256GB, 512GB, 1TB), trạng thái kho theo chi nhánh (HN/HCM/DN).
- `ProductComments.tsx`: Form gửi đánh giá và danh sách comment có badge mua hàng thực tế.

- [ ] **Step 4: Tách `gio-hang` thành Cart Components**

- `CartItemList.tsx`: Bảng danh sách sản phẩm, tăng/giảm số lượng, xóa item.
- `CartSummary.tsx`: Tóm tắt tổng tiền, phí vận chuyển tạm tính, nút tiến hành đặt hàng.

- [ ] **Step 5: Dọn dẹp thư mục `src/components/` cũ**

Sau khi toàn bộ components đã chuyển vào `src/features/` và `src/shared/components/`:

- Xóa các file component cũ trong `src/components/product/`, `src/components/repair/`, `src/components/warranty/`.
- Cập nhật triệt để mọi import statements trong `src/app/` sang alias chuẩn (`@/features/...`, `@/shared/...`).
- Xóa folder `src/components/` rỗng.

- [ ] **Step 6: Kiểm tra biên dịch TypeScript**

```powershell
npm run build
```

Expected: PASS, 0 errors.

- [ ] **Step 7: Commit task 5**

```powershell
git add src/features/products src/features/cart src/app src/components
git commit -m "refactor(products): decompose ProductDetailClient and modularize product and cart domains"
```

---

### Task 6: Toàn diện Kiểm thử, Định dạng Mã & Nghiệm thu Hệ thống

**Files:**

- All touched files

- [ ] **Step 1: Chạy định dạng toàn bộ dự án bằng Prettier**

```powershell
npm run format
```

- [ ] **Step 2: Chạy kiểm tra quy chuẩn mã nguồn (ESLint)**

```powershell
npm run lint
```

Expected: Không có cảnh báo hoặc lỗi ESLint.

- [ ] **Step 3: Kiểm tra Type check & Production Build của Next.js**

```powershell
npm run build
```

Expected: Tạo thành công production artifacts trong `.next` mà không có lỗi.

- [ ] **Step 4: Chạy toàn bộ E2E Playwright Tests**

```powershell
npm run test:e2e
```

Expected: 100% tests pass (Navigation, Homepage, Product Detail, Cart, Repair, Warranty Lookup).

- [ ] **Step 5: Kiểm tra Commitlint Hook hoạt động**

Tạo một commit thử nghiệm để xác nhận commit message hợp lệ được chấp nhận:

```powershell
git add .
git commit -m "chore(release): complete full-scope codebase restructuring and verification"
```

Expected: Husky pre-commit chạy lint-staged thành công, commit-msg hook kiểm tra Conventional Commits hợp lệ.
