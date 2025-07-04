import { getFakeUser } from "../../support/fakeHelper";

describe("Register", () => {
  it("Valid Register", () => {
    const user = getFakeUser();

    // REGISTER DENGAN DATA EMAIL DAN PASSWORD YANG VALID
    cy.visit("/register");
    cy.get("#email")
      .type(user.email, { delay: 50 })
      .should("have.value", user.email);

    cy.get("#name")
      .type(user.name, { delay: 50 })
      .should("have.value", user.name);

    cy.get(":nth-child(3) > .base-input").should("be.visible").type(user.phone);

    cy.get("#password")
      .type(user.password, { delay: 50 })
      .should("have.value", user.password);

    cy.get(".-mt-1").click().wait(1000).click();

    cy.get(".primary").should("contain", "Daftar").click();
  });
});
