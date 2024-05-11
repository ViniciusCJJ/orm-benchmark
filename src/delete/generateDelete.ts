import "dotenv/config";
import { generateUsers } from "../create/generateUsers";

const main = async () => {
  generateUsers();
};

main();
