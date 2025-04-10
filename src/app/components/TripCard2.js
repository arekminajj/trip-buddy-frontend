"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function TripCard2({ trip }) {
  const [randomParam, setRandomParam] = useState(null);

  useEffect(() => {
    setRandomParam(Math.floor(Math.random() * 1000));
  }, []);

  if (randomParam === null) return null;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "650px",
        height: "500px",
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
      <div style={{ width: "100%", height: "230px", position: "relative" }}>
        <Image
          src={`https://picsum.photos/650/300?random=${randomParam}`}
          alt={`Zdjęcie z ${trip.title}`}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 650px) 100vw, 600px"
        />
      </div>

      <div
        style={{
          padding: "20px",
          flex: 1,
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        {/* Lewa część – tytuł i opis */}
        <div style={{ flex: 1.4 }}>
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
            <p style={{ margin: "8px 0" }}>
              📅 <strong>Data:</strong> {trip.date}
            </p>
            {trip.description}
          </div>
        </div>

        {/* Prawa część – stałe szczegóły */}
        <div
          style={{
            flex: 1,
            padding: "16px",
            borderLeft: "4px solid #139c8a", // Pionowa linia po lewej stronie
            height: "200px",
            fontSize: "14px",
            display: "flex",
            flexDirection: "column",
            gap: "7px", // Odstęp między elementami
          }}
        >
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
          bottom: "30px",
          right: "48px",
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
        Zapisz się
      </div>
    </div>
  );
}
