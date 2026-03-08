import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import PopularCourse from '../recommendation-courses/popular-course';

function CourseFeatureSection() {
	return (
		<>
			<PopularCourse />
			<div className='max-w-7xl mx-auto px-4 mb-8 flex justify-end'>
				<Button asChild size='lg' className='uppercase font-bold'>
					<Link to='/courses' aria-label='View all courses'>
						VIEW ALL COURSES
					</Link>
				</Button>
			</div>
		</>
	);
}

export default CourseFeatureSection;
