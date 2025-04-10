"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function AccountPage() {
  const [user, setUser] = useState({});

  useEffect(() => {
    // Możesz tu załadować dane np. z localStorage lub API
    const mockUser = {
      name: "Jan Kowalski",
      email: "jan.kowalski@example.com",
      avatar: "/images/avatar.jpg", // domyślny avatar (musi być w public/images)
    };
    setUser(mockUser);
  }, []);

  // Domyślny avatar fallback
  const avatarSrc =
    user.avatar && user.avatar !== "" ? user.avatar : "/images/avatar.jpg";

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "32px",
          marginBottom: "30px",
          fontWeight: "bold",
          color: "#139c8a",
          textAlign: "center",
        }}
      >
        Moje konto
      </h1>

      {/* Sekcja profilu */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          marginBottom: "40px",
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "12px",
          backgroundColor: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <Image
          src={avatarSrc}
          alt="Avatar"
          width={100}
          height={100}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid #139c8a",
          }}
        />
        <div>
          <h2 style={{ margin: 0, fontSize: "22px" }}>{user.name}</h2>
          <p style={{ margin: 0, color: "#666" }}>{user.email}</p>
        </div>
      </div>

      {/* Przykładowe sekcje do rozbudowy */}
      <div
        style={{
          backgroundColor: "#f9f9f9",
          padding: "20px",
          borderRadius: "12px",
          border: "1px solid #eee",
        }}
      >
        <h3 style={{ marginBottom: "10px", color: "#333" }}>Twoje dane</h3>
        <p>Tu mogą pojawić się dane do edycji lub inne informacje.</p>

        <hr style={{ margin: "20px 0" }} />

        <h3 style={{ marginBottom: "10px", color: "#333" }}>
          Ustawienia konta
        </h3>
        <p>Tu możesz dodać opcje związane z hasłem, powiadomieniami itp.</p>
      </div>
    </div>
  );
}
