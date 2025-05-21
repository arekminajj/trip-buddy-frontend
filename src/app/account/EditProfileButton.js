"use client";

import Link from "next/link";

export default function EditProfileButton() {
  return (
    <Link href="/account/edit">
      <button
        style={{
          padding: "10px 24px",
          backgroundColor: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontSize: "15px",
          fontWeight: "500",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          transition: "background-color 0.3s",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#1c37a2")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#0070f3")}
      >
        Edytuj dane
      </button>
    </Link>
  );
}
