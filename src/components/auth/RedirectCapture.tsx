"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { saveRedirectPath } from "@/lib/redirect";

const BLOCK = new Set(["/login", "/register"]);

export default function RedirectCapture() {
    const pathname = usePathname();
    useEffect(() => {
        if (pathname && !BLOCK.has(pathname)) {
            saveRedirectPath(pathname);
        }
    }, [pathname]);
    return null;
}
