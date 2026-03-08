import * as React from 'react';
import { Check } from 'lucide-react';
import type { ICourse } from '@/types/course.type';

interface CourseOverviewProps {
	course: ICourse;
}

export const CourseOverview = React.memo(function CourseOverview({
	course,
}: CourseOverviewProps) {
	return (
		<section
			id='overview'
			className='bg-white rounded-lg p-4 sm:p-6 lg:p-8 scroll-mt-24'
		>
			<h2 className='text-2xl font-bold mb-6'>Course Overview</h2>
			<div className='prose max-w-none'>
				{/* Course Summary */}
				<div className='bg-blue-50 border-l-4 border-blue-400 p-4 mb-6'>
					<h3 className='text-lg font-semibold text-blue-900 mb-2'>
						Course Summary
					</h3>
					<p className='text-base leading-relaxed text-blue-800'>
						{course.brief_summary}
					</p>
				</div>

				{/* What You'll Learn */}
				<div className='mb-6'>
					<h3 className='text-lg font-semibold text-gray-900 mb-3'>
						What You'll Learn
					</h3>
					<p className='text-base leading-relaxed text-gray-700 mb-4'>
						{course.summary}
					</p>
				</div>

				{/* Course Details */}
				{course.details && (
					<div className='mb-6'>
						<h3 className='text-lg font-semibold text-gray-900 mb-3'>
							Course Details
						</h3>
						<p className='text-base leading-relaxed text-gray-600'>
							{course.details}
						</p>
					</div>
				)}

				{/* Learning Outcomes */}
				<div className='mt-8'>
					<h3 className='text-xl font-semibold mb-4'>
						Learning Outcomes
					</h3>
					<ul className='space-y-3'>
						{course.clos?.map((outcome: string, index: number) => (
							<li key={index} className='flex items-center gap-3'>
								<Check
									aria-hidden='true'
									className='w-5 h-5 text-green-600 shrink-0'
								/>
								<span>{outcome}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
});
