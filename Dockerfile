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

RUN npm install -g pnpm
RUN pnpm install --production

ENV JWT_PUBLIC_KEY=
ENV DATABASE_URL=
ENV RABBITMQ_URL=

RUN echo "#!/bin/sh" > /entrypoint.sh
RUN echo "set -e" >> /entrypoint.sh
RUN echo "npx typeorm -d dist/typeorm.config.js migration:run" >> /entrypoint.sh
RUN echo "pnpm start:prod" >> /entrypoint.sh

EXPOSE 3001
CMD ["sh", "/entrypoint.sh"]
