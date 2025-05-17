import Image from "next/image";

function formatDate(dateStr) {
    return new Intl.DateTimeFormat("pl-PL", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }).format(new Date(dateStr));
  }

export default async function TripDetailPage({ params }) {
  const tripId = params.id;

  const tripRes = await fetch(`${process.env.BASE_URL}/api/trip/${tripId}`);
  const trip = await tripRes.json();

  let ownerDetails = null;
  if (trip.owner?.id) {
    const ownerRes = await fetch(`${process.env.BASE_URL}/api/user?id=${trip.owner.id}`);
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
            src={trip.imageUrl || "https://i.ytimg.com/vi/-57pK7OqmQw/maxresdefault.jpg"}
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

        {ownerDetails && (
          <div style={{ marginTop: "30px", paddingTop: "20px", borderTop: "1px solid #ccc" }}>
            <h2 style={{ fontSize: "22px", marginBottom: "10px" }}>Organizator wyprawy</h2>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <Image
                src={ownerDetails.profilePictureURI}
                alt="Zdjęcie właściciela"
                width={100}
                height={100}
                style={{ borderRadius: "50%", objectFit: "cover" }}
              />
              <div>
                <p><strong>{trip.owner.userName}</strong></p>
                <p style={{ fontStyle: "italic", color: "#666" }}>{ownerDetails.bio}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
