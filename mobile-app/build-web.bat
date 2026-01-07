@echo off
cd /d "%~dp0"
echo Building web version...
call npx expo export --platform web
echo.
echo Build complete! Check the 'dist' folder.
pause
