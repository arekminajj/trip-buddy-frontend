"use client";

import { useState } from "react";

export default function AccountEditForm({ user, accessToken }) {
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    bio: user.bio || "",
    profilePictureUri: user.profilePictureURI || "",
  });

  const [status, setStatus] = useState(null);

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
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>Edytuj profil</h1>

      <label>
        Imię:
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
      </label>

      <label>
        Nazwisko:
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
      </label>

      <label>
        Bio:
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", marginBottom: "10px", minHeight: "80px" }}
        />
      </label>

      <label>
        URL zdjęcia profilowego:
        <input
          type="text"
          name="profilePictureUri"
          value={formData.profilePictureUri}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
      </label>

      <button
        type="submit"
        style={{
          padding: "10px 20px",
          backgroundColor: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          marginTop: "10px",
        }}
      >
        Zapisz zmiany
      </button>

      {status === "loading" && <p>Aktualizowanie…</p>}
      {status === "success" && <p style={{ color: "green" }}>Zaktualizowano!</p>}
      {status === "error" && <p style={{ color: "red" }}>Błąd przy zapisie.</p>}
    </form>
  );
}
