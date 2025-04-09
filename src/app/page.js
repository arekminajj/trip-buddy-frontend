import TripCard from './components/TripCard';
import mockTrips from './data/mockTrips';

export default function HomePage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ 
        fontSize: '40px',
        marginBottom: '20px',
        textAlign: 'center',       /* Wyśrodkowanie tekstu */
        fontFamily: 'Arial, sans-serif',  /* Zmiana czcionki */
        fontWeight: 'bold',       /* Pogrubienie */
        color: '#000',            /* Czarny kolor */
        textShadow: '1px 1px 2px rgba(0,0,0,0.1)', /* Subtelny cień dla lepszej czytelności */
        letterSpacing: '0.5px'    /* Lekkie rozstrzelenie liter */
        }}>
          Najpopularniejsze podróże - dołącz do wspólnej przygody!
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
        {mockTrips.map((trip, index) => (
          <TripCard key={index} trip={trip} />
        ))}
      </div>
    </div>
  );
}