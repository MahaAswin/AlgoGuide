#!/bin/bash

echo "Starting AlgoGuild Development Environment..."
echo ""

echo "[1/3] Starting Backend..."
cd server && npm run dev &
sleep 3

echo "[2/3] Starting Frontend..."
cd ../client && npm run dev &
sleep 3

echo "[3/3] Starting Code Executor..."
cd ../executor && npm run dev &

echo ""
echo "✅ All services started!"
echo ""
echo "Backend:  http://localhost:5000"
echo "Frontend: http://localhost:5173"
echo "Executor: http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop all services"

wait
