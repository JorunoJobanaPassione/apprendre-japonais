@echo off
cd /d "%~dp0"
echo Starting Expo with tunnel...
echo.
echo Le designer pourra scanner le QR code avec Expo Go
echo.
npx expo start --tunnel --port 8082
