"use client";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline";
}

export const Button: React.FC<ButtonProps> = ({
    children,
    className,
    variant = "default",
    ...props
}) => {
    const base =
        "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none";
    const styles = {
        default: "bg-primary text-white hover:bg-primary/90",
        outline:
            "border border-border bg-transparent hover:bg-accent hover:text-accent-foreground",
    };

    return (
        <button
            className={cn(base, styles[variant], className)}
            {...props}
        >
            {children}
        </button>
    );
};
