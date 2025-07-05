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

/**
 * Fonction utilitaire pour faire des requêtes fetch avec le token automatiquement
 * et gérer les erreurs 403 (déconnexion + message utilisateur)
 */
export async function fetchWithAuth(url: string, options: any = {}) {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (!options.headers) options.headers = {};
    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }
  }
  const response = await fetch(url, options);
  if (response.status === 403) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userRole');
      alert('Accès refusé : vous avez été déconnecté. Veuillez vous reconnecter.');
      window.location.href = '/login';
    }
    throw new Error('Accès refusé (403)');
  }
  return response;
} 