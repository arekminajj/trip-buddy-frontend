"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DeleteTripButton({
  tripId,
  width = "180px",
  height = "45px",
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Czy na pewno chcesz usunąć tę wycieczkę?")) return;

    setIsLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/Trip/${tripId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Błąd podczas usuwania");
      }

      router.push("/mytrips");
    } catch (err) {
      setMessage(err.message);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {message && (
        <p style={{ color: isError ? "red" : "green", marginBottom: "10px" }}>
          {message}
        </p>
      )}
      <button
        onClick={handleDelete}
        disabled={isLoading}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#c82333")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#dc3545")}
        style={{
          padding: "10px 20px",
          backgroundColor: "#dc3545",
          widows: width,
          height: height,
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: isLoading ? "not-allowed" : "pointer",
        }}
      >
        {isLoading ? "Usuwanie..." : "Usuń wycieczkę"}
      </button>
    </div>
  );
}
