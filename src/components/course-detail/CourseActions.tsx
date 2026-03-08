import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Bookmark, Rocket } from 'lucide-react';
import { toast } from 'sonner';
import type { ICourse } from '@/types/course.type';

interface CourseActionsProps {
	course: ICourse;
	isSaved: boolean;
	isEnrolled: boolean;
	isEnrolling: boolean;
	isAuthenticated: boolean;
	onToggleSave: () => void;
	onEnroll: () => void;
}

export const CourseActions = React.memo(function CourseActions({
	course,
	isSaved,
	isEnrolled,
	isEnrolling,
	isAuthenticated,
	onToggleSave,
	onEnroll,
}: CourseActionsProps) {
	const handleSaveClick = React.useCallback(() => {
		if (!isAuthenticated) {
			toast.error('Please login to save courses.');
			return;
		}
		onToggleSave();
		toast.success(
			isSaved ? 'Removed from bookmarks.' : 'Saved to bookmarks.',
		);
	}, [isAuthenticated, isSaved, onToggleSave]);

	const handleEnrollClick = React.useCallback(() => {
		if (!isAuthenticated) {
			toast.error('Please login to enroll in courses.');
			return;
		}
		if (isEnrolled) {
			toast.success(`Continuing ${course.title}…`);
			// TODO: Navigate to course content
		} else {
			onEnroll();
			toast.success(`Enrolled in ${course.title}!`);
		}
	}, [isAuthenticated, isEnrolled, course.title, onEnroll]);

	return (
		<>
			{/* Bookmark Button */}
			<div className='mb-4 flex justify-center lg:justify-start'>
				<button
					type='button'
					onClick={handleSaveClick}
					aria-label={isSaved ? 'Remove from saved' : 'Save course'}
					className={`transition-all duration-200 hover:scale-110 active:scale-95 ${
						isSaved
							? 'text-blue-600 hover:text-blue-700'
							: 'text-gray-400 hover:text-gray-600'
					}`}
				>
					<Bookmark
						aria-hidden='true'
						className={`w-6 h-6 ${isSaved ? 'fill-current' : ''}`}
					/>
				</button>
			</div>

			{/* Enroll Button */}
			<div className='flex justify-center lg:justify-start mb-4'>
				<Button
					size='lg'
					className={`font-bold text-base sm:text-lg px-6 sm:px-8 py-3 w-full sm:w-auto ${
						isEnrolled
							? 'bg-green-600 hover:bg-green-700 text-white'
							: 'bg-blue-600 hover:bg-blue-700 text-white'
					}`}
					disabled={isEnrolling}
					onClick={handleEnrollClick}
				>
					<Rocket aria-hidden='true' className='mr-2 w-5 h-5' />
					{isEnrolling
						? 'Enrolling...'
						: isEnrolled
							? 'Continue Course'
							: 'Start Course'}
				</Button>
			</div>
		</>
	);
});
