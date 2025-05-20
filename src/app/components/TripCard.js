"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import formatDate from "../common/formatDate";

export default function TripCard({ trip }) {
  // const [randomParam, setRandomParam] = useState(null);
  const router = useRouter();

  // useEffect(() => {
  //   setRandomParam(Math.floor(Math.random() * 1000));
  // }, []);

  // if (randomParam === null) return null;

  const isPast = new Date(trip.endDate) < new Date();

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "700px",
        height: "440px",
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
        {isPast && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "24px",
              fontWeight: "bold",
              zIndex: 2,
            }}
          >
            ZAKOŃCZONA
          </div>
        )}
        <Image
          src={trip.imageUrl ? trip.imageUrl : "images/default.jpg"}
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
            {trip.name}
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
              📅 <strong>Data:</strong> {formatDate(trip.startDate)} -{" "}
              {formatDate(trip.endDate)}
            </p>
            {trip.description}
          </div>
        </div>

        {/* Prawa część – stałe szczegóły */}
        <div
          style={{
            flex: 1,
            padding: "16px",
            height: "200px",
            fontSize: "14px",
            display: "flex",
            flexDirection: "column",
            gap: "7px",
          }}
        >
          <p style={{ margin: "40px 0" }}>
            📍 <strong>Lokalizacja:</strong> {trip.startLocation} -{" "}
            {trip.endLocation}
          </p>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "40px",
          right: "25px",
          backgroundColor: "white",
          color: "black",
          padding: "10px 12px",
          borderRadius: "8px",
          fontWeight: "bold",
          cursor: "pointer",
          border: "2px solid #139c8a",
          zIndex: 1,
        }}
        onClick={() => router.push(`/trip/${trip.id}`)}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = "#139c8a";
          e.target.style.color = "white";
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = "white";
          e.target.style.color = "#000";
        }}
      >
        Zobacz szczegóły
      </div>
    </div>
  );
}
