'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('loggedIn', 'true');
      setError('');
      router.push('/');
    } else {
      setError('Nieprawidłowy login lub hasło');
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '400px', 
      margin: '0 auto' 
    }}>
      <h2 style={{ 
        textAlign: 'center',
        color: 'black',
        fontSize: '20px'
      }}>
        Zaloguj się
      </h2>
      
      <form 
        onSubmit={handleLogin} 
        style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '15px',
          maxWidth: '400px',
          margin: '0 auto',
          padding: '20px'
        }}
      >
        {/* Globalne style dla inputów */}
        <style jsx>{`
          input {
            transition: all 0.3s ease;
          }
          input:hover {
            border-color: #888;
          }
          input:focus {
            border-color: #139c8a;
            outline: none;
            box-shadow: 0 0 0 2px rgba(19, 156, 138, 0.2);
          }
        `}</style>

        {/* Pole Nazwa użytkownika */}
        <div>
          <label 
            htmlFor="username" 
            style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: '500'
            }}
          >
            Email
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '6px',
              border: '1px solid #ddd',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Pole Hasło */}
        <div>
          <label 
            htmlFor="password" 
            style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: '500'
            }}
          >
            Hasło
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '6px',
              border: '1px solid #ddd',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Komunikat o błędzie */}
        {error && (
          <p style={{ 
            color: 'red', 
            textAlign: 'center',
            margin: '0',
            fontSize: '14px'
          }}>
            {error}
          </p>
        )}

        {/* Link do rejestracji */}
        <p style={{ 
          textAlign: 'center', 
          fontSize: '14px', 
          margin: '10px 0 0 0',
          color: '#666'
        }}>
          Nie masz konta?{' '}
          <Link 
            href="/register" 
            style={{ 
              color: '#139c8a', 
              fontWeight: 'bold', 
              textDecoration: 'none',
              ':hover': {
                textDecoration: 'underline'
              }
            }}
          >
            Zarejestruj się
          </Link>
        </p>

        {/* Przycisk logowania */}
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: '#139c8a',
            color: 'white',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            marginTop: '15px',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0d8a7a'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#139c8a'}
        >
          Zaloguj się
        </button>
      </form>
    </div>
  );
}