"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function AddTripPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [price, setPrice] = useState("");
  const [maxMembers, setMaxMembers] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session?.accessToken) {
      alert("Musisz być zalogowany, żeby dodać ogłoszenie.");
      return;
    }

    const payload = {
      name,
      description,
      price: Number(price),
      startDate: startDate ? `${startDate}T08:00:00` : undefined,
      endDate: endDate ? `${endDate}T18:00:00` : undefined,
      maxMembers: Number(maxMembers),
      startLocation,
      endLocation,
      imageUrl,
    };

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(error || "Błąd podczas dodawania ogłoszenia");
      }

      router.push("/browse");
    } catch (err) {
      console.error("AddTrip error:", err);
      alert("Nie udało się dodać ogłoszenia: " + err.message);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h2
        style={{
          fontSize: "32px",
          marginBottom: "30px",
          fontWeight: "bold",
          color: "#139c8a",
          textAlign: "center",
        }}
      >
        Dodaj nowe ogłoszenie
      </h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nazwa</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "15px" }}
          />
        </div>

        <div>
          <label htmlFor="description">Opis</label>
          <textarea
            id="description"
            value={description} onChange={(e) => setDescription(e.target.value)}
            required
            maxLength={500}
            style={{ width: "100%", height: "150px", marginBottom: "15px" }}
          />
        </div>

        <div>
          <label htmlFor="startDate">Data rozpoczęcia</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "15px" }}
          />
        </div>

        <div>
          <label htmlFor="endDate">Data zakończenia</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "15px" }}
          />
        </div>

        <div>
          <label htmlFor="startLocation">Miejsce startu</label>
          <input
            type="text"
            id="startLocation"
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "15px" }}
          />
        </div>

        <div>
          <label htmlFor="endLocation">Miejsce zakończenia</label>
          <input
            type="text"
            id="endLocation"
            value={endLocation}
            onChange={(e) => setEndLocation(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "15px" }}
          />
        </div>

        <div>
          <label htmlFor="price">Cena</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "15px" }}
          />
        </div>

        <div>
          <label htmlFor="maxMembers">Liczba uczestników</label>
          <input
            type="number"
            id="maxMembers"
            value={maxMembers}
            onChange={(e) => setMaxMembers(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "15px" }}
          />
        </div>

        <div>
          <label htmlFor="imageUrl">URL obrazka</label>
          <input
            type="url"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            style={{ width: "100%", marginBottom: "25px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#139c8a",
            color: "#fff",
            fontSize: "16px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Dodaj ogłoszenie
        </button>
      </form>
    </div>
  );
}
