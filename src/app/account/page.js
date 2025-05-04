import Image from "next/image";

export default async function AccountPage() {
  const userId = "e7f027c7-74a0-4d53-8ec6-97a53df24cbc";
  const res = await fetch(`http://localhost:5223/api/user?id=${userId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <div style={{ padding: 20 }}>Błąd podczas ładowania użytkownika.</div>;
  }

  const user = await res.json();

  const avatarSrc =
    user.profilePictureURI && user.profilePictureURI !== ""
      ? user.profilePictureURI
      : "/images/avatar.jpg";

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "32px",
          marginBottom: "30px",
          fontWeight: "bold",
          color: "#139c8a",
          textAlign: "center",
        }}
      >
        Moje konto
      </h1>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          marginBottom: "40px",
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "12px",
          backgroundColor: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <Image
          src={avatarSrc}
          alt="Avatar"
          width={100}
          height={100}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid #139c8a",
          }}
        />
        <div>
          <h2 style={{ margin: 0, fontSize: "22px" }}>
            {(user.firstName || "Nieznane imię") +
              (user.lastName ? " " + user.lastName : "")}
          </h2>
          <p style={{ margin: 0, color: "#666" }}>{user.email}</p>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#f9f9f9",
          padding: "20px",
          borderRadius: "12px",
          border: "1px solid #eee",
        }}
      >
        <h3 style={{ marginBottom: "10px", color: "#333" }}>Twoje dane</h3>
        <p>
          <strong>Biogram:</strong> {user.bio || "Brak biogramu"}
        </p>

        <hr style={{ margin: "20px 0" }} />

        <h3 style={{ marginBottom: "10px", color: "#333" }}>
          Ustawienia konta
        </h3>
        <p>
          <strong>Adres e-mail:</strong> {user.email}
        </p>
      </div>
    </div>
  );
}
