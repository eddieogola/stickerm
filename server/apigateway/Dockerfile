FROM node:18-alpine

WORKDIR /app

COPY ./apigateway/package*.json ./apigateway/pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate

RUN pnpm install

COPY apigateway/ .

RUN mkdir ../protos
COPY ./protos/* ../protos/


RUN pnpm build

CMD ["pnpm", "start"]