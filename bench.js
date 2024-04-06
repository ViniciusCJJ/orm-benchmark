import { scenario } from "k6/execution";
import http from "k6/http";

const data = JSON.parse(open("./data/requests2.json"));

const hosts = {
  prisma: `http://localhost:3331`,
  typeorm: `http://localhost:3332`,
  sequelize: `http://localhost:3333`,
};

export const options = {
  vus: 1, // Number of virtual users
  iterations: 10,
};

export default function () {
  if (!__ENV.HOST) throw new Error("HOST is required");
  if (!hosts[__ENV.HOST]) throw new Error("Invalid HOST");
  if (!__ENV.ENDPOINT) throw new Error("ENDPOINT is required");

  const selectedHost = hosts[__ENV.HOST];
  const url = `${selectedHost}/${__ENV.ENDPOINT}`;

  http.post(
    url,
    JSON.stringify(JSON.parse(data[scenario.iterationInTest % data.length])),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
