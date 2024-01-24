import { test } from "@playwright/test";
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
    "/**/; DROP TABLE employees;",
    "/**/; DROP TABLE employees;",
    "/**/; DROP TABLE employees;",
    "75001",
    "2021-01-01",
    "/**/; DROP TABLE employees;"
  );

  await employeePage.submitEmployeeForm();

  await employeePage.expectHeadingVisible("Employees");
});
