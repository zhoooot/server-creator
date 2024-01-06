FROM node:18-alpine as builder
WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

RUN npm install -g pnpm
RUN pnpm install

COPY . .
RUN pnpm build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json .
COPY --from=builder /app/pnpm-lock.yaml .

RUN npm install -g pnpm ts-node
RUN pnpm install --production

ENV JWT_PUBLIC_KEY=
ENV DATABASE_URL=
ENV RABBITMQ_URL=

EXPOSE 3001
CMD ["pnpm", "start:prod"]
