import { scenario } from "k6/execution";
import http from "k6/http";

let body_datas = __ENV.DATA_FILE
  ? JSON.parse(open(String(__ENV.DATA_FILE)))
  : [];

let path_vars = __ENV.PATH_VARS_FILE
  ? JSON.parse(open(String(__ENV.PATH_VARS_FILE)))
  : [];

export const options = {
  vus: __ENV.VUS,
  iterations: __ENV.ITERATIONS,
};

const selectedHost = __ENV.HOST;
const url = `${selectedHost}/${__ENV.ENDPOINT}`;

export default function () {
  const path_var = path_vars[scenario.iterationInTest % path_vars.length];

  let body =
    JSON.parse(body_datas[scenario.iterationInTest % body_datas.length]) || {};
  body.id = path_var;

  http[String(__ENV.HTTP_METHOD).toLowerCase()](url, JSON.stringify(body), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
