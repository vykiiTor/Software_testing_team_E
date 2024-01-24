import { test, expect } from "@playwright/test";
import EmployeePage from "./object-models/EmployeePage";

test("Create new employee", async ({ page }) => {
  const employeePage = new EmployeePage(page);
  await employeePage.gotoAddEmployeePage();

  await employeePage.fillEmployeeForm(
    "John Doe",
    "johndoe@gmail.com",
    "10 rue de la paix",
    "Paris",
    "75001",
    "2021-01-01",
    "Software Engineer"
  );

  await employeePage.submitEmployeeForm();

  await employeePage.expectHeadingVisible("Employees");
});

test("Block creation of employee with invalid zipcode", async ({ page }) => {
  const employeePage = new EmployeePage(page);
  await employeePage.gotoAddEmployeePage();

  await employeePage.fillEmployeeForm(
    "John Doe",
    "johndoe@gmail.com",
    "10 rue de la paix",
    "Paris",
    "7",
    "2021-01-01",
    "Software Engineer"
  );

  await employeePage.submitEmployeeForm();

  await employeePage.expectServerErrorMessage();
});

test("Prevent sql injection", async ({ page }) => {
  const employeePage = new EmployeePage(page);
  await employeePage.gotoAddEmployeePage();

  await employeePage.fillEmployeeForm(
    "/**/; DROP TABLE employees;",
    "test@gmail.com",
    "/**/; DROP TABLE employees;",
    "/**/; DROP TABLE employees;",
    "75001",
    "2021-01-01",
    "/**/; DROP TABLE employees;"
  );

  await employeePage.submitEmployeeForm();

  await employeePage.expectHeadingVisible("Employees");
});

test("Block creation of two same employee", async ({ page }) => {
  const employeePage = new EmployeePage(page);
  await employeePage.gotoAddEmployeePage();

  await employeePage.fillEmployeeForm(
    "John Doe",
    "johndoe@gmail.com",
    "10 rue de la paix",
    "Paris",
    "75001",
    "2021-01-01",
    "Software Engineer"
  );

  await employeePage.submitEmployeeForm();

  await employeePage.gotoAddEmployeePage();

  await employeePage.fillEmployeeForm(
    "John Doe",
    "johndoe@gmail.com",
    "10 rue de la paix",
    "Paris",
    "75001",
    "2021-01-01",
    "Software Engineer"
  );

  await employeePage.submitEmployeeForm();

  await employeePage.expectServerErrorMessage();
});

test("error 500 if zip code too long", async ({ page }) => {
  const employeePage = new EmployeePage(page);
  await employeePage.gotoAddEmployeePage();

  await employeePage.fillEmployeeForm(
    "John Doe",
    "johndoe@gmail.com",
    "10 rue de la paix",
    "Paris",
    "3213333333321321312312312312321321312312321321321321313213213213213213321333333332132131231231231232132131231232132132132131321321321321321332133333333213213123123123123213213123123213213213213132132132132132133213333333321321312312312312321321312312321321321321313213213213213213",
    "2021-01-01",
    "Software Engineer"
  );

  await employeePage.submitEmployeeForm();

  await employeePage.expectServerErrorMessage();
});

test("Do not show promote button if employee is already manager", async ({ page }) => {
  const employeePage = new EmployeePage(page);
  await employeePage.gotoListEmployeesPage();

  await employeePage.promoteFirstEmployee();

  await employeePage.gotoListEmployeesPage();

  await page.getByRole("link", { name: "Edit" }).first().click();
  await expect(page.getByRole("heading", { name: "Edit Employee" })).toBeVisible();
  // expect to not have the promote button
  await employeePage.expectNotVisibleHeader("Promote as manager");
});

test("Do not display the team he's currently in", async ({ page }) => {
  const employeePage = new EmployeePage(page);
  await employeePage.gotoListEmployeesPage();

  await employeePage.addFirstEmployeeToTeam();
  await employeePage.expectHeadingVisible("Edit Employee");

  await employeePage.gotoListEmployeesPage();

  await employeePage.addFirstEmployeeToTeam();
  await employeePage.expectNotVisibleHeader("Edit Employee");
});
