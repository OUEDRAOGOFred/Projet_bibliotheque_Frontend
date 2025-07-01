"use client";

import React, { useState } from "react";

export default function AdminAddUser() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [role, setRole] = useState("etudiant");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({ nom: '', prenom: '', email: '', motDePasse: '', role: '' });
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let valid = true;
    let errs = { nom: '', prenom: '', email: '', motDePasse: '', role: '' };
    if (!nom.trim()) { errs.nom = 'Le nom est obligatoire'; valid = false; }
    if (!prenom.trim()) { errs.prenom = 'Le prénom est obligatoire'; valid = false; }
    if (!email.match(/^[^@]+@[^@]+\.[^@]+$/)) { errs.email = "L'email est invalide"; valid = false; }
    if (motDePasse.length < 6) { errs.motDePasse = 'Le mot de passe doit faire au moins 6 caractères'; valid = false; }
    if (!['etudiant', 'admin'].includes(role)) { errs.role = 'Rôle invalide'; valid = false; }
    setErrors(errs);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    if (!validate()) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch("http://localhost:4400/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ nom, prenom, email, mot_de_passe: motDePasse, role })
      });
      const data = await res.json();
      if (res.ok && !data.Error) {
        setMessage("Utilisateur ajouté avec succès !");
        setNom(""); setPrenom(""); setEmail(""); setMotDePasse(""); setRole("etudiant");
      } else {
        setMessage(data.Message || "Erreur lors de l'ajout");
      }
    } catch (err) {
      setMessage("Erreur serveur");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eaf0fa] to-[#c3cfe2] py-12 px-2">
      <div className="w-full max-w-md glass lift rounded-2xl shadow-2xl p-8 animate-fadeIn">
        <h1 className="text-2xl font-bold text-[#003087] mb-6 text-center">Ajouter un utilisateur</h1>
        {message && (
          <div className={`mb-4 p-3 rounded ${message.includes('succès') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{message}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold mb-1">Nom</label>
            <input type="text" value={nom} onChange={e => setNom(e.target.value)} className="w-full px-4 py-2 border rounded" />
            {errors.nom && <p className="text-red-600 text-xs mt-1">{errors.nom}</p>}
          </div>
          <div>
            <label className="block font-semibold mb-1">Prénom</label>
            <input type="text" value={prenom} onChange={e => setPrenom(e.target.value)} className="w-full px-4 py-2 border rounded" />
            {errors.prenom && <p className="text-red-600 text-xs mt-1">{errors.prenom}</p>}
          </div>
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded" />
            {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block font-semibold mb-1">Mot de passe</label>
            <input type="password" value={motDePasse} onChange={e => setMotDePasse(e.target.value)} className="w-full px-4 py-2 border rounded" />
            {errors.motDePasse && <p className="text-red-600 text-xs mt-1">{errors.motDePasse}</p>}
          </div>
          <div>
            <label className="block font-semibold mb-1">Rôle</label>
            <select value={role} onChange={e => setRole(e.target.value)} className="w-full px-4 py-2 border rounded">
              <option value="etudiant">Étudiant</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && <p className="text-red-600 text-xs mt-1">{errors.role}</p>}
          </div>
          <button type="submit" disabled={loading} className="w-full bg-[#003087] text-white py-3 rounded font-bold hover:bg-[#00256e] transition-all disabled:opacity-50">{loading ? 'Ajout...' : 'Ajouter'}</button>
        </form>
      </div>
    </div>
  );
} 