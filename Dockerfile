FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

FROM node:20-alpine
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/package*.json ./

RUN yarn install --omit=dev

EXPOSE 3000
CMD ["yarn", "start"]
