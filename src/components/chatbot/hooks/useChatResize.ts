import * as React from 'react';
import type { ChatSize } from '../types';
import {
	MIN_WIDTH,
	MAX_WIDTH,
	MIN_HEIGHT,
	MAX_HEIGHT,
	DEFAULT_WIDTH,
	DEFAULT_HEIGHT,
	CHAT_SIZE_STORAGE_KEY,
} from '../constants';

type ResizeDirection = 'left' | 'top' | 'corner' | null;

export function useChatResize() {
	const [size, setSize] = React.useState<ChatSize>(() => {
		const stored = localStorage.getItem(CHAT_SIZE_STORAGE_KEY);
		if (stored) {
			try {
				const parsed = JSON.parse(stored);
				return {
					width: Math.min(
						Math.max(parsed.width, MIN_WIDTH),
						MAX_WIDTH,
					),
					height: Math.min(
						Math.max(parsed.height, MIN_HEIGHT),
						MAX_HEIGHT,
					),
				};
			} catch {
				return { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT };
			}
		}
		return { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT };
	});

	const [isResizing, setIsResizing] = React.useState(false);
	const [resizeDirection, setResizeDirection] =
		React.useState<ResizeDirection>(null);

	const resizeStartRef = React.useRef<{
		x: number;
		y: number;
		width: number;
		height: number;
	} | null>(null);

	const handleResizeStart = React.useCallback(
		(
			e: React.MouseEvent | React.TouchEvent,
			direction: 'left' | 'top' | 'corner',
		) => {
			e.preventDefault();
			setIsResizing(true);
			setResizeDirection(direction);
			const clientX =
				'touches' in e ? e.touches[0].clientX : e.clientX;
			const clientY =
				'touches' in e ? e.touches[0].clientY : e.clientY;
			resizeStartRef.current = {
				x: clientX,
				y: clientY,
				width: size.width,
				height: size.height,
			};
		},
		[size],
	);

	React.useEffect(() => {
		if (!isResizing) return;

		const handleResizeMove = (e: MouseEvent | TouchEvent) => {
			if (!resizeStartRef.current) return;
			const clientX =
				'touches' in e ? e.touches[0].clientX : e.clientX;
			const clientY =
				'touches' in e ? e.touches[0].clientY : e.clientY;
			const { x, y, width, height } = resizeStartRef.current;

			let newWidth = width;
			let newHeight = height;

			// Since chat is positioned at bottom-right, dragging left increases width
			if (
				resizeDirection === 'left' ||
				resizeDirection === 'corner'
			) {
				newWidth = Math.min(
					Math.max(width + (x - clientX), MIN_WIDTH),
					MAX_WIDTH,
				);
			}
			// Dragging up increases height
			if (resizeDirection === 'top' || resizeDirection === 'corner') {
				newHeight = Math.min(
					Math.max(height + (y - clientY), MIN_HEIGHT),
					MAX_HEIGHT,
				);
			}

			setSize({ width: newWidth, height: newHeight });
		};

		const handleResizeEnd = () => {
			setIsResizing(false);
			setResizeDirection(null);
			resizeStartRef.current = null;
			// Save to localStorage
			localStorage.setItem(
				CHAT_SIZE_STORAGE_KEY,
				JSON.stringify(size),
			);
		};

		document.addEventListener('mousemove', handleResizeMove);
		document.addEventListener('mouseup', handleResizeEnd);
		document.addEventListener('touchmove', handleResizeMove);
		document.addEventListener('touchend', handleResizeEnd);

		return () => {
			document.removeEventListener('mousemove', handleResizeMove);
			document.removeEventListener('mouseup', handleResizeEnd);
			document.removeEventListener('touchmove', handleResizeMove);
			document.removeEventListener('touchend', handleResizeEnd);
		};
	}, [isResizing, resizeDirection, size]);

	// Save size when it changes (debounced effect)
	React.useEffect(() => {
		const timer = setTimeout(() => {
			localStorage.setItem(
				CHAT_SIZE_STORAGE_KEY,
				JSON.stringify(size),
			);
		}, 300);
		return () => clearTimeout(timer);
	}, [size]);

	const resetSize = React.useCallback(() => {
		setSize({ width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT });
		localStorage.setItem(
			CHAT_SIZE_STORAGE_KEY,
			JSON.stringify({
				width: DEFAULT_WIDTH,
				height: DEFAULT_HEIGHT,
			}),
		);
	}, []);

	const isDefaultSize =
		size.width === DEFAULT_WIDTH && size.height === DEFAULT_HEIGHT;

	return {
		size,
		isResizing,
		resizeDirection,
		handleResizeStart,
		resetSize,
		isDefaultSize,
	};
}
