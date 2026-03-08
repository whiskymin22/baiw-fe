import { useState, useEffect, useCallback } from 'react';
import { SECTIONS, STICKY_OFFSET, SCROLL_OFFSET } from '../constants';

type Section = (typeof SECTIONS)[number];

export function useScrollSpy() {
	const [activeSection, setActiveSection] = useState<Section>(
		SECTIONS[0],
	);
	const [isSticky, setIsSticky] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			setIsSticky(scrollTop > STICKY_OFFSET);

			// Update active section based on scroll position
			const sectionElements = SECTIONS.map((id) =>
				document.getElementById(id),
			);

			for (let i = sectionElements.length - 1; i >= 0; i--) {
				const element = sectionElements[i];
				if (element) {
					const rect = element.getBoundingClientRect();
					if (rect.top <= 100) {
						setActiveSection(SECTIONS[i]);
						break;
					}
				}
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const scrollToSection = useCallback((sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			const elementPosition = element.offsetTop - SCROLL_OFFSET;
			const prefersReducedMotion = window.matchMedia(
				'(prefers-reduced-motion: reduce)',
			).matches;
			window.scrollTo({
				top: elementPosition,
				behavior: prefersReducedMotion ? 'auto' : 'smooth',
			});
		}
	}, []);

	return {
		activeSection,
		isSticky,
		scrollToSection,
	};
}
