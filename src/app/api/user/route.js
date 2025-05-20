import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function POST(req) {
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
                { error: errorData.error || "Deletion failed" },
                { status: 400 }
            );
        }

        return NextResponse.redirect(new URL("/api/auth/signout", req.url));
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}
