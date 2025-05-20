import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    const res = await fetch(process.env.BASE_URL + "/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ error: errorData.error || "Wystąpił błąd podczas rejestracji" }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Coś poszło nie tak" }, { status: 500 });
  }
}
