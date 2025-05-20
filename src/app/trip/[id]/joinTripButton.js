'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function JoinTripButton({ tripId }) {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const handleJoin = async () => {
    if (status !== 'authenticated') {
      setMessage('Zaloguj się aby dołączyć');
      setIsError(true);
      return;
    }

    const token = session?.accessToken;
    if (!token) {
      setMessage('Brak tokenu');
      setIsError(true);
      return;
    }

    setIsLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL +`/api/trip/${tripId}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const contentType = res.headers.get('content-type') || '';
      let data;

      if (contentType.includes('application/json')) {
        data = await res.json();
      } else {
        const text = await res.text();
        data = { message: text };
      }

      if (res.ok) {
        setMessage('Dołączyłeś do wycieczki!');
        setIsError(false);
        router.refresh();
      } else {
        setMessage(data.message || 'Nie udało się dołączyć');
        setIsError(true);
      }

    } catch (err) {
      console.error(err);
      setMessage('Wystąpił błąd podczas dołączania');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {message && (
        <p style={{ marginBottom: '10px', color: isError ? 'red' : 'green' }}>
          {message}
        </p>
      )}
      <button
        onClick={handleJoin}
        disabled={isLoading}
        style={{
          padding: '10px 20px',
          backgroundColor: isLoading ? '#6c757d' : '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          fontSize: '16px'
        }}
      >
        {isLoading ? 'Ładowanie...' : 'Dołącz do wycieczki'}
      </button>
    </div>
  );
}
