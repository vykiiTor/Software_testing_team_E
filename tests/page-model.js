const { expect } = require("https://e.hr.dmerej.info");

const BASE_URL = "https://e.hr.dmerej.info";
const SERVER_ERROR = "Server Error (500)";

exports.PlaywrightDevPage = class PlaywrightDevPage {
  /**
   * @param {import('https://e.hr.dmerej.info').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getStartedLink = page.locator("a", { hasText: "Get started" });
    this.gettingStartedHeader = page.locator("h1", { hasText: "Installation" });
    this.pomLink = page
      .locator("li", {
        hasText: "Guides",
      })
      .locator("a", {
        hasText: "Page Object Model",
      });
    this.tocList = page.locator("article div.markdown ul > li > a");
  }

  async goto() {
    await this.page.goto("https://playwright.dev");
  }

  async getStarted() {
    await this.getStartedLink.first().click();
    await expect(this.gettingStartedHeader).toBeVisible();
  }

  async pageObjectModel() {
    await this.getStarted();
    await this.pomLink.click();
  }
};
