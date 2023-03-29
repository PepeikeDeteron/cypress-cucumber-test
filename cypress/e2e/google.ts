import { Given, When, Then, Before, After } from "@badeball/cypress-cucumber-preprocessor";

Before({ tags: "@google" }, () => {
  cy.clearCookies();
  cy.clearLocalStorage();
});

Given("google.com にアクセスする", () => {
  cy.visit("https://www.google.com");
});

Then("タイトルに Google がある", () => {
  cy.title().should("include", "Google");
});

When("{string}で検索する", (searchTerm: string) => {
  cy.get("input[name='q']").type(`${searchTerm}{enter}`);
});

Then("最初の検索結果を取得する", () => {
  cy.get("#search a")
  .invoke("attr", "href")
  .then((href) => console.log(href));
});

Then("検索結果が表示される", () => {
  cy.get(".g").should("be.visible");
});

Then("タイトルに {string} が含まれない", (unwantedTerm: string) => {
  cy.title().should("not.include", unwantedTerm);
});

After({ tags: "@google" }, () => {
  cy.clearCookies();
  cy.clearLocalStorage();
});
