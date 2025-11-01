FROM node:22.18-alpine AS base

FROM base AS build

WORKDIR /app

COPY package.json package-lock.json ./
COPY nx.json ./

RUN npm ci

COPY . .

RUN npx nx run core-api:build --prod

RUN npm prune --production

FROM base AS production

WORKDIR /app

COPY --from=build /app/node_modules       /app/node_modules
COPY --from=build /app/apps/core-api/dist /app/dist
COPY --from=build /app/package.json       /app/package.json

EXPOSE 3000

CMD ["node", "/app/dist/main.js"]
