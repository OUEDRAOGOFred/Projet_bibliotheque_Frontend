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
  const [notifMessage, setNotifMessage] = useState('');

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

  const handleNotifyLate = async () => {
    setNotifMessage('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://projet-librairie-backend.onrender.com/emprunts/retards/notifier', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setNotifMessage(data.message || 'Emails envoyés avec succès !');
      else setNotifMessage(data.message || 'Erreur lors de l\'envoi des emails');
    } catch (e) {
      setNotifMessage('Erreur de connexion au serveur');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-[#003087] mb-6">Gestion des livres</h1>
          <div className="mb-6 flex flex-wrap gap-4 items-center">
            <button onClick={handleNotifyLate} className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-md shadow">
              Notifier les retards
            </button>
            {notifMessage && <span className="ml-4 text-sm font-semibold text-blue-700">{notifMessage}</span>}
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