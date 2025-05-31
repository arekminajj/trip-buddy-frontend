import TripCard from "./components/TripCard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const headers = session?.accessToken
    ? {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      }
    : {};

  const tripsRes = await fetch(process.env.BASE_URL + "/api/trip", {
    cache: "no-store",
    headers,
  });
  const trips = await tripsRes.json();

  let currentUserId = null;
  if (session?.accessToken) {
    const userRes = await fetch(process.env.BASE_URL + "/api/user/current", {
      cache: "no-store",
      headers,
    });

    if (userRes.ok) {
      const user = await userRes.json();
      currentUserId = user.id;
    }
  }

  return (
    <div
      style={{
        padding: "20px",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e0f7fa, #e8f5e9)",
        transition: "background 0.5s ease-in-out",
      }}
    >
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
          <TripCard key={index} trip={trip} currentUserId={currentUserId} />
        ))}
      </div>
    </div>
  );
}
