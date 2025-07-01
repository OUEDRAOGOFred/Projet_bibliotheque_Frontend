"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Emprunt {
  id: number;
  livre_titre: string;
  livre_auteur?: string;
  date_emprunt: string;
  date_retour: string | null;
  date_limite: string | null;
  rendu: boolean;
  disponible?: boolean;
}

export default function UserProfile() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [emprunts, setEmprunts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  // Fonction pour rafraîchir les emprunts
  const fetchEmprunts = () => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:4400/emprunts/mes', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        // On stocke directement le tableau d'emprunts reçu
        const empruntsArray = Array.isArray(data) ? data : (data.emprunts || []);
        setEmprunts(empruntsArray);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('userEmail');
    const role = localStorage.getItem('userRole');
    if (!token || !email) {
      router.push('/login');
      return;
    }
    setUser({ email, role });
    fetchEmprunts();
    // eslint-disable-next-line
  }, [router, refresh]);

  const handleRetour = async (empruntId: number) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await fetch('http://localhost:4400/emprunts/retour', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ emprunt_id: empruntId })
      });
      if (res.ok) {
        setRefresh(r => !r); // Rafraîchir la liste après retour
      }
    } catch (err) {}
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="text-center"><div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#003087]"></div><p className="mt-4 text-gray-600">Chargement du profil...</p></div></div>;

  return (
    <div className="min-h-screen bg-[#f7f9fb] py-8 px-2 flex flex-col items-center">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-2xl p-8 flex flex-col items-center mb-8">
        {/* Avatar et titre */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-[#003087] rounded-full p-4 mb-2">
            <svg className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
          <h1 className="text-2xl font-bold text-[#003087]">Mon Profil</h1>
        </div>
        {/* Infos utilisateur */}
        <div className="w-full mb-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold">Email :</span>
            <span className="text-gray-700">{user.email}</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold">Rôle :</span>
            <span className="inline-block px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs font-semibold uppercase">{user.role}</span>
          </div>
        </div>
      </div>
      {/* Emprunts */}
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-[#003087] mb-6">Mes livres empruntés</h2>
        {emprunts.length === 0 ? (
          <p className="text-gray-600 text-center">Aucun emprunt en cours.</p>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <table className="min-w-full">
              <thead>
                <tr className="bg-[#003087] text-white">
                  <th className="py-2 px-4 rounded-tl-lg">Titre</th>
                  <th className="py-2 px-4">Auteur</th>
                  <th className="py-2 px-4">Date d'emprunt</th>
                  <th className="py-2 px-4">Date limite</th>
                  <th className="py-2 px-4">Statut</th>
                  <th className="py-2 px-4">Date de retour</th>
                  <th className="py-2 px-4 rounded-tr-lg">Action</th>
                </tr>
              </thead>
              <tbody>
                {emprunts.map((e) => (
                  <tr key={e.id} className="border-b last:border-0">
                    <td className="py-2 px-4 font-semibold text-[#003087]">{e.livre ? e.livre.titre : '-'}</td>
                    <td className="py-2 px-4">{e.livre ? e.livre.auteur : '-'}</td>
                    <td className="py-2 px-4">{e.date_emprunt ? new Date(e.date_emprunt).toLocaleDateString() : '-'}</td>
                    <td className="py-2 px-4">{e.date_limite ? new Date(e.date_limite).toLocaleDateString() : '-'}</td>
                    <td className="py-2 px-4">
                      {e.rendu ? (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Rendu</span>
                      ) : (
                        e.date_limite && new Date(e.date_limite) < new Date() ? (
                          <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">En retard</span>
                        ) : (
                          <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">Emprunté</span>
                        )
                      )}
                    </td>
                    <td className="py-2 px-4">{e.rendu && e.date_retour ? new Date(e.date_retour).toLocaleDateString() : '-'}</td>
                    <td className="py-2 px-4">
                      {!e.rendu && (
                        <button
                          onClick={() => handleRetour(e.id)}
                          className="bg-[#003087] text-white px-3 py-1 rounded hover:bg-[#00256e] transition-colors duration-200 text-xs font-semibold"
                        >
                          Retourner
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 