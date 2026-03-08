import * as React from 'react';
import { SECTIONS } from './constants';

interface StickyNavigationProps {
	activeSection: string;
	isSticky: boolean;
	onNavigate: (sectionId: string) => void;
}

const NAV_LABELS: Record<string, string> = {
	overview: 'Overview',
	content: 'Content',
	reviews: 'Reviews',
	related: 'Related',
};

export const StickyNavigation = React.memo(function StickyNavigation({
	activeSection,
	isSticky,
	onNavigate,
}: StickyNavigationProps) {
	return (
		<div
			className={`bg-white border-b border-gray-200 transition-all duration-200 ${
				isSticky ? 'sticky top-[74px] z-50 shadow-sm' : ''
			}`}
		>
			<div className='max-w-7xl mx-auto px-4'>
				<nav className='flex space-x-0 overflow-x-auto'>
					{SECTIONS.map((section) => (
						<button
							key={section}
							onClick={() => onNavigate(section)}
							className={`px-3 sm:px-6 py-4 text-sm sm:text-base font-medium transition-colors whitespace-nowrap ${
								activeSection === section
									? 'bg-gray-100 text-gray-900 border-b-2 border-blue-600'
									: 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
							}`}
						>
							{NAV_LABELS[section]}
						</button>
					))}
				</nav>
			</div>
		</div>
	);
});
