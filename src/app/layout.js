import "./globals.css";
import HeaderWrapper from "./components/HeaderWrapper";
import SessionWrapper from "./components/SessionWrapper"; // 👈

export const metadata = {
  title: "TripBuddy",
  description: "Aplikacja do oceniania i planowania wyjazdów",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body>
        <SessionWrapper>
          <HeaderWrapper />
          <main style={{ padding: "20px" }}>{children}</main>
        </SessionWrapper>
      </body>
    </html>
  );
}
