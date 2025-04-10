'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function TripCard({ trip }) {
  const [randomParam, setRandomParam] = useState(null);

  useEffect(() => {
    setRandomParam(Math.floor(Math.random() * 1000));
  }, []);

  if (randomParam === null) return null;

  return (
    <div style={{
      width: '100%',
      maxWidth: '600px',
      height: '530px',
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
      <div style={{ width: '100%', height: '220px', position: 'relative' }}>
        <Image
          src={`https://picsum.photos/600/300?random=${randomParam}`}
          alt={`Zdjęcie z ${trip.title}`}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 600px) 100vw, 600px"
        />
      </div>

      <div style={{
        padding: '20px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
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
        zIndex: 1
      }}>
        Zobacz szczegóły
      </div>
    </div>
  );
}
