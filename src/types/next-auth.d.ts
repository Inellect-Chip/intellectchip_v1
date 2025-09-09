// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser, DefaultJWT } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            name: string;
            image?: string;
            accessToken?: string;
            role?: string;
        };
    }

    interface User {
        id: string;
        email: string;
        name: string;
        image?: string;
        accessToken?: string;
        role?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        email: string;
        name: string;
        image?: string;
        accessToken?: string;
        role?: string;
    }
}
