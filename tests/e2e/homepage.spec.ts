import { test, expect } from "@playwright/test";

test.describe("Homepage Showcase E2E", () => {
  test("hiển thị đầy đủ Hero Banner, Flash Sale và Product Categories", async ({ page }) => {
    await page.goto("/");

    // 1. Kiểm tra Hero Slider
    await expect(page.locator("text=Đại Tiệc Công Nghệ")).toBeVisible();
    await expect(page.locator("text=XIAOMI REDMI NOTE 13 PRO 5G").first()).toBeVisible();

    // 2. Kiểm tra Flash Sale
    await expect(page.locator("text=FLASH SALE")).toBeVisible();
    await expect(page.locator("text=Kết thúc trong:")).toBeVisible();

    // 3. Kiểm tra Category Section
    await expect(page.locator("text=ĐIỆN THOẠI XIAOMI GIÁ RẺ NHẤT")).toBeVisible();
    await expect(page.locator("text=IPHONE CŨ ZIN 99% - CHÍNH HÃNG")).toBeVisible();

    // 4. Kiểm tra Product Card
    const redmiCard = page.getByTestId("product-card-xiaomi-redmi-note-13-pro-5g").first();
    await expect(redmiCard).toBeVisible();
    await expect(page.getByTestId("price-xiaomi-redmi-note-13-pro-5g").first()).toContainText("4.650.000");

    const iphoneCard = page.getByTestId("product-card-iphone-15-pro-max-cu-99").first();
    await expect(iphoneCard).toBeVisible();
    await expect(page.getByTestId("price-iphone-15-pro-max-cu-99").first()).toContainText("24.350.000");
  });

  test("click vào sản phẩm chuyển hướng đến đúng URL PDP", async ({ page }) => {
    await page.goto("/");
    const redmiLink = page.locator("a[href='/dien-thoai/xiaomi-redmi-note-13-pro-5g']").first();
    await redmiLink.click();
    await expect(page).toHaveURL(/.*\/dien-thoai\/xiaomi-redmi-note-13-pro-5g/);
  });
});
