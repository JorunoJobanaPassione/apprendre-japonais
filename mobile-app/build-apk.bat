@echo off
echo ========================================
echo    BUILD APK - App Japonais
echo ========================================
echo.

echo [1/3] Compilation en cours...
cd /d C:\Dev\JApp\android
call gradlew.bat assembleDebug

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERREUR: La compilation a echoue!
    pause
    exit /b 1
)

echo.
echo [2/3] Copie de l'APK...
copy /Y "C:\Dev\JApp\android\app\build\outputs\apk\debug\app-debug.apk" "C:\Users\dosso\Desktop\Projets\Japonais\JaponaisApp\mobile-app\APK\app-debug.apk"

echo.
echo [3/3] Ajout de la date au nom...
for /f "tokens=1-3 delims=/" %%a in ('date /t') do set DATE=%%c%%b%%a
for /f "tokens=1-2 delims=: " %%a in ('time /t') do set TIME=%%a%%b
copy /Y "C:\Users\dosso\Desktop\Projets\Japonais\JaponaisApp\mobile-app\APK\app-debug.apk" "C:\Users\dosso\Desktop\Projets\Japonais\JaponaisApp\mobile-app\APK\app-debug-%DATE%-%TIME%.apk" >nul 2>&1

echo.
echo ========================================
echo    BUILD TERMINE AVEC SUCCES!
echo ========================================
echo.
echo APK disponible dans:
echo C:\Users\dosso\Desktop\Projets\Japonais\JaponaisApp\mobile-app\APK\
echo.
explorer "C:\Users\dosso\Desktop\Projets\Japonais\JaponaisApp\mobile-app\APK"
pause
