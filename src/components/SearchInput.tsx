import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    ariaLabel?: string;
    className?: string;
}

export default function SearchInput({
    value,
    onChange,
    placeholder = "Search courses…",
    ariaLabel = "Search courses",
    className = "",
}: SearchInputProps) {
    return (
        <div className={`relative ${className}`}>
            <Search
                aria-hidden="true"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4"
            />
            <Input
                type="search"
                name="search"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                aria-label={ariaLabel}
                autoComplete="off"
                inputMode="search"
                spellCheck={false}
                className="pl-10 pr-4 py-3 text-lg rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-0"
            />
        </div>
    );
}
