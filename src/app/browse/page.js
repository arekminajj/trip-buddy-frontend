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
        if (!res.ok) throw new Error("Failed to fetch trips");
        const data = await res.json();
        setTrips(data);
      } catch (error) {
        console.error("Error fetching trips:", error);
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

    const tripDate = new Date(trip.startDate);
    const selected = new Date(selectedDate);
    const hasDateMatch = selectedDate
      ? tripDate.toDateString() === selected.toDateString()
      : true;

    return hasLocationMatch && hasDateMatch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Znajdź podróż
      </h1>

      <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Filtruj po lokalizacji (np. Tatry, Ustka...)"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full md:w-80 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>


      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : isLoading ? (
        <p className="text-center text-gray-600">Ładowanie danych...</p>
      ) : filteredTrips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">
          Brak wyników dla wybranych kryteriów.
        </p>
      )}
    </div>
  );
}
