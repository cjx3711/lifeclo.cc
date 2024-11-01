# Build stage
FROM node:20-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
RUN npm cache clean --force

# Build stage for React app
FROM node:20-alpine AS react-build
WORKDIR /usr/src/app
COPY metrom.app ./metrom.app
WORKDIR /usr/src/app/metrom.app
COPY metrom.app/package*.json ./
RUN npm install
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=react-build /usr/src/app/metrom.app/dist ./metrom.app/dist
COPY package*.json ./
COPY app.lifeclocc.js ./
COPY app.metrom.js ./
COPY lifeclo.cc_app ./lifeclo.cc_app
COPY lifeclo.cc_site ./lifeclo.cc_site
COPY old.metrom.app ./old.metrom.app
COPY shared_assets ./shared_assets

EXPOSE 2020
EXPOSE 2030
CMD node app.lifeclocc.js & node app.metrom.js
