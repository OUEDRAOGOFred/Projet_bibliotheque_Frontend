"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { API_ENDPOINTS, fetchWithAuth } from '../config/api';

interface UserProfile {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: string;
}

interface Emprunt {
  id: number;
  livre_titre: string;
  livre_auteur?: string;
  date_emprunt: string;
  date_limite?: string;
  date_retour_prevue?: string;
  retourne: boolean;
  date_retour?: string;
}

export default function UserProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [emprunts, setEmprunts] = useState<Emprunt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('userEmail');
    if (!token) {
      router.push('/login');
      return;
    }
    // Charger le profil (à adapter si API dédiée)
    setProfile({
      id: 1,
      nom: 'Utilisateur',
      prenom: 'Test',
      email: userEmail || 'user@example.com',
      role: localStorage.getItem('userRole') || 'user'
    });
    fetchEmprunts();
  }, [router]);

  const fetchEmprunts = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetchWithAuth(`${API_ENDPOINTS.EMPRUNTS}/mes`);
      if (!res.ok) throw new Error('Erreur lors du chargement des emprunts');
      const data = await res.json();
      setEmprunts(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message || 'Erreur de connexion');
    }
    setLoading(false);
  };

  const handleRetour = async (empruntId: number) => {
    setMessage('');
    try {
      const res = await fetchWithAuth(`${API_ENDPOINTS.EMPRUNTS}/retour`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emprunt_id: empruntId })
      });
      if (!res.ok) throw new Error('Erreur lors du retour du livre');
      setMessage('Livre rendu !');
      fetchEmprunts();
    } catch (err: any) {
      setError(err.message || 'Erreur de connexion');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#003087]"></div>
          <p className="mt-4 text-gray-600">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* En-tête du profil */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-[#003087]">Mon Profil</h1>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Déconnexion
              </button>
            </div>
            {profile && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Informations personnelles</h2>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Nom</label>
                      <p className="text-lg text-gray-900">{profile.nom}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Prénom</label>
                      <p className="text-lg text-gray-900">{profile.prenom}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Email</label>
                      <p className="text-lg text-gray-900">{profile.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Rôle</label>
                      <p className="text-lg text-gray-900 capitalize">{profile.role}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Statistiques</h2>
                  <div className="space-y-3">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Livres empruntés</p>
                      <p className="text-2xl font-bold text-[#003087]">{emprunts.length}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Livres retournés</p>
                      <p className="text-2xl font-bold text-green-600">
                        {emprunts.filter(e => e.retourne).length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Liste des emprunts */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-[#003087] mb-6">Mes Emprunts</h2>
            {message && (
              <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-500 rounded-md shadow-md">
                <p className="text-green-700">{message}</p>
              </div>
            )}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-md shadow-md">
                <p className="text-red-700">{error}</p>
              </div>
            )}
            {emprunts.length === 0 ? (
              <p className="text-gray-600 text-center py-8">Aucun emprunt pour le moment.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Auteur</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date d'emprunt</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date limite</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date de retour</th>
                      <th className="px-4 py-2"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {emprunts.map((emprunt) => (
                      <tr key={emprunt.id}>
                        <td className="px-4 py-2 font-semibold">{emprunt.livre_titre || '-'}</td>
                        <td className="px-4 py-2">{emprunt.livre_auteur || '-'}</td>
                        <td className="px-4 py-2">{emprunt.date_emprunt ? new Date(emprunt.date_emprunt).toLocaleDateString('fr-FR') : '-'}</td>
                        <td className="px-4 py-2">{emprunt.date_limite ? new Date(emprunt.date_limite).toLocaleDateString('fr-FR') : '-'}</td>
                        <td className="px-4 py-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            emprunt.retourne
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {emprunt.retourne ? 'Rendu' : 'Emprunté'}
                          </span>
                        </td>
                        <td className="px-4 py-2">{emprunt.date_retour ? new Date(emprunt.date_retour).toLocaleDateString('fr-FR') : '-'}</td>
                        <td className="px-4 py-2">
                          {!emprunt.retourne && (
                            <button
                              onClick={() => handleRetour(emprunt.id)}
                              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors text-xs"
                            >
                              Retour
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="mt-6">
            <Link 
              href="/livres"
              className="text-[#003087] hover:text-[#00256e] transition-colors"
            >
              ← Retour au catalogue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 