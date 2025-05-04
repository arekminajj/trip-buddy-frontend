import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const res = await fetch(process.env.BASE_URL + "/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: credentials?.email,
                            password: credentials?.password,
                        }),
                    });

                    const contentType = res.headers.get("content-type");

                    let data;
                    if (contentType && contentType.includes("application/json")) {
                        data = await res.json();
                    } else {
                        const text = await res.text();
                        throw new Error(text);
                    }

                    if (!res.ok) {
                        throw new Error(data.message || "Login failed");
                    }

                    return {
                        id: data.userId,
                        accessToken: data.accessToken,
                        refreshToken: data.refreshToken,
                        expiresIn: data.expiresIn,
                    };
                } catch (err) {
                    console.error("Login error:", err);
                    return null;
                }
            }

        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                token.expiresIn = user.expiresIn;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            session.refreshToken = token.refreshToken;
            session.expiresIn = token.expiresIn;
            return session;
        },
    },
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
