@echo off
title Prasad Suryavanshi Portfolio - Local Host
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
    echo.
    echo   Node.js was not found on your PATH.
    echo   Opening index.html directly instead...
    echo   ^(Install Node.js for a proper local server.^)
    echo.
    start "" "index.html"
    pause
    exit /b
)

echo ================================================
echo    Prasad Suryavanshi - Portfolio
echo    Starting local host...
echo    A browser tab will open automatically.
echo    Keep this window open. Press Ctrl+C to stop.
echo ================================================

node "%~dp0server.js"

echo.
echo   Server stopped.
pause
