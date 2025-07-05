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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-[#003087] mb-6">Ajouter un nouveau livre</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Titre</label>
            <input type="text" name="titre" className="border rounded px-2 py-1 w-full" required />
          </div>
          <div>
            <label className="block font-semibold">Auteur</label>
            <input type="text" name="auteur" className="border rounded px-2 py-1 w-full" required />
          </div>
          <div>
            <label className="block font-semibold">Genre</label>
            <input type="text" name="genre" className="border rounded px-2 py-1 w-full" required />
          </div>
          <div>
            <label className="block font-semibold">Description</label>
            <textarea name="description" className="border rounded px-2 py-1 w-full" rows={3} required />
          </div>
          <div>
            <label className="block font-semibold">Disponible</label>
            <select name="disponible" className="border rounded px-2 py-1 w-full">
              <option value="true">Oui</option>
              <option value="false">Non</option>
            </select>
          </div>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Ajouter le livre</button>
          {error && <div className="text-red-700 mt-2">{error}</div>}
          {message && <div className="text-green-700 mt-2">{message}</div>}
        </form>
      </div>
    </div>
  );
} 