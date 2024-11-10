#!/bin/bash

# Strict error handling
set -euo pipefail

# Load environment variables if .env exists
if [ -f .env ]; then
  source .env
fi

# Validate required environment variables
if [ -z "$DATABASE_URL" ]; then
  echo "Error: DATABASE_URL environment variable is missing." >&2
  exit 1
fi

# Set default values for optional variables
NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL:="http://localhost:3000"}
NEXT_PUBLIC_AUTH_SECRET=${NEXT_PUBLIC_AUTH_SECRET:="your_secret_key_here"}

# Define global variables
PROJECT_ROOT=$(pwd)
LOG_FILE="${PROJECT_ROOT}/logs/startup.log"
PID_FILE="${PROJECT_ROOT}/var/run/fitness-tracker.pid"
DATABASE_TIMEOUT=60
BACKEND_TIMEOUT=30
FRONTEND_TIMEOUT=15

# Utility functions
log_info() {
  timestamp=$(date +"%Y-%m-%d %H:%M:%S")
  echo "$timestamp - INFO: $*" >> "$LOG_FILE"
}

log_error() {
  timestamp=$(date +"%Y-%m-%d %H:%M:%S")
  echo "$timestamp - ERROR: $*" >&2 >> "$LOG_FILE"
}

cleanup() {
  log_info "Cleaning up..."
  if [ -f "$PID_FILE" ]; then
    kill $(cat "$PID_FILE") 2>/dev/null
  fi
  rm -f "$PID_FILE"
}

check_dependencies() {
  log_info "Checking dependencies..."
  command -v npm >/dev/null 2>&1 || { log_error "npm is missing."; exit 1; }
  command -v node >/dev/null 2>&1 || { log_error "node is missing."; exit 1; }
  # Add any other dependency checks here...
}

# Health check functions
check_port() {
  local port="$1"
  nc -z 127.0.0.1 "$port" >/dev/null 2>&1
}

wait_for_service() {
  local service="$1"
  local timeout="$2"
  local interval=1
  log_info "Waiting for $service..."
  for ((i = 0; i < $timeout; i++)); do
    if $service; then
      log_info "$service is ready!"
      return 0
    fi
    sleep "$interval"
  done
  log_error "$service timed out."
  exit 1
}

verify_service() {
  # Implement specific health check logic for each service
  # Return 0 if healthy, 1 if unhealthy
}

# Service management functions
start_database() {
  log_info "Starting database service..."
  mongod --dbpath "/data/db"
  wait_for_service "check_port 27017" "$DATABASE_TIMEOUT"
}

start_backend() {
  log_info "Starting backend server..."
  npm run start:api
  wait_for_service "check_port 3001" "$BACKEND_TIMEOUT"
}

start_frontend() {
  log_info "Starting frontend service..."
  npm start
  wait_for_service "check_port 3000" "$FRONTEND_TIMEOUT"
}

store_pid() {
  local service="$1"
  local pid="$2"
  log_info "Storing PID for $service: $pid"
  echo "$pid" > "$PID_FILE"
}

# Main execution flow
trap cleanup EXIT ERR
check_dependencies
log_info "Starting Fitness Tracker MVP..."
start_database
start_backend
start_frontend
# Add any other service startup commands here...
log_info "Fitness Tracker MVP is ready!"