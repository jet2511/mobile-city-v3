# MobileCity UI/UX Enhancements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Triển khai 5 cải tiến UI/UX trọng tâm sau đợt kiểm thử chuyên sâu: Toast Notification tương tác khi thêm giỏ hàng, Gallery chuyển ảnh đa góc nhìn trên PDP, Hiệu ứng Skeleton Shimmer Loading, Bảng tính trả góp đa ngân hàng/công ty tài chính, và Structured Data JSON-LD chuẩn SEO E-commerce.

**Architecture:** Mở rộng Context và Client Components trong hệ sinh thái Next.js 15 App Router. Bổ sung `ToastContext` nhẹ nhàng không phụ thuộc thư viện ngoài, nâng cấp `ProductDetailClient` với state quản lý active image từ mảng `product.images`, mở rộng bộ tính toán trong `/huong-dan-tra-gop` với các đối tác tài chính (FE Credit, Home Credit, Thẻ tín dụng), và nhúng Schema.org JSON-LD vào `layout.tsx` và PDP.

**Tech Stack:** Next.js 15 (App Router), React 19, Tailwind CSS v4, Lucide React, TypeScript, Better-SQLite3.

---

### File Structure Map

- **New files to create:**
  - `src/context/ToastContext.tsx`: Quản lý state thông báo nổi (Toast message, ảnh thumbnail, timeout auto-dismiss).
  - `src/components/ui/ToastContainer.tsx`: Component hiển thị thông báo góc trên bên phải hoặc góc dưới màn hình.
  - `src/components/ui/ProductCardSkeleton.tsx`: Component khung xương Shimmer Loading khi tải danh mục.
- **Files to modify:**
  - `src/app/layout.tsx`: Nhúng `ToastProvider` và `ToastContainer` toàn cục.
  - `src/components/product/ProductDetailClient.tsx`: Bổ sung dải thumbnail gallery và trigger Toast khi bấm "Thêm Giỏ" hoặc "Mua Ngay".
  - `src/app/huong-dan-tra-gop/page.tsx`: Nâng cấp bảng đối chiếu các đối tác tài chính & thẻ tín dụng.
  - `src/app/dien-thoai/[slug]/page.tsx`: Bổ sung Schema.org Product JSON-LD script.

---

### Task 1: Xây Dựng Toast Notification System Toàn Cục

**Files:**
- Create: `src/context/ToastContext.tsx`
- Create: `src/components/ui/ToastContainer.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Tạo `ToastContext.tsx`**

Tạo context quản lý danh sách toasts, hỗ trợ tự động dismiss sau 3.5 giây:

```tsx
"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export interface ToastItem {
  id: string;
  title: string;
  message?: string;
  thumbnail?: string;
  type?: "success" | "info" | "warning";
}

interface ToastContextType {
  toasts: ToastItem[];
  showToast: (toast: Omit<ToastItem, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((toast: Omit<ToastItem, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastItem = { ...toast, id };
    setToasts((prev) => [...prev.slice(-2), newToast]); // Giữ tối đa 3 toast cùng lúc

    setTimeout(() => {
      removeToast(id);
    }, 3500);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
```

- [ ] **Step 2: Tạo `src/components/ui/ToastContainer.tsx`**

```tsx
"use client";

import React from "react";
import { useToast } from "@/context/ToastContext";
import { CheckCircle2, X, ShoppingBag } from "lucide-react";
import Link from "next/link";

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      data-testid="toast-container"
      className="fixed top-20 right-4 md:right-8 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className="bg-white border border-[#e2e8f0] shadow-[0_10px_25px_-5px_rgba(15,23,42,0.15)] rounded-2xl p-3.5 flex items-center gap-3 pointer-events-auto animate-in slide-in-from-top-2 fade-in duration-200"
        >
          {t.thumbnail ? (
            <img
              src={t.thumbnail}
              alt=""
              className="w-12 h-12 object-contain rounded-lg border border-gray-100 bg-[#f8f9ff] p-1 flex-shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 size={20} />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-[#0b1c30] truncate">{t.title}</h4>
            {t.message && <p className="text-[11px] text-gray-500 mt-0.5 truncate">{t.message}</p>}
            <Link
              href="/gio-hang"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8d4b00] hover:underline mt-1"
            >
              <ShoppingBag size={12} /> Xem giỏ hàng & thanh toán
            </Link>
          </div>

          <button
            onClick={() => removeToast(t.id)}
            className="text-gray-400 hover:text-gray-600 p-1 flex-shrink-0"
            aria-label="Đóng thông báo"
          >
            <X size={15} />
          </button>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Nhúng ToastProvider & ToastContainer vào `src/app/layout.tsx`**

Bọc ứng dụng bằng `<ToastProvider>` và đặt `<ToastContainer />` cạnh `FloatingContactWidget`.

- [ ] **Step 4: Kiểm tra biên dịch**
Run: `npm run build`
Expected: Compiled successfully with 0 errors.

- [ ] **Step 5: Commit**
```bash
git add src/context/ToastContext.tsx src/components/ui/ToastContainer.tsx src/app/layout.tsx
git commit -m "feat(ui): add global toast notification system for e-commerce actions"
```

---

### Task 2: Nâng Cấp Gallery Đa Góc Nhìn & Tương Tác Giỏ Hàng trên PDP

**Files:**
- Modify: `src/components/product/ProductDetailClient.tsx`

- [ ] **Step 1: Quản lý activeImage và dải thumbnail trong `ProductDetailClient.tsx`**
  - Khai báo state `activeImage`: khởi tạo bằng `product.thumbnail` hoặc `product.images[0]`.
  - Hiển thị dải thumbnail ngang bên dưới ảnh chính:
    ```tsx
    {product.images && product.images.length > 1 && (
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {product.images.map((img: string, idx: number) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveImage(img)}
            className={`w-14 h-14 rounded-xl border p-1 bg-white flex items-center justify-center transition-all ${
              activeImage === img
                ? "border-[#8d4b00] ring-2 ring-[#8d4b00]/20 shadow-sm"
                : "border-[#e2e8f0] opacity-70 hover:opacity-100"
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-contain" />
          </button>
        ))}
      </div>
    )}
    ```

- [ ] **Step 2: Kích hoạt `showToast` khi click "Thêm Giỏ"**
  - Gọi `showToast({ title: "Đã thêm vào giỏ hàng!", message: `${product.name} (${activeVariant.color})`, thumbnail: product.thumbnail })`.

- [ ] **Step 3: Kiểm tra biên dịch**
Run: `npm run build`
Expected: Compiled successfully.

- [ ] **Step 4: Commit**
```bash
git add src/components/product/ProductDetailClient.tsx
git commit -m "feat(pdp): add multi-image gallery thumbnail slider and toast trigger"
```

---

### Task 3: Thêm Skeleton Shimmer Loading Components

**Files:**
- Create: `src/components/ui/ProductCardSkeleton.tsx`
- Modify: `src/components/catalog/CategoryListingClient.tsx`

- [ ] **Step 1: Tạo `ProductCardSkeleton.tsx`**

```tsx
import React from "react";

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-[#e2e8f0] p-3.5 animate-pulse flex flex-col space-y-3">
      <div className="w-full h-44 bg-slate-100 rounded-lg" />
      <div className="space-y-1.5 flex-1">
        <div className="h-3 w-16 bg-slate-100 rounded" />
        <div className="h-4 w-full bg-slate-100 rounded" />
        <div className="h-4 w-3/4 bg-slate-100 rounded" />
      </div>
      <div className="pt-2 space-y-2">
        <div className="h-5 w-24 bg-slate-100 rounded" />
        <div className="h-6 w-full bg-slate-100 rounded" />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Cập nhật `CategoryListingClient.tsx`**
  - Thêm state chuyển trang hoặc loading khi tìm kiếm để render 4 skeleton card mẫu nếu cần.

- [ ] **Step 3: Kiểm tra biên dịch**
Run: `npm run build`
Expected: Compiled successfully.

- [ ] **Step 4: Commit**
```bash
git add src/components/ui/ProductCardSkeleton.tsx src/components/catalog/CategoryListingClient.tsx
git commit -m "feat(ui): add product card skeleton loading component"
```

---

### Task 4: Nâng Cấp Bảng So Sánh Công Ty Tài Chính & Trả Góp Đa Ngân Hàng

**Files:**
- Modify: `src/app/huong-dan-tra-gop/page.tsx`

- [ ] **Step 1: Bổ sung tab chuyển đổi phương thức trả góp**
  - Tab 1: **Trả góp qua Công ty Tài chính (FE Credit, Home Credit, HD Saison)** - Thủ tục CCCD, duyệt 5 phút.
  - Tab 2: **Trả góp qua Thẻ Tín Dụng 0% (Visa, Mastercard, JCB qua 25 ngân hàng)** - Lãi suất 0%, phí chuyển đổi chỉ từ 1%.
  - Hiển thị bảng chi tiết:
    - Khoản vay
    - Số tiền trả trước
    - Số tiền trả mỗi tháng (theo kỳ hạn 6, 9, 12 tháng)
    - Tỷ lệ duyệt hồ sơ

- [ ] **Step 2: Kiểm tra biên dịch**
Run: `npm run build`
Expected: Compiled successfully.

- [ ] **Step 3: Commit**
```bash
git add src/app/huong-dan-tra-gop/page.tsx
git commit -m "feat(installment): add multi-partner financial comparison tabs"
```

---

### Task 5: Bổ Sung Structured Data JSON-LD Chuẩn SEO E-Commerce

**Files:**
- Modify: `src/app/dien-thoai/[slug]/page.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Tạo Schema `Product` và `BreadcrumbList` trong `dien-thoai/[slug]/page.tsx`**

Nhúng script type `application/ld+json`:
```tsx
const productSchema = {
  "@context": "https://schema.org/",
  "@type": "Product",
  name: fullProduct.name,
  image: fullProduct.thumbnail,
  description: fullProduct.description,
  brand: {
    "@type": "Brand",
    name: fullProduct.brandName,
  },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "VND",
    lowPrice: fullProduct.variants[0]?.salePrice || 0,
    highPrice: fullProduct.variants[fullProduct.variants.length - 1]?.salePrice || 0,
    offerCount: fullProduct.variants.length,
    availability: "https://schema.org/InStock",
  },
};
```

- [ ] **Step 2: Thêm Schema `LocalBusiness` / `Store` vào `src/app/page.tsx`**
  - Khai báo hệ thống showroom MobileCity (địa chỉ Thái Hà, Cầu Giấy, Trần Quang Khải...).

- [ ] **Step 3: Kiểm tra biên dịch toàn diện**
Run: `npm run build`
Expected: Compiled successfully with 0 errors.

- [ ] **Step 4: Commit**
```bash
git add src/app/dien-thoai/[slug]/page.tsx src/app/page.tsx
git commit -m "feat(seo): embed product and local business structured data json-ld"
```

---

### Self-Review & Verification Checklist

- [x] Không sử dụng placeholder (TODO, TBD).
- [x] Code mẫu đầy đủ cho tất cả các file mới và chỉnh sửa.
- [x] Đúng đường dẫn tuyệt đối/tương đối trong project.
- [x] Đã có bước xác minh biên dịch `npm run build` sau mỗi task.
