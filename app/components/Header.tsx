"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { APP_TEXTS } from '../constants/texts';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showUserInfo?: boolean;
  userEmail?: string;
  userRole?: string;
  showNavigation?: boolean;
}

export default function Header({ 
  title = APP_TEXTS.APP_NAME,
  subtitle = APP_TEXTS.INSTITUTE_NAME,
  showUserInfo = false,
  userEmail = '',
  userRole = '',
  showNavigation = true
}: HeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    router.push('/');
  };

  return (
    <header className="bg-[#003087] text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="/logo2ie.png"
              alt="Institut 2iE Logo"
              className="h-12 w-auto"
            />
            <div>
              <h1 className="text-2xl font-bold">{title}</h1>
              <p className="text-blue-200 text-sm">{subtitle}</p>
            </div>
          </div>
          
          {showNavigation && (
            <div className="flex items-center space-x-4">
              {showUserInfo && userEmail && (
                <span className="text-blue-200">
                  {userRole === 'admin' ? `Admin: ${userEmail}` : userEmail}
                </span>
              )}
              <nav className="flex space-x-4">
                <Link
                  href="/livres"
                  className="text-white hover:text-[#FFD700] transition-colors duration-300"
                >
                  {APP_TEXTS.NAVIGATION.CATALOG}
                </Link>
                <Link
                  href="/user-profile"
                  className="flex items-center text-white hover:text-[#FFD700] transition-colors duration-300 font-semibold"
                >
                  <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Mon Profil
                </Link>
                {userRole === 'admin' ? (
                  <Link
                    href="/admin"
                    className="text-white hover:text-[#FFD700] transition-colors duration-300"
                  >
                    {APP_TEXTS.NAVIGATION.ADMIN_DASHBOARD}
                  </Link>
                ) : (
                  <Link
                    href="/dashboard"
                    className="text-white hover:text-[#FFD700] transition-colors duration-300"
                  >
                    {APP_TEXTS.NAVIGATION.DASHBOARD}
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-[#FFD700] transition-colors duration-300"
                >
                  {APP_TEXTS.NAVIGATION.LOGOUT}
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
} 