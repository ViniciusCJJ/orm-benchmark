import { scenario } from "k6/execution";
import http from "k6/http";

const data = JSON.parse(open("./data/requests2.json"));

const hostPrisma = `http://localhost:3331`;
const hostTypeorm = `http://localhost:3332`;
const hostSequelize = `http://localhost:3333`;

export const options = {
  vus: 1, // Number of virtual users
  iterations: 10,
};

export default function () {
  const url = `${hostPrisma}${"/user"}`;

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
