FROM node:22.18-alpine AS build

WORKDIR /app/build

COPY package.json package-lock.json ./
COPY nx.json ./

RUN npm ci

COPY . .

RUN npx nx run admin-ui:build --prod

RUN npm prune --production

FROM nginx:alpine AS production

COPY --from=build /app/build/apps/admin-ui/docker-entrypoint.sh /

COPY --from=build /app/build/apps/admin-ui/nginx.conf.template /etc/nginx/nginx.conf.template

WORKDIR /usr/share/nginx/html

COPY --from=build /app/build/apps/admin-ui/dist .

RUN chmod -R 740 /usr/share/nginx/html

RUN chown -R nginx:nginx /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
