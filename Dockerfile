# Constroi uma imagem docker com nodejs e bash

FROM node:14.15.4-alpine3.12

RUN apk add --no-cache bash

USER node

WORKDIR /home/node/app
