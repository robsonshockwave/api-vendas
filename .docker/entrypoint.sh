#! /bin/bash

npm install
npx ts-node-dev -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -- -d src/shared/infra/typeorm/index.ts
npm run dev
