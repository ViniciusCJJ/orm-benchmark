import { scenario } from "k6/execution";
import http from "k6/http";

let body_datas = __ENV.DATA_FILE
  ? JSON.parse(open(String(__ENV.DATA_FILE)))
  : [];
// para ids
let path_vars = __ENV.PATH_VARS_FILE
  ? JSON.parse(open(String(__ENV.PATH_VARS_FILE)))
  : [];

export const options = {
  vus: __ENV.VUS,
  iterations: __ENV.ITERATIONS,
};

export default function () {
  const selectedHost = __ENV.HOST;

  const url = `${selectedHost}/${__ENV.ENDPOINT}`;
  const path_var = path_vars[scenario.iterationInTest % path_vars.length];
  const formated_url = url + (path_var ? "/" + path_var : "");

  const body = body_datas[scenario.iterationInTest % body_datas.length];

  http[String(__ENV.HTTP_METHOD).toLowerCase()](formated_url, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
