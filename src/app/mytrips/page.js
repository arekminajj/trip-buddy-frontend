// /pages/mytrips.js

"use client";

import { useState, useEffect } from "react";
import CardWrapper from "../components/CardWrapper";  // Use your CardWrapper component
import mockTrips from "../data/mockTrips"; // Assuming you have a list of mockTrips

export default function MyTripsPage() {
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    // Assuming user is logged in and we are storing their trip participation in localStorage
    const userTripsFromStorage = JSON.parse(localStorage.getItem("userTrips")) || [];
    
    // Filter trips by user participation
    const tripsUserIsPartOf = mockTrips.filter(trip => 
      userTripsFromStorage.includes(trip.id)
    );

    setUserTrips(tripsUserIsPartOf);
  }, []);

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
        Moje Podróże
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "24px",
        }}
      >
        {userTrips.length > 0 ? (
          userTrips.map((trip, index) => (
            <CardWrapper key={index} trip={trip} />
          ))
        ) : (
          <p style={{ textAlign: "center", gridColumn: "1 / -1" }}>
            Nie bierzesz udziału w żadnej podróży.
          </p>
        )}
      </div>
    </div>
  );
}
