"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { API_ENDPOINTS } from '../config/api';

interface Livre {
  id: number;
  titre: string;
  auteur: string;
  genre: string;
  description: string;
  disponible: boolean;
}

export default function LivresPage() {
  const router = useRouter();
  const [livres, setLivres] = useState<Livre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetchLivres();
  }, [router]);

  const fetchLivres = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = searchTerm 
        ? `${API_ENDPOINTS.LIVRES}?titre=${encodeURIComponent(searchTerm)}`
        : API_ENDPOINTS.LIVRES;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setLivres(Array.isArray(data) ? data : []);
      } else {
        setError('Erreur lors du chargement des livres');
      }
    } catch (err) {
      setError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    fetchLivres();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#003087]"></div>
          <p className="mt-4 text-gray-600">Chargement des livres...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#003087] mb-4">Catalogue des Livres</h1>
          
          {/* Barre de recherche */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex gap-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher un livre par titre..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003087] focus:border-[#003087]"
              />
              <button
                type="submit"
                className="bg-[#003087] text-white px-6 py-2 rounded-md hover:bg-[#00256e] transition-colors"
              >
                Rechercher
              </button>
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    setLoading(true);
                    fetchLivres();
                  }}
                  className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Effacer
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Affichage des erreurs */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Grille des livres */}
        {livres.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {searchTerm ? 'Aucun livre trouvé pour cette recherche.' : 'Aucun livre disponible pour le moment.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {livres.map((livre) => (
              <div key={livre.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {livre.titre}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    <span className="font-medium">Auteur:</span> {livre.auteur}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-medium">Genre:</span> {livre.genre}
                  </p>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {livre.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      livre.disponible 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {livre.disponible ? 'Disponible' : 'Indisponible'}
                    </span>
                    
                    <Link
                      href={`/livres/${livre.id}`}
                      className="bg-[#003087] text-white px-4 py-2 rounded-md hover:bg-[#00256e] transition-colors text-sm"
                    >
                      Voir détails
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center">
          <Link 
            href="/"
            className="text-[#003087] hover:text-[#00256e] transition-colors"
          >
            ← Retour à l'accueil
          </Link>
          
          <div className="flex gap-4">
            <Link
              href="/user-profile"
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Mon Profil
            </Link>
            {localStorage.getItem('userRole') === 'admin' && (
              <Link
                href="/admin"
                className="bg-[#FFD700] text-[#003087] px-4 py-2 rounded-md hover:bg-yellow-400 transition-colors font-medium"
              >
                Administration
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 