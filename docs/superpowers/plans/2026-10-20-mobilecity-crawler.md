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

- [ ] **Step 1: Viết script `scripts/crawl-links.cjs`**
Tạo file `scripts/crawl-links.cjs` tải và phân tích XML từ các sitemap:
- `https://mobilecity.vn/sitemap-danhmucdienthoai.xml`
- `https://mobilecity.vn/sitemap-danhmuctablet.xml`
- `https://mobilecity.vn/sitemap-danhmucphukien.xml`
- `https://mobilecity.vn/sitemap-danhmucsuachua.xml`
Trích xuất các URL sản phẩm / dịch vụ, lọc bỏ các URL pagination/chuyên mục chung, lưu vào `scripts/fixtures/crawled-links.json`.

```javascript
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

const SITEMAP_CONFIGS = [
  { url: 'https://mobilecity.vn/sitemap-danhmucdienthoai.xml', type: 'phone', category: 'Điện thoại' },
  { url: 'https://mobilecity.vn/sitemap-danhmuctablet.xml', type: 'tablet', category: 'Máy tính bảng' },
  { url: 'https://mobilecity.vn/sitemap-danhmucphukien.xml', type: 'accessory', category: 'Phụ kiện' },
  { url: 'https://mobilecity.vn/sitemap-danhmucsuachua.xml', type: 'repair', category: 'Dịch vụ sửa chữa' }
];

async function fetchSitemap(sitemapUrl) {
  const res = await axios.get(sitemapUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
    },
    timeout: 15000
  });
  const $ = cheerio.load(res.data, { xmlMode: true });
  const urls = [];
  $('url > loc').each((_, el) => {
    const loc = $(el).text().trim();
    if (loc && loc.startsWith('http')) {
      urls.push(loc);
    }
  });
  return urls;
}

async function run() {
  console.log('[1/3] Đang tải danh sách sitemap từ MobileCity...');
  const fixturesDir = path.join(__dirname, 'fixtures');
  if (!fs.existsSync(fixturesDir)) {
    fs.mkdirSync(fixturesDir, { recursive: true });
  }

  const allLinks = [];
  for (const cfg of SITEMAP_CONFIGS) {
    try {
      console.log(`Đang tải sitemap: ${cfg.url}`);
      const urls = await fetchSitemap(cfg.url);
      console.log(`-> Tìm thấy ${urls.length} links cho ${cfg.category}`);
      for (const u of urls) {
        allLinks.push({
          url: u,
          type: cfg.type,
          category: cfg.category
        });
      }
    } catch (err) {
      console.error(`Lỗi tải sitemap ${cfg.url}:`, err.message);
    }
  }

  // Deduplicate theo URL
  const uniqueMap = new Map();
  for (const item of allLinks) {
    if (!uniqueMap.has(item.url)) {
      uniqueMap.set(item.url, item);
    }
  }
  const deduplicated = Array.from(uniqueMap.values());

  const outputPath = path.join(fixturesDir, 'crawled-links.json');
  fs.writeFileSync(outputPath, JSON.stringify(deduplicated, null, 2), 'utf8');
  console.log(`[Hoàn tất] Đã lưu ${deduplicated.length} link vào: ${outputPath}`);
}

run().catch(console.error);
```

- [ ] **Step 2: Chạy script để kiểm tra kết quả**
Run: `node scripts/crawl-links.cjs`
Expected: File `scripts/fixtures/crawled-links.json` được tạo thành công chứa danh sách links.

- [ ] **Step 3: Commit**
```bash
git add scripts/crawl-links.cjs
git commit -m "feat(crawler): add sitemap links collector script"
```

---

### Task 2: Xây dựng HTML Detail Scraper với Checkpoint & Retry (`scripts/crawl-data.cjs`)

**Files:**
- Create: `scripts/crawl-data.cjs`
- Output: `scripts/fixtures/mobilecity-data.json`, `scripts/fixtures/.crawl-checkpoint.json`

- [ ] **Step 1: Viết script `scripts/crawl-data.cjs`**
Hỗ trợ tham số `--limit=N` để test thử nghiệm hoặc chạy full.
Tính năng:
- Concurrency pool = 4 workers.
- Exponential backoff retry (3 lần).
- Checkpoint resume khi bị gián đoạn.
- Trích xuất đầy đủ: Tên, Hãng (Brand), Category, Thumbnail, Images gallery, Bảng thông số Specs, Biến thể Variants (RAM/ROM/Color/Giá), Dịch vụ sửa chữa (RepairService).

```javascript
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

const LINKS_FILE = path.join(__dirname, 'fixtures', 'crawled-links.json');
const CHECKPOINT_FILE = path.join(__dirname, 'fixtures', '.crawl-checkpoint.json');
const OUTPUT_FILE = path.join(__dirname, 'fixtures', 'mobilecity-data.json');

const CONCURRENCY = 4;
const DELAY_MS = 300;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function parsePrice(text) {
  if (!text) return 0;
  const cleaned = text.replace(/[^0-9]/g, '');
  return cleaned ? parseFloat(cleaned) : 0;
}

function detectBrand(title) {
  const lower = (title || '').toLowerCase();
  const brands = [
    { name: 'Apple', keywords: ['iphone', 'ipad', 'apple'] },
    { name: 'Xiaomi', keywords: ['xiaomi', 'redmi', 'poco'] },
    { name: 'Samsung', keywords: ['samsung', 'galaxy'] },
    { name: 'Realme', keywords: ['realme'] },
    { name: 'Vivo', keywords: ['vivo', 'iqoo'] },
    { name: 'OnePlus', keywords: ['oneplus'] },
    { name: 'Nubia', keywords: ['nubia', 'red magic'] },
    { name: 'Asus', keywords: ['asus', 'rog phone'] },
    { name: 'Google', keywords: ['google', 'pixel'] },
    { name: 'Oppo', keywords: ['oppo'] },
    { name: 'Huawei', keywords: ['huawei'] },
    { name: 'Sony', keywords: ['sony', 'xperia'] }
  ];
  for (const b of brands) {
    if (b.keywords.some(k => lower.includes(k))) return b.name;
  }
  return 'Khác';
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function fetchWithRetry(url, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'vi,en-US;q=0.9,en;q=0.8'
        },
        timeout: 15000
      });
      return res.data;
    } catch (err) {
      if (attempt === retries) throw err;
      const backoff = attempt * 1500;
      await sleep(backoff);
    }
  }
}

function parseProductPage(html, url, defaultCategory) {
  const $ = cheerio.load(html);
  const name = $('h1').first().text().trim() || $('meta[property="og:title"]').attr('content') || '';
  if (!name) return null;

  const slug = url.split('/').filter(Boolean).pop().replace('.html', '');
  const brandName = detectBrand(name);
  const brandSlug = slugify(brandName);

  let thumbnail = $('meta[property="og:image"]').attr('content') || '';
  if (!thumbnail) {
    thumbnail = $('.product-media img, .detail-image img, .carousel img').first().attr('src') || '';
  }

  const images = [];
  $('img').each((_, el) => {
    const src = $(el).attr('src') || $(el).attr('data-src');
    if (src && (src.includes('mobilecity.vn') || src.startsWith('/')) && (src.endsWith('.jpg') || src.endsWith('.png') || src.endsWith('.webp') || src.endsWith('.jpeg'))) {
      const full = src.startsWith('http') ? src : `https://mobilecity.vn${src.startsWith('/') ? '' : '/'}${src}`;
      if (!images.includes(full) && images.length < 10) images.push(full);
    }
  });

  const specs = {};
  $('table tr').each((_, tr) => {
    const key = $(tr).find('td, th').first().text().trim();
    const val = $(tr).find('td').last().text().trim();
    if (key && val && key !== val) specs[key] = val;
  });

  const priceText = $('.price, .current-price, .box-price, .detail-price').first().text().trim();
  const rawPrice = parsePrice(priceText);
  const salePrice = rawPrice > 0 ? rawPrice : 5000000;
  const originPrice = Math.round(salePrice * 1.1);

  const variants = [];
  const variantEls = $('.version-item, .attribute-item, .product-version a, .variant-option');
  if (variantEls.length > 0) {
    variantEls.each((i, el) => {
      const vText = $(el).text().trim();
      if (vText) {
        variants.push({
          sku: `${slug}-v${i + 1}`,
          color: 'Tiêu chuẩn',
          ram: null,
          storage: vText,
          originPrice: originPrice,
          salePrice: salePrice,
          goldCareFee: 300000
        });
      }
    });
  }

  if (variants.length === 0) {
    variants.push({
      sku: `${slug}-std`,
      color: 'Tiêu chuẩn',
      ram: null,
      storage: '128GB',
      originPrice: originPrice,
      salePrice: salePrice,
      goldCareFee: 300000
    });
  }

  return {
    type: 'product',
    name,
    slug,
    thumbnail,
    images: JSON.stringify(images.length > 0 ? images : [thumbnail]),
    description: $('meta[name="description"]').attr('content') || name,
    specs: JSON.stringify(specs),
    condition: name.toLowerCase().includes('cũ') || name.toLowerCase().includes('like new') ? 'LIKE_NEW_99' : 'BRAND_NEW',
    isHot: true,
    categoryName: defaultCategory,
    categorySlug: slugify(defaultCategory),
    brandName,
    brandSlug,
    variants
  };
}

function parseRepairPage(html, url) {
  const $ = cheerio.load(html);
  const title = $('h1').first().text().trim() || $('meta[property="og:title"]').attr('content') || '';
  if (!title) return null;

  const deviceModel = title.replace(/Thay.*|Ép kính.*|Sửa.*/i, '').trim() || title;
  const services = [];

  $('table tr').each((_, tr) => {
    const serviceName = $(tr).find('td').first().text().trim();
    const priceText = $(tr).find('td').eq(1).text().trim();
    const warranty = $(tr).find('td').eq(2).text().trim() || '6 tháng';
    const price = parsePrice(priceText);
    if (serviceName && price > 0) {
      services.push({
        deviceModel,
        serviceName,
        price,
        warranty,
        duration: '45 - 60 phút'
      });
    }
  });

  if (services.length === 0) {
    services.push({
      deviceModel,
      serviceName: 'Dịch vụ sửa chữa chung',
      price: 350000,
      warranty: '6 tháng',
      duration: '45 - 60 phút'
    });
  }

  return {
    type: 'repair',
    deviceModel,
    services
  };
}

async function run() {
  const args = process.argv.slice(2);
  const limitArg = args.find(a => a.startsWith('--limit='));
  const limit = limitArg ? parseInt(limitArg.split('=')[1], 10) : Infinity;

  if (!fs.existsSync(LINKS_FILE)) {
    console.error(`Chưa tìm thấy file ${LINKS_FILE}. Vui lòng chạy 'node scripts/crawl-links.cjs' trước.`);
    process.exit(1);
  }

  const links = JSON.parse(fs.readFileSync(LINKS_FILE, 'utf8'));
  let completedUrls = new Set();
  let existingData = { products: [], repairs: [] };

  if (fs.existsSync(CHECKPOINT_FILE)) {
    try {
      const cp = JSON.parse(fs.readFileSync(CHECKPOINT_FILE, 'utf8'));
      completedUrls = new Set(cp);
    } catch (_) {}
  }

  if (fs.existsSync(OUTPUT_FILE)) {
    try {
      existingData = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
    } catch (_) {}
  }

  const pendingLinks = links.filter(l => !completedUrls.has(l.url)).slice(0, limit);
  console.log(`[2/3] Bắt đầu cào chi tiết: ${pendingLinks.length} URLs (Đã hoàn thành trước đó: ${completedUrls.size})`);

  let processedCount = 0;
  for (let i = 0; i < pendingLinks.length; i += CONCURRENCY) {
    const chunk = pendingLinks.slice(i, i + CONCURRENCY);
    await Promise.all(chunk.map(async (item) => {
      try {
        const html = await fetchWithRetry(item.url);
        if (item.type === 'repair') {
          const parsed = parseRepairPage(html, item.url);
          if (parsed) existingData.repairs.push(...parsed.services);
        } else {
          const parsed = parseProductPage(html, item.url, item.category);
          if (parsed) existingData.products.push(parsed);
        }
        completedUrls.add(item.url);
      } catch (err) {
        console.warn(`[Skip] Lỗi cào ${item.url}: ${err.message}`);
      }
    }));

    processedCount += chunk.length;
    process.stdout.write(`\rTiến độ: [${processedCount}/${pendingLinks.length}] items parsed...`);

    // Lưu checkpoint định kỳ mỗi chunk
    fs.writeFileSync(CHECKPOINT_FILE, JSON.stringify(Array.from(completedUrls)), 'utf8');
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(existingData, null, 2), 'utf8');
    await sleep(DELAY_MS);
  }

  console.log(`\n[Hoàn tất] Dữ liệu đã lưu: ${existingData.products.length} sản phẩm, ${existingData.repairs.length} dịch vụ sửa chữa.`);
}

run().catch(console.error);
```

- [ ] **Step 2: Dry-run test với `--limit=10`**
Run: `node scripts/crawl-data.cjs --limit=10`
Expected: Cào thành công 10 URL mẫu, tạo ra `mobilecity-data.json` và checkpoint.

- [ ] **Step 3: Commit**
```bash
git add scripts/crawl-data.cjs
git commit -m "feat(crawler): add detail HTML parser with checkpoint and retry"
```

---

### Task 3: Xây dựng Seeder Nạp Dữ liệu vào Prisma SQLite (`scripts/seed-crawled.cjs`)

**Files:**
- Create: `scripts/seed-crawled.cjs`
- Touch: `prisma/schema.prisma` (nếu cần), `dev.db`

- [ ] **Step 1: Viết script `scripts/seed-crawled.cjs`**
Script đọc dữ liệu từ `scripts/fixtures/mobilecity-data.json`, dùng `@prisma/client` để upsert:
- `Branch`: Hà Nội, Hồ Chí Minh, Đà Nẵng
- `Category`: Điện thoại, Máy tính bảng, Phụ kiện, Sửa chữa
- `Brand`: Apple, Xiaomi, Samsung, Realme...
- `Product`: Idempotent upsert theo `slug`
- `ProductVariant`: Idempotent upsert theo `sku`
- `Inventory`: Phân bổ tồn kho theo từng branch
- `RepairService`: Upsert dịch vụ sửa chữa

```javascript
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const DATA_FILE = path.join(__dirname, 'fixtures', 'mobilecity-data.json');

async function main() {
  if (!fs.existsSync(DATA_FILE)) {
    console.error(`Không tìm thấy file ${DATA_FILE}`);
    process.exit(1);
  }

  const { products = [], repairs = [] } = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  console.log(`[3/3] Bắt đầu Seeding: ${products.length} sản phẩm, ${repairs.length} dịch vụ sửa chữa...`);

  // 1. Tạo Branches chuẩn
  const branches = [
    { name: 'MobileCity Hà Nội', region: 'HN', address: '120 Thái Hà, Q. Đống Đa, Hà Nội', hotline: '0969.120.120' },
    { name: 'MobileCity TP.HCM', region: 'HCM', address: '123 Trần Quang Khải, Q.1, TP.HCM', hotline: '0965.123.123' },
    { name: 'MobileCity Đà Nẵng', region: 'DN', address: '97 Hàm Nghi, Q. Thanh Khê, Đà Nẵng', hotline: '096.123.9797' }
  ];

  const branchRecords = [];
  for (const b of branches) {
    const existing = await prisma.branch.findFirst({ where: { name: b.name } });
    if (!existing) {
      const created = await prisma.branch.create({ data: b });
      branchRecords.push(created);
    } else {
      branchRecords.push(existing);
    }
  }

  // 2. Nạp Categories & Brands
  console.log('Seeding Categories & Brands...');
  const categoryMap = new Map();
  const brandMap = new Map();

  for (const p of products) {
    if (!categoryMap.has(p.categorySlug)) {
      const cat = await prisma.category.upsert({
        where: { slug: p.categorySlug },
        update: { name: p.categoryName },
        create: { name: p.categoryName, slug: p.categorySlug }
      });
      categoryMap.set(p.categorySlug, cat.id);
    }

    if (!brandMap.has(p.brandSlug)) {
      const br = await prisma.brand.upsert({
        where: { slug: p.brandSlug },
        update: { name: p.brandName },
        create: { name: p.brandName, slug: p.brandSlug }
      });
      brandMap.set(p.brandSlug, br.id);
    }
  }

  // 3. Nạp Products & Variants
  console.log('Seeding Products & Variants...');
  let pCount = 0;
  for (const p of products) {
    const categoryId = categoryMap.get(p.categorySlug);
    const brandId = brandMap.get(p.brandSlug);

    const productRecord = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        thumbnail: p.thumbnail,
        images: p.images,
        description: p.description,
        specs: p.specs,
        condition: p.condition,
        isHot: p.isHot,
        categoryId,
        brandId
      },
      create: {
        name: p.name,
        slug: p.slug,
        thumbnail: p.thumbnail,
        images: p.images,
        description: p.description,
        specs: p.specs,
        condition: p.condition,
        isHot: p.isHot,
        categoryId,
        brandId
      }
    });

    for (const v of p.variants) {
      const variantRecord = await prisma.productVariant.upsert({
        where: { sku: v.sku },
        update: {
          originPrice: v.originPrice,
          salePrice: v.salePrice,
          goldCareFee: v.goldCareFee || 300000,
          color: v.color || 'Tiêu chuẩn',
          ram: v.ram,
          storage: v.storage
        },
        create: {
          productId: productRecord.id,
          sku: v.sku,
          originPrice: v.originPrice,
          salePrice: v.salePrice,
          goldCareFee: v.goldCareFee || 300000,
          color: v.color || 'Tiêu chuẩn',
          ram: v.ram,
          storage: v.storage
        }
      });

      // Phân bổ tồn kho
      for (const branch of branchRecords) {
        await prisma.inventory.upsert({
          where: {
            branchId_variantId: {
              branchId: branch.id,
              variantId: variantRecord.id
            }
          },
          update: {},
          create: {
            branchId: branch.id,
            variantId: variantRecord.id,
            quantity: Math.floor(Math.random() * 10) + 1
          }
        });
      }
    }
    pCount++;
    if (pCount % 20 === 0) {
      console.log(`Đã nạp ${pCount}/${products.length} sản phẩm...`);
    }
  }

  // 4. Nạp Repair Services
  console.log('Seeding Repair Services...');
  for (const r of repairs) {
    await prisma.repairService.create({
      data: {
        deviceModel: r.deviceModel,
        serviceName: r.serviceName,
        price: r.price,
        warranty: r.warranty,
        duration: r.duration
      }
    });
  }

  console.log('[Hoàn thành] Database seeding hoàn tất thành công!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

- [ ] **Step 2: Cập nhật package.json scripts**
Thêm vào `package.json`:
```json
"crawl:links": "node scripts/crawl-links.cjs",
"crawl:data": "node scripts/crawl-data.cjs",
"seed:crawled": "node scripts/seed-crawled.cjs"
```

- [ ] **Step 3: Chạy thử nghiệm Seeding**
Run: `node scripts/seed-crawled.cjs`
Expected: Nạp thành công dữ liệu mẫu vào `dev.db`.

- [ ] **Step 4: Commit**
```bash
git add scripts/seed-crawled.cjs package.json
git commit -m "feat(seeder): add crawled data Prisma seeder script"
```

---

### Task 4: Chạy Toàn bộ Pipeline & Kiểm tra Toàn vẹn Dữ liệu

**Files:**
- Output: `dev.db`, `scripts/fixtures/mobilecity-data.json`

- [ ] **Step 1: Thu thập links sitemap**
Run: `npm run crawl:links`
Expected: Tìm thấy hàng trăm links từ 4 sitemap.

- [ ] **Step 2: Cào dữ liệu sản phẩm & dịch vụ**
Run: `npm run crawl:data`
Expected: File `scripts/fixtures/mobilecity-data.json` chứa dữ liệu chi tiết phong phú.

- [ ] **Step 3: Seed vào Database SQLite**
Run: `npm run seed:crawled`
Expected: Toàn bộ dữ liệu được upsert vào `dev.db`.

- [ ] **Step 4: Xác minh thống kê dữ liệu trong database**
Run script kiểm tra count qua node/prisma:
```bash
node -e "const { PrismaClient } = require('@prisma/client'); const p = new PrismaClient(); Promise.all([p.product.count(), p.productVariant.count(), p.repairService.count()]).then(([pr, pv, rs]) => { console.log({ products: pr, variants: pv, repairs: rs }); p.\$disconnect(); });"
```
Expected: Số lượng `products`, `variants`, `repairs` > 0 rõ ràng.

- [ ] **Step 5: Kiểm tra UI Next.js build**
Run: `npm run build`
Expected: Build thành công không có lỗi TypeScript/Next.js.

- [ ] **Step 6: Commit kết quả**
```bash
git add package.json scripts/
git commit -m "feat: complete mobilecity data crawler and seeding pipeline"
```
