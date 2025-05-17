import { notFound } from "next/navigation";

export default async function TripDetailsPage({ params }) {
  const { id } = params;

  const res = await fetch(`${process.env.BASE_URL}/api/trip/${id}`);
  if (!res.ok) return notFound();

  const trip = await res.json();

  return (
    <div style={{ padding: "20px" }}>
      <h1
        style={{
          fontSize: "36px",
          marginBottom: "20px",
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
          fontWeight: "bold",
          color: "#000",
          textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
          letterSpacing: "0.5px",
        }}
      >
        {trip.name}
      </h1>
      <div
        style={{
          display: "flex",
          gap: "24px",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {trip.imageUrl && (
          <img
            src={trip.imageUrl}
            alt={trip.name}
            style={{
              width: "400px",
              height: "auto",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          />
        )}
        <div
          style={{
            maxWidth: "600px",
            fontFamily: "Arial, sans-serif",
            fontSize: "18px",
            lineHeight: "1.6",
            color: "#333",
          }}
        >
          <p><strong>Opis:</strong> {trip.description}</p>
          <p><strong>Cena:</strong> {trip.price} zł</p>
          <p><strong>Data rozpoczęcia:</strong> {new Date(trip.startDate).toLocaleString("pl-PL")}</p>
          <p><strong>Data zakończenia:</strong> {new Date(trip.endDate).toLocaleString("pl-PL")}</p>
          <p><strong>Początek:</strong> {trip.startLocation}</p>
          <p><strong>Koniec:</strong> {trip.endLocation}</p>
          <p><strong>Maks. uczestników:</strong> {trip.maxMembers}</p>
          <p><strong>Obecna liczba uczestników:</strong> {trip.members.length}</p>
        </div>
      </div>
    </div>
  );
}
