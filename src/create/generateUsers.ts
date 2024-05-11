import fs from "fs";
import "dotenv/config";
import { v4 } from "uuid";
import { fakerPT_BR } from "@faker-js/faker";
import { generateCPF } from "../utils/generateCPF";

const main = async () => {
  const quantity = 1000;

  const requests: any[] = [];

  // todos os orms respeitam esse padrão
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
    requests.push(user);
  }

  console.dir(requests, { depth: null });

  fs.writeFileSync(
    "./data/requests.json",
    JSON.stringify(requests.map((user) => JSON.stringify(user)))
  );

  process.exit(0);
};

main();
