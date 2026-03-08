import { usePopularCourses } from '@/hooks/use-courses';
import LoadingSpinner from '../LoadingSpinner';
import { Button } from '@/components/ui/button';
import CourseGrid from '../CourseGrid';

function PopularCourse() {
	const {
		data: coursesResponse,
		isLoading,
		error,
		refetch,
	} = usePopularCourses({ limit: 9 });

	const courses = coursesResponse?.data || [];

	return isLoading ? (
		<div className='py-16 px-4 bg-background'>
			<div className='max-w-7xl mx-auto text-center'>
				<LoadingSpinner size='md' />
				<p className='mt-4 text-gray-600'>
					Loading featured courses…
				</p>
			</div>
		</div>
	) : error ? (
		<div className='py-16 px-4 bg-background'>
			<div className='max-w-7xl mx-auto text-center'>
				<p className='text-gray-600'>
					Unable to load featured courses right now.
				</p>
				<Button className='mt-4' onClick={() => refetch()}>
					Try again
				</Button>
			</div>
		</div>
	) : (
		<>
			<CourseGrid courses={courses} title='RELATED COURSES' />
		</>
	);
}

export default PopularCourse;
