"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Import Poppins font (add this to your _app.js or via CDN in HTML)
import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

function Register() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData = { nom, prenom, email, password, telephone };

    const response = await fetch("http://localhost:4400/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (data.Error) {
      setMessage(data.Message || "Erreur lors de l'inscription");
    } else {
      setMessage(data.Message);
      console.log("Inscription réussie pour:", email);
      router.push("/");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ position: "relative", isolation: "isolate" }}
    >
      {/* Background with parallax and particle effect */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
        style={{
          backgroundImage: "url('/2ie-background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          opacity: 0.9,
        }}
      >
        {/* Simulated particle animation */}
        <div className="absolute inset-0 z-[-1]">
          {[...Array(20)].map((_, i) => (
            <span
              key={i}
              className="absolute w-1 h-1 bg-[#FFD700] rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Overlay with elegant gradient */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: "linear-gradient(135deg, rgba(0, 48, 135, 0.75) 0%, rgba(0, 48, 135, 0.45) 70%, rgba(255, 215, 0, 0.15) 100%)",
        }}
      />

      {/* Content container with glassmorphism effect */}
      <div className="relative z-20 flex flex-col min-h-screen">
        {/* Header with enhanced styling */}
        <header
          className="bg-[#003087] bg-opacity-95 text-white shadow-lg sticky top-0 z-50 border-b border-[#FFD700] backdrop-blur-md transition-all duration-300"
        >
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <img
                src="/logo2ie.png"
                alt="Institut 2iE Logo"
                className="h-16 w-auto transition-transform duration-300 hover:scale-110"
                aria-label="Logo de l'Institut 2iE"
              />
              <span
                className={`${poppins.className} text-3xl font-extrabold tracking-wide text-white`}
              >
                Institut 2iE
              </span>
            </div>

            {/* Desktop navigation with glowing effect */}
            <nav className="hidden md:flex space-x-6">
              <Link
                href="/"
                className="bg-[#FFD700] text-[#003087] px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-yellow-400 hover:shadow-[0_0_20px_rgba(255,215,0,0.8)] flex items-center space-x-2 transform hover:-translate-y-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span>Connexion</span>
              </Link>
            </nav>

            {/* Mobile menu button with animation */}
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

        {/* Main content with centered card */}
        <main className="flex-1 container mx-auto px-6 py-12 flex justify-center items-center">
          <div className="w-full max-w-md">
            <div
              className="bg-white bg-opacity-90 backdrop-blur-md p-10 rounded-2xl shadow-2xl border border-gray-100 transform transition-all duration-500 hover:shadow-[0_25px_60px_rgba(0,48,135,0.5)] hover:scale-102 animate-fadeIn"
            >
              <div className="text-center mb-10">
                <h1
                  className={`${poppins.className} text-4xl font-extrabold text-[#003087] mb-4 animate-pulse`}
                >
                  S'inscrire
                </h1>
                <p
                  className={`${poppins.className} text-lg text-black font-medium`}
                >
                  Rejoignez l'espace vacataires de l'Institut 2iE
                </p>
              </div>

              {message && (
                <div
                  className={`mb-6 p-4 rounded-xl ${
                    message.includes("Erreur")
                      ? "bg-red-100 border-l-4 border-red-500"
                      : "bg-green-100 border-l-4 border-green-500"
                  } shadow-md transition-opacity duration-300 animate-fadeIn`}
                >
                  <p className="text-center font-semibold">{message}</p>
                </div>
              )}

              <form
                onSubmit={handleRegister}
                className="space-y-8"
                aria-label="Formulaire d'inscription"
              >
                <div className="space-y-3">
                  <label
                    htmlFor="nom"
                    className={`${poppins.className} block text-base font-semibold text-black`}
                  >
                    Nom
                  </label>
                  <input
                    id="nom"
                    type="text"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    placeholder="Votre nom"
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#003087] focus:border-[#003087] transition-all duration-300 text-black placeholder-gray-400 bg-white bg-opacity-90 hover:bg-opacity-95 focus:shadow-[0_0_10px_rgba(0,48,135,0.3)]"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <label
                    htmlFor="prenom"
                    className={`${poppins.className} block text-base font-semibold text-black`}
                  >
                    Prénom
                  </label>
                  <input
                    id="prenom"
                    type="text"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    placeholder="Votre prénom"
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#003087] focus:border-[#003087] transition-all duration-300 text-black placeholder-gray-400 bg-white bg-opacity-90 hover:bg-opacity-95 focus:shadow-[0_0_10px_rgba(0,48,135,0.3)]"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <label
                    htmlFor="email"
                    className={`${poppins.className} block text-base font-semibold text-black`}
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre.email@exemple.com"
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#003087] focus:border-[#003087] transition-all duration-300 text-black placeholder-gray-400 bg-white bg-opacity-90 hover:bg-opacity-95 focus:shadow-[0_0_10px_rgba(0,48,135,0.3)]"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <label
                    htmlFor="password"
                    className={`${poppins.className} block text-base font-semibold text-black`}
                  >
                    Mot de passe
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#003087] focus:border-[#003087] transition-all duration-300 text-black placeholder-gray-400 bg-white bg-opacity-90 hover:bg-opacity-95 focus:shadow-[0_0_10px_rgba(0,48,135,0.3)]"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <label
                    htmlFor="telephone"
                    className={`${poppins.className} block text-base font-semibold text-black`}
                  >
                    Téléphone
                  </label>
                  <input
                    id="telephone"
                    type="tel"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    placeholder="+226 73514491"
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#003087] focus:border-[#003087] transition-all duration-300 text-black placeholder-gray-400 bg-white bg-opacity-90 hover:bg-opacity-95 focus:shadow-[0_0_10px_rgba(0,48,135,0.3)]"
                    required
                  />
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#003087] to-[#002060] hover:from-[#002060] hover:to-[#001830] text-white py-3 px-8 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-2xl flex justify-center items-center space-x-2 transform hover:-translate-y-1 animate-pulse-slow"
                  >
                    S'inscrire
                  </button>
                </div>
              </form>

              <div className="mt-10 text-center">
                <p
                  className={`${poppins.className} text-black`}
                >
                  Vous avez déjà un compte ?{" "}
                  <Link
                    href="/"
                    className="text-[#FFD700] font-bold hover:text-yellow-400 transition-colors duration-300"
                  >
                    Connectez-vous
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer with refined styling */}
        <footer className="bg-[#003087] bg-opacity-95 text-white py-6 border-t border-[#FFD700] backdrop-blur-md">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p
                  className={`${poppins.className} text-lg font-medium`}
                >
                  © 2025 Institut 2iE. Tous droits réservés.
                </p>
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

// Custom CSS for animations
const styles = `
  @keyframes float {
    0% { transform: translateY(0) scale(1); opacity: 0.5; }
    50% { transform: translateY(-20px) scale(1.2); opacity: 1; }
    100% { transform: translateY(0) scale(1); opacity: 0.5; }
  }
  .animate-float {
    animation: float 5s infinite ease-in-out;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.6s ease-out;
  }
  @keyframes pulseSlow {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
  }
  .animate-pulse-slow {
    animation: pulseSlow 2s infinite;
  }
`;

// Inject CSS into the document
if (typeof window !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default Register;