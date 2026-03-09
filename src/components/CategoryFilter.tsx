import { cn } from '@/lib/utils';

export type Category = 'all' | 'shirts' | 'pants' | 'dresses' | 'jackets' | 'shoes' | 'accessories';

const CATEGORIES: { value: Category; label: string }[] = [
	{ value: 'all', label: 'All' },
	{ value: 'shirts', label: 'Shirts' },
	{ value: 'pants', label: 'Pants' },
	{ value: 'dresses', label: 'Dresses' },
	{ value: 'jackets', label: 'Jackets' },
	{ value: 'shoes', label: 'Shoes' },
	{ value: 'accessories', label: 'Accessories' },
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
		<div className={cn('flex flex-wrap gap-1.5', className)}>
			{CATEGORIES.map((cat) => (
				<button
					key={cat.value}
					type='button'
					onClick={() => onChange(cat.value)}
					className={cn(
						'px-3.5 py-1.5 rounded-full text-xs font-medium transition-all',
						value === cat.value
							? 'bg-gray-900 text-white shadow-sm'
							: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
					)}
				>
					{cat.label}
				</button>
			))}
		</div>
	);
}
