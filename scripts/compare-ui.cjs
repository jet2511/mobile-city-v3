const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.resolve(__dirname, '../test-results/comparison');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function run() {
  console.log('🚀 Khởi động Playwright kiểm thử giao diện Local App...');
  const browser = await chromium.launch({ headless: true });

  const contextDesktop = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });

  const contextMobile = await browser.newContext({
    viewport: { width: 390, height: 844 }, // iPhone 14
    isMobile: true
  });

  const pageDesktop = await contextDesktop.newPage();
  const pageMobile = await contextMobile.newPage();

  try {
    // 1. HOME DESKTOP
    console.log('1. Chụp Trang chủ Desktop (port 3001)...');
    await pageDesktop.goto('http://localhost:3001/', { waitUntil: 'domcontentloaded', timeout: 15000 });
    await pageDesktop.waitForTimeout(1000);
    await pageDesktop.screenshot({ path: path.join(OUTPUT_DIR, 'home-local-desktop-v2.png') });

    // 2. HOME MOBILE
    console.log('2. Chụp Trang chủ Mobile với Bottom Nav & Floating Widget...');
    await pageMobile.goto('http://localhost:3001/', { waitUntil: 'domcontentloaded', timeout: 15000 });
    await pageMobile.waitForTimeout(1000);
    await pageMobile.screenshot({ path: path.join(OUTPUT_DIR, 'home-local-mobile-v2.png') });

    // 3. CATEGORY LISTING WITH FACETED FILTERS
    console.log('3. Chụp Danh mục Điện thoại có Bộ lọc Faceted...');
    await pageDesktop.goto('http://localhost:3001/dien-thoai', { waitUntil: 'domcontentloaded', timeout: 15000 });
    await pageDesktop.waitForTimeout(1000);
    await pageDesktop.screenshot({ path: path.join(OUTPUT_DIR, 'category-local-desktop-v2.png') });

    // 4. REPAIR SERVICE WITH MODEL SEARCH & QUICK TAGS
    console.log('4. Chụp Bảng giá Sửa chữa có Quick Tags & Search...');
    await pageDesktop.goto('http://localhost:3001/sua-chua', { waitUntil: 'domcontentloaded', timeout: 15000 });
    await pageDesktop.waitForTimeout(1000);
    await pageDesktop.screenshot({ path: path.join(OUTPUT_DIR, 'repair-local-desktop-v2.png') });

    console.log('✅ Đã chụp và lưu thành công tất cả ảnh kiểm thử giao diện mới!');
  } catch (err) {
    console.error('Lỗi khi chạy Playwright:', err.message);
  } finally {
    await browser.close();
  }
}

run();
