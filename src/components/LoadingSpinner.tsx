import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg";
    className?: string;
}

export default function LoadingSpinner({
    size = "md",
    className = "",
}: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: "h-6 w-6",
        md: "h-12 w-12",
        lg: "h-16 w-16",
    };

    return (
        <div
            className={`flex justify-center items-center ${className}`}
            role="status"
            aria-live="polite"
        >
            <Loader2
                aria-hidden="true"
                className={`animate-spin motion-reduce:animate-none text-gray-900 ${sizeClasses[size]}`}
            />
            <span className="sr-only">Loading…</span>
        </div>
    );
}
