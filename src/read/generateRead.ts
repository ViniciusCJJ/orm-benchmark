import fs from "fs";
import "dotenv/config";
import { v4 } from "uuid";
import { fakerPT_BR } from "@faker-js/faker";
import { generateCPF } from "../utils/generateCPF";
import { getPaginated } from "../utils/getPaginated";
import { validateModelName } from "../utils/validateModelName";

export const generateRead = async (type?: string) => {
  const quantity = 1000;

  const ids: any[] = [];

  const result = await getPaginated(
    validateModelName(process.env.TYPE || type),
    0,
    quantity
  );

  for (let i = 0; i < quantity; i += 1) {
    const id = result[i].id;
    ids.push(id);
  }

  console.dir(ids, { depth: null });

  fs.writeFileSync("./data/path_requests.json", JSON.stringify(ids));

  process.exit(0);
};

generateRead();
