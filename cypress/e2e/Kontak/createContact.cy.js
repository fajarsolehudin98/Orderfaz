import { getFakeUser } from "../../support/fakeHelper";

describe("Kontak", () => {
  beforeEach(() => {
    cy.login("raerifai@gmail.com", "Asd123456").wait(3000);
  });

  //   Untuk menghilangkan error Map container yang tidak ditemukan saat running test
  Cypress.on("uncaught:exception", (err) => {
    if (err.message.includes("Map container not found")) {
      return false;
    }
  });

  it("Buat kontak baru", () => {
    const dataKontak = getFakeUser();

    cy.contains("Promosi").click();
    cy.url().should("include", "/contact");

    cy.contains("button", "Tambah Alamat Penerima").click();

    cy.get(".p-5 > :nth-child(1) > .rounded-primary")
      .type(dataKontak.name, { delay: 50 })
      .should("have.value", dataKontak.name);

    cy.get(".p-5 > :nth-child(2) > .rounded-primary")
      .type(dataKontak.name, { delay: 50 })
      .should("have.value", dataKontak.name);

    cy.get(".p-5 > :nth-child(3) > .transition-all").type(dataKontak.email, {
      delay: 50,
    });

    cy.get(".relative.rounded-primary > .transition-all").type(
      dataKontak.phone,
      { delay: 50 }
    );

    cy.get(".base-input")
      .type(dataKontak.address, { delay: 50 })
      .should("have.value", dataKontak.address);

    cy.get(".py-3 > button.text-blue-600").click();
    cy.get("#search", { timeout: 10000 })
      .should("be.visible")
      .and("not.be.disabled")
      .and(($el) => {
        expect($el[0].offsetParent).to.not.be.null; // pastikan tidak tertutup
      })
      .type("andir");

    cy.contains("andir dayeuhkolot").click();
  });
});
