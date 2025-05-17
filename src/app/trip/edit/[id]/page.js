import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import TripEditForm from "./TripEditForm";

export default async function EditTripPage({ params }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return <div>Musisz być zalogowany.</div>;
  }

  const res = await fetch(`${process.env.BASE_URL}/api/trip/${params.id}`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) return <div>Nie znaleziono wycieczki.</div>;

  const trip = await res.json();

  return <TripEditForm trip={trip} accessToken={session.accessToken} />;
}
