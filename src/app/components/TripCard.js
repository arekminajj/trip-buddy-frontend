export default function TripCard({ trip }) {
  const randomParam = Math.floor(Math.random() * 1000);

  return (
    <div style={{
      width: '100%',
      maxWidth: '600px',
      height: '530px', // Stała wysokość karty
      margin: '0 auto 32px auto',
      border: '1px solid #ddd',
      borderRadius: '16px',
      overflow: 'hidden',
      backgroundColor: '#fff',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}>
      {/* Obrazek - stała wysokość */}
      <img 
        src={`https://picsum.photos/600/300?random=${randomParam}`}
        alt={`Zdjęcie z ${trip.title}`}
        style={{ 
          width: '100%',
          height: '220px', 
          objectFit: 'cover',
          flexShrink: 0 // Zapobiega zmianom wysokości
        }}
      />

      {/* Kontener treści z przewijaniem */}
      <div style={{
        padding: '20px',
        flex: 1,
        display: 'felx', // Dodaje przewijanie jeśli tekst jest za długi
        flexDirection: 'column', // Miejsce na przycisk
      }}>
        <h2 style={{ 
          marginBottom: '12px', 
          fontSize: '22px',
          fontWeight: '600'
        }}>
          {trip.title}
        </h2>
        
        <div style={{ marginBottom: '10px' }}>
          <p style={{ margin: '6px 0' }}>
            <span style={{ fontWeight: 'bold' }}>📍 Lokalizacja:</span> {trip.location}
          </p>
          <p style={{ margin: '6px 0' }}>
            <span style={{ fontWeight: 'bold' }}>📅 Data:</span> {trip.date}
          </p>
          <p style={{ margin: '6px 0' }}>
            <span style={{ fontWeight: 'bold' }}>💰 Cena:</span> {trip.price} zł
          </p>
          <p style={{ margin: '6px 0' }}>
            <span style={{ fontWeight: 'bold' }}>👥 Uczestnicy:</span> {trip.capacity} / {trip.capacity}
          </p>
        </div>

        {/* Opis z możliwością przewijania */}
        <div style={{ 
          marginTop: '15px',
          lineHeight: '1.5',
          maxHeight: '200px',
          overflowY: 'auto',
          paddingRight: '5px'
        }}>
          {trip.description}
        </div>
      </div>

      {/* Przycisk - stała pozycja na dole */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        backgroundColor: 'white',
        color: 'black',
        padding: '10px 20px',
        borderRadius: '8px',
        fontWeight: 'bold',
        cursor: 'pointer',
        border: '2px solid #139c8a',
        zIndex: 1 // Upewnia się, że przycisk jest na wierzchu
      }}>
        Zobacz szczegóły
      </div>
    </div>
  );
}