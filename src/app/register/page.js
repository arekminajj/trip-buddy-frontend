"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  async function handleRegister(e) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push("/api/auth/signin");
    } else {
      const data = await res.json();
      setError(data.error || "Nie udało się stworzyć konta");
    }
  }

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "black",
          fontSize: "20px",
        }}
      >
        Zarejestruj się
      </h2>

      <form
        onSubmit={handleRegister}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        {/* Styl dla wszystkich inputów */}
        <style jsx>{`
          input {
            transition: all 0.3s ease;
          }
          input:hover {
            border-color: #888;
          }
          input:focus {
            border-color: #139c8a;
            outline: none;
            box-shadow: 0 0 0 2px rgba(19, 156, 138, 0.2);
          }
        `}</style>

        {/* Pole Email */}
        <div>
          <label
            htmlFor="email"
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "500",
            }}
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: "6px",
              border: "1px solid #ddd",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Pole Hasło */}
        <div>
          <label
            htmlFor="password"
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "500",
            }}
          >
            Hasło
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: "6px",
              border: "1px solid #ddd",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Komunikaty o błędzie i sukcesie */}
        {error && (
          <div
            style={{
              color: "red",
              textAlign: "center",
              margin: "10px 0",
            }}
          >
            {error}
          </div>
        )}

        {/* Link do logowania */}
        <p
          style={{
            textAlign: "center",
            fontSize: "14px",
            margin: "10px 0 0 0",
            color: "#666",
          }}
        >
          Masz już konto?{" "}
          <Link
            href="/login"
            style={{
              color: "#139c8a",
              fontWeight: "bold",
              textDecoration: "none",
              ":hover": {
                textDecoration: "underline",
              },
            }}
          >
            Zaloguj się
          </Link>
        </p>

        {/* Przycisk Submit */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#139c8a",
            color: "white",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            marginTop: "10px",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0d8a7a")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#139c8a")}
        >
          Zarejestruj się
        </button>
      </form>
    </div>
  );
}