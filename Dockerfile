FROM node:21.0.0-slim

WORKDIR /usr/app

COPY ./package*.json ./

RUN apt-get update -y && apt-get install -y openssl

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build
