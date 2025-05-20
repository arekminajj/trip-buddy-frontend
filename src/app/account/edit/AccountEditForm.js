"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AccountEditForm({ user, accessToken }) {
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    bio: user.bio || "",
    profilePictureUri: user.profilePictureURI || "",
  });

  const [status, setStatus] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("ładowanie");

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Nie udało się zaktualizować");
      setStatus("success");

      setTimeout(() => {
        router.push("/account");
      }, 1000);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "600px",
        margin: "40px auto 40px auto",
        width: "100%",
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h1
        style={{
          fontSize: "30px",
          fontWeight: "bold",
          marginBottom: "20px",
          color: "#139c8a",
          textAlign: "center",
        }}
      >
        Edytuj profil
      </h1>

      <style jsx>{`
        input,
        textarea {
          width: 100%;
          padding: 10px 12px;
          margin-bottom: 15px;
          border-radius: 6px;
          border: 2px solid #139c8a;
          font-size: 16px;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }
        input:hover,
        textarea:hover {
          border-color: #000;
        }
        input:focus,
        textarea:focus {
          border-color: #000;
          outline: none;
          box-shadow: 0 0 0 2px rgba(19, 156, 138, 0.2);
        }
        label {
          font-weight: 500;
          display: block;
          margin-bottom: 5px;
        }
      `}</style>

      <label style={{ fontWeight: "700", fontSize: "17px", color: "#000" }}>
        Imię
      </label>
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="Wpisz swoje imię"
      />

      <label style={{ fontWeight: "700", fontSize: "17px", color: "#000" }}>
        Nazwisko
      </label>
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Wpisz swoje nazwisko"
      />

      <label style={{ fontWeight: "700", fontSize: "17px", color: "#000" }}>
        Biogram
      </label>
      <textarea
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        rows={4}
        placeholder="Opowiedz coś o sobie"
      />

      <label style={{ fontWeight: "700", fontSize: "17px", color: "#000" }}>
        URL zdjęcia profilowego
      </label>
      <input
        type="text"
        name="profilePictureUri"
        value={formData.profilePictureUri}
        onChange={handleChange}
        placeholder="https://adres-do-zdjecia.jpg"
      />

      <button
        type="submit"
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#139c8a",
          color: "#fff",
          fontSize: "18px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          transition: "background-color 0.3s",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#128778")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#139c8a")}
      >
        Zapisz zmiany
      </button>

      {status === "loading" && <p>Aktualizowanie…</p>}
      {status === "success" && (
        <p style={{ color: "green" }}>Zaktualizowano! Przekierowanie...</p>
      )}
      {status === "error" && <p style={{ color: "red" }}>Błąd przy zapisie.</p>}
    </form>
  );
}
