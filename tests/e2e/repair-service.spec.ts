import { test, expect } from "@playwright/test";

test.describe("Repair Service Page E2E", () => {
  test("hiển thị danh sách bảng giá sửa chữa và lọc theo model", async ({ page }) => {
    await page.goto("/sua-chua");

    await expect(page.locator("h1")).toHaveText("TRUNG TÂM SỬA CHỮA ĐIỆN THOẠI TOÀN QUỐC");
    await expect(page.locator("text=Thay Màn Hình Chính Hãng")).toBeVisible();

    // Lọc theo Xiaomi Redmi Note 13 Pro 5G
    await page.getByTestId("filter-model-Xiaomi-Redmi-Note-13-Pro-5G").click();
    await expect(page.locator("text=Thay Màn Hình OLED 1.5K")).toBeVisible();
    await expect(page.locator("text=Thay Màn Hình Chính Hãng")).not.toBeVisible();
  });

  test("tìm kiếm nhanh theo từ khóa 'ép kính'", async ({ page }) => {
    await page.goto("/sua-chua");
    await page.getByTestId("repair-search-input").fill("ép kính");

    await expect(page.locator("text=Ép Kính Màn Hình")).toBeVisible();
    await expect(page.locator("text=Ép Mặt Kính")).toBeVisible();
  });

  test("mở modal đặt lịch sửa chữa và submit thành công", async ({ page }) => {
    await page.goto("/sua-chua");

    // Click nút Đặt Lịch của dịch vụ đầu tiên
    const firstBookBtn = page.locator("button:has-text('Đặt Lịch')").first();
    await firstBookBtn.click();

    // Kiểm tra Modal xuất hiện
    await expect(page.getByTestId("booking-modal")).toBeVisible();

    // Điền thông tin
    await page.getByTestId("input-customer-name").fill("Nguyễn Văn A");
    await page.getByTestId("input-customer-phone").fill("0987654321");
    await page.getByTestId("btn-submit-booking").click();

    // Xác nhận message thành công
    await expect(page.getByTestId("booking-success-message")).toBeVisible();
    await expect(page.locator("text=Đặt Lịch Thành Công!")).toBeVisible();
  });
});
