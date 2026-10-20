import { test, expect } from "@playwright/test";

test.describe("Cart & Checkout Flow E2E", () => {
  test("thêm sản phẩm vào giỏ, cập nhật số lượng và đặt hàng thành công", async ({ page }) => {
    // 1. Vào PDP Xiaomi Redmi Note 13 Pro
    await page.goto("/dien-thoai/xiaomi-redmi-note-13-pro-5g");

    // 2. Click Thêm Giỏ Hàng
    await page.getByTestId("btn-add-cart").click();

    // 3. Kiểm tra Header badge giỏ hàng cập nhật lên 1
    await expect(page.getByTestId("header-cart-count")).toHaveText("1");

    // 4. Chuyển sang trang /gio-hang
    await page.goto("/gio-hang");
    await expect(page.locator("h1")).toContainText("Giỏ Hàng Của Bạn");
    await expect(page.locator("text=Xiaomi Redmi Note 13 Pro 5G")).toBeVisible();

    // 5. Điền form đặt hàng
    await page.getByTestId("checkout-name").fill("Trần Văn B");
    await page.getByTestId("checkout-phone").fill("0912345678");
    await page.getByTestId("checkout-address").fill("120 Thái Hà, Đống Đa, Hà Nội");
    await page.getByTestId("btn-submit-order").click();

    // 6. Kiểm tra màn hình đặt hàng thành công
    await expect(page.getByTestId("order-success-screen")).toBeVisible();
    await expect(page.locator("text=Đặt Hàng Thành Công!")).toBeVisible();
    await expect(page.locator("text=MC-")).toBeVisible();
  });
});
