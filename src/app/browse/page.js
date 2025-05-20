"use client";

import { useEffect, useState } from "react";
import TripCard from "../components/TripCard";

export default function BrowseTripsPage() {
  const [trips, setTrips] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/trip");
        if (!res.ok) throw new Error("Nie udało się pobrać wycieczek");
        const data = await res.json();
        setTrips(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const filteredTrips = trips.filter((trip) => {
    const searchTerm = filter.toLowerCase();
    const hasLocationMatch =
      trip.startLocation?.toLowerCase().includes(searchTerm) ||
      trip.endLocation?.toLowerCase().includes(searchTerm);

    const selected = new Date(selectedDate + "T00:00:00Z");
    const hasDateMatch = selectedDate
      ? selected >= new Date(trip.startDate) && selected <= new Date(trip.endDate)
      : true;

    return hasLocationMatch && hasDateMatch;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1
        style={{
          fontSize: "40px",
          marginBottom: "20px",
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
          fontWeight: "bold",
          color: "#000",
          textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
          letterSpacing: "0.5px",
        }}
      >
        Znajdź podróż
      </h1>

      <div
        style={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            justifyContent: "center",
            marginBottom: "40px",
            flexWrap: "wrap",
          }}
      >
        <input
          type="text"
          placeholder="Filtruj po lokalizacji (np. Tatry, Ustka...)"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
            width: "280px",
          }}
        />

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
            width: "200px",
          }}
        />
      </div>

      {error ? (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      ) : isLoading ? (
        <p style={{ textAlign: "center", color: "#666" }}>Ładowanie danych...</p>
      ) : filteredTrips.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "24px",
          }}
        >
          {filteredTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "#666" }}>
          Brak wyników dla wybranych kryteriów.
        </p>
      )}
    </div>
  );
}
