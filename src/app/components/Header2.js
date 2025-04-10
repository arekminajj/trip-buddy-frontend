'use client';

import Link from 'next/link';
import { MapPinned, UserCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Header2() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    setIsLoggedIn(false);
    router.push('/');
  };

  const buttonStyle = {
    backgroundColor: "#fff",
    padding: "8px 16px",
    borderRadius: "9999px",
    border: "1px solid #ddd",
    textDecoration: "none",
    fontWeight: "bold",
    color: "#333",
    transition: "all 0.3s ease",
  };

  return (
    <header style={{
      position: "relative",
      height: "70px",
      backgroundColor: "#139c8a",
      borderBottom: "1px solid #ccc",
      padding: "0 20px",
    }}>
      {/* Logo */}
      <div style={{
        position: "absolute",
        left: "20px",
        top: "50%",
        transform: "translateY(-50%)",
      }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{
            fontWeight: "bold",
            fontSize: "30px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "white",
            cursor: "pointer"
          }}>
            <MapPinned size={30} color="white" />
            TripBuddy
          </div>
        </Link>
      </div>

      {/* Główne przyciski */}
      <div style={{
        position: "absolute",
        left: "300px",
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        gap: "20px",
      }}>
        <Link href="/browse" style={buttonStyle}>Przeglądaj podróże</Link>
        <Link href="/add" style={buttonStyle}>Dodaj ogłoszenie</Link>
        <Link href="/my-trips" style={buttonStyle}>Moje podróże</Link>
      </div>

      {/* Ikona konta i rozwijane menu */}
      <div style={{
        position: "absolute",
        right: "20px",
        top: "50%",
        transform: "translateY(-50%)",
      }}>
        {isLoggedIn ? (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowMenu(prev => !prev)}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {/* Możliwość podmiany na <img src="ścieżka/do/avatar.jpg" /> */}
              <UserCircle size={36} color="white" />
            </button>

            {showMenu && (
              <div style={{
                position: 'absolute',
                top: '45px',
                right: '0',
                backgroundColor: 'white',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '10px',
                minWidth: '150px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                zIndex: 10,
              }}>
                <Link href="/account" style={{
                  display: 'block',
                  padding: '8px',
                  color: '#333',
                  textDecoration: 'none'
                }}>
                  Moje konto
                </Link>
                <button
                  onClick={handleLogout}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '8px',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    color: '#333',
                    cursor: 'pointer'
                  }}
                >
                  Wyloguj się
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link href="/login" style={buttonStyle}>Zaloguj się</Link>
        )}
      </div>
    </header>
  );
}
