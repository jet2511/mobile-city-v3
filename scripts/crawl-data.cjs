const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

const LINKS_FILE = path.join(__dirname, 'fixtures', 'crawled-links.json');
const CHECKPOINT_FILE = path.join(__dirname, 'fixtures', '.crawl-checkpoint.json');
const OUTPUT_FILE = path.join(__dirname, 'fixtures', 'mobilecity-data.json');

const CONCURRENCY = 5;
const DELAY_MS = 250;

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
    { name: 'Sony', keywords: ['sony', 'xperia'] },
    { name: 'Lenovo', keywords: ['lenovo', 'legion'] },
    { name: 'BlackBerry', keywords: ['blackberry'] },
    { name: 'Tecno', keywords: ['tecno', 'pova'] },
    { name: 'Honor', keywords: ['honor'] },
    { name: 'Infinix', keywords: ['infinix'] }
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
      const backoff = attempt * 1200;
      await sleep(backoff);
    }
  }
}

function parseProductPage(html, url, defaultCategory) {
  const $ = cheerio.load(html);
  const name = $('h1').first().text().trim() || $('meta[property="og:title"]').attr('content') || '';
  if (!name) return null;

  const urlParts = url.split('/').filter(Boolean);
  const slug = urlParts.pop().replace('.html', '');
  const brandName = detectBrand(name);
  const brandSlug = slugify(brandName);

  let thumbnail = $('meta[property="og:image"]').attr('content') || '';
  if (!thumbnail) {
    thumbnail = $('.product-media img, .detail-image img, .carousel img').first().attr('src') || '';
  }
  if (thumbnail && !thumbnail.startsWith('http')) {
    thumbnail = `https://mobilecity.vn${thumbnail.startsWith('/') ? '' : '/'}${thumbnail}`;
  }

  const images = [];
  if (thumbnail) images.push(thumbnail);
  $('img').each((_, el) => {
    const src = $(el).attr('src') || $(el).attr('data-src');
    if (!src) return;
    // Bỏ các icon giao diện, banner trang web
    if (src.includes('icon') || src.includes('logo') || src.includes('assets/img')) return;
    if ((src.includes('mobilecity.vn') || src.startsWith('/')) && (src.endsWith('.jpg') || src.endsWith('.png') || src.endsWith('.webp') || src.endsWith('.jpeg'))) {
      const full = src.startsWith('http') ? src : `https://mobilecity.vn${src.startsWith('/') ? '' : '/'}${src}`;
      if (!images.includes(full) && images.length < 8) images.push(full);
    }
  });

  const specs = {};
  $('table tr').each((_, tr) => {
    const key = $(tr).find('td, th').first().text().trim();
    const val = $(tr).find('td').last().text().trim();
    if (key && val && key !== val) {
      specs[key.replace(/[:]/g, '').trim()] = val;
    }
  });

  const priceText = $('.price-product .price, .price, .current-price, .detail-price').first().text().trim();
  const oldPriceText = $('.price-old, .old-price').first().text().trim();
  const rawPrice = parsePrice(priceText);
  const rawOldPrice = parsePrice(oldPriceText);
  const salePrice = rawPrice > 0 ? rawPrice : 4990000;
  const originPrice = rawOldPrice > salePrice ? rawOldPrice : Math.round(salePrice * 1.15);

  const variants = [];
  const storageItems = $('.storage-item, .storage-list .attribute-item, .product-version a');
  if (storageItems.length > 0) {
    storageItems.each((i, el) => {
      const storageText = $(el).text().replace(/\s+/g, ' ').trim();
      if (storageText && storageText.length < 30) {
        variants.push({
          sku: `${slug}-${slugify(storageText)}`,
          color: 'Tiêu chuẩn',
          ram: null,
          storage: storageText,
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
      storage: 'Tiêu chuẩn',
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
    condition: name.toLowerCase().includes('cũ') || name.toLowerCase().includes('99%') || name.toLowerCase().includes('like new') ? 'LIKE_NEW_99' : 'BRAND_NEW',
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

  const deviceModel = title.replace(/Thay.*|Ép kính.*|Sửa.*|Bảng giá.*|-.*Chính hãng/gi, '').trim() || title;
  const services = [];

  $('table tr').each((_, tr) => {
    const serviceName = $(tr).find('td').first().text().trim();
    const priceText = $(tr).find('td').eq(1).text().trim();
    const warranty = $(tr).find('td').eq(2).text().trim() || '6 tháng';
    const price = parsePrice(priceText);
    if (serviceName && price > 0 && !serviceName.toLowerCase().includes('tên dịch vụ') && !serviceName.toLowerCase().includes('dịch vụ')) {
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
    const rawPrice = parsePrice($('.price, .detail-price').first().text().trim());
    services.push({
      deviceModel,
      serviceName: title,
      price: rawPrice > 0 ? rawPrice : 350000,
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
  const typeArg = args.find(a => a.startsWith('--type='));
  const targetType = typeArg ? typeArg.split('=')[1] : null;

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

  let filteredLinks = links.filter(l => !completedUrls.has(l.url));
  if (targetType) {
    filteredLinks = filteredLinks.filter(l => l.type === targetType);
  }
  const pendingLinks = filteredLinks.slice(0, limit);

  console.log(`[2/3] Bắt đầu cào chi tiết: ${pendingLinks.length} URLs (Đã crawl: ${completedUrls.size})`);

  let processedCount = 0;
  for (let i = 0; i < pendingLinks.length; i += CONCURRENCY) {
    const chunk = pendingLinks.slice(i, i + CONCURRENCY);
    await Promise.all(chunk.map(async (item) => {
      try {
        const html = await fetchWithRetry(item.url);
        if (item.type === 'repair') {
          const parsed = parseRepairPage(html, item.url);
          if (parsed && parsed.services) existingData.repairs.push(...parsed.services);
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
    process.stdout.write(`\rTiến độ: [${processedCount}/${pendingLinks.length}] URLs parsed...`);

    // Lưu checkpoint định kỳ mỗi chunk
    fs.writeFileSync(CHECKPOINT_FILE, JSON.stringify(Array.from(completedUrls)), 'utf8');
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(existingData, null, 2), 'utf8');
    await sleep(DELAY_MS);
  }

  console.log(`\n[Hoàn tất] Dữ liệu hiện có: ${existingData.products.length} sản phẩm, ${existingData.repairs.length} dịch vụ sửa chữa.`);
}

run().catch(console.error);
