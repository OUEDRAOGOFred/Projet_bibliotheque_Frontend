"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

interface Emprunt {
  id: number;
  livre_titre: string;
  livre_auteur?: string;
  date_emprunt: string;
  date_retour: string | null;
  date_limite: string | null;
  rendu: boolean;
}

interface Utilisateur {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: string;
}

export default function AdminUserProfile() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [user, setUser] = useState<Utilisateur | null>(null);
  const [emprunts, setEmprunts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem('userRole') || localStorage.getItem('role');
    if (role !== 'admin') {
      router.replace('/');
    }
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    // Récupérer les infos utilisateur
    fetch(`http://localhost:4400/admin/utilisateurs/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setUser(data);
      });
    // Récupérer les emprunts
    fetch(`http://localhost:4400/admin/utilisateurs/${id}/emprunts`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        // On stocke directement le tableau d'emprunts reçu
        const empruntsArray = Array.isArray(data) ? data : (data.emprunts || []);
        setEmprunts(empruntsArray);
        setLoading(false);
      });
  }, [id, router]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="text-center animate-fadeIn"><div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#003087]"></div><p className="mt-4 text-gray-600">Chargement du profil...</p></div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eaf0fa] to-[#c3cfe2] py-12 px-2 flex flex-col items-center">
      <div className="w-full max-w-3xl mx-auto glass lift rounded-2xl shadow-2xl p-8 flex flex-col gap-8 animate-fadeIn">
        <h1 className="text-3xl font-bold text-[#003087] mb-2 text-center animate-pulse-slow">Profil de l'utilisateur</h1>
        {user && (
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="mb-1"><span className="font-semibold">Nom :</span> {user.nom} {user.prenom}</p>
              <p className="mb-1"><span className="font-semibold">Email :</span> {user.email}</p>
              <p className="mb-1"><span className="font-semibold">Rôle :</span> <span className="badge badge-info uppercase">{user.role}</span></p>
            </div>
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold text-[#003087] mb-4">Livres empruntés</h2>
          {emprunts.length === 0 ? (
            <p className="text-gray-600 text-center">Aucun emprunt.</p>
          ) : (
            <div className="overflow-x-auto rounded-xl">
              <table className="min-w-full bg-white rounded-xl overflow-hidden text-sm md:text-base">
                <thead>
                  <tr className="bg-[#003087] text-white">
                    <th className="py-2 px-4 rounded-tl-lg whitespace-nowrap">Titre</th>
                    <th className="py-2 px-4 whitespace-nowrap">Auteur</th>
                    <th className="py-2 px-4 whitespace-nowrap">Date d'emprunt</th>
                    <th className="py-2 px-4 whitespace-nowrap">Date limite</th>
                    <th className="py-2 px-4 whitespace-nowrap">Statut</th>
                    <th className="py-2 px-4 whitespace-nowrap">Date de retour</th>
                  </tr>
                </thead>
                <tbody>
                  {emprunts.map((e) => (
                    <tr key={e.id} className="border-b last:border-0">
                      <td className="py-2 px-4 font-semibold text-[#003087] whitespace-nowrap">{e.livre ? e.livre.titre : '-'}</td>
                      <td className="py-2 px-4 whitespace-nowrap">{e.livre ? e.livre.auteur : '-'}</td>
                      <td className="py-2 px-4 whitespace-nowrap">{e.date_emprunt ? new Date(e.date_emprunt).toLocaleDateString() : '-'}</td>
                      <td className="py-2 px-4 whitespace-nowrap">{e.date_limite ? new Date(e.date_limite).toLocaleDateString() : '-'}</td>
                      <td className="py-2 px-4 whitespace-nowrap">
                        {e.rendu ? (
                          <span className="badge badge-success">Rendu</span>
                        ) : (
                          e.date_limite && new Date(e.date_limite) < new Date() ? (
                            <span className="badge badge-error">En retard</span>
                          ) : (
                            <span className="badge badge-warning">Emprunté</span>
                          )
                        )}
                      </td>
                      <td className="py-2 px-4 whitespace-nowrap">{e.rendu && e.date_retour ? new Date(e.date_retour).toLocaleDateString() : '-'}</td>
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