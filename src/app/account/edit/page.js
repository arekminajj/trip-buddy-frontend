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

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          'url("https://images.unsplash.com/photo-1620812097331-ff636155488f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YWJzdHJhY3QlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      <AccountEditForm user={user} accessToken={session.accessToken} />
    </div>
  );
}
