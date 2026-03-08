import * as React from 'react';
import { Star } from 'lucide-react';

interface Review {
	name: string;
	initials: string;
	rating: number;
	bgColor: string;
	comment: string;
}

const REVIEWS: Review[] = [
	{
		name: 'John Doe',
		initials: 'JD',
		rating: 5,
		bgColor: 'bg-blue-100',
		comment:
			'Excellent course! The content is well-structured and the explanations are clear. Perfect for beginners who want to understand machine learning fundamentals.',
	},
	{
		name: 'Sarah Miller',
		initials: 'SM',
		rating: 4,
		bgColor: 'bg-green-100',
		comment:
			'Great course with practical examples. The hands-on projects really helped me understand the concepts better. Highly recommended!',
	},
];

const ReviewCard = React.memo(function ReviewCard({
	review,
}: {
	review: Review;
}) {
	return (
		<div className='border border-gray-200 rounded-lg p-6'>
			<div className='flex items-center gap-4 mb-4'>
				<div
					className={`w-12 h-12 ${review.bgColor} rounded-full flex items-center justify-center`}
				>
					<span
						className={`${review.bgColor.replace('100', '600')} font-semibold`}
					>
						{review.initials}
					</span>
				</div>
				<div>
					<h4 className='font-semibold'>{review.name}</h4>
					<div className='flex items-center gap-1'>
						{Array.from({ length: 5 }).map((_, i) => (
							<Star
								key={i}
								aria-hidden='true'
								className={`w-4 h-4 ${
									i < review.rating
										? 'fill-yellow-400 text-yellow-400'
										: 'text-gray-300'
								}`}
							/>
						))}
						<span className='text-sm text-gray-600 ml-2'>
							{review.rating}.0
						</span>
					</div>
				</div>
			</div>
			<p className='text-gray-700'>{review.comment}</p>
		</div>
	);
});

export const CourseReviews = React.memo(function CourseReviews() {
	return (
		<section
			id='reviews'
			className='bg-white rounded-lg p-4 sm:p-6 lg:p-8 scroll-mt-24'
		>
			<h2 className='text-2xl font-bold mb-6'>Student Reviews</h2>
			<div className='space-y-6'>
				{REVIEWS.map((review, index) => (
					<ReviewCard key={index} review={review} />
				))}
			</div>
		</section>
	);
});
