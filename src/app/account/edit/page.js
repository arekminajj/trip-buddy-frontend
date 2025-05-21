import AccountEditForm from "./AccountEditForm";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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
        backgroundImage: 'url("/images/editaccountbg.avif")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "0px 20px",
      }}
    >
      <AccountEditForm user={user} accessToken={session.accessToken} />
    </div>
  );
}
