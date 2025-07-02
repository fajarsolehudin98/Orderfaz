describe("Dashboard", () => {
  beforeEach(() => {
    cy.login("raerifai@gmail.com", "Asd123456").wait(3000);
  });

  //   Untuk menghilangkan error Map container yang tidak ditemukan saat running test
  Cypress.on("uncaught:exception", (err) => {
    if (err.message.includes("Map container not found")) {
      return false;
    }
  });

  //   Cek statistik dari status paket
  it("Status Paket", () => {
    cy.get(".bg-pink-50").should("contain", "Belum Bayar");

    cy.get(".bg-blue-50 > :nth-child(1)").should("contain", "Dibayar");
    cy.get(".bg-amber-50 > :nth-child(1)").should(
      "contain",
      "Menunggu Diproses"
    );
    cy.get(".bg-violet-50 > :nth-child(1)").should(
      "contain",
      "Sedang Diproses"
    );
    cy.get(".bg-teal-50 > :nth-child(1)").should("contain", "Selesai");
    cy.get(".bg-orange-50 > :nth-child(1)").should("contain", "Return");
    cy.get(".bg-red-50 > :nth-child(1)").should("contain", "Cancel");
    cy.get(".bg-gray-50 > :nth-child(1) > .text-neutral-600").should(
      "contain",
      "Expired"
    );
  });

  it("Performa Toko dan Checkout", () => {
    cy.get(".flex.mb-8 > .grid > :nth-child(1)").should(
      "contain",
      "Total Gross Revenue"
    );
    cy.get(".flex.mb-8 > .grid > :nth-child(2)").should(
      "contain",
      "Total Net Revenue"
    );
    cy.get(".grid > :nth-child(3)").should("contain", "COGS");
    cy.get(".grid > :nth-child(4)").should("contain", "Gross Profit");
    cy.get(".grid > :nth-child(5)").should("contain", "Ongkos Kirim");
    cy.get(".grid > :nth-child(6)").should("contain", "Kupon Terpakai");
  });
});
