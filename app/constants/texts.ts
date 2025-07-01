// Constantes pour les textes de l'application
export const APP_TEXTS = {
  // Titres principaux
  APP_NAME: "Bibliothèque Numérique",
  INSTITUTE_NAME: "Institut 2iE",
  INSTITUTE_MOTTO: "EXCELLENCE • INNOVATION • LEADERSHIP",
  
  // Page d'accueil
  WELCOME_TITLE: "Bibliothèque Numérique",
  WELCOME_SUBTITLE: "Découvrez notre collection de livres et gérez vos emprunts en toute simplicité",
  LOGIN_TITLE: "Connexion",
  LOGIN_SUBTITLE: "Accédez à votre espace personnel",
  
  // Fonctionnalités
  FEATURES: {
    CATALOG: {
      TITLE: "Catalogue Complet",
      DESCRIPTION: "Explorez notre collection de livres dans tous les domaines"
    },
    BORROWING: {
      TITLE: "Emprunts Simplifiés",
      DESCRIPTION: "Réservez et empruntez vos livres en quelques clics"
    },
    TRACKING: {
      TITLE: "Suivi Personnel",
      DESCRIPTION: "Gérez vos emprunts et consultez votre historique"
    }
  },
  
  // Formulaires
  FORMS: {
    EMAIL: "Email",
    PASSWORD: "Mot de passe",
    EMAIL_PLACEHOLDER: "votre.email@exemple.com",
    PASSWORD_PLACEHOLDER: "Votre mot de passe",
    LOGIN_BUTTON: "Se connecter",
    LOGIN_LOADING: "Connexion en cours...",
    REGISTER_LINK: "Créer un compte",
    NO_ACCOUNT: "Pas encore de compte ?"
  },
  
  // Messages
  MESSAGES: {
    WELCOME: "Bienvenue",
    LOGIN_SUCCESS: "Connexion réussie",
    LOGIN_ERROR: "Échec de la connexion",
    CONNECTION_ERROR: "Une erreur s'est produite lors de la connexion",
    BOOK_BORROWED: "Livre emprunté avec succès !",
    BOOK_RETURNED: "Livre retourné avec succès !",
    COMMENT_ADDED: "Commentaire ajouté avec succès !",
    USER_DELETED: "Utilisateur supprimé avec succès.",
    ROLE_UPDATED: "Rôle mis à jour avec succès.",
    BOOK_ADDED: "Livre ajouté avec succès !",
    BOOK_MODIFIED: "Livre modifié avec succès !",
    BOOK_DELETED: "Livre supprimé avec succès.",
    NOTIFICATION_SENT: "Notifications envoyées avec succès.",
    NO_LATE_BOOKS: "Aucun emprunt en retard.",
    NO_BOOKS: "Aucun livre trouvé",
    NO_BOOKS_DESCRIPTION: "La bibliothèque est actuellement vide. Revenez plus tard !",
    NO_BOOKS_SEARCH: "Aucun livre ne correspond à votre recherche. Essayez de modifier vos critères.",
    NO_COMMENTS: "Aucun commentaire pour ce livre. Soyez le premier à donner votre avis !",
    NO_BORROWINGS: "Aucun emprunt",
    NO_BORROWINGS_DESCRIPTION: "Vous n'avez pas encore emprunté de livres.",
    NO_LATE_BORROWINGS: "Aucun emprunt en retard",
    NO_LATE_BORROWINGS_DESCRIPTION: "Tous les livres ont été retournés à temps !",
    LOADING_BOOKS: "Chargement des livres...",
    LOADING_BOOK: "Chargement du livre...",
    LOADING_DASHBOARD: "Chargement de votre dashboard...",
    LOADING_ADMIN: "Chargement du dashboard admin...",
    BOOK_NOT_FOUND: "Livre introuvable",
    BOOK_NOT_FOUND_DESCRIPTION: "Le livre que vous recherchez n'existe pas ou a été supprimé.",
    MUST_BE_CONNECTED: "Vous devez être connecté pour emprunter un livre",
    MUST_BE_CONNECTED_COMMENT: "Vous devez être connecté pour commenter.",
    MUST_BE_ADMIN: "Vous devez être connecté en tant qu'admin.",
    ERROR_BORROWING: "Erreur lors de l'emprunt",
    ERROR_RETURN: "Erreur lors du retour",
    ERROR_COMMENT: "Erreur lors de l'ajout du commentaire",
    ERROR_DELETE: "Erreur lors de la suppression",
    ERROR_ROLE: "Erreur lors du changement de rôle",
    ERROR_ADD_BOOK: "Erreur lors de l'ajout du livre.",
    ERROR_MODIFY_BOOK: "Erreur lors de la modification.",
    ERROR_NOTIFICATION: "Erreur lors de l'envoi des notifications.",
    LATE_WARNING: "Attention : {count} livre(s) en retard",
    LATE_WARNING_DESCRIPTION: "Veuillez retourner vos livres en retard pour éviter des pénalités."
  },
  
  // Navigation
  NAVIGATION: {
    REGISTER: "S'inscrire",
    CATALOG: "Catalogue",
    DASHBOARD: "Mon Dashboard",
    ADMIN_DASHBOARD: "Dashboard Administrateur",
    LOGOUT: "Déconnexion",
    BACK_TO_CATALOG: "Retour au catalogue",
    DISCOVER_CATALOG: "Découvrir le catalogue"
  },
  
  // Livres
  BOOKS: {
    TITLE: "Catalogue des livres",
    SEARCH_TITLE: "Rechercher un livre",
    SEARCH_BY_TITLE: "Rechercher par titre...",
    SEARCH_BY_AUTHOR: "Rechercher par auteur...",
    SEARCH_BY_GENRE: "Rechercher par genre...",
    TITLE_LABEL: "Titre",
    AUTHOR_LABEL: "Auteur",
    GENRE_LABEL: "Genre",
    DESCRIPTION_LABEL: "Description",
    AVAILABLE: "Disponible",
    UNAVAILABLE: "Indisponible",
    VIEW_DETAILS: "Voir détails",
    BORROW: "Emprunter",
    BORROW_BOOK: "Emprunter ce livre",
    ADD_NEW: "Ajouter un nouveau livre",
    ADD: "Ajouter",
    MODIFY: "Modifier",
    DELETE: "Supprimer",
    VALIDATE: "Valider",
    CANCEL: "Annuler",
    DESCRIPTION_PLACEHOLDER: "Description du livre...",
    COMMENTS_TITLE: "Avis et commentaires",
    ADD_COMMENT_TITLE: "Ajouter un commentaire",
    COMMENT_PLACEHOLDER: "Partagez votre avis sur ce livre...",
    RATING_LABEL: "Note",
    PUBLISH_REVIEW: "Publier mon avis"
  },
  
  // Emprunts
  BORROWINGS: {
    TITLE: "Mes emprunts",
    STATS: {
      TOTAL: "Total emprunts",
      ACTIVE: "Emprunts actifs",
      LATE: "En retard",
      RETURNED: "Rendus"
    },
    TABLE: {
      BOOK: "Livre",
      BORROW_DATE: "Date d'emprunt",
      DUE_DATE: "Date limite",
      RETURN_DATE: "Date de retour",
      STATUS: "Statut",
      ACTION: "Action"
    },
    STATUS: {
      BORROWED: "Emprunté",
      RETURNED: "Rendu",
      LATE: "En retard"
    },
    ACTIONS: {
      RETURN: "Retourner"
    }
  },
  
  // Admin
  ADMIN: {
    TABS: {
      USERS: "Gestion Utilisateurs",
      BOOKS: "Gestion Livres",
      LATE: "Emprunts en Retard"
    },
    USERS: {
      TITLE: "Gestion des utilisateurs",
      TABLE: {
        NAME: "Nom",
        FIRSTNAME: "Prénom",
        EMAIL: "Email",
        ROLE: "Rôle",
        REGISTRATION_DATE: "Date inscription",
        ACTIONS: "Actions"
      },
      ROLES: {
        STUDENT: "Étudiant",
        ADMIN: "Admin"
      }
    },
    LATE_BORROWINGS: {
      TITLE: "Emprunts en retard",
      NOTIFY_BUTTON: "Notifier les retards",
      TABLE: {
        STUDENT: "Étudiant",
        EMAIL: "Email",
        BOOK: "Livre",
        DUE_DATE: "Date limite"
      }
    }
  },
  
  // Footer
  FOOTER: {
    COPYRIGHT: "© 2024 Institut 2iE - Bibliothèque Numérique. Tous droits réservés."
  }
};

// Constantes pour les couleurs
export const COLORS = {
  PRIMARY: "#003087",
  PRIMARY_DARK: "#00256e",
  ACCENT: "#FFD700",
  SUCCESS: "#10B981",
  SUCCESS_DARK: "#059669",
  ERROR: "#EF4444",
  ERROR_DARK: "#DC2626",
  WARNING: "#F59E0B",
  INFO: "#3B82F6"
};

// Constantes pour les dates
export const DATE_FORMATS = {
  FRENCH: {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
}; 