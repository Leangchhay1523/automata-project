@echo off
setlocal

echo Starting FA Analyzer Application

REM Start Backend Server
echo Installing backend dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo Failed to install backend dependencies
    pause
    exit /b 1
)

echo Starting backend server on port 3000...
start /b npm run dev
timeout /t 3 /nobreak >nul

echo Installing frontend dependencies...
cd ..\frontend
call npm install
if errorlevel 1 (
    echo Failed to install frontend dependencies
    pause
    exit /b 1
)

echo Starting frontend server...
echo Application will be available at: http://localhost:5173
echo Backend API available at: http://localhost:3000
echo.
echo Press Ctrl+C to stop both servers

npm run dev

echo Stopping servers...
taskkill /f /im node.exe >nul 2>&1