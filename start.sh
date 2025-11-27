#!/bin/bash

# Define your critical container names
containers=("backend" "frontend" "postgres_db" "migration")

# Check how many exist
existing=$(docker ps -a --format '{{.Names}}' | grep -cE "$(IFS=\| ; echo "${containers[*]}")")

# Helper: Clean or create alembic/versions
prepare_versions_dir() {
    echo "🔧 Preparing backend/alembic/versions/..."
    versions_dir="./backend/alembic/versions"
    if [ -d "$versions_dir" ]; then
        rm -rf "$versions_dir"/*
        echo "🧹 Cleared old migration files in $versions_dir"
    else
        mkdir -p "$versions_dir"
        echo "📁 Created $versions_dir"
    fi
}

# Decide based on how many exist
if [ "$existing" -eq 0 ]; then
    echo "🚀 First time setup: No containers found."
    prepare_versions_dir
    docker compose up --build
elif [ "$existing" -eq "${#containers[@]}" ]; then
    echo "🔁 All containers found. Starting normally..."
    docker compose up
else
    echo "⚠️ Some containers missing. Rebuilding to ensure consistency..."
    docker compose up --build
fi