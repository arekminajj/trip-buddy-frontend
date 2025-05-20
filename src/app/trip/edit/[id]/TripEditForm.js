"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const formatToUTC = (date) => {
  return date ? new Date(date).toISOString() : undefined;
};

export default function TripEditForm({ trip, accessToken }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: trip.name || "",
    description: trip.description || "",
    imageUrl: trip.imageUrl || "",
    price: trip.price || "",
    startDate: trip.startDate?.substring(0, 10) || "",
    endDate: trip.endDate?.substring(0, 10) || "",
    maxMembers: trip.maxMembers || "",
    startLocation: trip.startLocation || "",
    endLocation: trip.endLocation || "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start > end) {
      alert("Data rozpoczęcia nie może być późniejsza niż data zakończenia.");
      return;
    }

    if (start < today) {
      alert("Data rozpoczęcia nie może być wcześniejsza niż dzisiejsza data.");
      return;
    }

    setStatus("ładowanie");

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        maxMembers: Number(formData.maxMembers),
        startDate: formatToUTC(formData.startDate),
        endDate: formatToUTC(formData.endDate),
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/trip/${trip.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Błąd podczas aktualizacji");

      setStatus("success");
      router.push("/mytrips");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1519327232521-1ea2c736d34d?ixlib=rb-4.1.0&w=1920&q=80")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        padding: "60px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
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
          Edytuj ogłoszenie
        </h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nazwa</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
            />
          </div>

          <div>
            <label htmlFor="description">Opis</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              maxLength={500}
              style={{ width: "100%", height: "150px", marginBottom: "15px" }}
            />
          </div>

          <div>
            <label htmlFor="startDate">Data rozpoczęcia</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "15px" }}
            />
          </div>

          <div>
            <label htmlFor="endDate">Data zakończenia</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "15px" }}
            />
          </div>

          <div>
            <label htmlFor="startLocation">Miejsce startu</label>
            <input
              type="text"
              id="startLocation"
              name="startLocation"
              value={formData.startLocation}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "15px" }}
            />
          </div>

          <div>
            <label htmlFor="endLocation">Miejsce zakończenia</label>
            <input
              type="text"
              id="endLocation"
              name="endLocation"
              value={formData.endLocation}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "15px" }}
            />
          </div>

          <div>
            <label htmlFor="price">Cena</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "15px" }}
            />
          </div>

          <div>
            <label htmlFor="maxMembers">Liczba uczestników</label>
            <input
              type="number"
              id="maxMembers"
              name="maxMembers"
              value={formData.maxMembers}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "15px" }}
            />
          </div>

          <div>
            <label htmlFor="imageUrl">URL obrazka</label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "25px" }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#139c8a",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "bold",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Zapisz zmiany
          </button>

          <style jsx>{`
            input,
            textarea {
              border: 3px solid #000;
              padding: 12px;
              font-size: 14px;
              border-radius: 6px;
              width: 100%;
            }

            input:focus,
            textarea:focus {
              border-color: #139c8a;
              outline: none;
              box-shadow: 0 0 0 2px rgba(19, 156, 138, 0.2);
            }

            input:hover,
            textarea:hover {
              border-color: #139c8a;
            }

            label {
              display: block;
              text-align: center;
              font-size: 18px;
              margin-bottom: 8px;
              font-weight: 600;
            }
          `}</style>

          {status === "error" && (
            <p style={{ color: "red", marginTop: "15px", textAlign: "center" }}>
              Błąd podczas aktualizacji.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
