import { expect } from "playwright/test";
import { BASE_URL } from "../utils/constants.js";

class TeamPage {
  constructor(page) {
    this.page = page;
  }

  async gotoCreateNewTeamPage() {
    await this.page.goto(BASE_URL);
    await this.page.getByRole("link", { name: "Create new team" }).click();
    await expect(this.page.getByRole("heading", { name: "Create new team" })).toBeVisible();
  }

  async gotoListTeamsPage() {
    await this.page.goto(BASE_URL);
    await this.page.getByRole("link", { name: "List teams" }).click();
    await expect(this.page.getByRole("heading", { name: "Teams" })).toBeVisible();
  }

  async fillTeamForm(name) {
    await this.page.fill('[name="name"]', name);
  }

  async expectHeadingVisible(headingName) {
    await expect(this.page.getByRole("heading", { name: headingName })).toBeVisible();
  }

  expectUrlToBe(url) {
    expect(this.page.url()).toBe(url);
  }
}

export default TeamPage;
