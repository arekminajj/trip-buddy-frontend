"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTripPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [capacity, setCapacity] = useState("");

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTrip = {
      id: Date.now(),
      title,
      description,
      date,
      location,
      price,
      duration,
      capacity,
    };

    // Możesz dodać logikę zapisywania ogłoszenia np. w lokalnej bazie danych
    console.log(newTrip);

    router.push("/browse"); // Przekierowanie po dodaniu ogłoszenia
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h2
        style={{
          fontSize: "32px",
          marginBottom: "30px",
          fontWeight: "bold",
          color: "#139c8a",
          textAlign: "center",
        }}
      >
        Dodaj nowe ogłoszenie
      </h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="title"
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Tytuł
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Wpisz tytuł ogłoszenia"
            required
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: "6px",
              border: "2px solid #139c8a",
              fontSize: "16px",
              boxSizing: "border-box",
              marginBottom: "15px",
            }}
          />
          <style jsx>{`
            input:focus {
              border-color: #139c8a; /* Kolor ramki przy aktywacji pola */
              box-shadow: 0 0 5px rgba(19, 156, 138, 0.2); /* Delikatny cień */
            }

            input:hover {
              border-color: #139c8a; /* Kolor ramki przy najechaniu kursorem */
              cursor: pointer; /* Zmieniamy kursor, aby wskazać, że pole jest interaktywne */
            }
          `}</style>
        </div>

        <div>
          <label
            htmlFor="location"
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Lokalizacja
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Wpisz lokalizację"
            required
            style={{
              width: "100%",
              borderRadius: "6px",
              border: "2px solid #139c8a",
              padding: "10px",
              marginBottom: "15px",
            }}
          />
        </div>

        <div>
          <label
            htmlFor="date"
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Data rozpoczęcia
          </label>
          <input
            type="date"
            id="date"
            value={date1}
            onChange={(e) => setDate1(e.target.value)}
            required
            style={{
              width: "100%",
              borderRadius: "6px",
              border: "2px solid #139c8a",
              padding: "10px",
              marginBottom: "15px",
            }}
          />
        </div>

        <div>
          <label
            htmlFor="date"
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Data zakończenia
          </label>
          <input
            type="date"
            id="date"
            value={date2}
            onChange={(e) => setDate2(e.target.value)}
            required
            style={{
              width: "100%",
              borderRadius: "6px",
              border: "2px solid #139c8a",
              padding: "10px",
              marginBottom: "15px",
            }}
          />
        </div>

        <div>
          <label
            htmlFor="price"
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Cena
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Wpisz cenę"
            required
            style={{
              width: "100%",
              borderRadius: "6px",
              border: "2px solid #139c8a",
              padding: "10px",
              marginBottom: "15px",
            }}
          />
        </div>

        <div>
          <label
            htmlFor="capacity"
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Liczba uczestników
          </label>
          <input
            type="number"
            id="capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            placeholder="Wpisz liczbę uczestników"
            required
            style={{
              width: "100%",
              borderRadius: "6px",
              border: "2px solid #139c8a",
              padding: "10px",
              marginBottom: "15px",
            }}
          />
        </div>

        <div>
          <label
            htmlFor="description"
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Opis
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Dodaj opis"
            required
            maxLength={500} // Określa maksymalną liczbę znaków
            style={{
              width: "100%", // Zajmuje całą dostępną szerokość, ale ograniczoną do 500px
              height: "260px", // Określona wysokość
              padding: "10px",
              marginBottom: "15px",
              resize: "none", // Zabrania zmiany rozmiaru textarea
              overflow: "hidden", // Zapobiega przewijaniu
              borderRadius: "6px",
              border: "2px solid #139c8a",
            }}
          />
        </div>

        <div style={{ textAlign: "center" }}>
          <button
            type="submit"
            style={{
              width: "50%",
              padding: "12px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#139c8a",
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              marginTop: "15px",
              transition: "background-color 0.3s",
            }}
          >
            Dodaj ogłoszenie
          </button>
        </div>
      </form>
    </div>
  );
}
