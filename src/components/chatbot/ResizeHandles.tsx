import * as React from 'react';
import { GripVertical } from 'lucide-react';
import type { ChatSize } from './types';

interface ResizeHandlesProps {
	isResizing: boolean;
	size: ChatSize;
	onResizeStart: (
		e: React.MouseEvent | React.TouchEvent,
		direction: 'left' | 'top' | 'corner',
	) => void;
}

export const ResizeHandles = React.memo(function ResizeHandles({
	isResizing,
	size,
	onResizeStart,
}: ResizeHandlesProps) {
	return (
		<>
			{/* Left edge */}
			<div
				className='absolute left-0 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-primary/20 transition-colors z-10 group'
				onMouseDown={(e) => onResizeStart(e, 'left')}
				onTouchStart={(e) => onResizeStart(e, 'left')}
				title='Drag to resize width'
			>
				<div className='absolute left-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity'>
					<GripVertical className='w-3 h-3 text-muted-foreground' />
				</div>
			</div>

			{/* Top edge */}
			<div
				className='absolute top-0 left-0 right-0 h-2 cursor-ns-resize hover:bg-primary/20 transition-colors z-10'
				onMouseDown={(e) => onResizeStart(e, 'top')}
				onTouchStart={(e) => onResizeStart(e, 'top')}
				title='Drag to resize height'
			/>

			{/* Top-left corner */}
			<div
				className='absolute top-0 left-0 w-4 h-4 cursor-nwse-resize hover:bg-primary/30 transition-colors z-20 rounded-tl-lg'
				onMouseDown={(e) => onResizeStart(e, 'corner')}
				onTouchStart={(e) => onResizeStart(e, 'corner')}
				title='Drag to resize'
			>
				<div className='absolute top-0.5 left-0.5 w-2 h-2 border-l-2 border-t-2 border-muted-foreground/50 rounded-tl' />
			</div>

			{/* Resize indicator overlay */}
			{isResizing && (
				<div className='absolute inset-0 bg-primary/5 z-50 pointer-events-none flex items-center justify-center'>
					<span className='text-xs text-muted-foreground bg-background/90 px-2 py-1 rounded border'>
						{Math.round(size.width)} × {Math.round(size.height)}
					</span>
				</div>
			)}
		</>
	);
});
