prisma: http://localhost:3331
typeorm: http://localhost:3332
sequelize: http://localhost:3333

- Gerar dados:

  - Exemplos de scripts para gerar dados:
    - create
      - yarn dev:generate:users
      - $env:TYPE="prisma"; yarn dev:generate:relations
    - read
      - $env:TYPE="user"; yarn dev:generate:read

- Executar testes:

  - yarn test:prisma:create:user
  - yarn test:prisma:read:user

  - Exemplos usando o k6 diretamente:

    - k6 run -e HOST=http://localhost:3331 -e ENDPOINT=user -e DATA_FILE=./data/requests.json -e HTTP_METHOD=post -e VUS=1 -e ITERATIONS=1000 bench.js
    - k6 run -e HOST=http://localhost:3331 -e ENDPOINT=user -e DATA_FILE=./data/requests.json -e PATH_VARS_FILE=./data/path_requests.json -e HTTP_METHOD=post -e VUS=1 -e ITERATIONS=1000 bench.js

  - Exemplos usando o k6 diretamente e salvar output na nuvem:

    - k6 run --out cloud -e HOST=http://localhost:3332 -e ENDPOINT=user -e DATA_FILE=./data/requests.json -e HTTP_METHOD=post -e VUS=1 -e ITERATIONS=100000 bench.js
    - k6 run --out cloud -e HOST=http://localhost:3332 -e ENDPOINT=user -e DATA_FILE=./data/requests.json -e PATH_VARS_FILE=./data/path_requests.json -e HTTP_METHOD=post -e VUS=1 -e ITERATIONS=100000 bench.js

Link da documentação para criar uma conta no k6: https://grafana.com/docs/k6/latest/results-output/real-time/cloud/
