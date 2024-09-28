# Build stage
FROM node:20-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
RUN npm cache clean --force

# Production stage
FROM node:20-alpine
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY package*.json ./
COPY app.lifeclocc.js ./
COPY app.metrom.js ./
COPY lifeclo.cc_app ./lifeclo.cc_app
COPY lifeclo.cc_site ./lifeclo.cc_site
COPY metrom.app ./metrom.app
COPY shared_assets ./shared_assets

EXPOSE 2020
EXPOSE 2030
CMD node app.lifeclocc.js & node app.metrom.js
