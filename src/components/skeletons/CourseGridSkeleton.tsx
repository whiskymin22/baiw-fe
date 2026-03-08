import { CourseCardSkeleton } from './CourseCardSkeleton';

interface CourseGridSkeletonProps {
	count?: number;
	className?: string; // To support external styling if needed
}

export function CourseGridSkeleton({
	count = 6,
	className,
}: CourseGridSkeletonProps) {
	return (
		<div
			className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className || ''}`}
		>
			{Array.from({ length: count }).map((_, i) => (
				<CourseCardSkeleton key={i} />
			))}
		</div>
	);
}
