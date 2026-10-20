import { test, expect } from "@playwright/test";

test.describe("Region Context & Switcher E2E", () => {
  test("mặc định chọn khu vực Hà Nội", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("selected-region-text")).toHaveText("Hà Nội");
    await expect(page.getByTestId("header-hotline")).toHaveText("0969.120.120");
  });

  test("cho phép chuyển sang TP. Hồ Chí Minh và lưu cookie", async ({ page, context }) => {
    await page.goto("/");
    await page.getByTestId("header-region-selector").click();
    await page.getByTestId("select-region-HCM").click();

    await expect(page.getByTestId("selected-region-text")).toHaveText("TP. Hồ Chí Minh");
    await expect(page.getByTestId("header-hotline")).toHaveText("0965.123.123");

    // Kiểm tra cookie mc_region đã lưu giá trị HCM
    const cookies = await context.cookies();
    const regionCookie = cookies.find((c) => c.name === "mc_region");
    expect(regionCookie).toBeDefined();
    expect(regionCookie?.value).toBe("HCM");
  });

  test("cho phép chuyển sang Đà Nẵng", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("header-region-selector").click();
    await page.getByTestId("select-region-DN").click();

    await expect(page.getByTestId("selected-region-text")).toHaveText("Đà Nẵng");
    await expect(page.getByTestId("header-hotline")).toHaveText("096.123.9797");
  });
});
