import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: "TrippBuddy",
  description: "Aplikacja do oceniania i planowania wyjazdów",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body style={{ display: 'flex', flexDirection: 'column', height: '100vh', margin: 0 }}>
        {/* Nagłówek */}
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 20px',
          backgroundColor: '#f0f2f5',
          borderBottom: '1px solid #ddd',
        }}>
          <Link href="/" style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', textDecoration: 'none' }}>
            🌍 TrippBuddy
          </Link>
          <div style={{
            padding: '8px 16px',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '8px',
            cursor: 'pointer',
            color: 'black',
          }}>
            👤 My Profile
          </div>
        </header>

        {/* Główna sekcja - sidebar + zawartość */}
        <div style={{ display: 'flex', flex: 1 }}>
          <Sidebar />
          <main style={{ flex: 1, padding: '20px' }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

// Sidebar jako osobny komponent
function Sidebar() {
  return (
    <nav style={{
      width: '250px',
      backgroundColor: '#fafafa',
      borderRight: '1px solid #ddd',
      padding: '20px',
    }}>
      <Section title="📂 Trip Management" items={[
        { href: "/trips/create", label: "➕ Create Trip" },
        { href: "/trips/edit", label: "✏️ Edit/Delete Trip" },
        { href: "/trips", label: "📁 My Trips" },
      ]} />

      <Section title="🔍 Trip Discovery" items={[
        { href: "/discovery", label: "🔎 Browse Trips" },
        { href: "/discovery/filter", label: "🎯 Filter Trips" },
        { href: "/discovery/details", label: "🧭 Trip Details" },
      ]} />

      <Section title="👥 Participation" items={[
        { href: "/participation/request", label: "🙋 Request to Join" },
        { href: "/participation/accept", label: "✅ Accept/Reject Requests" },
        { href: "/participation/list", label: "📋 Participants" },
      ]} />

      <Section title="💬 Communication" items={[
        { href: "/messaging", label: "✉️ Messages" },
        { href: "/messaging/notifications", label: "🔔 Notifications" },
      ]} />

      <Section title="👤 Profile" items={[
        { href: "/profile", label: "📝 View/Edit Info" },
        { href: "/profile/friends", label: "🤝 Friend Connections" },
      ]} />
    </nav>
  );
}

function Section({ title, items }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#888' }}>{title}</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map(item => (
          <li key={item.href}>
            <Link href={item.href} style={{ textDecoration: 'none', color: '#333', display: 'block', padding: '6px 0' }}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}