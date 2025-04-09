// src/app/layout.js
import './globals.css';
import Header from './components/Header';

export const metadata = {
  title: "TripBuddy",
  description: "Aplikacja do oceniania i planowania wyjazdów",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body>
        <Header />
        <main style={{ padding: "20px" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
