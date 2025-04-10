'use client';

import { useState } from 'react';
import TripCard from '../components/TripCard';
import mockTrips from '../data/mockTrips';

export default function BrowseTripsPage() {
  const [filter, setFilter] = useState('');

  const filteredTrips = mockTrips.filter((trip) =>
    trip.location.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1 style={{
        fontSize: '36px',
        marginBottom: '20px',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
        color: '#000',
        textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
      }}>
        Przeglądaj podróże
      </h1>

      {/* Pasek filtrowania */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginBottom: '30px' 
      }}>
        <input
          type="text"
          placeholder="Filtruj po lokalizacji (np. Tatry, Ustka...)"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            width: '300px',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '16px'
          }}
        />
      </div>

      {/* Lista wycieczek */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '24px'
      }}>
        {filteredTrips.length > 0 ? (
          filteredTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))
        ) : (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
            Brak wyników dla wybranych kryteriów.
          </p>
        )}
      </div>
    </div>
  );
}
