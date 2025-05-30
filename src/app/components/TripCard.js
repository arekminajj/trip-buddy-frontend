"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import formatDate from "../common/formatDate";

export default function TripCard({ trip, currentUserId }) {
  const router = useRouter();

  const now = new Date();
  const start = new Date(trip.startDate);
  const end = new Date(trip.endDate);
  const isPast = end < now;
  const isOngoing = start <= now && now <= end;

  const isOwner = trip.owner?.id === currentUserId;
  const isParticipant = trip.members?.some((m) => m.id === currentUserId);
  let roleLabel = null;
  if (isOwner) roleLabel = "👑 Organizator";
  else if (isParticipant) roleLabel = "🙋‍♂️ Uczestnik";

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "700px",
        height: "470px",
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
      <div
        style={{
          width: "100%",
          height: "230px",
          position: "relative",
          flexShrink: 0,
        }}
      >
        {(isPast || isOngoing) && (
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
            {isPast ? "ZAKOŃCZONA" : "TRWA"}
          </div>
        )}

        <Image
          src={trip.imageUrl ? trip.imageUrl : "images/default.jpg"}
          alt={`Zdjęcie z ${trip.title}`}
          fill
          style={{
            objectFit: "cover",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          }}
          sizes="(max-width: 650px) 100vw, 600px"
        />
      </div>

      <h2
        style={{
          fontSize: "22px",
          fontWeight: "600",
          margin: "17px 10px 0 20px",
          lineHeight: "1.4",
          wordBreak: "break-word",
        }}
      >
        {trip.name}
      </h2>

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
        <div style={{ flex: 1.4 }}>
          <p style={{ margin: "0px 0" }}>
            📅 <strong>Data:</strong> {formatDate(trip.startDate)} -{" "}
            {formatDate(trip.endDate)}
          </p>

          <div
            style={{
              marginTop: "8px",
              maxHeight: "100px",
              overflowY: "auto",
              paddingRight: "4px",
              fontSize: "14px",
              lineHeight: "1.4",
              color: "#333",
            }}
          >
            {trip.description}
          </div>
        </div>

        <div
          style={{
            flex: 1,
            fontSize: "14px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <p style={{ margin: "0px 0" }}>
            📍 <strong>Lokalizacja:</strong> {trip.startLocation} -{" "}
            {trip.endLocation}
          </p>

          {roleLabel && (
            <p
              style={{ margin: "4px 0", fontStyle: "italic", color: "#139c8a" }}
            >
              {roleLabel}
            </p>
          )}
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
