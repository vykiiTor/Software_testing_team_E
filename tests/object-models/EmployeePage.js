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
}

export default EmployeePage;
