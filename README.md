# 2iE Bibliothèque — Frontend

Ce dépôt contient le **frontend** de l'application de gestion de bibliothèque, développé avec **Next.js** (React, TypeScript).

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

## Installation

```bash
git clone <url_de_ce_repo>
cd Freddy_projet_connexion
npm install
```

---

## Configuration

- Les appels API sont configurés pour pointer vers `http://localhost:4400` (backend local).
- Pour changer l'URL du backend, modifie les URLs dans les fichiers de fetch (ex : `user-profile/page.tsx`).

---

## Lancement

```bash
npm run dev
```

- Accès à l'application : [http://localhost:3000](http://localhost:3000)

---

## Structure du projet

- `app/` : Pages et composants Next.js
- `public/` : Images et ressources statiques
- `package.json` : Dépendances et scripts

---

## Auteur

- Freddy OUEDRAOGO — Projet 2iE Bibliothèque

---


