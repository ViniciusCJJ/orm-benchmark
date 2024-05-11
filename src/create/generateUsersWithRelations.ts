import fs from "fs";
import "dotenv/config";
import { v4 } from "uuid";
import { fakerPT_BR } from "@faker-js/faker";
import { generateCPF } from "../utils/generateCPF";

const generateUsersWithRelations = async () => {
  const quantity = 1;

  const requests: any[] = [];

  const type = process.env.TYPE;

  if (
    !type ||
    (type !== "prisma" && type !== "typeorm" && type !== "sequelize")
  ) {
    console.error(
      "Invalid ORM type, valid options are: prisma, typeorm and sequelize"
    );
    process.exit(1);
  }

  // Cada ORM tem um padrão diferente nesse caso

  if (type === "prisma") {
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

      requests.push(user);
    }
  }

  if (type === "typeorm") {
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
      };
      requests.push(user);
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

      requests.push(user);
    }
  }

  console.dir(requests, { depth: null });

  fs.writeFileSync(
    "./data/requests.json",
    JSON.stringify(requests.map((user) => JSON.stringify(user)))
  );

  process.exit(0);
};

generateUsersWithRelations();
