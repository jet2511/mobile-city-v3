import { test, expect } from "@playwright/test";

test.describe("Product Comments & Q&A E2E", () => {
  test("gửi câu hỏi thắc mắc trên PDP và hiển thị ngay trên danh sách hỏi đáp", async ({ page }) => {
    await page.goto("/dien-thoai/xiaomi-redmi-note-13-pro-5g");

    await expect(page.locator("text=Hỏi Đáp & Đánh Giá Về Xiaomi Redmi Note 13 Pro 5G")).toBeVisible();

    // Điền câu hỏi
    await page.getByTestId("input-comment-content").fill("Máy này có sẵn bản ROM Tiếng Việt chưa shop?");
    await page.getByTestId("input-comment-author").fill("Hoàng Minh");
    await page.getByTestId("btn-submit-comment").click();

    // Verify thông báo thành công
    await expect(page.getByTestId("comment-success-notice")).toBeVisible();

    // Kiểm tra câu hỏi xuất hiện kèm câu trả lời của Quản Trị Viên
    await expect(page.locator("text=Máy này có sẵn bản ROM Tiếng Việt chưa shop?").first()).toBeVisible();
    await expect(page.locator("text=Quản Trị Viên MobileCity phản hồi:").first()).toBeVisible();
  });
});
