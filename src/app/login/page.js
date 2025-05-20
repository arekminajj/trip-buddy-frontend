"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Nieprawidłowy login lub hasło");
    } else {
      router.push("/");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #e0f7f4, #f9f9f9)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "100px 20px 20px 20px",
      }}
    >
      <style jsx>{`
        input {
          border: 2px solid #ccc;
          transition: all 0.3s ease;
          font-weight: 500;
        }
        input:hover {
          border-color: #888;
        }
        input:focus {
          border-color: #139c8a;
          outline: none;
          box-shadow: 0 0 0 2px rgba(19, 156, 138, 0.3);
        }
      `}</style>

      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#139c8a",
            fontSize: "24px",
            marginBottom: "20px",
            fontWeight: "bold",
          }}
        >
          Zaloguj się
        </h2>

        <form
          onSubmit={handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <div>
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "600",
              }}
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
              placeholder="Twój email"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                fontSize: "16px",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "600",
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
              placeholder="Wprowadź hasło"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                fontSize: "16px",
              }}
            />
          </div>

          {error && (
            <p
              style={{
                color: "red",
                textAlign: "center",
                fontSize: "14px",
                marginTop: "-5px",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#139c8a",
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0d8a7a")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#139c8a")}
          >
            Zaloguj się
          </button>

          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              marginTop: "10px",
              color: "#666",
            }}
          >
            Nie masz konta?{" "}
            <Link
              href="/register"
              style={{
                color: "#139c8a",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Zarejestruj się
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
