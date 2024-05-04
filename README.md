Script para start tests: k6 run -e HOST=http://localhost:3331 -e ENDPOINT=user -e DATA_FILE=./data/requests2.json -e HTTP_METHOD=post bench.js
Script para gerar dados: $env:TYPE="relationship ou user"; yarn dev:generate

Ex Script para start tests e salvar output na nuvem: k6 run --out cloud  -e HOST=http://localhost:3332 -e ENDPOINT=user -e DATA_FILE=./data/requests.json -e HTTP_METHOD=post -e VUS=1 -e ITERATIONS=100000 bench.js

Link da documentação para criar uma conta no k6: https://grafana.com/docs/k6/latest/results-output/real-time/cloud/