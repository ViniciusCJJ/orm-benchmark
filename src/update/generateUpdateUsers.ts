import "dotenv/config";
import { generateUsers } from "../create/generateUsers";
import { generateRead } from "../read/generateRead";

const main = async () => {
  generateRead();
  generateUsers();
};

main();
