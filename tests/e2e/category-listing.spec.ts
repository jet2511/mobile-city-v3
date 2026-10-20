import { test, expect } from "@playwright/test";

test.describe("Category Listing & Facets Filter E2E", () => {
  test("hiển thị danh mục sản phẩm và lọc theo hãng Xiaomi", async ({ page }) => {
    await page.goto("/dien-thoai");

    await expect(page.locator("h1")).toContainText("ĐIỆN THOẠI DI ĐỘNG CHÍNH HÃNG & XÁCH TAY");

    // Lọc theo Xiaomi
    await page.getByTestId("filter-brand-xiaomi").click();

    // Phải hiển thị Redmi Note 13 & Xiaomi 14 Pro, không hiển thị iPhone 15 Pro Max
    await expect(page.getByTestId("product-card-xiaomi-redmi-note-13-pro-5g")).toBeVisible();
    await expect(page.getByTestId("product-card-xiaomi-14-pro-5g")).toBeVisible();
    await expect(page.getByTestId("product-card-iphone-15-pro-max-cu-99")).not.toBeVisible();
  });

  test("lọc theo mức giá dưới 5 triệu", async ({ page }) => {
    await page.goto("/dien-thoai");
    await page.getByTestId("filter-price-under-5m").click();

    // Redmi Note 13 Pro (4.650.000 đ) phải xuất hiện
    await expect(page.getByTestId("product-card-xiaomi-redmi-note-13-pro-5g")).toBeVisible();

    // iPhone 15 Pro Max (24tr) không được xuất hiện
    await expect(page.getByTestId("product-card-iphone-15-pro-max-cu-99")).not.toBeVisible();
  });

  test("lọc theo tình trạng Máy Cũ Zin 99%", async ({ page }) => {
    await page.goto("/dien-thoai");
    await page.getByTestId("filter-condition-LIKE_NEW_99").click();

    await expect(page.getByTestId("product-card-iphone-15-pro-max-cu-99")).toBeVisible();
    await expect(page.getByTestId("product-card-xiaomi-redmi-note-13-pro-5g")).not.toBeVisible();
  });
});
