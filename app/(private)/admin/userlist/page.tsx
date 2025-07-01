"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Utilisateur {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: string;
}

export default function UserListPage() {
  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([]);
  const [loading, setLoading] = useState(true);
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [editNom, setEditNom] = useState("");
  const [editPrenom, setEditPrenom] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [notifMsg, setNotifMsg] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoading(true);
    fetch('http://localhost:4400/admin/utilisateurs', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setUtilisateurs(data);
        setLoading(false);
      });
  }, [refresh]);

  const handleDeleteUtilisateur = async (id: number) => {
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

  const handleEditUser = (utilisateur: Utilisateur) => {
    setEditUserId(utilisateur.id);
    setEditNom(utilisateur.nom);
    setEditPrenom(utilisateur.prenom);
    setEditEmail(utilisateur.email);
  };

  const handleSaveUserInfo = async (id: number) => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:4400/admin/utilisateurs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ nom: editNom, prenom: editPrenom, email: editEmail })
    });
    setEditUserId(null);
    setRefresh(r => !r);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="text-center"><div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#003087]"></div><p className="mt-4 text-gray-600">Chargement de la liste des utilisateurs...</p></div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eaf0fa] to-[#c3cfe2] py-12 px-2 flex flex-col items-center">
      <div className="w-full max-w-5xl mx-auto bg-white/90 rounded-2xl shadow-2xl p-8 flex flex-col gap-8">
        <div className="flex justify-end mb-4">
          <a href="/admin/utilisateur/ajouter" className="bg-[#003087] hover:bg-[#00256e] text-white px-5 py-2 rounded-lg font-semibold shadow transition-all">Ajouter un utilisateur</a>
        </div>
        <h1 className="text-3xl font-bold text-[#003087] mb-2 text-center">Liste des utilisateurs</h1>
        {notifMsg && (
          <div className="mb-4 text-center">
            <span className="inline-block px-4 py-2 rounded bg-blue-100 text-blue-800 font-semibold shadow">{notifMsg}</span>
          </div>
        )}
        <div className="overflow-x-auto rounded-xl">
          <table className="min-w-full bg-white rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-[#003087] text-white text-sm">
                <th className="py-3 px-4 text-left">Nom</th>
                <th className="py-3 px-4 text-left">Prénom</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Rôle</th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {utilisateurs.map(utilisateur => (
                <tr key={utilisateur.id} className="even:bg-gray-50 hover:bg-blue-50 transition-all">
                  <td className="py-2 px-4">{editUserId === utilisateur.id ? (
                    <input type="text" value={editNom} onChange={e => setEditNom(e.target.value)} className="px-2 py-1 border rounded" />
                  ) : utilisateur.nom}</td>
                  <td className="py-2 px-4">{editUserId === utilisateur.id ? (
                    <input type="text" value={editPrenom} onChange={e => setEditPrenom(e.target.value)} className="px-2 py-1 border rounded" />
                  ) : utilisateur.prenom}</td>
                  <td className="py-2 px-4">{editUserId === utilisateur.id ? (
                    <input type="email" value={editEmail} onChange={e => setEditEmail(e.target.value)} className="px-2 py-1 border rounded" />
                  ) : utilisateur.email}</td>
                  <td className="py-2 px-4">{utilisateur.role}</td>
                  <td className="py-2 px-4 text-right flex gap-2">
                    {editUserId === utilisateur.id ? (
                      <>
                        <button onClick={() => handleSaveUserInfo(utilisateur.id)} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg font-semibold mr-2">Enregistrer</button>
                        <button onClick={() => setEditUserId(null)} className="bg-gray-400 hover:bg-gray-600 text-white px-3 py-1 rounded-lg font-semibold">Annuler</button>
                      </>
                    ) : (
                      <>
                        <Link href={`/admin/utilisateur/${utilisateur.id}`} className="bg-gray-200 hover:bg-gray-300 text-[#003087] px-3 py-1 rounded-lg font-semibold flex items-center gap-1 mr-2">Voir profil</Link>
                        <button onClick={() => handleEditUser(utilisateur)} className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded-lg font-semibold flex items-center gap-1 mr-2">Modifier</button>
                        <button onClick={() => handleDeleteUtilisateur(utilisateur.id)} className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-lg font-semibold flex items-center gap-1">Supprimer</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 