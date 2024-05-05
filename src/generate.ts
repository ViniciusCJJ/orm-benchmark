import fs from "fs";
import "dotenv/config";
import { v4 } from "uuid";
import { fakerPT_BR } from "@faker-js/faker";

function generateCPF(): string {
  const n = () => Math.floor(Math.random() * 10);

  const n1 = n();
  const n2 = n();
  const n3 = n();
  const n4 = n();
  const n5 = n();
  const n6 = n();
  const n7 = n();
  const n8 = n();
  const n9 = n();

  const d1 =
    n9 * 2 +
    n8 * 3 +
    n7 * 4 +
    n6 * 5 +
    n5 * 6 +
    n4 * 7 +
    n3 * 8 +
    n2 * 9 +
    n1 * 10;
  const d1Rest = d1 % 11;
  const digito1 = d1Rest < 2 ? 0 : 11 - d1Rest;

  const d2 =
    digito1 * 2 +
    n9 * 3 +
    n8 * 4 +
    n7 * 5 +
    n6 * 6 +
    n5 * 7 +
    n4 * 8 +
    n3 * 9 +
    n2 * 10 +
    n1 * 11;
  const d2Rest = d2 % 11;
  const digito2 = d2Rest < 2 ? 0 : 11 - d2Rest;

  return `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${digito1}${digito2}`;
}

const main = async () => {
  const quantity = 10;

  const requests: any[] = [];

  const type = process.env.TYPE || "user";

  if (type === "user") {
    // generate create user requests
    for (let i = 0; i < quantity; i += 1) {
      const user = {
        id: v4(),
        name: fakerPT_BR.person.firstName(),
        CPF: generateCPF(),
        email: fakerPT_BR.internet.email(),
        password: fakerPT_BR.internet.password(),
        phone: fakerPT_BR.phone.number(),
        created_at: new Date(),
        updated_at: new Date(),
      };
      requests.push(JSON.stringify(user));
    }
  }

  if (type === "prisma") {
    // generate create user requests whith address
    for (let i = 0; i < quantity; i += 1) {
      let user = {
        id: v4(),
        name: fakerPT_BR.person.firstName(),
        CPF: generateCPF(),
        email: fakerPT_BR.internet.email(),
        password: fakerPT_BR.internet.password(),
        phone: fakerPT_BR.phone.number(),
        created_at: new Date(),
        updated_at: new Date(),
        address: {
          create: {
            id: v4(),
            street: fakerPT_BR.location.street(),
            number: fakerPT_BR.location.buildingNumber(),
            city: fakerPT_BR.location.city(),
            state: fakerPT_BR.location.state(),
            zip_code: fakerPT_BR.location.zipCode(),
            district: fakerPT_BR.location.county(),
            created_at: new Date(),
            updated_at: new Date(),
          },
        },
      };
      Object.assign(user, {
        cart: {
          create: {
            id: v4(),
            user_id: user.id,
            expires_at: new Date(),
            created_at: new Date(),
            updated_at: new Date(),
          },
        },
      });

      requests.push(JSON.stringify(user));
    }
  }

  if (type === "typeorm") {
    // generate create user requests whith address
    for (let i = 0; i < quantity; i += 1) {
      const user = {
        id: v4(),
        name: fakerPT_BR.person.firstName(),
        CPF: generateCPF(),
        email: fakerPT_BR.internet.email(),
        password: fakerPT_BR.internet.password(),
        phone: fakerPT_BR.phone.number(),
        created_at: new Date(),
        updated_at: new Date(),
        addresses: [
          {
            id: v4(),
            street: fakerPT_BR.location.street(),
            number: fakerPT_BR.location.buildingNumber(),
            city: fakerPT_BR.location.city(),
            state: fakerPT_BR.location.state(),
            zip_code: fakerPT_BR.location.zipCode(),
            district: fakerPT_BR.location.county(),
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
      };
      requests.push(JSON.stringify(user));
    }
  }

  if (type === "sequelize") {
    for (let i = 0; i < quantity; i += 1) {
      const user = {
        id: v4(),
        name: fakerPT_BR.person.firstName(),
        CPF: generateCPF(),
        email: fakerPT_BR.internet.email(),
        password: fakerPT_BR.internet.password(),
        phone: fakerPT_BR.phone.number(),
        created_at: new Date(),
        updated_at: new Date(),
        addresses: [
          {
            id: v4(),
            street: fakerPT_BR.location.street(),
            number: fakerPT_BR.location.buildingNumber(),
            city: fakerPT_BR.location.city(),
            state: fakerPT_BR.location.state(),
            zip_code: fakerPT_BR.location.zipCode(),
            district: fakerPT_BR.location.county(),
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
        carts: [
          {
            id: v4(),
            status: "EM_PROCESSAMENTO",
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
        include: ["address", "cart"],
      };

      requests.push(JSON.stringify(user));
    }
  }

  console.dir(requests, { depth: null });

  fs.writeFileSync("./data/requests.json", JSON.stringify(requests));

  process.exit(0);
};

function assignSequelizeInclude(
  request: { [key: string]: any },
  include = [{}]
) {
  const keys = Object.keys(request);
  const arrayType = keys.filter((key) => Array.isArray(request[key]));

  arrayType.map((key) => {
    const isListObject = request[key].every(
      (item: any) => typeof item === "object"
    );
    if (!isListObject) return;

    request[key] = request[key].map((item: any) => {
      include.push({
        association: request.model + "." + item.model,
      });
      return assignSequelizeInclude(item, include);
    });
  });
}

main();
