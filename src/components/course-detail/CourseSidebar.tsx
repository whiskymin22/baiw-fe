import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import {
	Brain,
	FileText,
	MessageCircle,
	Award,
	Check,
} from 'lucide-react';
import type { ICourse } from '@/types/course.type';
import type { CourseStats } from './types';

interface CourseSidebarProps {
	course: ICourse;
	stats: CourseStats;
}

export const CourseSidebar = React.memo(function CourseSidebar({
	course,
	stats,
}: CourseSidebarProps) {
	return (
		<div className='w-full lg:w-80 shrink-0'>
			<div className='sticky top-36 space-y-4 lg:space-y-6'>
				{/* Personalized Learning */}
				<div className='bg-white rounded-lg p-4 sm:p-6 border border-gray-200'>
					<div className='flex items-center gap-2 mb-4'>
						<Brain
							aria-hidden='true'
							className='w-5 h-5 text-purple-600'
						/>
						<h3 className='font-semibold'>Personalized Learning</h3>
					</div>
					<p className='text-sm text-gray-600 mb-2'>Powered by AI</p>
					<p className='text-sm text-gray-500'>
						Adaptive learning paths tailored to your progress and
						goals.
					</p>
				</div>

				{/* Course Features */}
				<div className='bg-white rounded-lg p-4 sm:p-6 border border-gray-200'>
					<h3 className='font-semibold mb-4'>Course Features</h3>
					<div className='space-y-3'>
						<div className='flex items-center gap-3'>
							<FileText
								aria-hidden='true'
								className='w-5 h-5 text-blue-600'
							/>
							<span className='text-sm'>
								{stats.totalLessons} Lessons
							</span>
						</div>
						<div className='flex items-center gap-3'>
							<MessageCircle
								aria-hidden='true'
								className='w-5 h-5 text-green-600'
							/>
							<span className='text-sm'>8 Mock Interviews</span>
						</div>
						<div className='flex items-center gap-3'>
							<FileText
								aria-hidden='true'
								className='w-5 h-5 text-orange-600'
							/>
							<span className='text-sm'>
								{stats.totalQuizzes} Quizzes
							</span>
						</div>
						<div className='flex items-center gap-3'>
							<Award
								aria-hidden='true'
								className='w-5 h-5 text-purple-600'
							/>
							<span className='text-sm'>
								Certificate of Completion
							</span>
						</div>
					</div>
				</div>

				{/* Developed by MAANG Engineers */}
				<div className='bg-white rounded-lg p-4 sm:p-6 border border-gray-200'>
					<div className='flex items-center gap-2 mb-2'>
						<Check
							aria-hidden='true'
							className='w-5 h-5 text-green-600'
						/>
						<span className='text-sm font-medium'>
							Developed by MAANG Engineers
						</span>
					</div>
					<p className='text-sm text-gray-600'>
						Created by industry experts from top tech companies.
					</p>
				</div>

				{/* Course Tags */}
				<div className='bg-white rounded-lg p-4 sm:p-6 border border-gray-200'>
					<h3 className='font-semibold mb-4'>Course Tags</h3>
					<div className='flex flex-wrap gap-2'>
						{course.tags?.map((tag: string, index: number) => (
							<Badge
								key={index}
								variant='outline'
								className='text-xs'
							>
								{tag}
							</Badge>
						))}
					</div>
				</div>
			</div>
		</div>
	);
});
