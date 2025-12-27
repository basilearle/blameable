FROM node:22.18-alpine AS base

FROM base AS build

WORKDIR /app/build

COPY package.json package-lock.json ./
COPY nx.json ./

RUN npm ci

COPY . .

RUN npx nx run-many -t build-storybook

# NOTE: can't prune because we need the nx dependencies
# RUN npm prune --production

FROM base AS production

WORKDIR /app

# NOTE: this can probably be optimized
COPY --from=build /app/build /app

EXPOSE 4403

CMD ["npm", "run", "storybook:compose"]
