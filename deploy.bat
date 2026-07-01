@echo off
setlocal enabledelayedexpansion
title Deploy Portfolio to GitHub (PS2000007/Profile)
cd /d "%~dp0"

REM ============ locate git ============
set "GIT="
where git >nul 2>nul && set "GIT=git"
if not defined GIT if exist "%ProgramFiles%\Git\cmd\git.exe" set "GIT=%ProgramFiles%\Git\cmd\git.exe"
if not defined GIT if exist "%ProgramFiles(x86)%\Git\cmd\git.exe" set "GIT=%ProgramFiles(x86)%\Git\cmd\git.exe"
if not defined GIT if exist "%LOCALAPPDATA%\Programs\Git\cmd\git.exe" set "GIT=%LOCALAPPDATA%\Programs\Git\cmd\git.exe"

if not defined GIT (
    echo Git was not found on this PC.
    choice /c YN /m "Install Git now via winget"
    if errorlevel 2 goto NOGIT
    winget install --id Git.Git -e --source winget --accept-package-agreements --accept-source-agreements
    if exist "%ProgramFiles%\Git\cmd\git.exe" set "GIT=%ProgramFiles%\Git\cmd\git.exe"
)
if not defined GIT goto NOGIT

echo Using Git: %GIT%
"%GIT%" --version
echo.

REM ============ identity (only if not already set) ============
"%GIT%" config user.email >nul 2>nul || "%GIT%" config user.email "suryavanshiprasad007@gmail.com"
"%GIT%" config user.name  >nul 2>nul || "%GIT%" config user.name  "Prasad Suryavanshi"

REM ============ ensure repo + branch + remote ============
if not exist ".git" "%GIT%" init
"%GIT%" rev-parse --abbrev-ref HEAD >nul 2>nul || "%GIT%" checkout -b main
"%GIT%" remote get-url origin >nul 2>nul || "%GIT%" remote add origin https://github.com/PS2000007/Profile.git

REM ============ commit message (optional argument) ============
set "MSG=%*"
if "%MSG%"=="" set "MSG=Update portfolio site"

echo Staging all changes...
"%GIT%" add -A
"%GIT%" commit -m "%MSG%"
echo.

echo Pushing to https://github.com/PS2000007/Profile ...
"%GIT%" push -u origin main
if errorlevel 1 (
    echo.
    echo Push was rejected - syncing with remote, then retrying...
    "%GIT%" pull --rebase origin main
    "%GIT%" push -u origin main
)

echo.
echo ============================================================
echo  DONE.
echo  * First push? A GitHub sign-in window may have opened -
echo    log in once and it is remembered for next time.
echo.
echo  Enable GitHub Pages ONCE to go live:
echo    Repo Settings  ^>  Pages  ^>  Branch: main  /  (root)  ^>  Save
echo  Your site will then be at:
echo    https://ps2000007.github.io/Profile/
echo ============================================================
pause
exit /b

:NOGIT
echo.
echo Could not find or install Git. Install it from:
echo   https://git-scm.com/download/win
echo then double-click this file again.
pause
exit /b 1
