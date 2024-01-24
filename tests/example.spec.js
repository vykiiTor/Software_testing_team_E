// @ts-check
const { test, expect } = require("@playwright/test");

const BASE_URL = "https://e.hr.dmerej.info/";

test("Add new employee", async ({ page }) => {
  await page.goto(BASE_URL);

  // Click the add new employee link.
  await page.getByRole("link", { name: "Add new employee" }).click();

  // Expects page to have a heading with the name of Add new employee.
  await expect(page.getByRole("heading", { name: "Add new employee" })).toBeVisible();

  // Fill the form
  await page.fill('[name="name"]', "John Doe");
  await page.fill('[name="email"]', "johndoe@gmail.com");
  await page.fill('[name="address_line1"]', "10 rue de la paix");
  await page.fill('[name="city"]', "Paris");
  await page.fill('[name="zip_code"]', "75001");
  await page.fill('[name="hiring_date"]', "2021-01-01");
  await page.fill('[name="job_title"]', "Software Engineer");

  // Submit the form
  await page.click('[type="submit"]');
});
