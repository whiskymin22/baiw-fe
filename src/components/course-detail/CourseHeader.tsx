import * as React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Star, Clock } from 'lucide-react';
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbSeparator,
	BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { CourseActions } from './CourseActions';
import { COMPANY_LOGOS } from './constants';
import type { ICourse } from '@/types/course.type';

interface CourseHeaderProps {
	course: ICourse;
	courseCategory: string;
	isSaved: boolean;
	isEnrolled: boolean;
	isEnrolling: boolean;
	isAuthenticated: boolean;
	onToggleSave: () => void;
	onEnroll: () => void;
}

export const CourseHeader = React.memo(function CourseHeader({
	course,
	courseCategory,
	isSaved,
	isEnrolled,
	isEnrolling,
	isAuthenticated,
	onToggleSave,
	onEnroll,
}: CourseHeaderProps) {
	return (
		<div className='bg-white border-b border-gray-200'>
			<div className='max-w-7xl mx-auto px-4 py-6 md:py-8'>
				<Breadcrumb className='mb-6 hidden md:flex'>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link to='/'>Home</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link to='/courses'>Courses</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage className='line-clamp-1 max-w-md'>
								{course.title}
							</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				<div className='flex flex-col lg:flex-row items-center lg:items-start gap-6'>
					<div className='flex-1 w-full text-center lg:text-left'>
						{/* Badges and Meta */}
						<div className='flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-4 mb-4'>
							<Badge
								variant='secondary'
								className='bg-purple-100 text-purple-800 text-xs'
							>
								Popular
							</Badge>
							<div className='flex items-center gap-1'>
								<Star
									aria-hidden='true'
									className='w-4 h-4 fill-yellow-400 text-yellow-400'
								/>
								<span className='text-sm font-medium'>4.5</span>
							</div>
							<Badge variant='outline' className='text-xs'>
								{courseCategory}
							</Badge>
							<div className='flex items-center gap-1 text-sm text-gray-600'>
								<Clock aria-hidden='true' className='w-4 h-4' />
								<span>{course.read_time}h</span>
							</div>
							<span className='text-xs sm:text-sm text-gray-500'>
								Updated this week
							</span>
						</div>

						{/* Title */}
						<h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4'>
							{course.title}
						</h1>

						{/* Actions */}
						<CourseActions
							course={course}
							isSaved={isSaved}
							isEnrolled={isEnrolled}
							isEnrolling={isEnrolling}
							isAuthenticated={isAuthenticated}
							onToggleSave={onToggleSave}
							onEnroll={onEnroll}
						/>

						{/* Description */}
						<p className='text-base sm:text-lg text-gray-700 mb-6 max-w-3xl mx-auto lg:mx-0'>
							{course.brief_summary}
						</p>

						{/* Company Logos */}
						<div className='flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 text-sm text-gray-600'>
							<span>Join 2.8M developers at</span>
							<div className='flex items-center gap-2 sm:gap-3'>
								{COMPANY_LOGOS.map((logo, index) => (
									<div
										key={index}
										className={`w-6 h-6 ${logo.bg} rounded text-white text-xs flex items-center justify-center font-bold`}
									>
										{logo.label}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});
