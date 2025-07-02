describe("Perhitungan Ongkir", () => {
  beforeEach(() => {
    cy.login("raerifai@gmail.com", "Asd123456").wait(3000);
  });
  Cypress.on("uncaught:exception", (err) => {
    if (err.message.includes("Map container not found")) {
      return false;
    }
  });
  it("Perhitungan Ongkir", () => {
    cy.get("#menu-shipment > .relative > .justify-between")
      .should("contain", "Pengiriman")
      .click();

    cy.contains("Cek Ongkir").click();
    cy.url().should("include", "/shipping-fee");

    cy.get("#headlessui-listbox-button-v-23").click();

    cy.get("#search").type("cakung").wait(1000);

    cy.get("#headlessui-listbox-option-v-25").click();

    cy.get('[data-katalon="InputNumber-container"] > .transition-all')
      .clear()
      .type("2")
      .should("have.value", "2");

    cy.get(".primary").should("contain", "Cek Ongkir").click();
  });
});
