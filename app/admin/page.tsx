"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

    // Ici vous pouvez ajouter la logique pour charger les données admin
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#003087]"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-[#003087] mb-6">Panneau d'Administration</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h2 className="text-xl font-semibold text-[#003087] mb-4">Gestion des Utilisateurs</h2>
              <p className="text-gray-600 mb-4">Gérez les comptes utilisateurs et leurs permissions.</p>
              <Link 
                href="/userlist"
                className="bg-[#003087] text-white px-4 py-2 rounded-md hover:bg-[#00256e] transition-colors"
              >
                Voir les utilisateurs
              </Link>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h2 className="text-xl font-semibold text-[#003087] mb-4">Gestion des Livres</h2>
              <p className="text-gray-600 mb-4">Ajoutez, modifiez ou supprimez des livres.</p>
              <Link 
                href="/livres"
                className="bg-[#003087] text-white px-4 py-2 rounded-md hover:bg-[#00256e] transition-colors"
              >
                Gérer les livres
              </Link>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h2 className="text-xl font-semibold text-[#003087] mb-4">Emprunts</h2>
              <p className="text-gray-600 mb-4">Suivez les emprunts et les retours.</p>
              <button className="bg-[#003087] text-white px-4 py-2 rounded-md hover:bg-[#00256e] transition-colors">
                Voir les emprunts
              </button>
            </div>
          </div>
          
          <div className="mt-8">
            <Link 
              href="/"
              className="text-[#003087] hover:text-[#00256e] transition-colors"
            >
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 