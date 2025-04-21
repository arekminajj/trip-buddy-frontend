"use client";

import { useEffect, useState } from "react";
import TripCard from "./TripCard";
import TripCard2 from "./TripCard2";
import { usePathname } from "next/navigation";

export default function CardWrapper({trip}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname(); // Pobieramy aktualną ścieżkę

  useEffect(() => {
    // Funkcja sprawdzająca status logowania
    const checkAuthStatus = () => {
      const status = localStorage.getItem("loggedIn");
      setIsLoggedIn(status === "true");
    };

    // Sprawdzamy status przy montowaniu komponentu
    checkAuthStatus();

    // Dodajemy event listener dla zmian w localStorage
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    window.addEventListener("storage", handleStorageChange);

    // Dodajemy nasłuchiwanie na zmiany trasy
    // (dla przypadków gdy logowanie następuje w tej samej sesji)
    const interval = setInterval(checkAuthStatus, 500); // Sprawdzaj co 500ms

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [pathname]); // Zależność od ścieżki

  return isLoggedIn ? <TripCard2 trip={trip} /> : <TripCard trip={trip} />;
}
