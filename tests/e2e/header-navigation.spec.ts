import { test, expect } from "@playwright/test";

test.describe("Header & Navigation E2E", () => {
  test("hiển thị đúng các thành phần chính của Header", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("text=Xem giá, tồn kho tại:")).toBeVisible();
    await expect(page.getByTestId("selected-region-text")).toHaveText("Hà Nội");
    await expect(page.getByTestId("header-search-input")).toBeVisible();
    await expect(page.getByTestId("header-cart-btn")).toBeVisible();
  });

  test("chuyển đổi vùng miền trong HeaderTop cập nhật đúng hotline", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("header-region-selector").click();
    await expect(page.getByTestId("region-dropdown-menu")).toBeVisible();

    await page.getByTestId("select-region-HCM").click();
    await expect(page.getByTestId("selected-region-text")).toHaveText("TP. Hồ Chí Minh");
    await expect(page.getByTestId("header-hotline")).toHaveText("0965.123.123");
  });

  test("hover vào menu ĐIỆN THOẠI sẽ hiển thị Mega Dropdown", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("nav-item-dien-thoai").hover();
    await expect(page.getByTestId("mega-dropdown-dien-thoai")).toBeVisible();
    await expect(page.getByTestId("mega-dropdown-dien-thoai")).toContainText("HÃNG SẢN XUẤT");
    await expect(page.getByTestId("mega-dropdown-dien-thoai")).toContainText("Điện thoại Xiaomi");
  });

  test("tìm kiếm sản phẩm hiển thị dropdown kết quả gợi ý", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("header-search-input").fill("Xiaomi");
    await expect(page.getByTestId("header-search-results")).toBeVisible({ timeout: 5000 });
    await expect(page.getByTestId("header-search-results")).toContainText("Xiaomi Redmi Note 13 Pro 5G");
  });
});
