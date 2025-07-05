"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:4400/userlogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.token) {
        setMessage(`Bienvenue ${data.email}`);
        localStorage.setItem("token", data.token);
        router.push("/userlist");
      } else {
        setMessage(data.message || "Échec de la connexion");
      }
    } catch (error) {
      setMessage("Une erreur s'est produite lors de la connexion");
    } finally {
      setIsLoading(false);
    }
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
      <div className="relative z-20 flex flex-col min-h-screen">
        {/* Header with refined styling */}
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

            {/* Desktop navigation */}
            <nav className="hidden md:flex space-x-8">
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

            {/* Mobile menu button */}
            <button
              className="md:hidden text-white p-2 rounded-md hover:bg-[#00256e] transition-colors duration-300"
              aria-label="Toggle mobile menu"
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 container mx-auto px-6 py-16 flex justify-center items-center">
          {/* Card container */}
          <div className="w-full max-w-md">
            <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-2xl">
              {/* Card header */}
              <div className="bg-[#003087] p-6 text-center relative">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#FFD700] rounded-bl-full opacity-30"></div>
                <h1 className="text-2xl font-bold text-white mb-1">Bienvenue</h1>
                <p className="text-blue-200 text-sm">Connectez-vous à votre espace vacataire</p>
              </div>

              <div className="p-6">
                {message && (
                  <div
                    className={`mb-4 p-3 ${
                      message.startsWith("Bienvenue")
                        ? "bg-green-50 border-l-4 border-green-500"
                        : "bg-red-50 border-l-4 border-red-500"
                    } rounded-md shadow-md transition-opacity duration-300`}
                  >
                    <div className="flex items-center">
                      {message.startsWith("Bienvenue") ? (
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
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
                      )}
                      <p className="text-sm">{message}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5" aria-label="Formulaire de connexion">
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <label
                        htmlFor="email"
                        className="block text-base font-semibold text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="votre.email@exemple.com"
                        className="border-gray-300 focus:border-[#003087] focus:ring focus:ring-[#003087] focus:ring-opacity-20 rounded-md w-full py-2 px-3 bg-gray-50 text-black placeholder-gray-500"
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <label
                          htmlFor="password"
                          className="block text-base font-semibold text-gray-700"
                        >
                          Mot de passe
                        </label>
                        <Link
                          href="/forgot-password"
                          className="text-sm text-[#003087] font-medium hover:text-[#FFD700] transition-colors duration-300"
                        >
                          Mot de passe oublié?
                        </Link>
                      </div>
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="border-gray-300 focus:border-[#003087] focus:ring focus:ring-[#003087] focus:ring-opacity-20 rounded-md w-full py-2 px-3 bg-gray-50 text-black placeholder-gray-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-[#003087] focus:ring-[#003087] border-gray-200 rounded"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 text-gray-700"
                      >
                        Se souvenir de moi
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#003087] text-white py-2.5 rounded-md font-medium transition-all duration-300 hover:bg-[#00256e] hover:shadow-md flex justify-center items-center space-x-2"
                  >
                    {isLoading ? (
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
                        Connexion en cours...
                      </>
                    ) : (
                      "Se connecter"
                    )}
                  </button>
                </form>

                {/* Registration link */}
                <div className="mt-6 text-center text-sm">
                  <p className="text-gray-600">
                    Pas encore de compte ?{" "}
                    <Link
                      href="/register"
                      className="text-[#003087] font-medium hover:text-[#FFD700] transition-colors duration-300"
                    >
                      Inscrivez-vous
                    </Link>
                  </p>
                </div>

                {/* Social media links */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-center space-x-4">
                    <a
                      href="https://www.2ie-edu.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-[#003087] transition-colors duration-300"
                    >
                      <span className="sr-only">Site officiel</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-gray-500 hover:text-[#003087] transition-colors duration-300"
                    >
                      <span className="sr-only">Facebook</span>
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-gray-500 hover:text-[#003087] transition-colors duration-300"
                    >
                      <span className="sr-only">LinkedIn</span>
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 01-1.548-1.549 1.548 1.548 0 111.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer with refined styling */}
        <footer className="bg-[#002060] text-white py-6 border-t border-[#FFD700] mt-auto">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
                <div className="flex items-center mb-2">
                  <img src="/logo2ie.png" alt="Institut 2iE Logo" className="h-8 w-auto mr-2" />
                  <span className="text-base font-semibold">Institut 2iE</span>
                </div>
                <p className="text-xs text-gray-300">© 2025 Institut 2iE. Tous droits réservés.</p>
              </div>
              <div className="flex space-x-6 text-sm">
                <a
                  href="/mentions-legales"
                  className="hover:text-[#FFD700] transition-colors duration-300"
                >
                  Mentions légales
                </a>
                <a
                  href="/politique-confidentialite"
                  className="hover:text-[#FFD700] transition-colors duration-300"
                >
                  Confidentialité
                </a>
                <a
                  href="/contact"
                  className="hover:text-[#FFD700] transition-colors duration-300"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </footer>

        {/* Screen reader content */}
        <div id="error-description" className="sr-only">
          Une erreur s'est produite lors de la connexion. Vérifiez vos identifiants ou réessayez.
        </div>
      </div>
    </div>
  );
} 