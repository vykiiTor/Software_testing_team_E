// @ts-check
const { test, expect } = require("@playwright/test");

const BASE_URL = "https://e.hr.dmerej.info";

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
  await page.fill('[name="zip_code"]', "75001", { force: true });
  await page.fill('[name="hiring_date"]', "2021-01-01");
  await page.fill('[name="job_title"]', "Software Engineer");

  // Submit the form
  await page.click('[type="submit"]');
  await expect(page.getByRole("heading", { name: "Employees" })).toBeVisible();
});

test("add employee with invalid zipcode", async ({ page }) => {
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
  await page.fill('[name="zip_code"]', "9", { force: true });
  await page.fill('[name="hiring_date"]', "2021-01-01");
  await page.fill('[name="job_title"]', "Software Engineer");

  // Submit the form
  await page.click('[type="submit"]');
  await expect(page.getByRole("heading", { name: "Server Error (500)" })).toBeVisible();
});

test("doesnt allow sql injection", async ({ page }) => {
  await page.goto(BASE_URL);

  // Click the add new employee link.
  await page.getByRole("link", { name: "Add new employee" }).click();

  // Expects page to have a heading with the name of Add new employee.
  await expect(page.getByRole("heading", { name: "Add new employee" })).toBeVisible();

  // Fill the form
  await page.fill('[name="name"]', "/**/; DROP TABLE employees;");
  await page.fill('[name="email"]', "/**/; DROP TABLE employees;");
  await page.fill('[name="address_line1"]', "/**/; DROP TABLE employees;");
  await page.fill('[name="city"]', "/**/; DROP TABLE employees;");
  await page.fill('[name="zip_code"]', "75001", { force: true });
  await page.fill('[name="hiring_date"]', "2021-01-01");
  await page.fill('[name="job_title"]', "/**/; DROP TABLE employees;");

  // Submit the form
  await page.click('[type="submit"]');
  expect(page.url()).toBe(`${BASE_URL}/employees`);
});

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

test("Creation of two exact employee are possible", async ({ page }) => {
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
  await expect(page.getByRole("heading", { name: "Server Error (500)" })).toBeVisible();
});

test("error 500 if zip code too long", async ({ page }) => {
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
  await page.fill(
    '[name="zip_code"]',
    "3213333333321321312312312312321321312312321321321321313213213213213213321333333332132131231231231232132131231232132132132131321321321321321332133333333213213123123123123213213123123213213213213132132132132132133213333333321321312312312312321321312312321321321321313213213213213213",
    { force: true }
  );
  await page.fill('[name="hiring_date"]', "2021-01-01");
  await page.fill('[name="job_title"]', "Software Engineer");

  const listener = (request) => console.log(`Request finished: ${request.url()}`);
  page.on("requestfinished", listener);
  // Submit the form
  await page.click('[type="submit"]');
  await expect(page.waitForResponse).toMatch("Internal Server Error");
});

test("Do not show promote button if employee is already manager", async ({ page }) => {
  await page.goto(BASE_URL);

  // Click the add new employee link.
  await page.getByRole("link", { name: "List Employees" }).click();

  // Expects page to have a heading with the name of Add new employee.
  await page.getByRole("link", { name: "Promote as manager" }).click();
});
