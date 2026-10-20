import { test, expect } from "@playwright/test";

test.describe("Product Detail Page (PDP) E2E", () => {
  test("hiển thị chi tiết sản phẩm, đổi RAM/ROM/Màu cập nhật giá tương ứng", async ({ page }) => {
    await page.goto("/dien-thoai/xiaomi-redmi-note-13-pro-5g");

    await expect(page.locator("h1")).toHaveText("Xiaomi Redmi Note 13 Pro 5G");

    // Mặc định chọn 8GB 128GB + Đen + BH Vàng (4.650.000 + 350.000 = 5.000.000 đ)
    await expect(page.getByTestId("pdp-final-price")).toHaveText("5.000.000 đ");

    // Click chọn option 12GB 256GB (5.650.000 + 350.000 = 6.000.000 đ)
    await page.getByTestId("option-mem-12GB-256GB").click();
    await expect(page.getByTestId("pdp-final-price")).toHaveText("6.000.000 đ");
  });

  test("toggle Bảo Hành Vàng thay đổi giá chính xác", async ({ page }) => {
    await page.goto("/dien-thoai/xiaomi-redmi-note-13-pro-5g");

    // Đang có BH Vàng: 5.000.000 đ
    await expect(page.getByTestId("pdp-final-price")).toHaveText("5.000.000 đ");

    // Chọn BH Tiêu chuẩn (bỏ BH Vàng): về giá gốc 4.650.000 đ
    await page.getByTestId("warranty-standard").click();
    await expect(page.getByTestId("pdp-final-price")).toHaveText("4.650.000 đ");

    // Chọn lại BH Vàng: cộng lại 350.000 đ
    await page.getByTestId("warranty-gold").click();
    await expect(page.getByTestId("pdp-final-price")).toHaveText("5.000.000 đ");
  });

  test("đổi khu vực vùng miền cập nhật danh sách cửa hàng còn hàng", async ({ page }) => {
    await page.goto("/dien-thoai/xiaomi-redmi-note-13-pro-5g");

    // Mặc định Hà Nội: có 120 Thái Hà & 398 Cầu Giấy
    await expect(page.locator("text=Tình trạng tồn kho tại khu vực: Hà Nội")).toBeVisible();
    await expect(page.getByRole("main").getByText("120 Thái Hà, Q. Đống Đa", { exact: true })).toBeVisible();

    // Chuyển sang TP. Hồ Chí Minh
    await page.getByTestId("header-region-selector").click();
    await page.getByTestId("select-region-HCM").click();

    // Kiểm tra danh sách cửa hàng đổi sang chi nhánh HCM
    await expect(page.locator("text=Tình trạng tồn kho tại khu vực: TP. Hồ Chí Minh")).toBeVisible();
    await expect(page.getByRole("main").getByText("123 Trần Quang Khải, Q.1", { exact: true })).toBeVisible();
  });
});
