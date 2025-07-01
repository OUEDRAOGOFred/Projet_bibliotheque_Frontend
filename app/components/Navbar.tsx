"use client";
import Link from 'next/link';
import styles from './Navbar.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const updateAuth = () => {
      if (typeof window !== 'undefined') {
        setIsAuthenticated(!!localStorage.getItem('token'));
        setUserRole(localStorage.getItem('userRole'));
      }
    };
    updateAuth();
    window.addEventListener('storage', updateAuth);
    return () => {
      window.removeEventListener('storage', updateAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUserRole(null);
    router.push('/login');
    window.location.reload();
  };

  if (isAuthenticated === null || userRole === null) {
    return null;
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <img src="/logo2ie.png" alt="Logo 2iE" height={40} />
        </Link>
        <span className={styles.brand}>2iE Bibliothèque</span>
      </div>
      <ul className={styles.menu}>
        <li><Link href="/">Accueil</Link></li>
        {!isAuthenticated && (
          <>
            <li><Link href="/register">Inscription</Link></li>
            <li><Link href="/login">Connexion</Link></li>
          </>
        )}
        {isAuthenticated && (
          <>
            {userRole === 'admin' && (
              <li>
                <Link href="/admin" className="font-semibold">Tableau de bord</Link>
              </li>
            )}
            <li><Link href="/livres">Livres</Link></li>
            <li>
              <Link href="/user-profile">
                <span style={{display:'flex',alignItems:'center'}}>
                  <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{marginRight:4}}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Mon Profil
                </span>
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} style={{background:'none',border:'none',color:'#003087',cursor:'pointer',fontWeight:'bold',padding:'0.5em 1em'}}>Déconnexion</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
} 