"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { APP_TEXTS } from '../constants/texts';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', motDePasse: '' });

  const validate = () => {
    let valid = true;
    let errs = { email: '', motDePasse: '' };
    if (!email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
      errs.email = "L'email est invalide";
      valid = false;
    }
    if (!motDePasse) {
      errs.motDePasse = 'Le mot de passe est obligatoire';
      valid = false;
    }
    setErrors(errs);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErreur('');
    if (!validate()) return;
    setLoading(true);
    
    try {
      const res = await fetch('http://localhost:4400/userlogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, mot_de_passe: motDePasse })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        // Stocker le token JWT et les informations utilisateur
        localStorage.setItem('token', data.token);
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('userRole', data.role || 'user');
        
        // Redirection selon le rôle
        if (data.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/livres');
        }
      } else {
        setErreur(data.message || 'Erreur de connexion');
      }
    } catch (err) {
      setErreur('Erreur serveur - Vérifiez que le serveur backend est démarré');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100" style={{ position: "relative", isolation: "isolate" }}>
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/2ie-background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Overlay with refined gradient */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: "linear-gradient(135deg, rgba(0,48,135,0.85) 0%, rgba(0,48,135,0.65) 50%, rgba(0,48,135,0.75) 100%)",
        }}
      />

      {/* Content container */}
      <div className="relative z-20 flex flex-col min-h-screen animate-fadeIn">
        {/* Header */}
        <header className="bg-[#003087] text-white shadow-lg sticky top-0 z-50 border-b border-[#FFD700]">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src="/logo2ie.png"
                alt="Institut 2iE Logo"
                className="h-14 w-auto transition-transform duration-300 hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="text-xl font-semibold tracking-tight">Institut 2iE</span>
                <span className="text-xs text-[#FFD700] font-medium tracking-wider">EXCELLENCE • INNOVATION • LEADERSHIP</span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex space-x-4">
              <Link
                href="/register"
                className="text-sm font-medium hover:text-[#FFD700] transition-colors duration-300 flex items-center border-b-2 border-transparent hover:border-[#FFD700] py-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
                S'inscrire
              </Link>
            </nav>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 container mx-auto px-6 py-16 flex justify-center items-center">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-2xl">
              {/* Card header */}
              <div className="bg-[#003087] p-6 text-center relative">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#FFD700] rounded-bl-full opacity-30"></div>
                <h1 className="text-2xl font-bold text-white mb-1">{APP_TEXTS.LOGIN_TITLE}</h1>
                <p className="text-blue-200 text-sm">{APP_TEXTS.LOGIN_SUBTITLE}</p>
              </div>

              <div className="p-6">
                {erreur && (
                  <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-md shadow-md transition-opacity duration-300">
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 text-red-500 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-sm text-red-700">{erreur}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5" aria-label="Formulaire de connexion">
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <label
                        htmlFor="email"
                        className="block text-base font-semibold text-gray-700"
                      >
                        {APP_TEXTS.FORMS.EMAIL}
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={APP_TEXTS.FORMS.EMAIL_PLACEHOLDER}
                        className="border-gray-300 focus:border-[#003087] focus:ring focus:ring-[#003087] focus:ring-opacity-20 rounded-md w-full py-2 px-3 bg-gray-50 text-black placeholder-gray-500"
                        required
                      />
                      {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div className="space-y-3">
                      <label
                        htmlFor="password"
                        className="block text-base font-semibold text-gray-700"
                      >
                        {APP_TEXTS.FORMS.PASSWORD}
                      </label>
                      <input
                        id="password"
                        type="password"
                        value={motDePasse}
                        onChange={(e) => setMotDePasse(e.target.value)}
                        placeholder={APP_TEXTS.FORMS.PASSWORD_PLACEHOLDER}
                        className="border-gray-300 focus:border-[#003087] focus:ring focus:ring-[#003087] focus:ring-opacity-20 rounded-md w-full py-2 px-3 bg-gray-50 text-black placeholder-gray-500"
                        required
                      />
                      {errors.motDePasse && <p className="text-red-600 text-xs mt-1">{errors.motDePasse}</p>}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#003087] text-white py-3 px-4 rounded-md font-semibold hover:bg-[#00256e] focus:outline-none focus:ring-2 focus:ring-[#003087] focus:ring-opacity-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        {APP_TEXTS.FORMS.LOGIN_LOADING}
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                          />
                        </svg>
                        {APP_TEXTS.FORMS.LOGIN_BUTTON}
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    {APP_TEXTS.FORMS.NO_ACCOUNT}{" "}
                    <Link
                      href="/register"
                      className="text-[#003087] hover:text-[#00256e] font-semibold transition-colors duration-300"
                    >
                      {APP_TEXTS.FORMS.REGISTER_LINK}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-[#003087] text-white py-8 mt-16">
          <div className="container mx-auto px-6 text-center">
            <p className="text-sm text-blue-200">
              {APP_TEXTS.FOOTER.COPYRIGHT}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
} 