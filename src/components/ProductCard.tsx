import type { IProduct } from '@/types/product.type';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface ProductCardProps {
	product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
	const imageUrl = product.images?.[0] || 'https://placehold.co/400x500?text=No+Image';
	const hasDiscount = product.compare_at_price && product.compare_at_price > product.price;
	const discountPercent = hasDiscount
		? Math.round((1 - product.price / product.compare_at_price!) * 100)
		: 0;

	return (
		<Link
			to={`/products/${product._id}`}
			data-testid={`link-product-${product._id}`}
			className='group block'
		>
			<div className='relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-100 mb-3'>
				<img
					src={imageUrl}
					alt={product.name}
					className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out'
				/>
				{hasDiscount && (
					<div className='absolute top-3 left-3'>
						<Badge className='bg-red-500 text-white border-0 text-xs font-medium rounded-full px-2.5 py-0.5'>
							-{discountPercent}%
						</Badge>
					</div>
				)}
				<div className='absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300' />
			</div>

			<div className='space-y-1'>
				<p className='text-xs text-gray-400 uppercase tracking-wider font-medium'>
					{product.brand}
				</p>
				<h3
					className='text-sm font-medium text-gray-900 line-clamp-1 group-hover:text-gray-600 transition-colors'
					data-testid={`text-title-${product._id}`}
				>
					{product.name}
				</h3>
				<div className='flex items-center gap-2 pt-0.5'>
					<span className='text-sm font-semibold text-gray-900'>
						${product.price.toFixed(2)}
					</span>
					{hasDiscount && (
						<span className='text-xs text-gray-400 line-through'>
							${product.compare_at_price!.toFixed(2)}
						</span>
					)}
				</div>
			</div>
		</Link>
	);
}
