import { test, expect } from "@playwright/test";

test.describe("Warranty Lookup E2E", () => {
  test("tra cứu số IMEI chính xác hiển thị Thẻ bảo hành điện tử", async ({ page }) => {
    await page.goto("/tra-cuu-bao-hanh");

    await expect(page.locator("h1")).toContainText("TRA CỨU BẢO HÀNH ĐIỆN TỬ");

    // Nhập IMEI mẫu của Redmi Note 13 Pro
    await page.getByTestId("input-warranty-query").fill("860123456789012");
    await page.getByTestId("btn-search-warranty").click();

    // Verify kết quả
    await expect(page.getByTestId("warranty-result-card")).toBeVisible();
    await expect(page.getByTestId("warranty-result-card")).toContainText("Xiaomi Redmi Note 13 Pro 5G");
    await expect(page.getByTestId("warranty-result-card")).toContainText("BẢO HÀNH VÀNG 12 THÁNG");
    await expect(page.getByTestId("warranty-result-card")).toContainText("Đang Còn Bảo Hành");
  });

  test("tra cứu IMEI không tồn tại hiển thị thông báo lỗi", async ({ page }) => {
    await page.goto("/tra-cuu-bao-hanh");

    await page.getByTestId("input-warranty-query").fill("000000000000000");
    await page.getByTestId("btn-search-warranty").click();

    await expect(page.getByTestId("warranty-not-found")).toBeVisible();
    await expect(page.locator("text=Không tìm thấy thông tin bảo hành")).toBeVisible();
  });
});
