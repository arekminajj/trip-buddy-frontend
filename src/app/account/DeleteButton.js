"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton() {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm("Czy na pewno chcesz usunąć konto?");
    if (!confirmed) return;

    try {
      const res = await fetch("/api/user", {
        method: "DELETE",
      });

      if (res.ok) {
        router.push("/api/auth/signout");
      } else {
        const data = await res.json();
        alert(`Błąd: ${data.error || "Nieznany błąd"}`);
      }
    } catch (err) {
      alert("Wystąpił błąd przy usuwaniu konta.");
    }
  };

  return (
    <button
      onClick={handleDelete}
      style={{
        padding: "10px 24px",
        backgroundColor: "#e63946",
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
      onMouseOver={(e) => (e.target.style.backgroundColor = "#ad2b31 ")}
      onMouseOut={(e) => (e.target.style.backgroundColor = "#e63946")}
    >
      Usuń konto
    </button>
  );
}
