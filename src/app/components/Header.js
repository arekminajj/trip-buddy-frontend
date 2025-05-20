"use client";

import Link from "next/link";
import { MapPinned, UserCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  const menuTimeoutRef = useRef(null);
  const isLoggedIn = !!session;

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

  useEffect(() => {
    if (showMenu) {
      menuTimeoutRef.current = setTimeout(() => {
        setShowMenu(false);
      }, 4000);
    }

    return () => clearTimeout(menuTimeoutRef.current);
  }, [showMenu]);

  return (
    <>
      <style jsx>{`
        .user-menu {
          position: absolute;
          top: 45px;
          right: -3px;
          background-color: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 10px;
          min-width: 150px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          z-index: 10;
        }

        .user-menu::before {
          content: "";
          position: absolute;
          top: -10px;
          right: 12px;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-bottom: 10px solid white;
        }
      `}</style>

      <header
        style={{
          position: "relative",
          height: "70px",
          backgroundColor: "#139c8a",
          borderBottom: "1px solid #ccc",
          padding: "0 20px",
        }}
      >
        {/* Logo */}
        <div
          style={{
            position: "absolute",
            left: "20px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <Link href="/" style={{ textDecoration: "none" }}>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "30px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "white",
                cursor: "pointer",
              }}
            >
              <MapPinned size={30} color="white" />
              TripBuddy
            </div>
          </Link>
        </div>

        {/* Nawigacja */}
        {isLoggedIn && (
          <div
            style={{
              position: "absolute",
              left: "300px",
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              gap: "20px",
            }}
          >
            <Link href="/browse" style={buttonStyle}>
              Przeglądaj podróże
            </Link>
            <Link href="/add" style={buttonStyle}>
              Dodaj ogłoszenie
            </Link>
            <Link href="/mytrips" style={buttonStyle}>
              Moje podróże
            </Link>
          </div>
        )}

        {/* Ikonka i menu użytkownika */}
        <div
          style={{
            position: "absolute",
            right: "20px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          {isLoggedIn ? (
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setShowMenu((prev) => !prev)}
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                <UserCircle size={36} color="white" />
              </button>

              {showMenu && (
                <div className="user-menu">
                  <Link
                    href="/account"
                    onClick={() => setShowMenu(false)}
                    style={{
                      display: "block",
                      padding: "8px",
                      color: "#333",
                      textDecoration: "none",
                    }}
                  >
                    Moje konto
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "8px",
                      background: "none",
                      border: "none",
                      textAlign: "left",
                      color: "#333",
                      cursor: "pointer",
                    }}
                  >
                    Wyloguj się
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => signIn(undefined, { callbackUrl: "/login" })} style={buttonStyle}>
              Zaloguj się
            </button>
          )}
        </div>
      </header>
    </>
  );
}
