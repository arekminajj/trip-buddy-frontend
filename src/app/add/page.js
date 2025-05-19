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
        backgroundImage: 'url("https://images.unsplash.com/photo-1501785888041-af3ef285b470")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        padding: "60px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
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
              placeholder="np. Górska przygoda w Tatrach"
              required
              style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
            />
          </div>

          <div>
            <label htmlFor="description">Opis</label>
            <textarea
              id="description"
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Opisz plan wycieczki, atrakcje, noclegi itp."
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
              placeholder="np. Kraków"
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
              placeholder="np. Zakopane"
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
              placeholder="np. 499"
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
              placeholder="np. 12"
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
              placeholder="np. https://strzalka.v.prz.edu.pl/thumb/Q7N2ElcnIzdg5XJWBEb2k8ZHx-ZUk,core_user/16993/RDVQCfVQJNwFlAA,dsrzalka.jpg"
              required
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
              fontWeight: "bold",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Dodaj ogłoszenie
          </button>

          <style jsx>{`
            input, textarea {
              border: 3px solid #000;
              padding: 12px;
              font-size: 14px;
              border-radius: 6px;
              width: 100%;
            }

            input:focus, textarea:focus {
              border-color: #139c8a;
              outline: none;
              box-shadow: 0 0 0 2px rgba(19, 156, 138, 0.2);
            }

            input:hover, textarea:hover {
              border-color: #139c8a;
            }

            label {
              display: block;
              text-align: center;
              font-size: 18px;
              margin-bottom: 8px;
              font-weight: 600;
            }
          `}</style>

        </form>
      </div>
    </div>
  );
}
