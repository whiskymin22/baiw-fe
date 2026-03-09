import type { IProduct } from '@/types/product.type';
import ProductCard from './ProductCard';
import { cn } from '@/lib/utils';

interface ProductGridProps {
	products: IProduct[];
	title?: string;
	className?: string;
}

export default function ProductGrid({
	products,
	title,
	className,
}: ProductGridProps) {
	return (
		<section
			className={cn('py-12 px-4 scroll-mt-24', className)}
			id='products'
			data-testid='section-product-grid'
		>
			{title && (
				<div className='max-w-7xl mx-auto mb-8'>
					<h2 className='text-2xl font-bold tracking-tight text-gray-900'>
						{title}
					</h2>
				</div>
			)}
			<div className='max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10'>
				{products.map((product) => (
					<ProductCard key={product._id} product={product} />
				))}
			</div>
		</section>
	);
}
