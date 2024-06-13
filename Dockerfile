FROM node:18-alpine
WORKDIR /usr/src/app
COPY . .

RUN npm install --production && npm cache clean --force

EXPOSE 2020
EXPOSE 2030
CMD ["npm", "run", "dev"]
