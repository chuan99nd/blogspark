FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

ENV NODE_ENV=production

EXPOSE 3000
CMD ["yarn", "start"]
