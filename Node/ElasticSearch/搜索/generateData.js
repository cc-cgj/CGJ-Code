// 模拟数据
import fs from "node:fs";

import { fa, Faker, zh_CN } from "@faker-js/faker";

const faker = new Faker({
  locale: [zh_CN],
});

const generateData = (total = 1000) => {
  const data = [];
  for (let i = 0; i < total; i++) {
    data.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 18, max: 80 }),
      phone: faker.phone.number(),
      id: faker.string.uuid(),
    });
  }
  return data;
};

fs.writeFileSync("data.json", JSON.stringify(generateData(), null, 2));
