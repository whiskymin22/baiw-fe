import { Skeleton } from '@/components/ui/skeleton';
import Header from '@/components/header';
import Footer from '@/components/footer';

export function CourseDetailSkeleton() {
	return (
		<div className='min-h-screen bg-background flex flex-col'>
			<Header />
			<main className='flex-1' id='main-content'>
				<div className='bg-white border-b border-gray-200'>
					<div className='max-w-7xl mx-auto px-4 py-6 md:py-8'>
						<div className='flex flex-col lg:flex-row items-center lg:items-start gap-6'>
							<div className='flex-1 w-full text-center lg:text-left'>
								<div className='flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-4 mb-4'>
									<Skeleton className='h-6 w-20 rounded-full' />
									<Skeleton className='h-4 w-12' />
									<Skeleton className='h-6 w-24 rounded-full' />
									<Skeleton className='h-4 w-16' />
								</div>
								<Skeleton className='h-10 w-3/4 mb-4 mx-auto lg:mx-0' />

								<div className='mb-4 flex justify-center lg:justify-start'>
									<Skeleton className='h-8 w-8 rounded-full' />
								</div>

								<div className='space-y-2 mb-6 max-w-3xl mx-auto lg:mx-0'>
									<Skeleton className='h-4 w-full' />
									<Skeleton className='h-4 w-5/6' />
								</div>

								<div className='flex justify-center lg:justify-start mb-4'>
									<Skeleton className='h-12 w-40 rounded-md' />
								</div>

								<div className='flex justify-center lg:justify-start'>
									<Skeleton className='h-4 w-60' />
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='bg-white border-b border-gray-200'>
					<div className='max-w-7xl mx-auto px-4'>
						<div className='flex space-x-4'>
							<Skeleton className='h-12 w-24' />
							<Skeleton className='h-12 w-24' />
							<Skeleton className='h-12 w-24' />
						</div>
					</div>
				</div>

				<div className='flex-1 bg-gray-50'>
					<div className='max-w-7xl mx-auto px-4 py-6 sm:py-8'>
						<div className='flex flex-col lg:flex-row gap-6 lg:gap-8'>
							<div className='flex-1 space-y-6 lg:space-y-8'>
								<div className='bg-white rounded-lg p-4 sm:p-6 lg:p-8'>
									<Skeleton className='h-8 w-48 mb-6' />
									<div className='space-y-4'>
										<Skeleton className='h-24 w-full rounded-md bg-blue-50' />
										<Skeleton className='h-4 w-full' />
										<Skeleton className='h-4 w-full' />
										<Skeleton className='h-4 w-3/4' />

										<Skeleton className='h-6 w-40 mt-6 mb-2' />
										<Skeleton className='h-4 w-full' />
										<Skeleton className='h-4 w-full' />
									</div>
								</div>
							</div>

							<div className='w-full lg:w-80 flex-shrink-0 space-y-4 lg:space-y-6'>
								<div className='bg-white rounded-lg p-4 sm:p-6 border border-gray-200'>
									<Skeleton className='h-6 w-40 mb-4' />
									<Skeleton className='h-16 w-full' />
								</div>
								<div className='bg-white rounded-lg p-4 sm:p-6 border border-gray-200'>
									<Skeleton className='h-6 w-32 mb-4' />
									<Skeleton className='h-4 w-full mb-2' />
									<Skeleton className='h-4 w-full mb-2' />
									<Skeleton className='h-4 w-full mb-2' />
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}
