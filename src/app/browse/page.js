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

    const selected = new Date(selectedDate);
    const hasDateMatch = selectedDate
      ? selected >= new Date(new Date(trip.startDate).setHours(0, 0, 0, 0)) &&
        selected <= new Date(new Date(trip.endDate).setHours(23, 59, 59, 999))
      : true;

    return hasLocationMatch && hasDateMatch;
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/images/browsebg.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "20px 20px",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          borderRadius: "16px",
          padding: "20px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          maxWidth: "1700px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "30px",
          }}
        >
          <h1
            style={{
              fontSize: "40px",
              fontFamily: "Arial, sans-serif",
              fontWeight: "bold",
              letterSpacing: "0.5px",
              textShadow: "2px 2px 6px rgba(0,0,0,0.3)",
              color: "#000",
            }}
          >
            Znajdź podróż
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "60px",
            justifyContent: "center",
            marginBottom: "35px",
            flexWrap: "wrap",
          }}
        >
          {/* pola filtrów */}
          <input
            type="text"
            placeholder="Filtruj po lokalizacji (np. Tatry, Ustka...)"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              padding: "14px 18px",
              borderRadius: "10px",
              border: "3px solid #139c8a",
              fontSize: "16px",
              width: "313px",
              backgroundColor: "#fdfdfd",
            }}
          />

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{
              padding: "14px 18px",
              borderRadius: "10px",
              border: "3px solid #139c8a",
              fontSize: "16px",
              width: "200px",
              backgroundColor: "#fdfdfd",
            }}
          />
        </div>

        {/* TRIPS */}
        {error ? (
          <p style={{ color: "red", textAlign: "center" }}>{error}</p>
        ) : isLoading ? (
          <p style={{ textAlign: "center", color: "#666" }}>
            Ładowanie danych...
          </p>
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
          <p
            style={{ textAlign: "center", color: "#666", fontStyle: "italic" }}
          >
            Brak wyników dla wybranych kryteriów.
          </p>
        )}
      </div>
    </div>
  );
}
