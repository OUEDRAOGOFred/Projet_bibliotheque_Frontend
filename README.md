# 2iE Bibliothèque – Application de gestion de bibliothèque

## Présentation

Cette application permet la gestion complète d'une bibliothèque universitaire : catalogue de livres, emprunts/retours, gestion des utilisateurs, administration, notifications de retards, etc.

- **Frontend** : Next.js (React) – UI moderne, responsive, expérience utilisateur fluide.
- **Backend** : Node.js/Express/Prisma – API sécurisée, base de données relationnelle.
- **Déploiement** : Frontend sur Vercel, Backend sur Render.

---

## Installation & Lancement

### 1. Cloner le projet
```bash
git clone <repo_frontend>
git clone <repo_backend>
```

### 2. Configuration des variables d'environnement
- Copier `.env.local.example` en `.env.local` (frontend) et compléter l'URL du backend.
- Configurer les variables d'environnement sur Render (backend) : base de données, secret JWT, etc.

### 3. Installer les dépendances
```bash
# Frontend
cd Freddy_projet_connexion
npm install

# Backend
cd ../../secu/secu
npm install
```

### 4. Lancer en local
```bash
# Backend
npm start
# Frontend
cd ../../Freddy_projet_connexion
npm run dev
```

---

## Utilisation

- **Catalogue** : Recherche, tri, emprunt direct, détails, statuts en temps réel.
- **Profil utilisateur** : Historique des emprunts, retour de livres, statistiques.
- **Administration** : Gestion des livres (ajout, modification, suppression), gestion des utilisateurs (rôles, suppression), notifications de retards.
- **Sécurité** : Authentification JWT, rôles, accès restreint aux fonctions critiques.

---

## Administrateur par défaut

Lors du premier déploiement, un administrateur par défaut est automatiquement créé :

- **Email** : `admin@2ie.edu.bf`
- **Mot de passe** : `admin123`

> **Pensez à changer ce mot de passe après la première connexion pour des raisons de sécurité !**

---

## Technologies principales
- Next.js, React, Tailwind CSS
- Node.js, Express, Prisma
- PostgreSQL (ou autre SGBD compatible Prisma)
- JWT (authentification)

---

## Déploiement
- **Frontend** : Vercel (configuration automatique via `vercel.json` et variables d'environnement)
- **Backend** : Render (déploiement continu, migrations Prisma automatiques)

---

## Contact
Pour toute question ou contribution, contactez l'équipe projet ou ouvrez une issue sur le dépôt GitHub.

---

## Fonctionnalités principales

- Authentification (admin/étudiant)
- Consultation et recherche de livres
- Gestion des emprunts (voir, retourner)
- Tableau de bord utilisateur et admin
- Interface moderne, responsive

---

## Prérequis

- Node.js (v16+ recommandé)
- Un backend fonctionnel (voir dépôt backend)

---

## Configuration

- Les appels API sont configurés pour pointer vers `http://localhost:4400` (backend local).
- Pour changer l'URL du backend, modifie les URLs dans les fichiers de fetch (ex : `user-profile/page.tsx`).

---

## Structure du projet

- `app/` : Pages et composants Next.js
- `public/` : Images et ressources statiques
- `package.json` : Dépendances et scripts

---

## Auteur

- Freddy OUEDRAOGO — Projet 2iE Bibliothèque

---


