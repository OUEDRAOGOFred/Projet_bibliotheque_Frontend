"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
  const [titre, setTitre] = useState("");
  const [auteur, setAuteur] = useState("");
  const [genre, setGenre] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(false);
  const [disponibilite, setDisponibilite] = useState("all");
  const [page, setPage] = useState(1);
  const livresParPage = 9;
  const [sort, setSort] = useState("titre-asc");
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleEmprunter = async (livreId: number) => {
    setMessage(null);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:4400/emprunts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ livre_id: livreId })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Livre emprunté avec succès !');
        setRefresh(r => !r);
      } else {
        setMessage(data.message || 'Erreur lors de l\'emprunt.');
      }
    } catch (err) {
      setMessage('Erreur lors de l\'emprunt.');
    }
  };

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      router.push("/login");
      return;
    }
    fetch("http://localhost:4400/livres", {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setLivres(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [router, refresh]);

  // Pour le filtre genre dynamique
  const genresDisponibles = Array.from(new Set((Array.isArray(livres) ? livres : []).map(l => l.genre))).filter(Boolean);

  let livresFiltres = livres.filter(livre => {
    const matchTitre = livre.titre.toLowerCase().includes(titre.toLowerCase());
    const matchAuteur = livre.auteur.toLowerCase().includes(auteur.toLowerCase());
    const matchGenre = genre ? livre.genre.toLowerCase() === genre.toLowerCase() : true;
    const matchDispo = disponibilite === "all" ? true : (disponibilite === "disponible" ? livre.disponible : !livre.disponible);
    return matchTitre && matchAuteur && matchGenre && matchDispo;
  });

  // Tri
  livresFiltres = [...livresFiltres].sort((a, b) => {
    switch (sort) {
      case "titre-asc": return a.titre.localeCompare(b.titre);
      case "titre-desc": return b.titre.localeCompare(a.titre);
      case "auteur-asc": return a.auteur.localeCompare(b.auteur);
      case "auteur-desc": return b.auteur.localeCompare(a.auteur);
      case "dispo": return (b.disponible ? 1 : 0) - (a.disponible ? 1 : 0);
      default: return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(livresFiltres.length / livresParPage) || 1;
  const livresAffiches = livresFiltres.slice((page - 1) * livresParPage, page * livresParPage);

  useEffect(() => { setPage(1); }, [titre, auteur, genre, disponibilite]);

  // Gestion du scroll pour le bouton retour en haut
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="text-center"><div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#003087]"></div><p className="mt-4 text-gray-600">Chargement du catalogue...</p></div></div>;

  return (
    <div className="min-h-screen bg-[#f7f9fb] py-8 px-2 relative">
      {/* Encart de recherche et filtres */}
      <div className="max-w-4xl mx-auto rounded-2xl shadow-lg p-6 mb-8 mt-4 bg-white/70 backdrop-blur-md border border-gray-200">
        <h2 className="text-xl font-bold text-[#003087] mb-4">Rechercher un livre</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Titre</label>
            <input type="text" value={titre} onChange={e => setTitre(e.target.value)} placeholder="Rechercher par titre..." className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#003087]" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Auteur</label>
            <input type="text" value={auteur} onChange={e => setAuteur(e.target.value)} placeholder="Rechercher par auteur..." className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#003087]" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Genre</label>
            <select value={genre} onChange={e => setGenre(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#003087]">
              <option value="">Tous</option>
              {genresDisponibles.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Disponibilité</label>
            <select value={disponibilite} onChange={e => setDisponibilite(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#003087]">
              <option value="all">Tous</option>
              <option value="disponible">Disponibles</option>
              <option value="indisponible">Indisponibles</option>
            </select>
          </div>
        </div>
      </div>
      {/* Tri et nombre de résultats */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4 px-2 mt-8">
        <div>
          <span className="text-[#003087] font-semibold">{livresFiltres.length} résultat{livresFiltres.length > 1 ? 's' : ''} trouvé{livresFiltres.length > 1 ? 's' : ''}</span>
        </div>
        <div className="flex items-center gap-2">
          <label className="font-semibold text-[#003087]">Trier par :</label>
          <select value={sort} onChange={e => setSort(e.target.value)} className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#003087]">
            <option value="titre-asc">Titre (A → Z)</option>
            <option value="titre-desc">Titre (Z → A)</option>
            <option value="auteur-asc">Auteur (A → Z)</option>
            <option value="auteur-desc">Auteur (Z → A)</option>
            <option value="dispo">Disponibilité (disponible d'abord)</option>
          </select>
        </div>
      </div>
      {/* Titre catalogue */}
      <div className="max-w-6xl mx-auto mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#003087] mb-4">Catalogue des livres</h1>
      </div>
      {/* Liste des livres */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {message && (
          <div className="col-span-full text-center mb-4">
            <span className="inline-block px-4 py-2 rounded bg-blue-100 text-blue-800 font-semibold">{message}</span>
          </div>
        )}
        {livresAffiches.length === 0 ? (
          <p className="col-span-full text-center text-gray-600">Aucun livre trouvé.</p>
        ) : (
          livresAffiches.map((livre) => (
            <div key={livre.id} className="bg-white rounded-xl shadow-md p-4 flex flex-col relative hover:shadow-xl transition-shadow duration-300">
              {/* Image du livre */}
              <div className="flex justify-center mb-3">
                <img src="/logo2ie.png" alt="Livre" className="h-24 w-24 object-contain rounded" />
              </div>
              {/* Badge disponibilité */}
              <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${livre.disponible ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{livre.disponible ? 'Disponible' : 'Indisponible'}</span>
              <h2 className="text-lg font-bold text-[#003087] mb-1">{livre.titre}</h2>
              <p className="text-sm text-gray-700 mb-1"><span className="font-semibold">Auteur :</span> {livre.auteur}</p>
              <p className="text-sm text-gray-600 mb-1"><span className="font-semibold">Genre :</span> {livre.genre}</p>
              <p className="text-xs text-gray-500 mb-3">{livre.description?.slice(0, 100)}{livre.description && livre.description.length > 100 ? '...' : ''}</p>
              <div className="mt-auto flex flex-col gap-2">
                <Link href={`/livres/${livre.id}`} className="bg-[#003087] text-white px-4 py-2 rounded hover:bg-[#00256e] transition-colors duration-200 text-sm font-semibold text-center">Voir détails</Link>
                {livre.disponible && (
                  <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-200 text-sm font-semibold" onClick={() => handleEmprunter(livre.id)}>Emprunter</button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {/* Pagination */}
      <div className="max-w-6xl mx-auto flex justify-center items-center gap-4 mt-8">
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-[#003087] font-semibold disabled:opacity-50">Précédent</button>
        <span className="font-semibold text-[#003087]">Page {page} / {totalPages}</span>
        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-[#003087] font-semibold disabled:opacity-50">Suivant</button>
      </div>
      {/* Bouton retour en haut */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 bg-[#003087] text-white p-3 rounded-full shadow-lg hover:bg-[#00256e] transition-all animate-fadeIn"
          aria-label="Retour en haut"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
        </button>
      )}
    </div>
  );
} 