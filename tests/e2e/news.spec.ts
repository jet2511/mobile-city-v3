import { test, expect } from "@playwright/test";

test.describe("Tech News & Articles E2E", () => {
  test("vào trang tin tức hiển thị danh sách bài viết", async ({ page }) => {
    await page.goto("/tin-tuc");

    await expect(page.locator("h1")).toContainText("TIN TỨC CÔNG NGHỆ & HƯỚNG DẪN KỸ THUẬT");
    await expect(page.locator("text=Hướng dẫn cài ROM Tiếng Việt cho Xiaomi Redmi Note 13 Pro 5G")).toBeVisible();
    await expect(page.locator("text=Đánh giá chi tiết iPhone 15 Pro Max Cũ 99%")).toBeVisible();
  });

  test("click xem bài viết chi tiết render đầy đủ nội dung bài đọc", async ({ page }) => {
    await page.goto("/tin-tuc/huong-dan-cai-rom-tieng-viet-xiaomi-redmi-note-13-pro-5g");

    await expect(page.locator("h1")).toHaveText("Hướng dẫn cài ROM Tiếng Việt cho Xiaomi Redmi Note 13 Pro 5G lấy ngay");
    await expect(page.locator("text=Hỗ trợ cài ROM miễn phí trọn đời tại MobileCity")).toBeVisible();
    await expect(page.locator("text=Quay lại danh mục tin tức")).toBeVisible();
  });
});
