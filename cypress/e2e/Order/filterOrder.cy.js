describe("Filter Order", () => {
  beforeEach(() => {
    cy.login("raerifai@gmail.com", "Asd123456").wait(3000);
    cy.intercept("GET", "https://api.orderfaz.com/orders/v2/order*").as(
      "getOrder"
    );
  });

  //   Untuk menghilangkan error Map container yang tidak ditemukan saat running test
  Cypress.on("uncaught:exception", (err) => {
    if (err.message.includes("Map container not found")) {
      return false;
    }
  });

  //   Filter by SKU produk baju lebaran
  it("Filter by SKU", () => {
    cy.get("#menu-order > .justify-between").should("contain", "Order").click();
    cy.url().should("include", "/order");

    cy.get(":nth-child(2) > .primary-border").click();
    cy.get('[data-katalon="InputText-container"] > .rounded-primary')
      .type("JM1-1726801777")
      .should("have.value", "JM1-1726801777");

    cy.contains("Terapkan").should("be.visible").click();

    // Cek list order yang muncul melalui api get order
    cy.wait("@getOrder").its("response.statusCode").should("eq", 200);
  });

  //   Perubahan status kiriman
  it("Perubahan status kiriman", () => {
    cy.get("#menu-order > .justify-between").should("contain", "Order").click();
    cy.url().should("include", "/order");

    cy.get(":nth-child(1) > :nth-child(1) > #selectOne")
      .click()
      .should("be.checked");

    cy.contains("Mark as").should("be.visible").click();
    cy.contains("Mark as Complete").should("be.visible").click();
    cy.contains("button", "Ya").click();
    cy.contains("Sukses memperbarui mark as order status").should("be.visible");
  });
});
