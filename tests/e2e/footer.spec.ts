import { test, expect } from "@playwright/test";

test.describe("Footer E2E", () => {
  test("hiển thị đầy đủ thông tin showroom 3 miền và chính sách", async ({ page }) => {
    await page.goto("/");

    // 1. Showroom Hà Nội
    await expect(page.locator("text=Hệ Thống Showroom Hà Nội")).toBeVisible();
    await expect(page.locator("text=120 Thái Hà, Q. Đống Đa")).toBeVisible();
    await expect(page.locator("text=398 Cầu Giấy, Q. Cầu Giấy")).toBeVisible();

    // 2. Showroom TP.HCM & Đà Nẵng
    await expect(page.locator("text=Showroom TP.HCM & Đà Nẵng")).toBeVisible();
    await expect(page.locator("text=123 Trần Quang Khải, Q.1, TP.HCM")).toBeVisible();
    await expect(page.locator("text=97 Hàm Nghi, Q. Thanh Khê, Đà Nẵng")).toBeVisible();

    // 3. Chính sách & Chứng nhận
    await expect(page.locator("text=Chính sách Bảo Hành Vàng 12 Tháng")).toBeVisible();
    await expect(page.locator("text=Đã thông báo Bộ Công Thương")).toBeVisible();
  });

  test("form đăng ký nhận tin hoạt động", async ({ page }) => {
    await page.goto("/");
    const input = page.getByTestId("footer-newsletter-input");
    await expect(input).toBeVisible();
    await input.fill("test@mobilecity.vn");
    await page.getByTestId("footer-newsletter-btn").click();
  });
});
