import { faker } from "@faker-js/faker";

export function getFakeUser() {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    phone: "62" + faker.number.int({ min: 100000000, max: 99999999999 }),
    address: faker.location.streetAddress(),
    items: Array.from({ length: 4 }, () => ({
      productName: faker.commerce.productName(),
      price: faker.commerce.price({ min: 25000, max: 200000, dec: 0 }),
      quantity: faker.number.int({ min: 1, max: 10 }),
      weight: faker.number.int({ min: 1, max: 3 }),
    })),
  };
}
