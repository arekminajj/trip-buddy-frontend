import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AccountEditForm from "./AccountEditForm";

export default async function AccountEditPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return <div>Musisz być zalogowany.</div>;
  }

  const res = await fetch(`${process.env.BASE_URL}/api/user/current`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  const user = await res.json();

  return <AccountEditForm user={user} accessToken={session.accessToken} />;
}
