"use client";

import { SignIn } from "@clerk/nextjs";
import { getRedirectPath } from "@/lib/redirect";

export default function LoginPage() {
    const target = getRedirectPath();
    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <SignIn
                appearance={{ elements: { formButtonPrimary: "bg-black" } }}
                afterSignInUrl={target}
                redirectUrl={target}
                signUpUrl="/register"
            />
        </div>
    );
}
