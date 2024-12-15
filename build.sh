#!/bin/bash

echo "-----------------------------------------------"
echo "Building auth/backend..."
cd auth/backend
mvn -DskipTests clean package

echo "-----------------------------------------------"
echo "Copying frontend files..."
cd ..
mkdir -p ../build/auth
cp -r frontend/* /var/www/clickedtools.com/auth/

echo "-----------------------------------------------"
echo "Building icebreaker-backend..."
cd "../Project IceBreaker/icebreaker-backend"
mvn -DskipTests clean package

echo "-----------------------------------------------"
echo "Installing npm dependencies..."
cd "../icebreaker-frontend"
npm install && npm run build

echo "-----------------------------------------------"
echo "Copying public files..."
cd ..
mkdir -p "../../build/icebreaker"
cp -r public/* /var/www/clickedtools.com/icebreaker/app/

echo "-----------------------------------------------"
echo "Starting Docker Compose..."
cd ..
docker-compose up --build

echo "-----------------------------------------------"
