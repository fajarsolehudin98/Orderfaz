import { getFakeUser } from "../../support/fakeHelper";

describe("Kupon", () => {
  beforeEach(() => {
    cy.login("raerifai@gmail.com", "Asd123456").wait(3000);
    cy.intercept("POST", "https://api.orderfaz.com/promos/v1/checkouts").as(
      "addCoupon"
    );
  });

  //   Untuk menghilangkan error Map container yang tidak ditemukan saat running test
  Cypress.on("uncaught:exception", (err) => {
    if (err.message.includes("Map container not found")) {
      return false;
    }
  });

  //   Membuat kupon baru
  it("Buat kupon baru", () => {
    const dataInput = getFakeUser();

    cy.contains("Promosi").click();
    cy.contains("Kupon").should("be.visible").click();
    cy.url().should("include", "/coupon");

    cy.contains("button", "Tambah Kupon").should("be.visible").click();

    // Isi data kupon
    cy.get('[data-katalon="addCoupon-name-container"] > .rounded-primary')
      .type(dataInput.name, { delay: 50 })
      .should("have.value", dataInput.name);

    cy.get(".h-fit > :nth-child(2) > .transition-all").type(dataInput.name, {
      delay: 50,
    });

    cy.get(".grid > .my-5.w-full > .transition-all")
      .type(dataInput.items[2].quantity)
      .should("have.value", dataInput.items[2].quantity);

    // Simpan dan lanjutkan untuk membuat kupon baru
    cy.get(".grid.p-5").contains("Tambah").click();

    cy.contains("Sukses menambahkan kupon").should("be.visible");
    cy.wait("@addCoupon").its("response.statusCode").should("eq", 201);
  });
});
