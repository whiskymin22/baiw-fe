import { cn } from '@/lib/utils';

export type Gender = 'all' | 'men' | 'women' | 'unisex';

const GENDERS: { value: Gender; label: string }[] = [
	{ value: 'all', label: 'All' },
	{ value: 'men', label: 'Men' },
	{ value: 'women', label: 'Women' },
	{ value: 'unisex', label: 'Unisex' },
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
		<div className={cn('flex flex-wrap gap-1.5', className)}>
			{GENDERS.map((g) => (
				<button
					key={g.value}
					type='button'
					onClick={() => onChange(g.value)}
					className={cn(
						'px-3.5 py-1.5 rounded-full text-xs font-medium transition-all',
						value === g.value
							? 'bg-gray-900 text-white shadow-sm'
							: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
					)}
				>
					{g.label}
				</button>
			))}
		</div>
	);
}
