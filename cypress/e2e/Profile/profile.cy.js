import { getFakeUser } from "../../support/fakeHelper";

describe("Profile", () => {
  beforeEach(() => {
    cy.login("raerifai@gmail.com", "Asd123456").wait(5000);
  });

  Cypress.on("uncaught:exception", (err) => {
    if (err.message.includes("Map container not found")) {
      return false;
    }
  });

  it("Perubahan nama akun", () => {
    const account = getFakeUser();

    cy.get('[data-cypress-el="true"]').click();
  });
});
