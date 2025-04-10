"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function TripCard({ trip }) {
  const [randomParam, setRandomParam] = useState(null);

  useEffect(() => {
    setRandomParam(Math.floor(Math.random() * 1000));
  }, []);

  if (randomParam === null) return null;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "600px",
        height: "530px",
        margin: "0 auto 32px auto",
        border: "1px solid #ddd",
        borderRadius: "16px",
        overflow: "hidden",
        backgroundColor: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <div style={{ width: "100%", height: "220px", position: "relative" }}>
        <Image
          src={`https://picsum.photos/600/300?random=${randomParam}`}
          alt={`Zdjęcie z ${trip.title}`}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 600px) 100vw, 600px"
        />
      </div>

      <div
        style={{
          padding: "20px",
          flex: 1,
          display: "flex",
          flexDirection: "row", // zmiana z column na row
          gap: "20px",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        {/* Lewa część – tytuł i opis */}
        <div style={{ flex: 2 }}>
          <h2
            style={{
              marginBottom: "12px",
              fontSize: "22px",
              fontWeight: "600",
            }}
          >
            {trip.title}
          </h2>

          <div
            style={{
              marginTop: "15px",
              lineHeight: "1.5",
              maxHeight: "200px",
              overflowY: "auto",
              paddingRight: "5px",
            }}
          >
            {trip.description}
          </div>
        </div>

        {/* Prawa część – stałe szczegóły */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#f8f9fa",
            borderRadius: "12px",
            padding: "16px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            fontSize: "14px",
          }}
        >
          <p style={{ margin: "8px 0" }}>
            📅 <strong>Data:</strong> {trip.date}
          </p>
          <p style={{ margin: "8px 0" }}>
            📍 <strong>Lokalizacja:</strong> {trip.location}
          </p>
          <p style={{ margin: "8px 0" }}>
            💰 <strong>Cena:</strong> {trip.price} zł
          </p>
          <p style={{ margin: "8px 0" }}>
            👥 <strong>Uczestnicy:</strong> {trip.capacity} / {trip.capacity}
          </p>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          backgroundColor: "white",
          color: "black",
          padding: "10px 20px",
          borderRadius: "8px",
          fontWeight: "bold",
          cursor: "pointer",
          border: "2px solid #139c8a",
          zIndex: 1,
        }}
      >
        Zobacz szczegóły
      </div>
    </div>
  );
}
