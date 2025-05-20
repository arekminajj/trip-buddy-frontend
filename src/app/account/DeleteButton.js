'use client';

import { useRouter } from 'next/navigation';

export default function DeleteButton() {
    const router = useRouter();

    const handleDelete = async () => {
        const confirmed = window.confirm('Czy na pewno chcesz usunąć konto?');
        if (!confirmed) return;

        try {
            const res = await fetch('/api/user', {
                method: 'DELETE',
            });

            if (res.ok) {
                router.push('/api/auth/signout');
            } else {
                const data = await res.json();
                alert(`Błąd: ${data.error || 'Nieznany błąd'}`);
            }
        } catch (err) {
            alert('Wystąpił błąd przy usuwaniu konta.');
        }
    };

    return (
        <button
            onClick={handleDelete}
            style={{
                marginTop: '30px',
                padding: '10px 20px',
                backgroundColor: '#e63946',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
            }}
        >
            Usuń konto
        </button>
    );
}
