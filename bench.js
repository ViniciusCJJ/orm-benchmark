import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { scenario } from 'k6/execution';
import http from 'k6/http';

const requests = JSON.parse(open('./data/requests2.json'));

function initData(data) {
  let vuRequests = requests.slice(__VU).concat(requests.slice(0, __VU));
  if (data === undefined) {
    data = vuRequests;
  } else {
    vuRequests.forEach(request => data.data.push(request));
  }
  return data;
}

const data = new SharedArray('requests', initData);

const host = `https://test-prisma-orm.duckdns.org`;

export const options = {
  vus: 2, // Number of virtual users
  iterations: 15,
};

export default function () {
  const body = data[scenario.iterationInTest % data.length];
  const url = `${host}${'/user'}`;


  http.post(url,
    JSON.stringify(JSON.parse(data[scenario.iterationInTest % data.length])), {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  sleep(0.2 * (scenario.iterationInTest % 6));
}


