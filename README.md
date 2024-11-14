# Lifeclo.cc / MetroM.app

This is a simple express app and the source code for these websites.

- https://lifeclo.cc
- https://manual.lifeclo.cc
- https://app.lifeclo.cc
- https://metrom.app
- https://old.metrom.app

# Structure

This repo has been built over time, so the structure is a bit messy.

### `lifeclo.cc_site`

- Source code for lifeclo.cc, and all the subdomains like manual.lifeclo.cc
- Runs on port 2020 with the app.lifeclocc.js file
- Served statically by the app.lifeclocc.js file

### `lifeclo.cc_app`

- Source code for app.lifeclo.cc
- Runs on port 2020 with the app.lifeclocc.js file
- Has a database and some basic code to serve the app

### `old.metrom.app`

- Source code for the old.metrom.app website.
- Served statically by the app.metrom.js file

### `metrom.app`

- Source code for metrom.app
- Runs vite, react and typescript
- Runs on port 2031 with vite
- Runs on port 2030 by proxy through app.metrom.js
- In production, the build folder is served statically

# Local Development

Runs node 20

To run the lifeclo.cc site

`npm run start:lifeclocc`

To run the new metrom.app vite site

`npm run start:metro`

To run the old metrom.app site (necessary for the redirect)

`npm run start:metro-old`

To run all three at the same time

`npm run dev`

# Deployment

This site is deployed manually to the server using docker.

## Docker Deployment

You can run this command that will do everything for you.

```
npm run docker:buildx:upload
```

If you want to do it manually, here's how.

Build the docker file

```
# Note: If running on an arm64 machine targetting a x86 machine, you need to build using the buildx command.

docker buildx create --name mybuilder --platform linux/amd64
docker buildx use mybuilder
docker buildx build --platform linux/amd64 -t lifeclocc-metrom .

# Otherwise the normal build command will work if you want to run it on your local machine or a server with the same architecture.

docker build -t lifeclocc-metrom .
```

Run the docker container and map the port (to make sure it's working)

`docker run --name lifeclocc-metrom -p 2030:2030 -p 2020:2020 lifeclocc-metrom`

Save the docker image

`docker save -o lifeclocc-metrom.tar lifeclocc-metrom`

Upload the docker image to the server

`rsync -azP lifeclocc-metrom.tar root@cjx3711.com:/root/projects/lifeclocc-metrom/`

Load the docker image on the server

`docker load -i lifeclocc-metrom.tar`

Stop the docker container

`docker stop lifeclocc-metrom`

Remove the docker container

`docker rm lifeclocc-metrom`

Run the docker container on the server

`docker run -d --name lifeclocc-metrom -p 2030:2030 -p 2020:2020 lifeclocc-metrom`

Accessing files in the container

`docker exec -it lifeclocc-metrom /bin/bash`

## On the server

You can run the script `./update_lifeclocc_metrom.sh` to update the docker image and restart the docker container.
