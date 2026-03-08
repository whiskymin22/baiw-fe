import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import PopularProducts from '../recommendation-products/popular-products';

function ProductFeatureSection() {
	return (
		<>
			<PopularProducts />
			<div className='max-w-7xl mx-auto px-4 mb-8 flex justify-end'>
				<Button asChild size='lg' className='font-semibold'>
					<Link to='/products' aria-label='View all products'>
						VIEW ALL PRODUCTS
					</Link>
				</Button>
			</div>
		</>
	);
}

export default ProductFeatureSection;
