// src/app/components/Header.js
import Link from 'next/link';
import { MapPinned } from 'lucide-react';

export default function Header() {
  return (
    <header style={{
      position: "relative", // dla pozycjonowania absolutnego
      height: "70px", // stała wysokość nagłówka
      backgroundColor: "#139c8a",
      borderBottom: "1px solid #ccc",
      padding: "0 20px",
    }}>

      {/* Logo - pozycjonowanie absolutne lewe */}
      <div style={{
        position: "absolute",
        left: "20px",
        top: "50%",
        transform: "translateY(-50%)",
      }}>
        <div style={{ 
          fontWeight: "bold", 
          fontSize: "30px", 
          display: "flex", 
          alignItems: "center", 
          gap: "8px", 
          color: "white" 
        }}>
          <MapPinned size={30} color="white" />
          TripBuddy
        </div>
      </div>




      {/* Przyciski - pozycjonowanie absolutne prawe */}
      <div style={{
        position: "absolute",
        right: "20px",
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        gap: "10px",
      }}>

        {/* Przycisk Zaloguj się */}
        <Link href="/login" style={{
          backgroundColor: "#fff",
          padding: "8px 16px",
          borderRadius: "9999px",
          border: "1px solid #ddd",
          textDecoration: "none",
          fontWeight: "bold",
          color: "#333",
          transition: "all 0.3s ease",
        }}>
          Zaloguj się
        </Link>
      </div>



      {/*
      <div style={{
        position: "absolute",
        left: "300px",
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        gap: "20px",
      }}>


        <Link href="/search" style={{
          backgroundColor: "#fff",
          padding: "8px 16px",
          borderRadius: "9999px",
          border: "1px solid #ddd",
          textDecoration: "none",
          fontWeight: "bold",
          color: "#333",
          transition: "all 0.3s ease",
        }}>
          Przeglądaj podróże
        </Link>


        <Link href="/search" style={{
          backgroundColor: "#fff",
          padding: "8px 16px",
          borderRadius: "9999px",
          border: "1px solid #ddd",
          textDecoration: "none",
          fontWeight: "bold",
          color: "#333",
          transition: "all 0.3s ease",
        }}>
          Dodaj ogłoszenie
        </Link>


        <Link href="/search" style={{
          backgroundColor: "#fff",
          padding: "8px 16px",
          borderRadius: "9999px",
          border: "1px solid #ddd",
          textDecoration: "none",
          fontWeight: "bold",
          color: "#333",
          transition: "all 0.3s ease",
        }}>
          Moje podróże
        </Link>

      </div>  
      */}

    </header>
  );
}