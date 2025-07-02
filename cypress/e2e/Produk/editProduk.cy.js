describe("Produk", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://api.orderfaz.com/products/v3.1/main*").as(
      "listProduk"
    );
    cy.login("raerifai@gmail.com", "Asd123456").wait(3000);
  });

  //   Untuk menghilangkan error Map container yang tidak ditemukan saat running test
  Cypress.on("uncaught:exception", (err) => {
    if (err.message.includes("Map container not found")) {
      return false;
    }
  });
  Cypress.on("uncaught:exception", (err) => {
    if (err.message.includes("Cannot write to private field")) {
      return false;
    }
  });
  Cypress.on("uncaught:exception", (err) => {
    if (err.message.includes("Request failed with status code 404")) {
      return false;
    }
  });

  // Melakukan pencarian produk dengan keyword "Baju"
  it("Pencarian Produk", () => {
    cy.get("#menu-produk > .relative > .justify-between")
      .should("contain", "Produk")
      .click();
    cy.url().should("include", "/produk");

    cy.get('input[placeholder="Cari nama produk"]').type("baju");
    cy.wait("@listProduk").its("response.statusCode").should("eq", 200);
  });

  //   Edit stok produk
  it("Edit stok produk", () => {
    cy.get("#menu-produk > .relative > .justify-between")
      .should("contain", "Produk")
      .click();
    cy.url().should("include", "/produk");

    cy.get("a.btn").eq(0).click().wait(3000);

    cy.get('[data-key="isActive"] > .gap-2').click();

    cy.get(":nth-child(2) > .primary").contains("Simpan").click();

    cy.get(
      "#headlessui-dialog-panel-v-89 > :nth-child(1) > .relative"
    ).contains("Yey Produk “Produk Baru” Berhasil Diedit!");
  });
});
