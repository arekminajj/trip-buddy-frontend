import Image from "next/image";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import EditProfileButton from "./EditProfileButton";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) {
    return (
      <div style={{ padding: 20 }}>Zaloguj się aby odwiedzić swój profil!</div>
    );
  }

  const res = await fetch(process.env.BASE_URL + `/api/user/current`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  if (!res.ok) {
    return (
      <div style={{ padding: 20 }}>Błąd podczas ładowania użytkownika.</div>
    );
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
        Mój profil
      </h1>

      {/* BOX 1 – Avatar + dane */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
          marginBottom: "32px",
          padding: "24px",
          border: "1px solid #ddd",
          borderRadius: "16px",
          backgroundColor: "#ffffff",
          boxShadow: "0 6px 14px rgba(0,0,0,0.05)",
        }}
      >
        <div style={{ width: "100px", height: "100px" }}>
          <Image
            src={avatarSrc}
            alt="Avatar"
            width={100}
            height={100}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
              width: "100%",
              height: "100%",
              border: "2px solid #139c8a",
            }}
          />
        </div>
        <div>
          <h2 style={{ margin: 0, fontSize: "24px", fontWeight: "600" }}>
            {(user.firstName || "Nieznane imię") +
              (user.lastName ? " " + user.lastName : "")}
          </h2>
          {/* <p style={{ margin: "4px 0", color: "#666", fontSize: "15px" }}>
            {user.email}
          </p> */}
        </div>
      </div>

      {/* BOX 2 – Bio + email */}
      <div
        style={{
          backgroundColor: "#f0f4f4",
          padding: "24px",
          borderRadius: "16px",
          border: "1px solid #cce",
          boxShadow: "0 4px 10px rgba(0,0,0,0.04)",
        }}
      >
        <h3 style={{ marginBottom: "10px", color: "#333", fontSize: "18px" }}>
          Opis profilu
        </h3>
        <p style={{ fontSize: "15px", marginBottom: "12px" }}>
          <strong>Biogram:</strong> {user.bio || "Brak biogramu"}
        </p>

        <hr style={{ margin: "20px 0", borderColor: "#ccc" }} />

        <h3 style={{ marginBottom: "10px", color: "#333", fontSize: "18px" }}>
          Dane kontaktowe
        </h3>
        <p style={{ fontSize: "15px" }}>
          <strong>Adres e-mail:</strong> {user.email}
        </p>
      </div>

      {/* PRZYCISKI */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          marginTop: "30px",
        }}
      >
        <EditProfileButton />
        <DeleteButton />
      </div>
    </div>
  );
}
