import { Region } from "@/types";

export const BRAND_PRIMARY_COLOR = "#8d4b00"; // Màu Amber thương hiệu MobileCity Stitch Design
export const BRAND_ACCENT_COLOR = "#d97706"; // Màu vàng kim điểm nhấn

export const REGIONS: { code: Region; name: string; hotline: string }[] = [
  { code: "HN", name: "Hà Nội", hotline: "0969.120.120" },
  { code: "HCM", name: "TP. Hồ Chí Minh", hotline: "0965.123.123" },
  { code: "DN", name: "Đà Nẵng", hotline: "096.123.9797" },
];

export const MAIN_NAVIGATION = [
  {
    title: "ĐIỆN THOẠI",
    slug: "dien-thoai",
    featured: ["Xiaomi", "iPhone", "Realme", "Samsung", "ROG Phone"],
    subCategories: [
      {
        name: "HÃNG SẢN XUẤT",
        items: [
          { name: "Điện thoại Xiaomi", href: "/dien-thoai/xiaomi" },
          { name: "Điện thoại iPhone", href: "/dien-thoai/apple" },
          { name: "Điện thoại Realme", href: "/dien-thoai/realme" },
          { name: "Điện thoại Samsung", href: "/dien-thoai/samsung" },
          { name: "Điện thoại Asus ROG", href: "/dien-thoai/asus-rog" },
        ],
      },
      {
        name: "MỨC GIÁ",
        items: [
          { name: "Dưới 3 triệu", href: "/dien-thoai?price=0-3000000" },
          { name: "Từ 3 - 6 triệu", href: "/dien-thoai?price=3000000-6000000" },
          { name: "Từ 6 - 10 triệu", href: "/dien-thoai?price=6000000-10000000" },
          { name: "Trên 10 triệu", href: "/dien-thoai?price=10000000-max" },
        ],
      },
      {
        name: "DÒNG HOT MOBILECITY",
        items: [
          { name: "Redmi Note Series", href: "/dien-thoai?series=redmi-note" },
          { name: "Redmi K Series (Gaming)", href: "/dien-thoai?series=redmi-k" },
          { name: "iPhone Cũ Zin 99%", href: "/dien-thoai?condition=LIKE_NEW_99" },
          { name: "Realme GT Neo Series", href: "/dien-thoai?series=realme-gt" },
        ],
      },
    ],
  },
  {
    title: "MÁY TÍNH BẢNG",
    slug: "may-tinh-bang",
    featured: ["iPad", "Xiaomi Pad", "Lenovo Pad"],
    subCategories: [
      {
        name: "THƯƠNG HIỆU",
        items: [
          { name: "Apple iPad", href: "/may-tinh-bang/apple" },
          { name: "Xiaomi Pad", href: "/may-tinh-bang/xiaomi" },
          { name: "Lenovo Legion Pad", href: "/may-tinh-bang/lenovo" },
        ],
      },
    ],
  },
  {
    title: "SỬA CHỮA",
    slug: "sua-chua",
    featured: ["Thay Màn", "Ép Kính", "Thay Pin"],
    subCategories: [
      {
        name: "DỊCH VỤ PHỔ BIẾN",
        items: [
          { name: "Thay màn hình điện thoại", href: "/sua-chua?service=thay-man-hinh" },
          { name: "Ép kính màn hình lấy ngay", href: "/sua-chua?service=ep-kinh" },
          { name: "Thay pin dung lượng cao", href: "/sua-chua?service=thay-pin" },
          { name: "Sửa nguồn / Chân sạc", href: "/sua-chua?service=sua-nguon" },
        ],
      },
    ],
  },
  {
    title: "TIN TỨC",
    slug: "tin-tuc",
  },
  {
    title: "SO SÁNH",
    slug: "so-sanh",
  },
  {
    title: "THU CŨ",
    slug: "thu-cu-doi-moi",
  },
  {
    title: "BẢO HÀNH VÀNG",
    slug: "chinh-sach-bao-hanh-vang",
    isHighlight: true,
  },
];
