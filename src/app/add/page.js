// app/add/page.js
"use client";

import { useState } from "react";

export default function AddTripPage() {
  const [tripName, setTripName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nowy wyjazd:", tripName, description);
    alert("Wyjazd dodany (na razie tylko w konsoli)");
    setTripName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Dodaj nowy wyjazd</h2>
      <div>
        <label>Nazwa wyjazdu:</label><br />
        <input
          value={tripName}
          onChange={(e) => setTripName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Opis:</label><br />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit">Dodaj</button>
    </form>
  );
}
