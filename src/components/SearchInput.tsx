import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

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
	placeholder = 'Search products...',
	ariaLabel = 'Search products',
	className = '',
}: SearchInputProps) {
	return (
		<div className={`relative ${className}`}>
			<Search
				aria-hidden='true'
				className='absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4'
			/>
			<Input
				type='search'
				name='search'
				placeholder={placeholder}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				aria-label={ariaLabel}
				autoComplete='off'
				inputMode='search'
				spellCheck={false}
				className='pl-10 pr-4 h-11 rounded-xl border-gray-200 focus:border-gray-400 focus:ring-gray-400 text-sm'
			/>
		</div>
	);
}
