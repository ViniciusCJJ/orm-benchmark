import { scenario } from "k6/execution";
import http from "k6/http";

const data = JSON.parse(open(String(__ENV.DATA_FILE)));

export const options = {
  vus: __ENV.VUS,
  iterations: __ENV.ITERATIONS,
};

export default function () {
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


