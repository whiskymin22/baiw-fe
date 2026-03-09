import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PopularProducts from '../recommendation-products/popular-products';

function ProductFeatureSection() {
	return (
		<section className='py-20 bg-gray-50'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-end justify-between mb-10'>
					<div>
						<p className='text-sm font-medium text-gray-500 uppercase tracking-wider mb-2'>
							Trending
						</p>
						<h2 className='text-3xl font-bold tracking-tight text-gray-900'>
							Popular Right Now
						</h2>
					</div>
					<Button
						asChild
						variant='ghost'
						className='text-sm font-medium text-gray-600 hover:text-gray-900 hidden sm:flex'
					>
						<Link to='/products' aria-label='View all products'>
							View All
							<ArrowRight className='ml-1 w-4 h-4' />
						</Link>
					</Button>
				</div>
			</div>
			<PopularProducts />
			<div className='max-w-7xl mx-auto px-4 mt-8 sm:hidden'>
				<Button
					asChild
					variant='outline'
					className='w-full rounded-full h-11'
				>
					<Link to='/products'>
						View All Products
						<ArrowRight className='ml-2 w-4 h-4' />
					</Link>
				</Button>
			</div>
		</section>
	);
}

export default ProductFeatureSection;
