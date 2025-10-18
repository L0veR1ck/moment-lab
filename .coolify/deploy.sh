#!/bin/bash

# Coolify Deployment Script for Moment Lab API
# This script is executed during deployment on Coolify

set -e  # Exit on error

echo "🚀 Starting Moment Lab API deployment..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "Please create .env file with required environment variables"
    exit 1
fi

echo "✅ Environment file found"

# Load environment variables
export $(cat .env | grep -v '^#' | xargs)

echo "🔨 Building Docker images..."
docker-compose -f docker-compose.prod.yml build --no-cache

echo "🛑 Stopping old containers..."
docker-compose -f docker-compose.prod.yml down

echo "🚀 Starting new containers..."
docker-compose -f docker-compose.prod.yml up -d

echo "⏳ Waiting for services to be healthy..."
sleep 10

# Wait for PostgreSQL to be ready
echo "🗄️  Waiting for PostgreSQL..."
until docker-compose -f docker-compose.prod.yml exec -T postgres pg_isready -U postgres > /dev/null 2>&1; do
    echo "   PostgreSQL is unavailable - sleeping"
    sleep 2
done
echo "✅ PostgreSQL is ready"

# Wait for API to be healthy
echo "🌐 Waiting for API..."
max_attempts=30
attempt=0
until curl -f http://localhost:8080/health > /dev/null 2>&1; do
    attempt=$((attempt + 1))
    if [ $attempt -ge $max_attempts ]; then
        echo "❌ API failed to start after $max_attempts attempts"
        docker-compose -f docker-compose.prod.yml logs api
        exit 1
    fi
    echo "   API is unavailable - sleeping (attempt $attempt/$max_attempts)"
    sleep 2
done
echo "✅ API is healthy"

echo "🧹 Cleaning up old images..."
docker image prune -f

echo "📊 Container status:"
docker-compose -f docker-compose.prod.yml ps

echo ""
echo "✅ Deployment completed successfully!"
echo ""
echo "📝 Next steps:"
echo "   1. Check logs: docker-compose -f docker-compose.prod.yml logs -f api"
echo "   2. Health check: curl https://$DOMAIN/health"
echo "   3. API docs: https://$DOMAIN/swagger (if enabled)"
echo ""

