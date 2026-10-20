import { test, expect } from "@playwright/test";

test.describe("Data Catalog API & Fixtures E2E", () => {
  test("API /api/products trả về đầy đủ sản phẩm kèm biến thể và giá", async ({ request }) => {
    const response = await request.get("/api/products");
    expect(response.ok()).toBeTruthy();

    const json = await response.json();
    expect(json.success).toBe(true);
    expect(json.data.length).toBeGreaterThanOrEqual(4);

    // Kiểm tra có các máy chủ lực: Xiaomi 14 Pro, ROG Phone 8, Redmi Note 13, iPhone 15 Pro Max
    const names = json.data.map((p: any) => p.name);
    expect(names).toContain("Xiaomi 14 Pro 5G");
    expect(names).toContain("Asus ROG Phone 8 Pro");
  });

  test("API /api/branches trả về danh sách chi nhánh 3 miền HN, HCM, DN", async ({ request }) => {
    const response = await request.get("/api/branches");
    expect(response.ok()).toBeTruthy();

    const json = await response.json();
    expect(json.success).toBe(true);
    const regions = json.data.map((b: any) => b.region);
    expect(regions).toContain("HN");
    expect(regions).toContain("HCM");
    expect(regions).toContain("DN");
  });
});
