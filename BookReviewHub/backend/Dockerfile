FROM node:20-alpine

WORKDIR /app

# Copie les fichiers de dépendances
COPY package*.json ./
RUN npm ci --only=production

# Copie tout le code (pas de dossier src)
COPY . .

ENV NODE_ENV=production
ENV PORT=4000

CMD ["node", "server.js"]
