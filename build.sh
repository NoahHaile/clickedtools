#!/bin/bash

echo "-----------------------------------------------"
echo "Pulling from repo..."
git pull

echo "-----------------------------------------------"
echo "Building auth/backend..."
cd auth/backend
mvn -DskipTests clean package

echo "-----------------------------------------------"
echo "Copying frontend files..."
cd ..
rm -rf /var/www/clickedtools.com/auth/*
mkdir -p /var/www/clickedtools.com/auth/
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
rm -rf /var/www/clickedtools.com/icebreaker/app/*
mkdir -p "/var/www/clickedtools.com/icebreaker/app/"
cp -r dist/* /var/www/clickedtools.com/icebreaker/app/

echo "-----------------------------------------------"
echo "Starting Docker Compose..."
cd ..
docker compose up --build -d

echo "-----------------------------------------------"
