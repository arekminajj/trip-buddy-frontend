"use client";

import Link from "next/link";
import { MapPinned, UserCircle, Bell } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Header2() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false); // Nowy stan do powiadomień
  const [notifications, setNotifications] = useState([]); // Tablica z powiadomieniami
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    setIsLoggedIn(loggedIn);

    // Przykładowe powiadomienia (zamiast tego możesz dodać fetch do API)
    setNotifications([
      { id: 1, message: "Nowe zaproszenie do podróży: Tatry", tripId: 1 },
      { id: 2, message: "Podróż do Ustki – 2 miejsca dostępne", tripId: 3 },
    ]);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    setIsLoggedIn(false);
    router.push("/");
  };

  const handleNotificationClick = (id) => {
    // Obsługuje kliknięcie powiadomienia – np. przekierowanie do strony z podróżą
    console.log(`Powiadomienie o podróży ${id}`);
  };

  const handleAcceptInvitation = (id) => {
    // Logika akceptacji zaproszenia
    console.log(`Akceptowanie zaproszenia do podróży ${id}`);
  };

  const handleRejectInvitation = (id) => {
    // Logika odrzucenia zaproszenia
    console.log(`Odrzucenie zaproszenia do podróży ${id}`);
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
    <header
      style={{
        position: "relative",
        height: "70px",
        backgroundColor: "#139c8a",
        borderBottom: "1px solid #ccc",
        padding: "0 20px",
      }}
    >
      {/* =================== Logo =================== */}
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

      {/* =================== Główne przyciski (nawigacja) =================== */}
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

      {/* =================== Ikony powiadomień i konta =================== */}
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
            {/* =================== Ikona powiadomień =================== */}
            <button
              onClick={() => setShowNotifications((prev) => !prev)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "white",
                marginRight: "400px", // Dodatkowa przestrzeń między ikonami
              }}
            >
              <Bell size={30} />
            </button>

            {/* =================== Menu powiadomień (rozwijane) =================== */}
            {showNotifications && (
              <div
                style={{
                  position: "absolute",
                  top: "45px",
                  right: "300px",
                  backgroundColor: "white",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "10px",
                  minWidth: "300px",
                  overflowY: "auto", // Dodanie przewijania
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  zIndex: 10,
                }}
              >
                {notifications.map((notification) => (
                  <div key={notification.id} style={{ marginBottom: "10px" }}>
                    <p>{notification.message}</p>
                    <button
                      onClick={() =>
                        handleAcceptInvitation(notification.tripId)
                      }
                      style={{
                        backgroundColor: "#139c8a",
                        color: "white",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        marginRight: "10px",
                      }}
                    >
                      Akceptuj
                    </button>
                    <button
                      onClick={() =>
                        handleRejectInvitation(notification.tripId)
                      }
                      style={{
                        backgroundColor: "#f44336",
                        color: "white",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Odrzuć
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* =================== Ikona konta i rozwijane menu =================== */}
            <button
              onClick={() => setShowMenu((prev) => !prev)}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <UserCircle size={36} color="white" />
            </button>

            {/* =================== Menu konta (rozwijane) =================== */}
            {showMenu && (
              <div
                style={{
                  position: "absolute",
                  top: "45px",
                  right: "0",
                  backgroundColor: "white",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "10px",
                  minWidth: "150px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  zIndex: 10,
                }}
              >
                <Link
                  href="/account"
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
                  onClick={handleLogout}
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
          <Link href="/login" style={buttonStyle}>
            Zaloguj się
          </Link>
        )}
      </div>
    </header>
  );
}
