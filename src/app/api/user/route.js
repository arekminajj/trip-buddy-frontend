import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function DELETE(req) {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) {
    return NextResponse.redirect("/login");
  }

  try {
    const res = await fetch(process.env.BASE_URL + "/api/user", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json(
        { error: errorData.error || "Usunięcie konta nie powiodło się" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Coś poszło nie tak" }, { status: 500 });
  }
}
