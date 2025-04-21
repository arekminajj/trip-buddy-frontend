import CardWrapper from "./components/TripCard";
import mockTrips from "./data/mockTrips";

export default function HomePage() {
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
        Najpopularniejsze podróże - dołącz do wspólnej przygody!
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "24px",
        }}
      >
        {mockTrips.map((trip, index) => (
          <CardWrapper key={index} trip={trip} /> // Pass trip to CardWrapper
        ))}
      </div>
    </div>
  );
}
