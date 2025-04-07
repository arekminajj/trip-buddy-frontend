// app/layout.js
import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: "TrippBuddy",
  description: "Aplikacja do oceniania i planowania wyjazdów",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body>
        <header style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          backgroundColor: "#f4f4f4",
          borderBottom: "1px solid #ccc",
        }}>
          {/* Lewa strona - logo + kafelki */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {/* Logo + nazwa */}
            <Link href="/" style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontWeight: "bold",
              fontSize: "20px",
              color: "black",
              textDecoration: "none"
            }}>
              <span style={{ fontSize: "24px" }}>🌍</span> TrippBuddy
            </Link>

            {/* Kafelki nawigacyjne */}
            <Link href="/trips" style={navCardStyle}>🌄 My Trips</Link>
            <Link href="/messaging" style={navCardStyle}>💬 Messaging</Link>
          </div>

          {/* Prawa strona - profil */}
          <div style={profileStyle}>
            <span style={{ marginRight: "8px" }}>👤</span>
            <span style={{ fontWeight: "bold" }}>My Profile</span>
          </div>
        </header>

        <main style={{ padding: "20px" }}>
          {children}
        </main>
      </body>
    </html>
  );
}

// Styl kafelka
const navCardStyle = {
  backgroundColor: "#fff",
  padding: "8px 16px",
  borderRadius: "8px",
  textDecoration: "none",
  color: "#333",
  border: "1px solid #ddd",
  fontWeight: "bold",
  transition: "0.2s",
};

// Styl profilu
const profileStyle = {
  backgroundColor: "#fff",
  padding: "8px 16px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  cursor: "pointer",
};