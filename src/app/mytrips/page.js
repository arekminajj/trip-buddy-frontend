import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import TripCard from "../components/TripCard";

export default async function MyTripsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) {
    return (
      <div style={{ padding: 20 }}>
        Zaloguj się, aby zobaczyć swoje podróże.
      </div>
    );
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

  const organizedTrips = allTrips.filter(
    (trip) => trip.owner?.id === currentUser.id
  );
  const participantTrips = allTrips.filter(
    (trip) => trip.owner?.id !== currentUser.id
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          "url('/images/mytripsbg.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        {/* Lewa kolumna */}
        <div
          style={{
            flex: 1,
            borderRight: "5px solid #139c8a",
            paddingRight: "20px",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "25px",
              color: "black",
              fontSize: "40px",
              fontWeight: "bold",
            }}
          >
            Uczestniczysz
          </h2>
          {participantTrips.length > 0 ? (
            participantTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))
          ) : (
            <p style={{ textAlign: "center", fontStyle: "italic" }}>
              Nie bierzesz udziału w żadnej wycieczce!
            </p>
          )}
        </div>

        {/* Prawa kolumna */}
        <div style={{ flex: 1, paddingLeft: "20px" }}>
          <h2
            style={{
              textAlign: "center",
              marginBottom: "25px",
              color: "black",
              fontSize: "40px",
              fontWeight: "bold",
            }}
          >
            Organizujesz
          </h2>
          {organizedTrips.length > 0 ? (
            organizedTrips.map((trip) => <TripCard key={trip.id} trip={trip} />)
          ) : (
            <p style={{ textAlign: "center", fontStyle: "italic" }}>
              Nie organizujesz żadnej wycieczki!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
