import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface PerPageSelectorProps {
    value: number;
    onChange: (value: number) => void;
    options?: number[];
    className?: string;
}

export default function PerPageSelector({
    value,
    onChange,
    options = [6, 12, 24, 48],
    className = "",
}: PerPageSelectorProps) {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <span className="text-sm text-gray-600 hidden sm:inline">
                Show:
            </span>
            <Select
                value={value.toString()}
                onValueChange={(newValue) => onChange(parseInt(newValue))}
            >
                <SelectTrigger
                    className="w-16 sm:w-20 h-8"
                    aria-label="Courses per page"
                >
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option} value={option.toString()}>
                            {option}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <span className="text-sm text-gray-600 hidden sm:inline">
                per page
            </span>
        </div>
    );
}
