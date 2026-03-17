#!/bin/bash

# Script pour lancer l'application Fake News Detector (Backend + Frontend) en une seule commande.
# Placez ce script à la racine du dossier 'fake-news-detector'.

# Fonction pour arrêter les processus en arrière-plan à la sortie
cleanup() {
    echo -e "\n🛑 Arrêt des serveurs..."
    # La commande pkill est plus robuste si le PID n'est pas trouvé
    pkill -P $$ # Tue tous les processus enfants de ce script
    exit
}

# Intercepte le signal de sortie (Ctrl+C) pour appeler la fonction cleanup
trap cleanup INT

# --- Backend ---
echo "🚀 Lancement du Backend..."
cd backend || { echo "Erreur: Le dossier 'backend' est introuvable."; exit 1; }

echo "📦 Installation des dépendances backend (npm install)..."
npm install

echo "🔥 Démarrage du serveur Node.js en arrière-plan..."
npm start &
cd ..

# Petite pause pour laisser le temps au serveur de démarrer
sleep 2

# --- Frontend ---
echo -e "\n🚀 Lancement du Frontend..."
cd frontend || { echo "Erreur: Le dossier 'frontend' est introuvable."; exit 1; }

echo "📦 Installation des dépendances frontend (npm install)..."
npm install

echo "🎨 Démarrage du serveur de développement Vite (npm run dev)..."
echo " frontend est prêt ! Appuyez sur Ctrl+C pour tout arrêter."
npm run dev
