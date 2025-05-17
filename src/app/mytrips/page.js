import TripCard from "../components/TripCard";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) {
    return (
      <div style={{ padding: 20 }}>
        Zaloguj się aby zobaczyć swoje wycieczki
      </div>
    );
  }
  
  const data = await fetch(process.env.BASE_URL + "/api/trip/mine", {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
  })
  const trips = await data.json()

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
        {trips.map((trip, index) => (
          <TripCard key={index} trip={trip} />
        ))}
      </div>
    </div>
  );
}
