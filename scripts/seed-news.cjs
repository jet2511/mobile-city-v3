const Database = require("better-sqlite3");
const path = require("path");
const crypto = require("crypto");

const dbPath = path.resolve(process.cwd(), "dev.db");
const db = new Database(dbPath);

console.log("📰 Khởi tạo bảng news_articles và seed bài viết công nghệ...");

db.exec(`
  CREATE TABLE IF NOT EXISTS news_articles (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    thumbnail TEXT NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT DEFAULT 'Kỹ thuật viên MobileCity',
    views INTEGER DEFAULT 1250,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

const insertNews = db.prepare(`
  INSERT OR REPLACE INTO news_articles (id, title, slug, thumbnail, summary, content, author, views)
  VALUES (@id, @title, @slug, @thumbnail, @summary, @content, @author, @views)
`);

const articles = [
  {
    id: crypto.randomUUID(),
    title: "Hướng dẫn cài ROM Tiếng Việt cho Xiaomi Redmi Note 13 Pro 5G lấy ngay",
    slug: "huong-dan-cai-rom-tieng-viet-xiaomi-redmi-note-13-pro-5g",
    thumbnail: "https://cdn.mobilecity.vn/mobilecity-vn/images/2023/09/w300/redmi-note-13-pro-den.png.webp",
    summary: "Chi tiết các bước Unlock Bootloader và cài đặt bản ROM Quốc Tế đầy đủ CH Play, không trễ thông báo cho Xiaomi Redmi Note 13 Pro 5G tại MobileCity.",
    content: `
      <h2>1. Giới thiệu về ROM Quốc Tế cho Redmi Note 13 Pro 5G</h2>
      <p>Xiaomi Redmi Note 13 Pro 5G xách tay mặc định chạy ROM China gốc sẽ chưa có sẵn tiếng Việt và gặp hiện tượng chậm thông báo Zalo, Facebook. Việc cài đặt ROM Quốc tế (Global ROM) hoặc ROM Vietsub sẽ giúp thiết bị hoạt động hoàn hảo 100% như máy chính hãng.</p>
      <h2>2. Các bước chuẩn bị trước khi cài ROM</h2>
      <p>Quý khách cần chuẩn bị cáp kết nối Type-C zin, máy tính chạy Windows và tài khoản Mi đã đăng ký xin quyền Unlock Bootloader trên 72 giờ.</p>
      <h2>3. Hỗ trợ cài ROM miễn phí trọn đời tại MobileCity</h2>
      <p>Tất cả khách hàng mua điện thoại Xiaomi tại MobileCity kèm Gói Bảo Hành Vàng đều được hỗ trợ cài đặt ROM Quốc tế, tối ưu hóa phần mềm hoàn toàn miễn phí trọn đời máy tại tất cả chi nhánh Hà Nội, Đà Nẵng và TP.HCM.</p>
    `,
    author: "Kỹ thuật viên MobileCity",
    views: 4820
  },
  {
    id: crypto.randomUUID(),
    title: "Đánh giá chi tiết iPhone 15 Pro Max Cũ 99%: Có đáng mua nhất năm 2026?",
    slug: "danh-gia-chi-tiet-iphone-15-pro-max-cu-99",
    thumbnail: "https://cdn.mobilecity.vn/mobilecity-vn/images/2023/09/w300/iphone-15-pro-max-titan-tu-nhien.png.webp",
    summary: "Với khung viền Titan siêu nhẹ, camera zoom tiềm vọng 5x và mức giá rẻ hơn tới 10 triệu so với máy mới, iPhone 15 Pro Max cũ 99% đang là mẫu máy bán chạy số 1.",
    content: `
      <h2>1. Thiết kế khung viền Titan sang trọng và bền bỉ</h2>
      <p>iPhone 15 Pro Max là bước đột phá lớn với viền hợp kim Titanium cấp hàng không vũ trụ, mang lại cảm giác cầm nắm vô cùng đầm tay nhưng nhẹ hơn đáng kể so với thế hệ tiền nhiệm.</p>
      <h2>2. Sức mạnh vượt trội từ vi xử lý Apple A17 Pro 3nm</h2>
      <p>Sở hữu GPU 6 nhân hỗ trợ Ray Tracing phần cứng, máy dễ dàng cân mượt các tựa game nặng như Genshin Impact, Resident Evil 4 ở mức thiết lập đồ họa cao nhất.</p>
      <h2>3. Chính sách bảo hành máy cũ 99% tại MobileCity</h2>
      <p>MobileCity cam kết 100% máy qua tuyển chọn zin nguyên bản, pin từ 9x đến 100%, đổi mới 15 ngày đầu nếu phát hiện lỗi và bảo hành toàn diện 12 tháng cả nguồn lẫn màn hình.</p>
    `,
    author: "Đội ngũ Review MobileCity",
    views: 6150
  }
];

articles.forEach((a) => insertNews.run(a));
console.log("✓ Đã nạp thành công 2 bài viết tin tức mẫu!");
