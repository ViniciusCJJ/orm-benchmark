Script para start tests: k6 run -e HOST=http://localhost:3331 -e ENDPOINT=user -e DATA_FILE=./data/requests2.json -e HTTP_METHOD=post bench.js
Script para gerar dados: yarn dev:generate
