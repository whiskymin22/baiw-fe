import * as React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	RadioGroup,
	RadioGroupItem,
} from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export type SkillLevel =
	| 'beginner'
	| 'intermediate'
	| 'advanced'
	| 'all';

interface SkillLevelFilterProps {
	value: SkillLevel;
	onChange: (value: SkillLevel) => void;
	className?: string;
}

const skillLevelOptions = [
	{ value: 'all', label: 'All Levels' },
	{ value: 'beginner', label: 'Beginner' },
	{ value: 'intermediate', label: 'Intermediate' },
	{ value: 'advanced', label: 'Advanced' },
];

export default function SkillLevelFilter({
	value,
	onChange,
	className = '',
}: SkillLevelFilterProps) {
	const [isOpen, setIsOpen] = React.useState(false);
	const containerRef = React.useRef<HTMLDivElement | null>(null);

	React.useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen]);

	return (
		<div className={`relative ${className}`} ref={containerRef}>
			<Button
				variant='outline'
				onClick={() => setIsOpen(!isOpen)}
				className='flex items-center gap-2 px-4 py-2 border-2 border-gray-200 rounded-lg hover:border-primary transition-colors'
				aria-expanded={isOpen}
				aria-controls='skill-level-menu'
			>
				<span className='text-sm font-medium'>Skill Level</span>
				{isOpen ? (
					<ChevronUp aria-hidden='true' className='w-4 h-4' />
				) : (
					<ChevronDown aria-hidden='true' className='w-4 h-4' />
				)}
			</Button>

			{isOpen && (
				<div
					className='absolute top-full left-0 mt-2 w-64 bg-white border-2 border-gray-200 rounded-lg shadow-lg z-10'
					id='skill-level-menu'
				>
					<div className='p-4'>
						<RadioGroup
							value={value}
							onValueChange={(value) => {
								onChange(value as SkillLevel);
								setIsOpen(false);
							}}
						>
							{skillLevelOptions.map((option) => (
								<div
									key={option.value}
									className='flex items-center space-x-2 py-2'
								>
									<RadioGroupItem
										value={option.value}
										id={option.value}
									/>
									<Label
										htmlFor={option.value}
										className='text-sm font-medium cursor-pointer'
									>
										{option.label}
									</Label>
								</div>
							))}
						</RadioGroup>
					</div>
				</div>
			)}
		</div>
	);
}
