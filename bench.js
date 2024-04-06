import { scenario } from "k6/execution";
import http from "k6/http";

const data = JSON.parse(open(String(__ENV.DATA_FILE)));

export const options = {
  vus: 1, // Number of virtual users
  iterations: 10,
};

export default function () {
  if (!__ENV.HOST) throw new Error("HOST is required"); // http://localhost:3331
  if (!__ENV.ENDPOINT) throw new Error("ENDPOINT is required"); // user
  if (!__ENV.DATA_FILE) throw new Error("DATA is required"); // data.json
  if (!__ENV.HTTP_METHOD) throw new Error("HTTP_METHOD is required"); // POST | GET | PUT | DELETE

  const selectedHost = __ENV.HOST;
  const url = `${selectedHost}/${__ENV.ENDPOINT}`;

  http[String(__ENV.HTTP_METHOD).toLowerCase()](
    url,
    JSON.stringify(JSON.parse(data[scenario.iterationInTest % data.length])),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
