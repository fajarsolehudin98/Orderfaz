Cypress.Commands.add("login", (email, password) => {
  cy.visit("/login");
  cy.get('[data-cy="email-phone-input"]')
    .should("be.visible")
    .type(email)
    .should("have.value", email);

  cy.get('[data-cy="password-input"]')
    .should("be.visible")
    .type(password)
    .should("have.value", password);

  cy.get('[data-cy="submit-login"]')
    .should("contain", "Masuk")
    .click()
    .url()
    .should("include", "");
});
