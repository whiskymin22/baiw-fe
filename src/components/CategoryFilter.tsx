import * as React from "react";
import { cn } from "@/lib/utils";

export type Category = "all" | "shirts" | "pants" | "dresses" | "jackets" | "shoes" | "accessories";

const CATEGORIES: { value: Category; label: string }[] = [
	{ value: "all", label: "All" },
	{ value: "shirts", label: "Shirts" },
	{ value: "pants", label: "Pants" },
	{ value: "dresses", label: "Dresses" },
	{ value: "jackets", label: "Jackets" },
	{ value: "shoes", label: "Shoes" },
	{ value: "accessories", label: "Accessories" },
];

interface CategoryFilterProps {
	value: Category;
	onChange: (value: Category) => void;
	className?: string;
}

export default function CategoryFilter({
	value,
	onChange,
	className,
}: CategoryFilterProps) {
	return (
		<div className={cn("flex flex-wrap gap-2", className)}>
			{CATEGORIES.map((cat) => (
				<button
					key={cat.value}
					type="button"
					onClick={() => onChange(cat.value)}
					className={cn(
						"px-4 py-2 rounded-full text-sm font-medium transition-colors",
						value === cat.value
							? "bg-stone-900 text-white"
							: "bg-stone-100 text-stone-700 hover:bg-stone-200"
					)}
				>
					{cat.label}
				</button>
			))}
		</div>
	);
}
