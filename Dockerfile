FROM node:18-alpine as builder
WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

FROM node:18-alpine as base
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile --prod

RUN echo "#!/bin/sh" > /entrypoint.sh
RUN echo "npx typeorm migration:run -d dist/typeorm.config.js" >> /entrypoint.sh
RUN echo "pnpm run start:prod" >> /entrypoint.sh

EXPOSE 4003
CMD ["pnpm", "run", "start:prod"]
