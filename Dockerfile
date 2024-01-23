# Constroi uma imagem docker com nodejs e bash

FROM node:16-alpine3.18

RUN apk add --no-cache bash

USER node

WORKDIR /home/node/app

RUN npm install

RUN npm run typeorm migration:run

RUN npm run dev
