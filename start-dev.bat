@echo off
echo Starting AlgoGuild Development Environment...
echo.

echo [1/3] Starting Backend...
start cmd /k "cd server && npm run dev"
timeout /t 3 /nobreak > nul

echo [2/3] Starting Frontend...
start cmd /k "cd client && npm run dev"
timeout /t 3 /nobreak > nul

echo [3/3] Starting Code Executor...
start cmd /k "cd executor && npm run dev"

echo.
echo ✅ All services started!
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo Executor: http://localhost:3001
echo.
pause
