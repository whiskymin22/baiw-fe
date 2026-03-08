import { useAuth } from '@/context/auth-context';
import { usePersonalizedCourses } from '../../hooks/use-courses';
import CourseGrid from '../CourseGrid';

function PersonalizeCourse() {
	const { user } = useAuth();
	const { data: relatedCourses } = usePersonalizedCourses({
		userId: user?._id || '',
		limit: 12,
	});

	if (!relatedCourses) {
		return null;
	}

	return (
		<>
			{relatedCourses?.data.length > 0 && (
				<CourseGrid
					courses={relatedCourses?.data}
					title='Related Courses'
					className='bg-transparent'
				/>
			)}
		</>
	);
}

export default PersonalizeCourse;
