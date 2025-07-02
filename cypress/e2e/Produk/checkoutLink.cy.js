import { getFakeUser } from "../../support/fakeHelper";

describe("Create order", () => {
  it("Checkout melalui checkout link", () => {
    const dataPenerima = getFakeUser();
    cy.intercept("POST", "https://api.orderfaz.com/orders/v2/public/order").as(
      "suksesOrder"
    );

    cy.visit("https://myshoes-store.fazlink.co/baju-lebaran");
    cy.scrollTo("bottom");

    cy.get('[data-cy="receiverName-input"]')
      .type(dataPenerima.name, { delay: 50 })
      .should("have.value", dataPenerima.name);

    cy.get('[data-cy="receiverPhone-input"]')
      .type(dataPenerima.phone, { delay: 50 })
      .should("have.value", dataPenerima.phone);

    cy.get('[data-cy="full-address-input"]')
      .type(dataPenerima.address, { delay: 50 })
      .should("have.value", dataPenerima.address);

    cy.get('[data-cy="district-select"]')
      .type("andir")
      .wait(2000)
      .type("{enter}");

    cy.get("#courierSelect").click();
    cy.contains("Regular").click();
    cy.contains("JNE").click().wait(2000);

    cy.scrollTo("bottom");
    cy.get('[data-cy="order-button"]')
      .should("contain", "Beli Sekarang")
      .click();
    cy.wait("@suksesOrder").its("response.statusCode").should("eq", 201);
  });
});
