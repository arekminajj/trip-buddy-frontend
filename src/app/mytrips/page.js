import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import TripCard from "../components/TripCard";

export default async function MyTripsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) {
    return <div style={{ padding: 20 }}>Zaloguj się, aby zobaczyć swoje podróże.</div>;
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session.accessToken}`,
  };

  const [userRes, participantRes] = await Promise.all([
    fetch(process.env.BASE_URL + "/api/user/current", {
      cache: "no-store",
      headers,
    }),
    fetch(process.env.BASE_URL + "/api/trip/mine", {
      cache: "no-store",
      headers,
    }),
  ]);

  const currentUser = await userRes.json();
  const allTrips = await participantRes.json();

  const organizedTrips = allTrips.filter(trip => trip.owner?.id === currentUser.id);
  const participantTrips = allTrips.filter(trip => trip.owner?.id !== currentUser.id);

  return (
    <div style={{ display: "flex", padding: "20px", gap: "20px" }}>
      {/* Lewa kolumna */}
      <div style={{ flex: 1, borderRight: "5px solid #139c8a", paddingRight: "20px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "25px", color: "black", fontSize: "20px", fontWeight: "bold" }}>Uczestniczysz</h2>
        {participantTrips.length > 0 ? (
          participantTrips.map((trip) => <TripCard key={trip.id} trip={trip} />)
        ) : (
          <p style={{ textAlign: "center", fontStyle: "italic" }}>Nie bierzesz udziału w żadnej wycieczce!</p>
        )}
      </div>

      {/* Prawa kolumna */}
      <div style={{ flex: 1, paddingLeft: "20px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "25px", color: "black", fontSize: "20px", fontWeight: "bold"  }}>Organizujesz</h2>
        {organizedTrips.length > 0 ? (
          organizedTrips.map((trip) => <TripCard key={trip.id} trip={trip} />)
        ) : (
          <p style={{ textAlign: "center", fontStyle: "italic" }}>Nie organizujesz żadnej wycieczki!</p>
        )}
      </div>
    </div>
  );
}
