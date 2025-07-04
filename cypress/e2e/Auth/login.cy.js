import { getFakeUser } from "../../support/fakeHelper";

describe("Login", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.fixture("dataLogin.json").as("dataLogin");
  });

  // LOGIN DENGAN DATA DAN EMAIL YANG VALID

  it("Valid Login", function () {
    cy.get('[data-cy="email-phone-input"]')
      .type(this.dataLogin.email, {
        delay: 50,
      })
      .should("have.value", this.dataLogin.email);

    cy.get('[data-cy="password-input"]')
      .should("be.visible")
      .type(this.dataLogin.password, { delay: 50 })
      .should("have.value", this.dataLogin.password);

    cy.get('[data-cy="submit-login"]').should("contain", "Masuk").click();

    cy.url().should("include", "");
  });
});
