const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

const BASE_SITEMAP = 'https://mobilecity.vn/sitemap.xml';

async function fetchXml(url) {
  const res = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
    },
    timeout: 20000
  });
  return res.data;
}

async function run() {
  console.log('[1/3] Đang tải master sitemap từ MobileCity...');
  const fixturesDir = path.join(__dirname, 'fixtures');
  if (!fs.existsSync(fixturesDir)) {
    fs.mkdirSync(fixturesDir, { recursive: true });
  }

  const masterXml = await fetchXml(BASE_SITEMAP);
  const $ = cheerio.load(masterXml, { xmlMode: true });

  const subSitemaps = [];
  $('sitemap > loc').each((_, el) => {
    const loc = $(el).text().trim();
    if (!loc) return;
    if (loc.includes('dienthoai-page-')) {
      subSitemaps.push({ url: loc, type: 'phone', category: 'Điện thoại' });
    } else if (loc.includes('tablet-page-')) {
      subSitemaps.push({ url: loc, type: 'tablet', category: 'Máy tính bảng' });
    } else if (loc.includes('phukien-page-')) {
      subSitemaps.push({ url: loc, type: 'accessory', category: 'Phụ kiện' });
    } else if (loc.includes('suachua-page-')) {
      subSitemaps.push({ url: loc, type: 'repair', category: 'Dịch vụ sửa chữa' });
    }
  });

  console.log(`Tìm thấy ${subSitemaps.length} sub-sitemaps tương ứng sản phẩm & sửa chữa.`);

  const allLinks = [];
  let sitemapIndex = 0;
  for (const s of subSitemaps) {
    sitemapIndex++;
    try {
      const xml = await fetchXml(s.url);
      const $sub = cheerio.load(xml, { xmlMode: true });
      let count = 0;
      $sub('url > loc').each((_, el) => {
        const pageUrl = $sub(el).text().trim();
        if (pageUrl && pageUrl.endsWith('.html')) {
          allLinks.push({
            url: pageUrl,
            type: s.type,
            category: s.category
          });
          count++;
        }
      });
      console.log(`[${sitemapIndex}/${subSitemaps.length}] ${s.url} -> ${count} links`);
    } catch (err) {
      console.warn(`Lỗi đọc sitemap ${s.url}: ${err.message}`);
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
  console.log(`\n[Hoàn tất] Tổng số links thu thập: ${deduplicated.length}`);
  console.log(`Đã ghi file vào: ${outputPath}`);
}

run().catch(console.error);
