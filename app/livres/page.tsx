"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { API_ENDPOINTS, fetchWithAuth } from '../config/api';

interface Livre {
  id: number;
  titre: string;
  auteur: string;
  genre: string;
  description: string;
  disponible: boolean;
}

const genres = [
  'Tous', 'Roman classique', 'Science-fiction', 'Roman philosophique', 'Roman réaliste', 'Fantasy', 'Fantasy jeunesse', 'Roman picaresque', 'Roman psychologique', 'Roman d\'aventure', 'Science', 'Bande dessinée', 'Poésie', 'Informatique', 'Jeunesse', 'Stratégie', 'Pratique'
];

export default function LivresPage() {
  const router = useRouter();
  const [livres, setLivres] = useState<Livre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [genre, setGenre] = useState('Tous');
  const [disponibilite, setDisponibilite] = useState('Tous');
  const [sort, setSort] = useState('titre');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchLivres();
    // eslint-disable-next-line
  }, [router]);

  const fetchLivres = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      let url = API_ENDPOINTS.LIVRES;
      const params: string[] = [];
      if (searchTerm) params.push(`titre=${encodeURIComponent(searchTerm)}`);
      if (genre !== 'Tous') params.push(`genre=${encodeURIComponent(genre)}`);
      if (disponibilite !== 'Tous') params.push(`disponible=${disponibilite === 'Disponible'}`);
      if (params.length > 0) url += '?' + params.join('&');
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        let data = await response.json();
        if (sort === 'titre') data = data.sort((a: Livre, b: Livre) => a.titre.localeCompare(b.titre));
        if (sort === 'auteur') data = data.sort((a: Livre, b: Livre) => a.auteur.localeCompare(b.auteur));
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
    fetchLivres();
  };

  const handleEmprunt = async (livre: Livre) => {
    setError('');
    setMessage('');
    try {
      const res = await fetchWithAuth(API_ENDPOINTS.EMPRUNTS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ livre_id: livre.id })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Livre emprunté avec succès !');
        fetchLivres();
      } else {
        setError(data.message || 'Erreur lors de l\'emprunt');
      }
    } catch (err) {
      setError('Erreur lors de l\'emprunt');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#003087] mb-4">Catalogue des Livres</h1>
          <form onSubmit={handleSearch} className="mb-6 flex flex-col md:flex-row gap-4 items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un livre par titre..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003087] focus:border-[#003087]"
            />
            <select
              value={genre}
              onChange={e => setGenre(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md"
            >
              {genres.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            <select
              value={disponibilite}
              onChange={e => setDisponibilite(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="Tous">Tous</option>
              <option value="Disponible">Disponible</option>
              <option value="Indisponible">Indisponible</option>
            </select>
            <button
              type="submit"
              className="bg-[#003087] text-white px-6 py-2 rounded-md hover:bg-[#00256e] transition-colors"
            >
              Rechercher
            </button>
            {searchTerm || genre !== 'Tous' || disponibilite !== 'Tous' ? (
              <button
                type="button"
                onClick={() => { setSearchTerm(''); setGenre('Tous'); setDisponibilite('Tous'); fetchLivres(); }}
                className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors"
              >
                Effacer
              </button>
            ) : null}
          </form>
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            <span className="text-gray-600 text-sm">Trier par :</span>
            <select
              value={sort}
              onChange={e => { setSort(e.target.value); fetchLivres(); }}
              className="px-3 py-1 border border-gray-300 rounded-md"
            >
              <option value="titre">Titre (A → Z)</option>
              <option value="auteur">Auteur (A → Z)</option>
            </select>
            <span className="text-gray-500 text-sm ml-auto">{livres.length} résultat{livres.length > 1 ? 's' : ''} trouvé{livres.length > 1 ? 's' : ''}</span>
          </div>
        </div>
        {message && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-md text-green-700 font-semibold shadow">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-md text-red-700 font-semibold shadow">
            {error}
          </div>
        )}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#003087]"></div>
            <p className="mt-4 text-gray-600">Chargement des livres...</p>
          </div>
        ) : livres.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {searchTerm ? 'Aucun livre trouvé pour cette recherche.' : 'Aucun livre disponible pour le moment.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {livres.map((livre) => (
              <div key={livre.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow flex flex-col border border-gray-100">
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                      livre.disponible 
                        ? 'bg-green-100 text-green-800 border border-green-200' 
                        : 'bg-red-100 text-red-800 border border-red-200'
                    }`}>
                      {livre.disponible ? 'Disponible' : 'Indisponible'}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">
                    {livre.titre}
                  </h3>
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium">Auteur :</span> {livre.auteur}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium">Genre :</span> {livre.genre}
                  </p>
                  <p className="text-gray-500 mb-4 line-clamp-3 text-sm flex-1">
                    {livre.description}
                  </p>
                  <div className="mt-auto flex flex-col gap-2">
                    <Link
                      href={`/livres/${livre.id}`}
                      className="bg-[#003087] text-white px-4 py-2 rounded-md hover:bg-[#00256e] transition-colors text-sm text-center font-semibold shadow"
                    >
                      Voir détails
                    </Link>
                    <button
                      className={`px-4 py-2 rounded-md text-sm font-semibold shadow transition-colors ${
                        livre.disponible
                          ? 'bg-green-500 text-white hover:bg-green-600'
                          : 'bg-gray-300 text-gray-400 cursor-not-allowed'
                      }`}
                      onClick={() => livre.disponible && handleEmprunt(livre)}
                      disabled={!livre.disponible}
                    >
                      {livre.disponible ? 'Emprunter' : 'Indisponible'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
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
            {typeof window !== 'undefined' && localStorage.getItem('userRole') === 'admin' && (
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