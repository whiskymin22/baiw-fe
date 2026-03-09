import { Heart } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import Pagination from '@/components/Pagination';
import { useWishlist } from '@/hooks/use-products';
import type { IProduct } from '@/types/product.type';

interface ProfileWishlistTabsProps {
	page: number;
	onPageChange: (page: number) => void;
}

export default function ProfileWishlistTabs({
	page,
	onPageChange,
}: ProfileWishlistTabsProps) {
	const { data, isLoading } = useWishlist({
		page,
		limit: 6,
		enabled: true,
	});

	if (isLoading) {
		return (
			<div className='flex-1 flex items-center justify-center py-12'>
				<div className='animate-spin w-8 h-8 border-2 border-gray-200 border-t-gray-900 rounded-full' />
			</div>
		);
	}

	if (!data?.data || data.data.length === 0) {
		return (
			<div className='flex-1 flex flex-col items-center justify-center text-center py-16'>
				<div className='w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
					<Heart className='w-6 h-6 text-gray-400' />
				</div>
				<p className='text-base font-semibold text-gray-900 mb-1'>No wishlist items yet</p>
				<p className='text-sm text-gray-500 max-w-xs mx-auto'>
					Save products you love by clicking the heart icon on product pages.
				</p>
			</div>
		);
	}

	return (
		<>
			<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
				{data.data.map((product: IProduct) => (
					<ProductCard key={product._id} product={product} />
				))}
			</div>
			{data?.meta && data.meta.totalPages > 1 && (
				<div className='mt-8 pt-4 border-t border-gray-100'>
					<Pagination
						currentPage={page}
						totalPages={data.meta.totalPages}
						onPageChange={onPageChange}
					/>
				</div>
			)}
		</>
	);
}
