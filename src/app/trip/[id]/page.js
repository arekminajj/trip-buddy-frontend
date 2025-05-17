import Image from "next/image";
import JoinTripButton from "./joinTripButton";
import formatDate from "@/app/common/formatDate";

export default async function TripDetailPage({ params }) {
  const tripId = await params.id;

  const tripRes = await fetch(`${process.env.BASE_URL}/api/trip/${tripId}`, { cache: 'no-store' });
  const trip = await tripRes.json();

  let ownerDetails = null;
  if (trip.owner?.id) {
    const ownerRes = await fetch(`${process.env.BASE_URL}/api/user?id=${trip.owner.id}`, { cache: 'no-store' });
    ownerDetails = await ownerRes.json();
  }

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
        <div style={{ position: "relative", width: "100%", height: "400px", marginBottom: "20px" }}>
          <Image
            src={trip.imageUrl || "/images/default.jpg"}
            alt="Trip image"
            fill
            style={{ objectFit: "cover", borderRadius: "12px" }}
          />
        </div>

        <p><strong>Opis:</strong> {trip.description}</p>
        <p><strong>📅 Termin:</strong> {formatDate(trip.startDate)} - {formatDate(trip.endDate)}</p>
        <p><strong>💵 Cena:</strong> {trip.price} PLN</p>
        <p><strong>🧍‍♂️ Maksymalna liczba uczestników:</strong> {trip.maxMembers}</p>
        <p><strong>📍 Trasa:</strong> {trip.startLocation} → {trip.endLocation}</p>

        <div style={{ marginTop: "20px" }}>
          <JoinTripButton tripId={tripId} />
        </div>

        {ownerDetails && (
          <div style={{ marginTop: "30px", paddingTop: "20px", borderTop: "1px solid #ccc" }}>
            <h2 style={{ fontSize: "22px", marginBottom: "10px" }}>Organizator wycieczki</h2>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <Image
                src={ownerDetails.profilePictureURI || "/images/avatar.jpg"}
                alt="owner pfp"
                width={100}
                height={100}
                style={{ borderRadius: "50%", objectFit: "cover" }}
              />
              <div>
                <p><strong>{trip.owner.userName}</strong></p>
                {ownerDetails.bio && <p style={{ fontStyle: "italic", color: "#666" }}>{ownerDetails.bio}</p>}
              </div>
            </div>
          </div>
        )}

        {trip.members && trip.members.length > 0 && (
          <div style={{ marginTop: "30px", paddingTop: "20px", borderTop: "1px solid #ccc" }}>
            <h2 style={{ fontSize: "22px", marginBottom: "10px" }}>Uczestnicy wyprawy</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {trip.members.map((member) => (
                <li
                  key={member.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "12px",
                    gap: "12px",
                    color: "#333",
                  }}
                >
                  <Image
                    src={member.profilePictureURI || "/images/avatar.jpg"}
                    alt={`Avatar of ${member.userName || member.email}`}
                    width={40}
                    height={40}
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                  />
                  <span>{member.userName || member.email}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
}
