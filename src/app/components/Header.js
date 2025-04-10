"use client";

import Link from "next/link";
import { MapPinned } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Możesz dodać logikę wylogowania, np. usunięcie tokenu z localStorage
    router.push("/"); // Przekierowanie po wylogowaniu
  };

  return (
    <header
      style={{
        position: "relative",
        height: "70px",
        backgroundColor: "#139c8a",
        borderBottom: "1px solid #ccc",
        padding: "0 20px",
      }}
    >
      {/* Logo - pozycjonowanie absolutne lewe */}
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

      {/* Przyciski - pozycjonowanie absolutne prawe */}
      <div
        style={{
          position: "absolute",
          right: "20px",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          gap: "10px",
        }}
      >
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#fff",
              padding: "8px 16px",
              borderRadius: "9999px",
              border: "1px solid #ddd",
              textDecoration: "none",
              fontWeight: "bold",
              color: "#333",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            Wyloguj się
          </button>
        ) : (
          <Link
            href="/login"
            style={{
              backgroundColor: "#fff",
              padding: "8px 16px",
              borderRadius: "9999px",
              border: "1px solid #ddd",
              textDecoration: "none",
              fontWeight: "bold",
              color: "#333",
              transition: "all 0.3s ease",
            }}
          >
            Zaloguj się
          </Link>
        )}
      </div>
    </header>
  );
}
