@echo off
REM Script pour lancer l'application Fake News Detector (Backend + Frontend) sur Windows.
REM Placez ce script à la racine du dossier 'fake-news-detector'.

echo "--- Lancement du Backend ---"
cd backend
echo "Installation des dependances backend (npm install)..."
call npm install

echo "Demarrage du serveur Node.js..."
start "Backend" cmd /k "npm start"
cd ..

timeout /t 3 >nul

echo "--- Lancement du Frontend ---"
cd frontend
echo "Installation des dependances frontend (npm install)..."
call npm install

echo "Demarrage du serveur de developpement Vite..."
start "Frontend" cmd /k "npm run dev"

echo.
echo "Les serveurs Backend et Frontend ont ete lances dans des fenetres separees."
echo "Fermez les fenetres de terminal pour arreter les serveurs."
pause
