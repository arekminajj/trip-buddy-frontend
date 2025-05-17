"use client";

import { useState } from "react";

const formatToUTC = (date) => {
  return date ? new Date(date).toISOString() : undefined;
};

export default function TripEditForm({ trip, accessToken }) {
  const [formData, setFormData] = useState({
    name: trip.name || "",
    description: trip.description || "",
    imageUrl: trip.imageUrl || "",
    price: trip.price || 0,
    startDate: trip.startDate?.substring(0, 10) || "",
    endDate: trip.endDate?.substring(0, 10) || "",
    maxMembers: trip.maxMembers || 0,
    startLocation: trip.startLocation || "",
    endLocation: trip.endLocation || "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      //convert datetime to utc
      formData.startDate = formatToUTC(formData.startDate)
      formData.endDate = formatToUTC(formData.endDate)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/trip/${trip.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update trip.");
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>Edytuj wyprawę</h1>

      <label>
        Nazwa:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
      </label>

      <label>
        Opis:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            minHeight: "80px",
          }}
        />
      </label>

      <label>
        URL obrazka:
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
      </label>

      <label>
        Cena:
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
      </label>

      <label>
        Data rozpoczęcia:
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
      </label>

      <label>
        Data zakończenia:
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
      </label>

      <label>
        Maks. uczestników:
        <input
          type="number"
          name="maxMembers"
          value={formData.maxMembers}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
      </label>

      <label>
        Start:
        <input
          type="text"
          name="startLocation"
          value={formData.startLocation}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
      </label>

      <label>
        Koniec:
        <input
          type="text"
          name="endLocation"
          value={formData.endLocation}
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

      {status === "loading" && <p>Zapisywanie…</p>}
      {status === "success" && <p style={{ color: "green" }}>Zaktualizowano wycieczke!</p>}
      {status === "error" && <p style={{ color: "red" }}>Błąd podczas aktualizacji.</p>}
    </form>
  );
}
