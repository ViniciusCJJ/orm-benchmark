prisma: http://localhost:3331
typeorm: http://localhost:3332
sequelize: http://localhost:3333

- Gerar dados:

  - Script para gerar dados (usuários):
    - yarn dev:generate:users
  - Script para gerar dados com relações:
    - $env:TYPE="relationship"; yarn dev:generate:relations

- Executar testes:

  - Ex Script start tests:
    - k6 run -e HOST=http://localhost:3331 -e ENDPOINT=user -e DATA_FILE=./data/requests.json -e HTTP_METHOD=post -e VUS=1 -e ITERATIONS=1000 bench.js
    - k6 run -e HOST=http://localhost:3331 -e ENDPOINT=user -e DATA_FILE=./data/requests.json -e PATH_VARS_FILE=./data/path_requests.json -e HTTP_METHOD=post -e VUS=1 -e ITERATIONS=1000 bench.js
  - Ex Script start tests e salvar output na nuvem:
    - k6 run --out cloud -e HOST=http://localhost:3332 -e ENDPOINT=user -e DATA_FILE=./data/requests.json -e HTTP_METHOD=post -e VUS=1 -e ITERATIONS=100000 bench.js
    - k6 run --out cloud -e HOST=http://localhost:3332 -e ENDPOINT=user -e DATA_FILE=./data/requests.json -e PATH_VARS_FILE=./data/path_requests.json -e HTTP_METHOD=post -e VUS=1 -e ITERATIONS=100000 bench.js

Link da documentação para criar uma conta no k6: https://grafana.com/docs/k6/latest/results-output/real-time/cloud/
