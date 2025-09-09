"use client";

import { cn } from "@/lib/utils";

export const Card = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn("rounded-xl border bg-card text-card-foreground shadow", className)}
        {...props}
    />
);

export const CardContent = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("p-6", className)} {...props} />
);
