"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
  date_emprunt: string;
  date_retour_prevue: string;
  retourne: boolean;
}

export default function UserProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [emprunts, setEmprunts] = useState<Emprunt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('userEmail');
    
    if (!token) {
      router.push('/login');
      return;
    }

    // Simuler le chargement du profil utilisateur
    setProfile({
      id: 1,
      nom: 'Utilisateur',
      prenom: 'Test',
      email: userEmail || 'user@example.com',
      role: localStorage.getItem('userRole') || 'user'
    });

    // Simuler le chargement des emprunts
    setEmprunts([
      {
        id: 1,
        livre_titre: 'Exemple de livre',
        date_emprunt: '2024-01-15',
        date_retour_prevue: '2024-02-15',
        retourne: false
      }
    ]);

    setLoading(false);
  }, [router]);

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
            
            {emprunts.length === 0 ? (
              <p className="text-gray-600 text-center py-8">Aucun emprunt pour le moment.</p>
            ) : (
              <div className="space-y-4">
                {emprunts.map((emprunt) => (
                  <div key={emprunt.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{emprunt.livre_titre}</h3>
                        <p className="text-sm text-gray-600">
                          Emprunté le {new Date(emprunt.date_emprunt).toLocaleDateString('fr-FR')}
                        </p>
                        <p className="text-sm text-gray-600">
                          Retour prévu le {new Date(emprunt.date_retour_prevue).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        emprunt.retourne 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {emprunt.retourne ? 'Retourné' : 'En cours'}
                      </span>
                    </div>
                  </div>
                ))}
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