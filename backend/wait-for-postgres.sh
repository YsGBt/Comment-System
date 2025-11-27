#!/bin/bash

host="$1"
port="$2"

echo "Waiting for PostgreSQL at $host:$port..."

while ! nc -z "$host" "$port"; do
  echo "Postgres is unavailable - sleeping"
  sleep 2
done

echo "Postgres is up - continuing"

# Remove exec "$@" - just exit here
exit 0