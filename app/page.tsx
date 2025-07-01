"use client";

import React from "react";
import Link from "next/link";

export default function App() {
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

            {/* Navigation */}
            <nav className="flex space-x-6">
              <Link
                href="/login"
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
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                Se connecter
              </Link>
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
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-20 px-6">
            <div className="container mx-auto text-center">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                Bibliothèque Numérique
                <span className="block text-[#FFD700] text-4xl md:text-5xl mt-4">Institut 2iE</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
                Plongez dans un univers de connaissances où chaque livre ouvre une porte vers de nouvelles perspectives. 
                Notre bibliothèque numérique vous offre un accès privilégié à des milliers d'ouvrages, 
                de la littérature classique aux dernières innovations technologiques.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/register"
                  className="bg-[#FFD700] text-[#003087] px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Commencer l'aventure
                </Link>
                <Link
                  href="/login"
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#003087] transition-all duration-300 transform hover:scale-105"
                >
                  Accéder à mon compte
                </Link>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 px-6 bg-white/10 backdrop-blur-sm">
            <div className="container mx-auto">
              <h2 className="text-4xl font-bold text-white text-center mb-16">
                Pourquoi choisir notre bibliothèque ?
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white/95 glass lift rounded-2xl p-8 shadow-xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
                  <div className="text-center">
                    <div className="bg-[#003087] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Catalogue Exhaustif</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Explorez notre collection riche et variée comprenant des milliers d'ouvrages dans tous les domaines : 
                      littérature, sciences, technologie, arts, histoire et bien plus encore. 
                      Chaque livre est soigneusement sélectionné pour enrichir votre parcours d'apprentissage.
                    </p>
                  </div>
                </div>

                <div className="bg-white/95 glass lift rounded-2xl p-8 shadow-xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
                  <div className="text-center">
                    <div className="bg-[#003087] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Emprunts Instantanés</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Empruntez vos livres en quelques clics, sans file d'attente ni contraintes horaires. 
                      Notre système intelligent vous permet de gérer vos emprunts en toute simplicité, 
                      avec des rappels automatiques et un suivi en temps réel de vos prêts.
                    </p>
                  </div>
                </div>

                <div className="bg-white/95 glass lift rounded-2xl p-8 shadow-xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
                  <div className="text-center">
                    <div className="bg-[#003087] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Expérience Personnalisée</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Profitez d'une expérience sur mesure avec des recommandations intelligentes, 
                      un historique de vos lectures et des fonctionnalités avancées de recherche. 
                      Votre bibliothèque s'adapte à vos goûts et à vos besoins.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Statistics Section */}
          <section className="py-16 px-6">
            <div className="container mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
                  <div className="text-4xl font-bold text-[#FFD700] mb-2">1000+</div>
                  <div className="text-white font-semibold">Livres Disponibles</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
                  <div className="text-4xl font-bold text-[#FFD700] mb-2">50+</div>
                  <div className="text-white font-semibold">Catégories</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
                  <div className="text-4xl font-bold text-[#FFD700] mb-2">24/7</div>
                  <div className="text-white font-semibold">Accès Disponible</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
                  <div className="text-4xl font-bold text-[#FFD700] mb-2">100%</div>
                  <div className="text-white font-semibold">Gratuit</div>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="py-20 px-6 bg-[#003087]/90">
            <div className="container mx-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-8">
                Prêt à commencer votre voyage littéraire ?
              </h2>
              <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
                Rejoignez notre communauté de lecteurs passionnés et découvrez un monde de connaissances 
                qui n'attend que vous. L'inscription est gratuite et ne prend que quelques minutes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/register"
                  className="bg-[#FFD700] text-[#003087] px-10 py-4 rounded-lg font-bold text-xl hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                  Créer mon compte gratuitement
                </Link>
                <Link
                  href="/login"
                  className="bg-transparent border-2 border-[#FFD700] text-[#FFD700] px-10 py-4 rounded-lg font-bold text-xl hover:bg-[#FFD700] hover:text-[#003087] transition-all duration-300 transform hover:scale-105"
                >
                  J'ai déjà un compte
                </Link>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="footer-premium text-white py-12">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src="/logo2ie.png"
                    alt="Institut 2iE Logo"
                    className="h-12 w-auto"
                  />
                  <div>
                    <h3 className="text-lg font-bold">Institut 2iE</h3>
                    <p className="text-sm text-blue-200">Bibliothèque Numérique</p>
                  </div>
                </div>
                <p className="text-blue-200 text-sm">
                  Votre partenaire de confiance pour l'accès au savoir et à la culture.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Liens Rapides</h4>
                <ul className="space-y-2 text-blue-200">
                  <li><Link href="/login" className="hover:text-[#FFD700] transition-colors">Connexion</Link></li>
                  <li><Link href="/register" className="hover:text-[#FFD700] transition-colors">Inscription</Link></li>
                  <li><Link href="/livres" className="hover:text-[#FFD700] transition-colors">Catalogue</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Contact</h4>
                <div className="text-blue-200 text-sm space-y-2">
                  <p>📍 Ouagadougou, Burkina Faso</p>
                  <p>📧 bibliotheque@2ie-edu.org</p>
                  <p>📞 +226 25 49 23 00</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-blue-600 mt-8 pt-8 text-center">
              <p className="text-blue-200 text-sm">
                © 2024 Institut 2iE - Bibliothèque Numérique. Tous droits réservés.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
} 