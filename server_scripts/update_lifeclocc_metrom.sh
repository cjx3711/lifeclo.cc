#!/bin/bash

# Set variables
CONTAINER_NAME="lifeclocc-metrom"
IMAGE_NAME="lifeclocc-metrom"
DB_NAME="app.db"
BACKUP_DIR="database_backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Check if container is running
if docker ps | grep -q $CONTAINER_NAME; then
    echo "Container is running. Stopping and removing..."
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
else
    echo "Container is not running."
fi

# Backup the database if it exists
if docker cp $CONTAINER_NAME:/data/$DB_NAME ./$DB_NAME 2>/dev/null; then
    echo "Database copied from container."
    mv $DB_NAME "$BACKUP_DIR/${DB_NAME}_${TIMESTAMP}"
    echo "Database backed up to $BACKUP_DIR/${DB_NAME}_${TIMESTAMP}"
else
    echo "No existing database found in the container."
fi

# Load the new docker image
echo "Loading new docker image..."
docker load -i ${IMAGE_NAME}.tar

# Run the new container
echo "Starting new container..."
docker run --name $CONTAINER_NAME -d -p 2030:2030 -p 2020:2020 $IMAGE_NAME

# Copy the latest database backup into the new container
LATEST_BACKUP=$(ls -t $BACKUP_DIR/${DB_NAME}_* | head -n1)
if [ -n "$LATEST_BACKUP" ]; then
    echo "Copying latest database backup into the container..."
    docker cp "$LATEST_BACKUP" $CONTAINER_NAME:/data/$DB_NAME
else
    echo "No database backup found to copy into the container."
fi

echo "Process completed."
