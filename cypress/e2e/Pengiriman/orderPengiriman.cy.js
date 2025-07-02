import { getFakeUser } from "../../support/fakeHelper";

describe("Pengiriman", () => {
  beforeEach(() => {
    cy.login("raerifai@gmail.com", "Asd123456").wait(3000);
    cy.intercept("GET", "https://api.orderfaz.com/shipments/v2/location*").as(
      "getAddress"
    );
  });

  //   Untuk menghilangkan error Map container yang tidak ditemukan saat running test
  Cypress.on("uncaught:exception", (err) => {
    if (err.message.includes("Map container not found")) {
      return false;
    }
  });

  //   Kirim paket baru di menu pengiriman
  it("Kirim paket baru", () => {
    const dataKiriman = getFakeUser();

    cy.get("#menu-shipment > .relative > .justify-between")
      .should("contain", "Pengiriman")
      .click();
    cy.url().should("include", "/shipment");

    cy.contains("button", "Kirim Paket").should("be.visible").click();
    cy.url().should("include", "/add");

    cy.get("#headlessui-switch-v-44").click().wait(1000);
    cy.get(".justify-end > .primary").click();

    // Isi data pengirim
    cy.get(
      '#shipmentSender > :nth-child(2) > .gap-3 > [data-katalon="InputText-container"] > .rounded-primary'
    )
      .type(dataKiriman.name, { delay: 50 })
      .should("have.value", dataKiriman.name);

    cy.get(
      "#shipmentSender > :nth-child(2) > .gap-3 > .relative.rounded-primary > .overflow-hidden"
    ).type(dataKiriman.phone, { delay: 50 });

    cy.get(".hidden > #senderAddress")
      .type(dataKiriman.address, { delay: 50 })
      .should("have.value", dataKiriman.address);

    //   Isi data Penerima
    cy.get('.grid > [data-katalon="InputText-container"] > .rounded-primary')
      .type(dataKiriman.name, { delay: 50 })
      .should("have.value", dataKiriman.name);

    cy.get(".grid > .relative.rounded-primary > .overflow-hidden").type(
      dataKiriman.phone,
      { delay: 50 }
    );

    cy.get("#receiverAddress0")
      .type(dataKiriman.address, { delay: 50 })
      .should("have.value", dataKiriman.address);

    //   Isi data produk
    cy.get('.p-3 > [data-katalon="InputText-container"] > .rounded-primary')
      .type(dataKiriman.items[0].productName, { delay: 50 })
      .should("have.value", dataKiriman.items[0].productName);

    cy.get('input[placeholder="Contoh: 1"]')
      .type(dataKiriman.items[3].weight, { delay: 50 })
      .should("have.value", dataKiriman.items[3].weight);

    cy.get('[data-katalon="InputPrice-container"] > .transition-all').type(
      dataKiriman.items[1].price,
      { delay: 50 }
    );

    cy.get(".primary > .h-full").should("contain", "Buat Order").click();

    cy.get("#vs4__combobox > .vs__selected-options")
      .type("andir")
      .wait(2000)
      .type("{enter}")
      .wait("@getAddress")
      .its("response.statusCode")
      .should("eq", 200);

    cy.get("#vs2__combobox > .vs__selected-options > .vs__search")
      .type("andir")
      .wait(2000)
      .type("{enter}")
      .wait("@getAddress")
      .its("response.statusCode")
      .should("eq", 200);
  });
});
