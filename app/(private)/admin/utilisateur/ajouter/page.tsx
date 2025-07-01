"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const initialState = {
  nom: "",
  prenom: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "etudiant",
};

export default function AjouterUtilisateur() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<any>({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Validation avancée
  const validate = () => {
    const errs: any = {};
    if (!form.nom.trim()) errs.nom = "Le nom est requis.";
    if (!form.prenom.trim()) errs.prenom = "Le prénom est requis.";
    if (!form.email.match(/^\S+@\S+\.\S+$/)) errs.email = "Email invalide.";
    if (form.password.length < 8) errs.password = "Mot de passe trop court (min 8 caractères).";
    if (!/[A-Z]/.test(form.password)) errs.password = "Le mot de passe doit contenir une majuscule.";
    if (!/[0-9]/.test(form.password)) errs.password = "Le mot de passe doit contenir un chiffre.";
    if (!/[^A-Za-z0-9]/.test(form.password)) errs.password = "Le mot de passe doit contenir un caractère spécial.";
    if (form.password !== form.confirmPassword) errs.confirmPassword = "Les mots de passe ne correspondent pas.";
    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch("http://localhost:4400/admin/utilisateurs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          nom: form.nom,
          prenom: form.prenom,
          email: form.email,
          password: form.password,
          role: form.role,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setErrors({ api: data.message || "Erreur lors de la création." });
      } else {
        setSuccess("Utilisateur créé avec succès !");
        setForm(initialState);
        setTimeout(() => router.push("/admin/userlist"), 1500);
      }
    } catch (err) {
      setErrors({ api: "Erreur réseau." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eaf0fa] to-[#c3cfe2] flex items-center justify-center py-12 px-2">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-4 animate-fadeIn">
        <h1 className="text-3xl font-bold text-[#003087] mb-4 text-center">Ajouter un utilisateur</h1>
        {errors.api && <div className="bg-red-100 text-red-700 p-2 rounded mb-2 text-center">{errors.api}</div>}
        {success && <div className="bg-green-100 text-green-700 p-2 rounded mb-2 text-center">{success}</div>}
        <div>
          <label className="block font-semibold mb-1">Nom</label>
          <input name="nom" value={form.nom} onChange={handleChange} className={`w-full px-3 py-2 rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#003087] ${errors.nom ? 'border-red-500' : ''}`} />
          {errors.nom && <div className="text-red-500 text-xs mt-1">{errors.nom}</div>}
        </div>
        <div>
          <label className="block font-semibold mb-1">Prénom</label>
          <input name="prenom" value={form.prenom} onChange={handleChange} className={`w-full px-3 py-2 rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#003087] ${errors.prenom ? 'border-red-500' : ''}`} />
          {errors.prenom && <div className="text-red-500 text-xs mt-1">{errors.prenom}</div>}
        </div>
        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} className={`w-full px-3 py-2 rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#003087] ${errors.email ? 'border-red-500' : ''}`} />
          {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
        </div>
        <div>
          <label className="block font-semibold mb-1">Mot de passe</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} className={`w-full px-3 py-2 rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#003087] ${errors.password ? 'border-red-500' : ''}`} />
          {errors.password && <div className="text-red-500 text-xs mt-1">{errors.password}</div>}
        </div>
        <div>
          <label className="block font-semibold mb-1">Confirmation</label>
          <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} className={`w-full px-3 py-2 rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#003087] ${errors.confirmPassword ? 'border-red-500' : ''}`} />
          {errors.confirmPassword && <div className="text-red-500 text-xs mt-1">{errors.confirmPassword}</div>}
        </div>
        <div>
          <label className="block font-semibold mb-1">Rôle</label>
          <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold text-sm uppercase tracking-wide">ÉTUDIANT</span>
        </div>
        <button type="submit" className="btn btn-primary mt-4 w-full bg-[#003087] hover:bg-[#00256e] text-white font-bold py-3 rounded-lg shadow transition-all text-lg" disabled={loading}>{loading ? "Création..." : "Créer l'utilisateur"}</button>
      </form>
    </div>
  );
} 