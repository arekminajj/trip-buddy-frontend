import "./globals.css";
import Header from "./components/Header";
import SessionWrapper from "./components/SessionWrapper";

export const metadata = {
  title: "TripBuddy",
  description: "Aplikacja do oceniania i planowania wyjazdów",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <head>
        <link rel="icon" href="/images/favicon.ico" />
        <title>TripBuddy</title>
        <meta
          name="description"
          content="Aplikacja do oceniania i planowania wyjazdów"
        />
      </head>
      <body>
        <SessionWrapper>
          <Header />
          <main style={{ padding: 0, margin: 0 }}>{children}</main>
        </SessionWrapper>
      </body>
    </html>
  );
}
