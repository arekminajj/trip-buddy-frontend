import { redirect } from "next/navigation";
import Image from "next/image";

import JoinTripButton from "./joinTripButton";
import LeaveTripButton from "./leaveTripButton";
import DeleteTripButton from "./deleteTripButton";
import EditTripButton from "./editTripButton";
import formatDate from "@/app/common/formatDate";
import LeafletMap from "./LeafletMap";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

async function getCoordinates(location) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      location
    )}`
  );
  const data = await res.json();
  if (data?.[0]) {
    return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
  }
  return null;
}

export default async function TripDetailPage({ params }) {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) {
    redirect("/login");
  }

  const tripId = params.id;

  const tripRes = await fetch(`${process.env.BASE_URL}/api/trip/${tripId}`, {
    cache: "no-store",
  });
  if (!tripRes.ok)
    return <div style={{ padding: 20 }}>Nie znaleziono wycieczki.</div>;
  const trip = await tripRes.json();

  let ownerDetails = null;
  if (trip.owner?.id) {
    const ownerRes = await fetch(
      `${process.env.BASE_URL}/api/user?id=${trip.owner.id}`,
      { cache: "no-store" }
    );
    ownerDetails = await ownerRes.json();
  }

  const currentUserRes = await fetch(
    `${process.env.BASE_URL}/api/user/current`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  );

  if (!currentUserRes.ok) {
    return (
      <div style={{ padding: 20 }}>Błąd podczas ładowania użytkownika.</div>
    );
  }

  const now = new Date();
  const start = new Date(trip.startDate);
  const end = new Date(trip.endDate);
  const isOngoingOrPast = now >= start;

  const currentUser = await currentUserRes.json();
  const isOwner = currentUser.id === ownerDetails?.id;
  const isMember = trip.members?.some((m) => m.id === currentUser.id);

  const startCoords = await getCoordinates(trip.startLocation);
  const endCoords = await getCoordinates(trip.endLocation);

  return (
    <div
      style={{
        padding: "40px 20px",
        minHeight: "100vh",
        backgroundImage: `url("/images/tripdetailsbg.avif")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1
        style={{
          fontSize: "40px",
          marginBottom: "20px",
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
          fontWeight: "bold",
          fontStyle: "italic",
          color: "#000",
          textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
          letterSpacing: "0.5px",
        }}
      >
        {trip.name}
      </h1>

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "400px",
            marginBottom: "20px",
          }}
        >
          <Image
            src={trip.imageUrl || "/images/default.jpg"}
            alt="Trip image"
            fill
            style={{ objectFit: "cover", borderRadius: "12px" }}
          />
        </div>

        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: "10px",
            borderRadius: "12px",
            marginTop: "20px",
            fontFamily: "Arial, sans-serif",
            fontSize: "17px",
            lineHeight: "2",
            color: "#333",
          }}
        >
          <p>
            <strong>Opis:</strong> {trip.description}
          </p>
          <p>
            <strong>📅 Termin:</strong> {formatDate(trip.startDate)} -{" "}
            {formatDate(trip.endDate)}
          </p>
          <p>
            <strong>💵 Cena:</strong> {trip.price} PLN
          </p>
          <p>
            <strong>🧍‍♂️ Maksymalna liczba uczestników:</strong> {trip.maxMembers}
          </p>
          <p>
            <strong>📍 Trasa:</strong> {trip.startLocation} → {trip.endLocation}
          </p>
        </div>

        {startCoords && endCoords && (
          <LeafletMap startCoords={startCoords} endCoords={endCoords} />
        )}

        <div
          style={{
            marginTop: "25px",
            display: "flex",
            justifyContent: "center",
            gap: "60px",
            flexWrap: "wrap",
          }}
        >
          {isOwner ? (
            <>
              {new Date(trip.startDate) > new Date() && (
                <EditTripButton tripId={trip.id} width="180px" height="45px" />
              )}
              <DeleteTripButton tripId={tripId} width="180px" height="45px" />
            </>
          ) : isMember ? (
            <LeaveTripButton tripId={tripId} width="220px" height="45px" />
          ) : new Date(trip.startDate) > new Date() ? (
            <JoinTripButton tripId={tripId} width="220px" height="45px" />
          ) : null}
        </div>

        {ownerDetails && (
          <div
            style={{
              marginTop: "30px",
              paddingTop: "20px",
              borderTop: "3px solid #139c8a",
            }}
          >
            <h2
              style={{
                fontSize: "22px",
                marginBottom: "10px",
                color: "#333",
                fontWeight: "600",
              }}
            >
              Organizator wycieczki
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <Image
                  src={ownerDetails.profilePictureURI || "/images/avatar.jpg"}
                  alt="Avatar organizatora"
                  width={80}
                  height={80}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              <div>
                <p>
                  <strong>{trip.owner.userName}</strong>
                </p>
                {ownerDetails.bio && (
                  <p style={{ fontStyle: "italic", color: "#666" }}>
                    {ownerDetails.bio}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {trip.members && trip.members.length > 0 && (
          <div
            style={{
              marginTop: "30px",
              paddingTop: "20px",
              borderTop: "3px solid #139c8a",
            }}
          >
            <h2
              style={{
                fontSize: "22px",
                marginBottom: "10px",
                color: "#333",
                fontWeight: "540",
              }}
            >
              Uczestnicy wyprawy
            </h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {trip.members.map((member) => (
                <li
                  key={member.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "14px",
                    gap: "14px",
                    color: "#333",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={member.profilePictureURI || "/images/avatar.jpg"}
                      alt={`Avatar of ${member.userName || member.email}`}
                      width={48}
                      height={48}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <span style={{ fontSize: "16px", fontWeight: "500" }}>
                    {member.userName || member.email}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
