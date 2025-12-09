 BookReviewHub – TP Docker & CI/CD
 Étapes du TP
1. Développement local
Création du projet avec frontend (React), backend (Node.js/Sequelize) et base MySQL.

Fichier docker-compose.yml pour le développement :

frontend → build depuis ./frontend

backend → build depuis ./backend

db → image officielle mysql:8 avec volume persistant

Lancement en local :

bash
docker compose up --build
Accès :

Frontend → http://localhost:3000

Backend → http://localhost:4000/todos

2. Création des images Docker
Build des images frontend et backend.

Tag avec le namespace Docker Hub :

bash
docker tag bookreviewhub-frontend:latest <DOCKERHUB_USERNAME>/bookreviewhub-frontend:latest
docker tag bookreviewhub-backend:latest <DOCKERHUB_USERNAME>/bookreviewhub-backend:latest
Push vers Docker Hub :

bash
docker push <DOCKERHUB_USERNAME>/bookreviewhub-frontend:latest
docker push <DOCKERHUB_USERNAME>/bookreviewhub-backend:latest
3. Déploiement manuel (production)
Fichier docker-compose.prod.yml utilisant les images Docker Hub.

Sur le serveur Linux :

bash
cd /opt/bookreviewhub
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
Accès :

Frontend → http://<IP_SERVEUR>:3000

Backend → http://<IP_SERVEUR>:4000/todos

4. CI/CD avec GitHub Actions
Création du fichier .github/workflows/deploy.yml.

Secrets GitHub configurés :

DOCKERHUB_USERNAME, DOCKERHUB_TOKEN

SSH_HOST, SSH_USER, SSH_PRIVATE_KEY

Workflow :

Build & push des images vers Docker Hub.

SSH sur le serveur.

Exécution de :

bash
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
5. Résultat attendu
Application déployée automatiquement à chaque push sur main.

Frontend accessible via l’IP publique ou domaine.

Backend API fonctionnel avec base MySQL persistante.

Plus besoin de déploiement manuel .