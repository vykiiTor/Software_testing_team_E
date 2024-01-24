import { expect } from "playwright/test";
import { BASE_URL, SERVER_ERROR } from "../utils/constants.js";

class EmployeePage {
  constructor(page) {
    this.page = page;
  }

  async gotoAddEmployeePage() {
    await this.page.goto(BASE_URL);
    await this.page.getByRole("link", { name: "Add new employee" }).click();
    await expect(this.page.getByRole("heading", { name: "Add new employee" })).toBeVisible();
  }

  async expectNotVisibleHeader(name) {
    await expect(this.page.getByRole("heading", { name: name }).count()).toBe(0);
  }

  async gotoListEmployeesPage() {
    await this.page.goto(BASE_URL);
    await this.page.getByRole("link", { name: "List Employees" }).click();
    await expect(this.page.getByRole("heading", { name: "Employees" })).toBeVisible();
  }

  async promoteFirstEmployee() {
    await this.page.getByRole("link", { name: "Edit" }).first().click();
    await expect(this.page.getByRole("header", { name: "Edit Employee" })).toBeVisible();
    await this.page.getByRole("link", { name: "Promote as manager" }).click();
    await expect(this.page.getByRole("heading", { name: "Promote employee" })).toBeVisible();
    await this.page.getByRole("button", { name: "Proceed" }).click();
  }

  async fillEmployeeForm(name, email, address, city, zipCode, hiringDate, jobTitle) {
    await this.page.fill('[name="name"]', name);
    await this.page.fill('[name="email"]', email);
    await this.page.fill('[name="address_line1"]', address);
    await this.page.fill('[name="city"]', city);
    await this.page.fill('[name="zip_code"]', zipCode, { force: true });
    await this.page.fill('[name="hiring_date"]', hiringDate);
    await this.page.fill('[name="job_title"]', jobTitle);
  }

  async submitEmployeeForm() {
    await this.page.click('[type="submit"]');
  }

  async expectServerErrorMessage() {
    await expect(this.page.getByRole("heading", { name: SERVER_ERROR })).toBeVisible();
  }

  async expectHeadingVisible(headingName) {
    await expect(this.page.getByRole("heading", { name: headingName })).toBeVisible();
  }

  async addFirstEmployeeToTeam() {
    await this.page.getByRole("link", { name: "Edit" }).first().click();
    await expect(this.page.getByRole("heading", { name: "Edit Employee" })).toBeVisible();
    await this.page.getByRole("link", { name: "Add to team" }).click();
    await this.page.getByLabel("Team").selectOption("biduleurs team");
    await this.page.getByRole("button", { name: "Add" }).click();
  }
}

export default EmployeePage;
