#!/bin/bash

echo "Starting FA Analyzer Application"

# Start Backend Server
echo "Installing backend dependencies..."
cd backend
npm install

echo "Starting backend server on port 3000..."
npm run dev &
BACKEND_PID=$!

sleep 3

echo "Installing frontend dependencies..."
cd ../frontend
npm install

echo "Starting frontend server..."
echo "Application will be available at: http://localhost:5173"
echo "Backend API available at: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"

npm run dev

# Cleanup: Kill backend when frontend stops
echo "Stopping backend server..."
kill $BACKEND_PID 2>/dev/null
