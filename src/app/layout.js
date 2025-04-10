import "./globals.css";
import HeaderWrapper from "./components/HeaderWrapper";

export const metadata = {
  title: "TripBuddy",
  description: "Aplikacja do oceniania i planowania wyjazdów",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body>
        <HeaderWrapper />
        <main style={{ padding: "20px" }}>{children}</main>
      </body>
    </html>
  );
}
