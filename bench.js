import { scenario } from "k6/execution";
import http from "k6/http";

const body_datas = JSON.parse(open(String(__ENV.DATA_FILE)));
// para ids
const path_vars = JSON.parse(open(String(__ENV.PATH_VARS_FILE)));

export const options = {
  vus: __ENV.VUS,
  iterations: __ENV.ITERATIONS,
};

export default function () {
  const selectedHost = __ENV.HOST;
  const url = `${selectedHost}/${__ENV.ENDPOINT}`;
  const path_var = path_vars[scenario.iterationInTest % path_vars.length];
  http[String(__ENV.HTTP_METHOD).toLowerCase()](
    url + (path_var ? `/${path_var}` : ""),
    JSON.stringify(
      JSON.parse(body_datas[scenario.iterationInTest % body_datas.length])
    ),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
