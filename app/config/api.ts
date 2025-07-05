// Configuration de l'API Backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://projet-librairie-backend.onrender.com';

export const API_ENDPOINTS = {
  // Authentification
  LOGIN: `${API_BASE_URL}/userlogin`,
  SIGNUP: `${API_BASE_URL}/signup`,
  
  // Livres
  LIVRES: `${API_BASE_URL}/livres`,
  LIVRE_BY_ID: (id: string) => `${API_BASE_URL}/livres/${id}`,
  
  // Commentaires
  COMMENTAIRES: `${API_BASE_URL}/commentaires`,
  COMMENTAIRES_BY_LIVRE: (id: string) => `${API_BASE_URL}/commentaires/${id}`,
  
  // Emprunts
  EMPRUNTS: `${API_BASE_URL}/emprunts`,
  
  // Utilisateurs
  USERS: `${API_BASE_URL}/api/users`,
  USER_PROFILE: `${API_BASE_URL}/user-profile`,
};

export default API_ENDPOINTS; 