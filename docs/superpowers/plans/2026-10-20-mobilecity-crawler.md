# MobileCity Data Crawler & Enrichment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Thu thập toàn bộ dữ liệu sản phẩm (Điện thoại, Tablet, Phụ kiện) và dịch vụ sửa chữa từ mobilecity.vn qua sitemap, lưu trữ snapshot fixtures và seed vào SQLite database qua Prisma.

**Architecture:** Pipeline 3 giai đoạn: `crawl:links` trích xuất URLs từ MobileCity Sitemaps; `crawl:data` chạy Cheerio worker pool có checkpoint/retry để cào dữ liệu chi tiết vào file JSON; `seed:crawled` upsert dữ liệu vào SQLite qua Prisma Client.

**Tech Stack:** Node.js (CommonJS), `axios`, `cheerio`, `@prisma/client`, SQLite.

---

### Task 1: Xây dựng Module Thu thập Link từ Sitemap (`scripts/crawl-links.cjs`)

**Files:**
- Create: `scripts/crawl-links.cjs`
- Output: `scripts/fixtures/crawled-links.json`

- [x] **Step 1: Viết script `scripts/crawl-links.cjs`**
- [x] **Step 2: Chạy script để kiểm tra kết quả**
- [x] **Step 3: Commit**

---

### Task 2: Xây dựng HTML Detail Scraper với Checkpoint & Retry (`scripts/crawl-data.cjs`)

**Files:**
- Create: `scripts/crawl-data.cjs`
- Output: `scripts/fixtures/mobilecity-data.json`, `scripts/fixtures/.crawl-checkpoint.json`

- [x] **Step 1: Viết script `scripts/crawl-data.cjs`**
- [x] **Step 2: Dry-run test với `--limit=10`**
- [x] **Step 3: Commit**

---

### Task 3: Xây dựng Seeder Nạp Dữ liệu vào Prisma SQLite (`scripts/seed-crawled.cjs`)

**Files:**
- Create: `scripts/seed-crawled.cjs`
- Touch: `prisma/schema.prisma` (nếu cần), `dev.db`

- [x] **Step 1: Viết script `scripts/seed-crawled.cjs`**
- [x] **Step 2: Cập nhật package.json scripts**
- [x] **Step 3: Chạy thử nghiệm Seeding**
- [x] **Step 4: Commit**

---

### Task 4: Chạy Toàn bộ Pipeline & Kiểm tra Toàn vẹn Dữ liệu

**Files:**
- Output: `dev.db`, `scripts/fixtures/mobilecity-data.json`

- [x] **Step 1: Thu thập links sitemap**
- [x] **Step 2: Cào dữ liệu sản phẩm & dịch vụ**
- [x] **Step 3: Seed vào Database SQLite**
- [x] **Step 4: Xác minh thống kê dữ liệu trong database**
- [x] **Step 5: Kiểm tra UI Next.js build**
- [x] **Step 6: Commit kết quả**
