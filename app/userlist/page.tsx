"use client";

import { useEffect, useState } from "react";
import { Search, UserPlus, MoreHorizontal, AlertCircle, Loader2, Edit2, Trash2 } from "lucide-react";
import Link from "next/link";

interface User {
  user_id: string;
  email: string;
  nom: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Accès refusé. Veuillez vous connecter.");
        window.location.href = "/";
        return;
      }

      try {
        console.log("Fetching users with token:", token);
        const response = await fetch("http://localhost:4400/api/Utilisateur", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Erreur lors de la récupération des utilisateurs:", errorData);
          setError(errorData.Message || `Erreur de récupération des utilisateurs (Status: ${response.status})`);
          return;
        }

        const data = await response.json();
        console.log("Raw API response:", data);
        const mappedUsers = data.map((user: any) => ({
          user_id: user.user_id || user.id,
          email: user.email,
          nom: user.nom,
        }));
        console.log("Mapped users:", mappedUsers);
        setUsers(mappedUsers);
      } catch (err) {
        console.error("Erreur de connexion au serveur:", err);
        setError("Erreur de connexion au serveur: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [refresh]);

  const filteredUsers = users.filter((user) =>
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.nom?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdate = async () => {
    if (selectedUser) {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token manquant. Veuillez vous reconnecter.");
        return;
      }

      if (!selectedUser.user_id || !selectedUser.email || !selectedUser.nom) {
        setError("Données invalides: user_id, email ou nom manquant.");
        return;
      }

      try {
        console.log("Sending update request for user_id:", selectedUser.user_id);
        console.log("Request body:", { email: selectedUser.email, nom: selectedUser.nom });
        const response = await fetch(`http://localhost:4400/api/Utilisateur/${selectedUser.user_id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: selectedUser.email, nom: selectedUser.nom }),
        });
        const data = await response.json();
        console.log("Update response:", data);
        if (response.ok) {
          setRefresh(!refresh);
          setSelectedUser(null);
          setError("");
        } else {
          console.error("Erreur lors de la mise à jour:", data);
          setError(data.Message || `Erreur lors de la mise à jour (Status: ${response.status})`);
        }
      } catch (err) {
        console.error("Erreur lors de la requête de mise à jour:", err);
        setError("Erreur lors de la mise à jour: " + err.message);
      }
    }
  };

  const handleDelete = async (userId: string) => {
    if (!userId) {
      setError("ID utilisateur manquant.");
      return;
    }

    if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token manquant. Veuillez vous reconnecter.");
        return;
      }

      try {
        console.log("Sending delete request for user_id:", userId);
        const response = await fetch(`http://localhost:4400/api/Utilisateur/${userId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        console.log("Delete response:", data);
        if (response.ok) {
          setRefresh(!refresh);
          setError("");
        } else {
          console.error("Erreur lors de la suppression:", data);
          setError(data.Message || `Erreur lors de la suppression (Status: ${response.status})`);
        }
      } catch (err) {
        console.error("Erreur lors de la requête de suppression:", err);
        setError("Erreur lors de la suppression: " + err.message);
      }
    }
  };

  console.log("Rendering filteredUsers:", filteredUsers); // Debug rendering issues

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-500 hover:scale-105"
        style={{
          backgroundImage: "url('/2ie-background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div
        className="absolute inset-0 z-10"
        style={{
          background: "linear-gradient(135deg, rgba(0, 48, 135, 0.8) 0%, rgba(0, 48, 135, 0.5) 70%, rgba(255, 215, 0, 0.15) 100%)",
        }}
      />
      <div className="relative z-20 flex flex-col min-h-screen">
        <header className="bg-[#003087] bg-opacity-95 text-white shadow-lg sticky top-0 z-50 border-b border-[#FFD700] backdrop-blur-md">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <img
                src="/logo2ie.png"
                alt="Institut 2iE Logo"
                className="h-16 w-auto transition-transform duration-300 hover:scale-110"
                aria-label="Logo de l'Institut 2iE"
              />
              <span className="text-3xl font-extrabold tracking-wide">
                Institut 2iE
              </span>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link
                href="/register"
                className="bg-[#FFD700] text-[#003087] px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-yellow-400 hover:shadow-[0_0_15px_rgba(255,215,0,0.8)] flex items-center space-x-2"
              >
                <UserPlus className="h-6 w-6" />
                <span>Ajouter un utilisateur</span>
              </Link>
            </nav>
            <button className="md:hidden text-white focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 transition-transform duration-300 hover:rotate-90"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </header>
        <main className="flex-1 container mx-auto px-6 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-extrabold text-white animate-pulse">
                Utilisateurs
              </h1>
            </div>
            <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 p-6 sm:p-10 transform transition-all duration-500 hover:shadow-[0_25px_50px_rgba(0,48,135,0.5)]">
              <div className="relative mb-8">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search size={20} className="text-gray-500" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#003087] focus:border-[#003087] transition-all duration-300 text-black placeholder-gray-400 shadow-md"
                  placeholder="Rechercher par nom ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {loading && (
                <div className="flex justify-center items-center py-20">
                  <Loader2 size={40} className="animate-spin text-[#003087]" />
                  <span className="ml-4 text-xl text-black font-semibold">
                    Chargement des utilisateurs...
                  </span>
                </div>
              )}
              {error && !loading && (
                <div className="bg-red-50 border-l-4 border-red-500 p-5 mb-6 rounded-xl shadow-lg">
                  <div className="flex items-center">
                    <AlertCircle size={24} className="text-red-500 mr-3" />
                    <p className="text-black text-lg font-medium">{error}</p>
                  </div>
                </div>
              )}
              {!loading && !error && filteredUsers.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-black text-xl font-medium">
                    {searchTerm ? "Aucun utilisateur ne correspond à votre recherche." : "Aucun utilisateur trouvé."}
                  </p>
                </div>
              )}
              {!loading && filteredUsers.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-black uppercase tracking-wider">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-[#003087] focus:ring-[#003087] h-5 w-5"
                            />
                          </div>
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-black uppercase tracking-wider">Email</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-black uppercase tracking-wider">Nom</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-black uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredUsers
                        .filter((user) => user.user_id) // Skip users without user_id
                        .map((user, index) => (
                          <tr
                            key={user.user_id || `user-${index}`}
                            className="hover:bg-gray-50 hover:bg-opacity-30 transition duration-300"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-[#003087] focus:ring-[#003087] h-5 w-5"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-black text-lg font-medium">{user.email}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {user.nom ? (
                                <span className="text-black text-lg font-medium">{user.nom}</span>
                              ) : (
                                <span className="text-gray-400 italic text-lg">Non spécifié</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <div className="flex justify-end gap-4">
                                <button
                                  className="text-[#FFD700] hover:text-yellow-400 font-semibold text-base flex items-center space-x-2 transition-all duration-300 transform hover:scale-105"
                                  onClick={() => setSelectedUser(user)}
                                >
                                  <Edit2 size={18} />
                                  <span>Modifier</span>
                                </button>
                                <button
                                  className="text-red-600 hover:text-red-800 font-semibold text-base flex items-center space-x-2 transition-all duration-300 transform hover:scale-105"
                                  onClick={() => handleDelete(user.user_id)}
                                >
                                  <Trash2 size={18} />
                                  <span>Supprimer</span>
                                </button>
                                <button className="text-gray-500 hover:text-black p-2 rounded-full hover:bg-gray-100 hover:bg-opacity-50 transition-all duration-300">
                                  <MoreHorizontal size={20} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-md p-4 mt-6 text-black text-lg font-medium">
              <p>Total : {filteredUsers.length} utilisateur{filteredUsers.length !== 1 ? "s" : ""}</p>
            </div>
            {selectedUser && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                <div className="bg-white bg-opacity-95 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 animate-fadeIn">
                  <h2 className="text-2xl font-extrabold text-[#003087] mb-6">Modifier l'utilisateur</h2>
                  <div className="space-y-6">
                    <input
                      type="text"
                      value={selectedUser.email || ""}
                      onChange={(e) =>
                        setSelectedUser({ ...selectedUser, email: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#003087] focus:border-[#003087] text-black placeholder-gray-400 shadow-sm"
                      placeholder="Email"
                    />
                    <input
                      type="text"
                      value={selectedUser.nom || ""}
                      onChange={(e) =>
                        setSelectedUser({ ...selectedUser, nom: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#003087] focus:border-[#003087] text-black placeholder-gray-400 shadow-sm"
                      placeholder="Nom"
                    />
                  </div>
                  <div className="mt-8 flex justify-end gap-4">
                    <button
                      className="bg-gray-300 text-black px-6 py-2 rounded-xl font-semibold hover:bg-gray-400 transition duration-300"
                      onClick={() => setSelectedUser(null)}
                    >
                      Annuler
                    </button>
                    <button
                      className="bg-[#003087] text-white px-6 py-2 rounded-xl font-semibold hover:bg-[#002060] transition duration-300"
                      onClick={handleUpdate}
                    >
                      Sauvegarder
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
        <footer className="bg-[#003087] bg-opacity-95 text-white py-6 border-t border-[#FFD700] backdrop-blur-md">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-lg font-medium">© 2025 Institut 2iE. Tous droits réservés.</p>
              </div>
              <div className="flex space-x-6">
                <a
                  href="/mentions-legales"
                  className="hover:text-[#FFD700] transition-colors duration-300 text-base font-medium"
                >
                  Mentions légales
                </a>
                <a
                  href="/politique-confidentialite"
                  className="hover:text-[#FFD700] transition-colors duration-300 text-base font-medium"
                >
                  Politique de confidentialité
                </a>
                <a
                  href="/contact"
                  className="hover:text-[#FFD700] transition-colors duration-300 text-base font-medium"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}