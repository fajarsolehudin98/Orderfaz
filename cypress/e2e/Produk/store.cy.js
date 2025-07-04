import { getFakeUser } from "../../support/fakeHelper";

describe("Store", () => {
  it("Buat order store", () => {
    const dataPenerima = getFakeUser();
    cy.visit("https://myshoes-store.fazlink.co/").wait(5000);

    // Keluar dari banner pada store
    cy.get("#closePopupBanner").click();
    cy.get(".gap-2 > .border").click();

    // Melakukan pencarian produk dengan keyword "baju lebaran"
    cy.get("div.hidden > .relative > #search")
      .type("baju lebaran{enter}")
      .wait(2000);

    cy.contains("h1", "baju lebaran").click();

    // Tambahkan ke keranjang
    cy.get(".justify-around > #button")
      .should("contain", "Tambah Keranjang")
      .click();

    cy.contains("Berhasil Ditambahkan").should("be.visible");

    cy.get("#store-cart").should("contain", "Lihat Keranjang").click();

    // Masuk ke halaman checkout untuk mengisi data pesanan
    cy.get("#4b70cbc6-0d04-463a-b3a5-f658677851d7")
      .click()
      .should("be.checked");

    cy.get(".sticky > #button").should("contain", "Checkout").click();
    cy.url().should("include", "/checkout");

    // Mengisi data pesanan di halaman checkout store
    cy.get(
      '#headlessui-disclosure-panel-11 > .px-0 > :nth-child(1) > :nth-child(2) > [data-cy="receiverEmail-input"]'
    )
      .type(dataPenerima.email, { delay: 50 })
      .should("have.value", dataPenerima.email);

    cy.get(
      '#headlessui-disclosure-panel-11 > .px-0 > :nth-child(2) > :nth-child(2) > [data-cy="receiverName-input"]'
    )
      .type(dataPenerima.name, { delay: 50 })
      .should("have.value", dataPenerima.name);

    cy.get(
      '#headlessui-disclosure-panel-11 > .px-0 > :nth-child(3) > .flex > [data-cy="receiverPhone-input"]'
    )
      .type(dataPenerima.phone, { delay: 50 })
      .should("have.value", dataPenerima.phone);

    cy.get(
      '#headlessui-disclosure-panel-11 > .px-0 > #receiverAddress > .flex-col > :nth-child(1) > [data-cy="full-address-input"]'
    )
      .type(dataPenerima.address, { delay: 50 })
      .should("have.value", dataPenerima.address);

    cy.get(
      '#vs5__combobox > .vs__selected-options > [data-cy="province-select"]'
    )
      .type("bandung")
      .wait(2000)
      .type("{enter}");

    cy.get(
      '#vs6__combobox > .vs__selected-options > [data-cy="district-select"]'
    )
      .type("cililin")
      .wait(2000)
      .type("{enter}");

    cy.get(
      '#headlessui-disclosure-panel-11 > .px-0 > :nth-child(5) > [data-cy="receiverNote-input"]'
    )
      .type("ini hanya test note saja", { delay: 50 })
      .should("have.value", "ini hanya test note saja");

    // Pilih kurir
    cy.contains("Pilih Kurir").should("be.visible").click();
    cy.contains("Regular").click();
    cy.contains("JNE").click().wait(1000);

    // Order sekarang
    cy.contains("Order Sekarang").should("be.visible").click();
    cy.url().should("include", "/thankyou");
  });
});
