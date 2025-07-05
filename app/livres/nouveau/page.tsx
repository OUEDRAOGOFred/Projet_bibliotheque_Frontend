"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_ENDPOINTS, fetchWithAuth } from '../../config/api';

export default function AjouterLivrePage() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setError('');
    const form = e.target as HTMLFormElement;
    const titre = (form.elements.namedItem('titre') as HTMLInputElement).value;
    const auteur = (form.elements.namedItem('auteur') as HTMLInputElement).value;
    const genre = (form.elements.namedItem('genre') as HTMLInputElement).value;
    const description = (form.elements.namedItem('description') as HTMLInputElement).value;
    const disponible = (form.elements.namedItem('disponible') as HTMLSelectElement).value === 'true';
    try {
      const res = await fetchWithAuth(API_ENDPOINTS.LIVRES, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ titre, auteur, genre, description, disponible })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Livre ajouté avec succès !');
        setTimeout(() => router.push('/admin'), 1000);
      } else {
        setError(data.message || 'Erreur lors de l\'ajout');
      }
    } catch (err) {
      setError('Erreur réseau lors de l\'ajout.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-lg w-full border border-blue-100">
        <h1 className="text-3xl font-extrabold text-[#003087] mb-8 text-center tracking-tight">Ajouter un nouveau livre</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Titre</label>
            <input type="text" name="titre" className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-[#003087] focus:border-[#003087] transition" required />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Auteur</label>
            <input type="text" name="auteur" className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-[#003087] focus:border-[#003087] transition" required />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Genre</label>
            <input type="text" name="genre" className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-[#003087] focus:border-[#003087] transition" required />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Description</label>
            <textarea name="description" className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-[#003087] focus:border-[#003087] transition" rows={3} required />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Disponible</label>
            <select name="disponible" className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-[#003087] focus:border-[#003087] transition">
              <option value="true">Oui</option>
              <option value="false">Non</option>
            </select>
          </div>
          <button type="submit" className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg shadow hover:from-green-600 hover:to-green-700 font-bold text-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400">Ajouter le livre</button>
          {error && <div className="text-red-700 mt-2 text-center font-semibold animate-pulse">{error}</div>}
          {message && <div className="text-green-700 mt-2 text-center font-semibold animate-bounce">{message}</div>}
        </form>
      </div>
    </div>
  );
} 