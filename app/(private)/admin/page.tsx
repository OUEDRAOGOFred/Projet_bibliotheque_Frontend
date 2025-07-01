"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import Link from "next/link";

interface Livre {
  id: number;
  titre: string;
  auteur: string;
  genre: string;
  description: string;
  disponible: boolean;
}

interface Etudiant {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [livres, setLivres] = useState<Livre[]>([]);
  const [etudiants, setEtudiants] = useState<Etudiant[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddBook, setShowAddBook] = useState(false);
  const [newBook, setNewBook] = useState({ titre: "", auteur: "", genre: "", description: "" });
  const [refresh, setRefresh] = useState(false);
  const [editBookId, setEditBookId] = useState<number | null>(null);
  const [editBook, setEditBook] = useState({ titre: '', auteur: '', genre: '', description: '' });
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [editUserRole, setEditUserRole] = useState('');
  const [notifMsg, setNotifMsg] = useState<string | null>(null);
  const [bookErrors, setBookErrors] = useState({ titre: '', auteur: '', genre: '', description: '' });

  useEffect(() => {
    const role = localStorage.getItem('userRole') || localStorage.getItem('role');
    if (role !== 'admin') {
      router.replace('/');
      return;
    }
    const token = localStorage.getItem('token');
    Promise.all([
      fetch('http://localhost:4400/livres', { headers: { 'Authorization': `Bearer ${token}` } }).then(res => res.json()),
      fetch('http://localhost:4400/admin/utilisateurs', { headers: { 'Authorization': `Bearer ${token}` } }).then(res => res.json())
    ]).then(([livresData, etudiantsData]) => {
      setLivres(Array.isArray(livresData) ? livresData : []);
      setEtudiants(etudiantsData);
      setLoading(false);
    });
  }, [router, refresh]);

  const handleDeleteBook = async (id: number) => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:4400/livres/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    setRefresh(r => !r);
  };

  const handleDeleteEtudiant = async (id: number) => {
    const token = localStorage.getItem('token');
    setNotifMsg(null);
    try {
      const res = await fetch(`http://localhost:4400/admin/utilisateurs/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setNotifMsg(data.message || 'Utilisateur supprimé avec succès.');
        setRefresh(r => !r);
      } else {
        setNotifMsg(data.message || 'Erreur lors de la suppression.');
      }
    } catch (err) {
      setNotifMsg('Erreur lors de la suppression.');
    }
  };

  const validateBook = () => {
    let valid = true;
    let errs = { titre: '', auteur: '', genre: '', description: '' };
    if (!newBook.titre.trim()) { errs.titre = 'Le titre est obligatoire'; valid = false; }
    if (!newBook.auteur.trim()) { errs.auteur = 'L\'auteur est obligatoire'; valid = false; }
    if (!newBook.genre.trim()) { errs.genre = 'Le genre est obligatoire'; valid = false; }
    if (!newBook.description.trim()) { errs.description = 'La description est obligatoire'; valid = false; }
    setBookErrors(errs);
    return valid;
  };

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateBook()) return;
    const token = localStorage.getItem('token');
    await fetch('http://localhost:4400/livres', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ ...newBook, disponible: true })
    });
    setShowAddBook(false);
    setNewBook({ titre: "", auteur: "", genre: "", description: "" });
    setRefresh(r => !r);
  };

  const handleEditBook = (livre: Livre) => {
    setEditBookId(livre.id);
    setEditBook({ titre: livre.titre, auteur: livre.auteur, genre: livre.genre, description: livre.description });
  };

  const handleSaveBook = async (id: number) => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:4400/livres/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(editBook)
    });
    setEditBookId(null);
    setRefresh(r => !r);
  };

  const handleEditUser = (etudiant: Etudiant) => {
    setEditUserId(etudiant.id);
    setEditUserRole(etudiant.role);
  };

  const handleSaveUserRole = async (id: number) => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:4400/admin/utilisateurs/${id}/role`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ role: editUserRole })
    });
    setEditUserId(null);
    setRefresh(r => !r);
  };

  const handleNotifyRetards = async () => {
    setNotifMsg(null);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:4400/emprunts/retards/notifier', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setNotifMsg(data.message || 'Notifications envoyées avec succès.');
      } else {
        setNotifMsg(data.message || 'Erreur lors de l\'envoi des notifications.');
      }
    } catch (err) {
      setNotifMsg('Erreur lors de l\'envoi des notifications.');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="text-center"><div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#003087]"></div><p className="mt-4 text-gray-600">Chargement du tableau de bord...</p></div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eaf0fa] to-[#c3cfe2] py-12 px-2 flex flex-col items-center">
      <div className="w-full max-w-6xl mx-auto bg-white/90 rounded-2xl shadow-2xl p-8 flex flex-col gap-12">
        <h1 className="text-4xl font-extrabold text-[#003087] mb-2 text-center tracking-tight drop-shadow">Tableau de bord Administrateur</h1>
        <div className="flex justify-between mb-4">
          <Link href="/admin/userlist" className="bg-[#003087] hover:bg-[#00256e] text-white px-5 py-2 rounded-lg font-semibold shadow transition-all">Gestion des étudiants</Link>
          <button onClick={handleNotifyRetards} className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg font-semibold shadow flex items-center gap-2 transition-all">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" /></svg>
            Notifier les retards
          </button>
        </div>
        {notifMsg && (
          <div className="mb-4 text-center">
            <span className="inline-block px-4 py-2 rounded bg-blue-100 text-blue-800 font-semibold shadow">{notifMsg}</span>
          </div>
        )}
        {/* Gestion des livres */}
        <section className="bg-white/95 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#003087] tracking-tight">Gestion des livres</h2>
            <button onClick={() => setShowAddBook(s => !s)} className="bg-[#003087] hover:bg-[#00256e] text-white px-5 py-2 rounded-lg font-semibold shadow transition-all">{showAddBook ? 'Annuler' : 'Ajouter un livre'}</button>
          </div>
          {showAddBook && (
            <form onSubmit={handleAddBook} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <input type="text" required placeholder="Titre" value={newBook.titre} onChange={e => setNewBook({ ...newBook, titre: e.target.value })} className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#003087]" />
              {bookErrors.titre && <p className="text-red-600 text-xs mt-1">{bookErrors.titre}</p>}
              <input type="text" required placeholder="Auteur" value={newBook.auteur} onChange={e => setNewBook({ ...newBook, auteur: e.target.value })} className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#003087]" />
              {bookErrors.auteur && <p className="text-red-600 text-xs mt-1">{bookErrors.auteur}</p>}
              <input type="text" required placeholder="Genre" value={newBook.genre} onChange={e => setNewBook({ ...newBook, genre: e.target.value })} className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#003087]" />
              {bookErrors.genre && <p className="text-red-600 text-xs mt-1">{bookErrors.genre}</p>}
              <input type="text" required placeholder="Description" value={newBook.description} onChange={e => setNewBook({ ...newBook, description: e.target.value })} className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#003087]" />
              {bookErrors.description && <p className="text-red-600 text-xs mt-1">{bookErrors.description}</p>}
              <button type="submit" className="col-span-1 md:col-span-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold mt-2 shadow">Ajouter</button>
            </form>
          )}
          <div className="overflow-x-auto rounded-xl">
            <table className="min-w-full bg-white rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-[#003087] text-white text-sm">
                  <th className="py-3 px-4 text-left">Titre</th>
                  <th className="py-3 px-4 text-left">Auteur</th>
                  <th className="py-3 px-4 text-left">Genre</th>
                  <th className="py-3 px-4 text-left">Disponible</th>
                  <th className="py-3 px-4"></th>
                </tr>
              </thead>
              <tbody>
                {(Array.isArray(livres) ? livres : []).map(livre => (
                  <tr key={livre.id} className="even:bg-gray-50 hover:bg-blue-50 transition-all">
                    {editBookId === livre.id ? (
                      <>
                        <td className="py-2 px-4"><input type="text" value={editBook.titre} onChange={e => setEditBook({ ...editBook, titre: e.target.value })} className="w-full px-2 py-1 border rounded" /></td>
                        <td className="py-2 px-4"><input type="text" value={editBook.auteur} onChange={e => setEditBook({ ...editBook, auteur: e.target.value })} className="w-full px-2 py-1 border rounded" /></td>
                        <td className="py-2 px-4"><input type="text" value={editBook.genre} onChange={e => setEditBook({ ...editBook, genre: e.target.value })} className="w-full px-2 py-1 border rounded" /></td>
                        <td className="py-2 px-4"><span className={`px-2 py-1 rounded text-xs font-bold ${livre.disponible ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{livre.disponible ? 'Oui' : 'Non'}</span></td>
                        <td className="py-2 px-4 text-right flex gap-2">
                          <button onClick={() => handleSaveBook(livre.id)} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg font-semibold flex items-center gap-1"><PencilSquareIcon className="h-4 w-4" />Enregistrer</button>
                          <button onClick={() => setEditBookId(null)} className="bg-gray-400 hover:bg-gray-600 text-white px-3 py-1 rounded-lg font-semibold">Annuler</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="py-2 px-4 font-semibold text-[#003087]">{livre.titre}</td>
                        <td className="py-2 px-4">{livre.auteur}</td>
                        <td className="py-2 px-4">{livre.genre}</td>
                        <td className="py-2 px-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${livre.disponible ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{livre.disponible ? 'Oui' : 'Non'}</span>
                        </td>
                        <td className="py-2 px-4 text-right flex gap-2">
                          <button onClick={() => handleEditBook(livre)} className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded-lg font-semibold flex items-center gap-1"><PencilSquareIcon className="h-4 w-4" />Modifier</button>
                          <button onClick={() => handleDeleteBook(livre.id)} className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-lg font-semibold flex items-center gap-1"><TrashIcon className="h-4 w-4" />Supprimer</button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
} 