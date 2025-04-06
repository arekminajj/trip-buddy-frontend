// app/trips/page.js
export default function TripsPage() {
    const trips = [
      { id: 1, name: "Tatry 2024", description: "Piękne widoki i górskie wędrówki" },
      { id: 2, name: "Mazury", description: "Kajaki i jeziora" },
    ];
  
    return (
      <div>
        <h2>Wszystkie wyjazdy</h2>
        <ul>
          {trips.map((trip) => (
            <li key={trip.id}>
              <h3>{trip.name}</h3>
              <p>{trip.description}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  