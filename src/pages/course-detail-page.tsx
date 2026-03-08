import * as React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/header';
import Footer from '@/components/footer';
import CourseTOC from '@/components/CourseTOC';
import { ChatBot } from '@/components/chatbot';
import { useCourseById } from '@/hooks/use-courses';
import { useSavedCourse } from '@/hooks/use-saved-course';
import { useEnrollment } from '@/hooks/use-enrollment';
import { getCourseCategory } from '@/data/courses';
import type { ICategory } from '@/types/course.type';
import PersonalizeCourse from '@/components/recommendation-courses/personalize-course';
import { CourseDetailSkeleton } from '@/components/skeletons/CourseDetailSkeleton';
import { CourseHeader } from '@/components/course-detail/CourseHeader';
import { CourseOverview } from '@/components/course-detail/CourseOverview';
import { CourseReviews } from '@/components/course-detail/CourseReviews';
import { CourseSidebar } from '@/components/course-detail/CourseSidebar';
import { ErrorState } from '@/components/course-detail/ErrorState';
import { StickyNavigation } from '@/components/course-detail/StickyNavigation';
import { useScrollSpy } from '@/components/course-detail/hooks/useScrollSpy';
import type { CourseStats } from '@/components/course-detail/types';

export default function CourseDetailPage() {
	const params = useParams();
	const {
		data: course,
		isLoading,
		error,
	} = useCourseById(params?.id);
	const { isSaved, toggleSave, isAuthenticated } = useSavedCourse(
		course?._id,
	);
	const { isEnrolled, enroll, isEnrolling } = useEnrollment(
		course?._id,
	);
	const { activeSection, isSticky, scrollToSection } = useScrollSpy();

	const courseCategory = React.useMemo(
		() => (course ? getCourseCategory(course.tags) : ''),
		[course],
	);

	const courseStats: CourseStats = React.useMemo(() => {
		if (!course?.toc?.categories) {
			return { totalLessons: 0, totalQuizzes: 0 };
		}
		const totalLessons = course.toc.categories.reduce(
			(total: number, category: ICategory) =>
				total + category.pages.length,
			0,
		);
		return {
			totalLessons,
			totalQuizzes: Math.floor(totalLessons * 0.8),
		};
	}, [course]);

	if (isLoading) {
		return <CourseDetailSkeleton />;
	}

	if (error) {
		return (
			<ErrorState
				title='Error loading course'
				message={
					error instanceof Error
						? error.message
						: 'Something went wrong'
				}
				showRetry
			/>
		);
	}

	if (!course) {
		return (
			<ErrorState
				title='Course not found'
				message="The course you're looking for doesn't exist."
			/>
		);
	}

	return (
		<div className='min-h-screen bg-background flex flex-col'>
			<Header />

			<main id='main-content' className='flex-1'>
				<CourseHeader
					course={course}
					courseCategory={courseCategory}
					isSaved={isSaved}
					isEnrolled={isEnrolled}
					isEnrolling={isEnrolling}
					isAuthenticated={isAuthenticated}
					onToggleSave={toggleSave}
					onEnroll={enroll}
				/>

				<StickyNavigation
					activeSection={activeSection}
					isSticky={isSticky}
					onNavigate={scrollToSection}
				/>

				<div className='flex-1 bg-gray-50'>
					<div className='max-w-7xl mx-auto px-4 py-6 sm:py-8'>
						<div className='flex flex-col lg:flex-row gap-6 lg:gap-8'>
							<div className='flex-1 space-y-6 lg:space-y-8'>
								<CourseOverview course={course} />

								<section id='content' className='scroll-mt-24'>
									<CourseTOC course={course} />
								</section>

								<CourseReviews />

								<section id='related' className='scroll-mt-24'>
									<PersonalizeCourse />
								</section>
							</div>

							<CourseSidebar course={course} stats={courseStats} />
						</div>
					</div>
				</div>
				<ChatBot courseId={course._id} courseName={course.title} />
			</main>

			<Footer />
		</div>
	);
}
