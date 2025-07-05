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
  disponible: boolean;
}

export default function AdminPage() {
  const router = useRouter();
  const [livres, setLivres] = useState<Livre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    if (!token) {
      router.push('/login');
      return;
    }
    if (role !== 'admin') {
      router.push('/livres');
      return;
    }
    fetchLivres();
  }, [router]);

  const fetchLivres = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(API_ENDPOINTS.LIVRES, {
        headers: { 'Authorization': `Bearer ${token}` }
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

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer ce livre ?')) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_ENDPOINTS.LIVRES}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setMessage('Livre supprimé !');
        fetchLivres();
      } else {
        setError('Erreur lors de la suppression');
      }
    } catch (err) {
      setError('Erreur de connexion');
    }
  };

  const handleNotifierRetards = async () => {
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_ENDPOINTS.EMPRUNTS}/retards/notifier`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setMessage('Notifications envoyées !');
      } else {
        setError('Erreur lors de la notification');
      }
    } catch (err) {
      setError('Erreur de connexion');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-[#003087] mb-6">Gestion des livres</h1>
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <button
              onClick={handleNotifierRetards}
              className="bg-yellow-400 text-[#003087] px-4 py-2 rounded-md hover:bg-yellow-500 font-semibold"
            >
              Notifier les retards
            </button>
            <Link
              href="/"
              className="ml-auto text-[#003087] hover:text-[#00256e] transition-colors"
            >
              ← Retour à l'accueil
            </Link>
            <Link
              href="/userlist"
              className="bg-[#003087] text-white px-4 py-2 rounded-md hover:bg-[#00256e] font-semibold"
            >
              Gérer les utilisateurs
            </Link>
            <Link
              href="/livres"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 font-semibold"
            >
              Voir le catalogue
            </Link>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-semibold"
              onClick={() => router.push('/livres/nouveau')}
            >
              Ajouter un livre
            </button>
          </div>
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
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#003087]"></div>
              <p className="mt-4 text-gray-600">Chargement des livres...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Auteur</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Genre</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disponible</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {livres.map((livre) => (
                    <tr key={livre.id}>
                      <td className="px-4 py-2 font-semibold text-[#003087]">{livre.titre}</td>
                      <td className="px-4 py-2">{livre.auteur}</td>
                      <td className="px-4 py-2">{livre.genre}</td>
                      <td className="px-4 py-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${livre.disponible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{livre.disponible ? 'Oui' : 'Non'}</span>
                      </td>
                      <td className="px-4 py-2 flex gap-2">
                        <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-xs"
                          onClick={() => router.push(`/livres/${livre.id}`)}
                        >Modifier</button>
                        <button onClick={() => handleDelete(livre.id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-xs">Supprimer</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 