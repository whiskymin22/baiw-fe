import { usePopularProducts } from '@/hooks/use-products';
import LoadingSpinner from '../LoadingSpinner';
import { Button } from '@/components/ui/button';
import ProductGrid from '../ProductGrid';

function PopularProducts() {
	const {
		data: productsResponse,
		isLoading,
		error,
		refetch,
	} = usePopularProducts({ limit: 8 });

	const products = productsResponse?.data || [];

	return isLoading ? (
		<div className='py-16 px-4'>
			<div className='max-w-7xl mx-auto text-center'>
				<LoadingSpinner size='md' />
				<p className='mt-4 text-sm text-gray-500'>Loading featured products...</p>
			</div>
		</div>
	) : error ? (
		<div className='py-16 px-4'>
			<div className='max-w-7xl mx-auto text-center'>
				<p className='text-sm text-gray-500'>
					Unable to load featured products right now.
				</p>
				<Button className='mt-4 rounded-full' onClick={() => refetch()}>
					Try again
				</Button>
			</div>
		</div>
	) : (
		<ProductGrid products={products} />
	);
}

export default PopularProducts;
