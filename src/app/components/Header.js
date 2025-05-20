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
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <UserCircle size={36} color="white" />
              </button>

              {showMenu && (
                <div
                  style={{
                    position: "absolute",
                    top: "46px",
                    right: "0",
                    zIndex: 1000,
                  }}
                >
                  {/* STRZAŁKA */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "10px",
                      width: "0",
                      height: "0",
                      borderLeft: "8px solid transparent",
                      borderRight: "8px solid transparent",
                      borderBottom: "10px solid white",
                      zIndex: 1001,
                    }}
                  ></div>

                  {/* MENU */}
                  <div
                    style={{
                      backgroundColor: "white",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      padding: "10px",
                      minWidth: "140px",
                      fontWeight: "bold",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      position: "relative",
                      zIndex: 1000,
                      textAlign: "center",
                    }}
                  >
                    <Link
                      href="/account"
                      onClick={() => setShowMenu(false)}
                      style={{
                        display: "block",
                        padding: "4px",
                        color: "#333",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => (e.target.style.color = "#139c8a")}
                      onMouseLeave={(e) => (e.target.style.color = "#333")}
                    >
                      Mój profil
                    </Link>

                    <div
                      style={{
                        height: "3px",
                        backgroundColor: "#139c8a",
                        margin: "8px 0",
                        border: "none",
                      }}
                    ></div>

                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "4px",
                        background: "none",
                        border: "none",
                        textAlign: "left",
                        fontWeight: "bold",
                        color: "#333",
                        cursor: "pointer",
                        textAlign: "center",
                      }}
                      onMouseEnter={(e) => (e.target.style.color = "#d9534f")}
                      onMouseLeave={(e) => (e.target.style.color = "#333")}
                    >
                      Wyloguj się
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => signIn(undefined, { callbackUrl: "/login" })}
              style={buttonStyle}
            >
              Zaloguj się
            </button>
          )}
        </div>
      </header>
    </>
  );
}
