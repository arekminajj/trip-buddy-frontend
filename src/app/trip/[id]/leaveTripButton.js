"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LeaveTripButton({
  tripId,
  width = "180px",
  height = "45px",
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleLeave = async () => {
    if (!session?.accessToken) {
      setMessage("Zaloguj się, aby opuścić wycieczkę.");
      setIsError(true);
      return;
    }

    setIsLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/trip/${tripId}/leave`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );

      if (!res.ok) {
        const error = await res.text();
        throw new Error(error || "Błąd podczas opuszczania wycieczki");
      }

      setMessage("Opuściłeś wycieczkę");
      setIsError(false);
      router.refresh();
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
        onClick={handleLeave}
        disabled={isLoading}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#c9302c")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#d9534f")}
        style={{
          padding: "10px 20px",
          backgroundColor: "#d9534f",
          color: "white",
          width: width,
          height: height,
          border: "none",
          borderRadius: "5px",
          cursor: isLoading ? "not-allowed" : "pointer",
        }}
      >
        {isLoading ? "Ładowanie..." : "Opuść wycieczkę"}
      </button>
    </div>
  );
}
