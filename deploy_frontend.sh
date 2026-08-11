#!/bin/bash
set -e

echo "Building React frontend..."
cd frontend
npm run build

echo "Copying build files to public directory..."
sudo cp -r dist/* ../public/

echo "Setting correct permissions..."
sudo chown -R alloyce:alloyce ../public/

echo "Frontend deployed successfully!"
