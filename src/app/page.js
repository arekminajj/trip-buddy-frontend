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
    <div style={{ padding: "20px" }}>
      <h1
        style={{ fontSize: "40px", textAlign: "center", marginBottom: "30px" }}
      >
        Najpopularniejsze podróże – dołącz do wspólnej przygody!
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "24px",
        }}
      >
        {trips.map((trip) => (
          <TripCard key={trip.id} trip={trip} currentUserId={currentUserId} />
        ))}
      </div>
    </div>
  );
}
