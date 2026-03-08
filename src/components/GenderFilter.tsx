import * as React from "react";
import { cn } from "@/lib/utils";

export type Gender = "all" | "men" | "women" | "unisex";

const GENDERS: { value: Gender; label: string }[] = [
	{ value: "all", label: "All" },
	{ value: "men", label: "Men" },
	{ value: "women", label: "Women" },
	{ value: "unisex", label: "Unisex" },
];

interface GenderFilterProps {
	value: Gender;
	onChange: (value: Gender) => void;
	className?: string;
}

export default function GenderFilter({
	value,
	onChange,
	className,
}: GenderFilterProps) {
	return (
		<div className={cn("flex flex-wrap gap-2", className)}>
			{GENDERS.map((g) => (
				<button
					key={g.value}
					type="button"
					onClick={() => onChange(g.value)}
					className={cn(
						"px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
						value === g.value
							? "bg-stone-800 text-white"
							: "bg-stone-100 text-stone-600 hover:bg-stone-200"
					)}
				>
					{g.label}
				</button>
			))}
		</div>
	);
}
