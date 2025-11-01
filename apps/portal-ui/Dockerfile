FROM node:22.18-alpine AS build

WORKDIR /app/build

COPY package.json package-lock.json ./
COPY nx.json ./

RUN npm ci

COPY . .

RUN npx nx run portal-ui:build --prod

RUN npm prune --production

FROM nginx:alpine AS production

WORKDIR /usr/share/nginx/html

COPY --from=build /app/build/apps/portal-ui/dist .

COPY --from=build /app/build/apps/portal-ui/nginx.conf /etc/nginx/nginx.conf

RUN chmod -R 740 /usr/share/nginx/html

RUN chown -R nginx:nginx /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
