'use client';

import { useEffect, useState } from 'react';
import Header from './Header';
import Header2 from './Header2';
import { usePathname } from 'next/navigation';

export default function HeaderWrapper() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname(); // Pobieramy aktualną ścieżkę

  useEffect(() => {
    // Funkcja sprawdzająca status logowania
    const checkAuthStatus = () => {
      const status = localStorage.getItem('loggedIn');
      setIsLoggedIn(status === 'true');
    };

    // Sprawdzamy status przy montowaniu komponentu
    checkAuthStatus();

    // Dodajemy event listener dla zmian w localStorage
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Dodajemy nasłuchiwanie na zmiany trasy
    // (dla przypadków gdy logowanie następuje w tej samej sesji)
    const interval = setInterval(checkAuthStatus, 500); // Sprawdzaj co 500ms

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [pathname]); // Zależność od ścieżki

  return isLoggedIn ? <Header2 /> : <Header />;
}