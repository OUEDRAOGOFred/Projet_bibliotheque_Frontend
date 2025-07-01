# Étape de construction
FROM node:18-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances en mode production
RUN npm ci

# Copier le reste des fichiers du projet
COPY . .

# Construire l'application
RUN npm run build

# Étape de production
FROM node:18-alpine AS runner

WORKDIR /app

# Définir les variables d'environnement
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copier les fichiers nécessaires depuis l'étape de construction
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Exposer le port
EXPOSE 3000

# Définir l'utilisateur non-root
USER node

# Commande de démarrage
CMD ["node", "server.js"]