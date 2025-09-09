"use client";

import { cn } from "@/lib/utils";
import React from "react";

export const Input = React.forwardRef<
    HTMLInputElement,
    React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
    return (
        <input
            ref={ref}
            className={cn(
                "w-full px-4 py-2 border border-border rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary",
                className
            )}
            {...props}
        />
    );
});
Input.displayName = "Input";
