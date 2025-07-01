"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface Livre {
  id: number;
  titre: string;
  auteur: string;
  genre: string;
  description: string;
  disponible: boolean;
}

interface Commentaire {
  id: number;
  utilisateur_id: number;
  nom: string;
  prenom: string;
  commentaire: string;
  note: number;
  date_commentaire: string;
  role?: string;
}

export default function LivreDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const [livre, setLivre] = useState<Livre | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [commentaires, setCommentaires] = useState<Commentaire[]>([]);
  const [moyenne, setMoyenne] = useState<number | null>(null);
  const [monCommentaire, setMonCommentaire] = useState('');
  const [maNote, setMaNote] = useState(0);
  const [error, setError] = useState('');
  const [loadingCommentaires, setLoadingCommentaires] = useState(false);
  const [postDebug, setPostDebug] = useState(null);
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
      return;
    }

    fetch(`http://localhost:4400/livres/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setLivre(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors du chargement du livre:', error);
        setLoading(false);
      });
  }, [id, router]);

  const fetchCommentaires = async () => {
    setLoadingCommentaires(true);
    try {
      const res = await fetch(`http://localhost:4400/commentaires/${id}`);
      const data = await res.json();
      setCommentaires(data.commentaires);
      setMoyenne(data.moyenne);
      // Pré-remplir si l'utilisateur a déjà commenté
      if (userId) {
        const monCom = data.commentaires.find(c => String(c.utilisateur_id) === String(userId));
        if (monCom) {
          setMonCommentaire(monCom.commentaire || "");
          setMaNote(monCom.note || 0);
        }
      }
    } catch (err) {
      setError("Erreur lors du chargement des commentaires.");
    }
    setLoadingCommentaires(false);
  };

  useEffect(() => {
    fetchCommentaires();
  }, [id]);

  const handleEmprunt = async () => {
    setMessage('');
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Vous devez être connecté pour emprunter.');
      return;
    }
    
    try {
      const res = await fetch('http://localhost:4400/emprunts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ livre_id: livre?.id })
      });
      const data = await res.json();
      
      if (res.ok) {
        setMessage('Livre emprunté avec succès !');
        setLivre(prev => prev ? { ...prev, disponible: false } : null);
      } else {
        setMessage(data.message || 'Erreur lors de l\'emprunt');
      }
    } catch (error) {
      setMessage('Erreur lors de l\'emprunt');
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setPostDebug(null);
    if (!token) {
      setError("Vous devez être connecté pour commenter.");
      return;
    }
    if (!maNote) {
      setError("Merci de donner une note.");
      return;
    }
    try {
      const res = await fetch("http://localhost:4400/commentaires", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ livre_id: livre.id, commentaire: monCommentaire, note: maNote }),
      });
      const data = await res.json();
      setPostDebug(data);
      if (res.ok) {
        setMessage(data.message);
        fetchCommentaires();
      } else {
        setError(data.message || "Erreur lors de l'envoi du commentaire.");
      }
    } catch (err) {
      setError("Erreur réseau lors de l'envoi du commentaire.");
    }
  };

  // Fonction utilitaire pour afficher les étoiles
  function renderStars(note: number) {
    return (
      <span style={{ color: '#FFD700', fontSize: '1.1em' }}>
        {Array.from({ length: 5 }, (_, i) => (
          <svg key={i} width="18" height="18" viewBox="0 0 20 20" fill={i < note ? '#FFD700' : '#E5E7EB'} xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline', verticalAlign: 'middle' }}>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
          </svg>
        ))}
      </span>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#003087]"></div>
          <p className="mt-4 text-gray-600">Chargement du livre...</p>
        </div>
      </div>
    );
  }

  if (!livre) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Livre introuvable</h2>
          <p className="text-gray-600 mb-6">Le livre que vous recherchez n'existe pas ou a été supprimé.</p>
          <Link
            href="/livres"
            className="bg-[#003087] text-white px-6 py-3 rounded-md hover:bg-[#00256e] transition-colors duration-300"
          >
            Retour au catalogue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#003087] text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src="/logo2ie.png"
                alt="Institut 2iE Logo"
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-2xl font-bold">Bibliothèque Numérique</h1>
                <p className="text-blue-200 text-sm">Institut 2iE</p>
              </div>
            </div>
            <nav className="flex space-x-4">
              <Link
                href="/livres"
                className="text-white hover:text-[#FFD700] transition-colors duration-300"
              >
                Catalogue
              </Link>
              <Link
                href="/dashboard"
                className="text-white hover:text-[#FFD700] transition-colors duration-300"
              >
                Mon Dashboard
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Message de notification */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes('succès') 
              ? 'bg-green-50 border-l-4 border-green-500 text-green-700'
              : 'bg-red-50 border-l-4 border-red-500 text-red-700'
          }`}>
            {message}
          </div>
        )}

        {/* Détails du livre */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/3 p-8 flex items-center justify-center bg-gray-50">
              <Image 
                src="/logo2ie.png" 
                alt={livre.titre} 
                width={200} 
                height={200}
                className="rounded-lg shadow-md"
              />
            </div>
            <div className="md:w-2/3 p-8">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-800">{livre.titre}</h1>
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  livre.disponible 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {livre.disponible ? 'Disponible' : 'Indisponible'}
                </span>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <span className="font-semibold text-gray-700">Auteur :</span>
                  <span className="ml-2 text-gray-600">{livre.auteur}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Genre :</span>
                  <span className="ml-2 text-gray-600">{livre.genre}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Description :</span>
                  <p className="mt-2 text-gray-600 leading-relaxed">{livre.description}</p>
                </div>
              </div>

              <div className="flex space-x-4">
                {livre.disponible && (
                  <button
                    onClick={handleEmprunt}
                    className="bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 transition-colors duration-300 flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Emprunter ce livre
                  </button>
                )}
                <Link
                  href="/livres"
                  className="bg-gray-600 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-700 transition-colors duration-300 flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Retour au catalogue
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Affichage de la moyenne et des commentaires */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Avis des lecteurs</h3>
          {moyenne !== null && !isNaN(Number(moyenne)) ? (
            <div className="mb-2 flex items-center gap-2">
              <span className="text-yellow-600 font-bold">Moyenne :</span>
              <span className="text-2xl font-bold">{Number(moyenne).toFixed(2)}</span>
              {renderStars(Math.round(Number(moyenne)))}
              <span className="text-gray-500 text-sm">/ 5</span>
            </div>
          ) : (
            <div className="mb-2 text-gray-500">Aucune note</div>
          )}
          {loadingCommentaires ? (
            <div>Chargement des commentaires...</div>
          ) : (
            <ul className="space-y-4">
              {Array.isArray(commentaires) && commentaires.length === 0 && <li>Aucun commentaire pour ce livre.</li>}
              {Array.isArray(commentaires) && commentaires.map((c) => (
                <li key={c.id} className="bg-white rounded-lg shadow p-4 border border-gray-100">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-[#003087]">{c.nom} {c.prenom}</span>
                    {c.role && (
                      <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${c.role === 'admin' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                        {c.role === 'admin' ? 'Admin' : 'Étudiant'}
                      </span>
                    )}
                    <span className="ml-2">{renderStars(Number(c.note))}</span>
                  </div>
                  <div className="text-gray-700 mb-1">{c.commentaire}</div>
                  <div className="text-xs text-gray-400">
                    {c.date_commentaire && new Date(c.date_commentaire).toLocaleString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Formulaire de commentaire (si connecté) */}
        {token && (
          <form onSubmit={handleCommentSubmit} className="mt-6 p-4 bg-gray-50 rounded shadow space-y-3">
            <div>
              <label className="block font-semibold mb-1">Votre note :</label>
              <select value={maNote} onChange={e => setMaNote(Number(e.target.value))} className="border rounded px-2 py-1">
                <option value={0}>Choisir une note</option>
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} ⭐</option>)}
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Votre commentaire :</label>
              <textarea value={monCommentaire} onChange={e => setMonCommentaire(e.target.value)} className="border rounded w-full px-2 py-1" rows={3} maxLength={500} />
            </div>
            <button type="submit" className="bg-[#003087] text-white px-4 py-2 rounded hover:bg-[#00256e]">Envoyer</button>
            {message && <div className="text-green-700 mt-2">{message}</div>}
            {error && <div className="text-red-700 mt-2">{error}</div>}
          </form>
        )}
      </main>
    </div>
  );
} 