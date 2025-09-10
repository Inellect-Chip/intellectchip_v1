"use client";

import { SignUp } from "@clerk/nextjs";
import { getRedirectPath } from "@/lib/redirect";

export default function RegisterPage() {
    const target = getRedirectPath();
    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <SignUp
                afterSignUpUrl={target}
                redirectUrl={target}
                signInUrl="/login"
            />
        </div>
    );
}
