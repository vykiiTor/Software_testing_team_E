import { test } from "@playwright/test";
import TeamPage from "./object-models/TeamPage";
import { BASE_URL } from "./utils/constants";

test("Create new team", async ({ page }) => {
  const teamPage = new TeamPage(page);
  await teamPage.gotoCreateNewTeamPage();

  await teamPage.fillTeamForm("albert's team");

  // Expects page to have a heading with the name of Add new employee.
  await teamPage.expectHeadingVisible("Create new team");
  await teamPage.expectUrlToBe(`${BASE_URL}/add_team`);
});

test("List teams", async ({ page }) => {
  const teamPage = new TeamPage(page);

  await teamPage.gotoListTeamsPage();
  //push sur git uwu
  //push sur git uwu

  //push sur git uwu
  //push sur git uwu
  //push sur git uwu
  //push sur git uwu

  teamPage.expectUrlToBe(`${BASE_URL}/teams`);
});
