#!/bin/sh

echo "Waiting for postgres..."

while ! nc -z postgres 5432; do
  sleep 0.1
done

echo "PostgreSQL started"

npx prisma migrate deploy
npx prisma generate

echo "Database migrations completed"

exec "$@" 