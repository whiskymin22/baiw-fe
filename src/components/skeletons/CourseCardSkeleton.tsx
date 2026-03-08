import { Skeleton } from '@/components/ui/skeleton';

export function CourseCardSkeleton() {
	return (
		<div className='bg-white border border-gray-200 rounded-lg shadow-sm'>
			<div className='p-6 space-y-4'>
				<Skeleton className='h-6 w-20 rounded-full' />

				<div className='space-y-2'>
					<Skeleton className='h-6 w-3/4' />
				</div>

				<div className='space-y-2'>
					<Skeleton className='h-4 w-full' />
					<Skeleton className='h-4 w-5/6' />
					<Skeleton className='h-4 w-4/6' />
				</div>

				<div className='flex items-center justify-between pt-2'>
					<div className='flex items-center gap-1'>
						<Skeleton className='h-4 w-4 rounded-full' />
						<Skeleton className='h-4 w-12' />
					</div>
					<div className='flex items-center gap-1'>
						<Skeleton className='h-4 w-4 rounded-full' />
						<Skeleton className='h-4 w-20' />
					</div>
				</div>
			</div>
		</div>
	);
}
