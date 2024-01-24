// @ts-check
const { test, expect } = require("@playwright/test");
const { BASE_URL, SERVER_ERROR } = require("./utils/constants");

test("List teams", async ({ page }) => {
  await page.goto(BASE_URL);

  // Click the add new employee link.
  await page.getByRole("link", { name: "List teams" }).click();

  // Expects page to have a heading with the name of Add new employee.
  await expect(page.getByRole("heading", { name: "Teams" })).toBeVisible();
  expect(page.url()).toBe(`${BASE_URL}/teams`);
});

test("Create new team", async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByRole("link", { name: "Create new team" }).click();

  // Fill the form
  await page.fill('[name="name"]', "albert's team");

  // Expects page to have a heading with the name of Add new employee.
  await expect(page.getByRole("heading", { name: "Create new team" })).toBeVisible();
  expect(page.url()).toBe(`${BASE_URL}/add_team`);
});

test("Block creation of two same employee", async ({ page }) => {
  ////////// Create first employee
  await page.goto(BASE_URL);

  // Click the add new employee link.
  await page.getByRole("link", { name: "Add new employee" }).click();

  // Expects page to have a heading with the name of Add new employee.
  await expect(page.getByRole("heading", { name: "Add new employee" })).toBeVisible();

  // Fill the form
  await page.fill('[name="name"]', "Hugo");
  await page.fill('[name="email"]', "hugo@efrei.net");
  await page.fill('[name="address_line1"]', "10 rue de la paix");
  await page.fill('[name="city"]', "Paris");
  await page.fill('[name="zip_code"]', "94260", { force: true });
  await page.fill('[name="hiring_date"]', "2021-01-01");
  await page.fill('[name="job_title"]', "Software Engineer");

  // Submit the form
  await page.click('[type="submit"]');

  ////////// Create second employee
  await page.goto(BASE_URL);

  // Click the add new employee link.
  await page.getByRole("link", { name: "Add new employee" }).click();

  // Expects page to have a heading with the name of Add new employee.
  await expect(page.getByRole("heading", { name: "Add new employee" })).toBeVisible();

  // Fill the form
  await page.fill('[name="name"]', "Hugo");
  await page.fill('[name="email"]', "hugo@efrei.net");
  await page.fill('[name="address_line1"]', "10 rue de la paix");
  await page.fill('[name="city"]', "Paris");
  await page.fill('[name="zip_code"]', "94260", { force: true });
  await page.fill('[name="hiring_date"]', "2021-01-01");
  await page.fill('[name="job_title"]', "Software Engineer");

  // Submit the form
  await page.click('[type="submit"]');
  await expect(page.getByRole("heading", { name: SERVER_ERROR })).toBeVisible();
});

test("error 500 if zip code too long", async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByRole("link", { name: "Add new employee" }).click();

  await expect(page.getByRole("heading", { name: "Add new employee" })).toBeVisible();

  await page.fill('[name="name"]', "John Doe");
  await page.fill('[name="email"]', "johndoe@gmail.com");
  await page.fill('[name="address_line1"]', "10 rue de la paix");
  await page.fill('[name="city"]', "Paris");
  await page.fill(
    '[name="zip_code"]',
    "3213333333321321312312312312321321312312321321321321313213213213213213321333333332132131231231231232132131231232132132132131321321321321321332133333333213213123123123123213213123123213213213213132132132132132133213333333321321312312312312321321312312321321321321313213213213213213",
    { force: true }
  );
  await page.fill('[name="hiring_date"]', "2021-01-01");
  await page.fill('[name="job_title"]', "Software Engineer");

  await page.click('[type="submit"]');
  await expect(page.getByRole("heading", { name: SERVER_ERROR })).toBeVisible();
});

test("Do not show promote button if employee is already manager", async ({ page }) => {
  await page.goto(BASE_URL);

  // Click the list employee link.
  await page.getByRole("link", { name: "List Employees" }).click();

  // Expects page to have a heading with the name of Add new employee.
  await expect(page.getByRole("heading", { name: "Employees" })).toBeVisible();

  // Expects page to have a button with the name of edit.
  await page.getByRole("link", { name: "Edit" }).first().click();

  await expect(page.getByRole("heading", { name: "Edit Employee" })).toBeVisible();

  await page.getByRole("link", { name: "Promote as manager" }).click();
  await page.getByRole("link", { name: "Proceed" }).click();

  await expect(page.getByRole("heading", { name: "List Employees" })).toBeVisible();
  await page.getByRole("link", { name: "Edit" }).first().click();
  await expect(page.getByRole("heading", { name: "Edit Employee" })).toBeVisible();
  await page.getByRole("link", { name: "Promote as manager" }).click();
  await page.getByRole("link", { name: "Proceed" }).click();
});

test("Do not display the team he's currently in", async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByRole("link", { name: "List Employees" }).click();

  await expect(page.getByRole("heading", { name: "Employees" })).toBeVisible();
  await page.getByRole("link", { name: "Edit" }).first().click();
  await page.getByRole("link", { name: "Add to team" }).click();
});
