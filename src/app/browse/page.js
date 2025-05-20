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
      ? selected >= new Date(trip.startDate) &&
        selected <= new Date(trip.endDate)
      : true;

    return hasLocationMatch && hasDateMatch;
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1520299607509-dcd935f9a839?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "40px 20px",
        color: "#000",
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
            textShadow: "2px 2px 6px rgba(0,0,0,0.7)",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            padding: "10px 20px",
            borderRadius: "12px",
            display: "inline-block",
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
            transition: "all 0.3s ease",
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
            transition: "all 0.3s ease",
            backgroundColor: "#fdfdfd",
          }}
        />
      </div>

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
        <p style={{ textAlign: "center", color: "#666", fontStyle: "italic" }}>
          Brak wyników dla wybranych kryteriów.
        </p>
      )}
    </div>
  );
}
