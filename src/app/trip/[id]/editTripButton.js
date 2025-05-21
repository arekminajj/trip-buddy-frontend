"use client";

import { useRouter } from "next/navigation";

export default function EditTripButton({
  tripId,
  width = "180px",
  height = "45px",
}) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/trip/edit/${tripId}`)}
      onMouseOver={(e) => (e.target.style.backgroundColor = "#176bcb")}
      onMouseOut={(e) => (e.target.style.backgroundColor = "#2183f2")}
      style={{
        padding: "10px 20px",
        backgroundColor: "#2183f2",
        color: "#fff",
        width: width,
        height: height,
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        marginBottom: "10px",
        transition: "background-color 0.3s ease",
      }}
    >
      Edytuj wycieczkę
    </button>
  );
}
