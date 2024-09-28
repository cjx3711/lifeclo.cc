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
COPY app.js ./
COPY metrom.app.js ./
COPY site ./site
COPY site-app ./site-app
COPY metrom.app ./metrom.app

EXPOSE 2020
EXPOSE 2030
CMD node app.js & node metrom.app.js
