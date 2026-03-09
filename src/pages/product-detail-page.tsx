import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { ChatBot } from '@/components/chatbot';
import { useProductById } from '@/hooks/use-products';
import { useWishlistProduct } from '@/hooks/use-wishlist';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, ChevronRight } from 'lucide-react';
import productService from '@/services/product.service';
import { useAuth } from '@/context/auth-context';
import PersonalizedProducts from '@/components/recommendation-products/personalize-products';

export default function ProductDetailPage() {
	const params = useParams();
	const { isAuthenticated } = useAuth();
	const {
		data: product,
		isLoading,
		error,
	} = useProductById(params?.id);
	const { isSaved, toggleSave } = useWishlistProduct(product?._id);

	const [selectedSize, setSelectedSize] = React.useState<string>('');
	const [selectedColor, setSelectedColor] = React.useState<string>('');
	const [addingToCart, setAddingToCart] = React.useState(false);
	const [imageIndex, setImageIndex] = React.useState(0);

	const imageUrl =
		product?.images?.[imageIndex] || 'https://placehold.co/600x700?text=No+Image';
	const hasDiscount =
		product?.compare_at_price && product.compare_at_price > product.price;
	const discountPercent = hasDiscount
		? Math.round((1 - product!.price / product!.compare_at_price!) * 100)
		: 0;

	const handleAddToCart = async () => {
		if (!product || !isAuthenticated) return;
		setAddingToCart(true);
		try {
			await productService.addToCart(product._id, {
				size: selectedSize || product.sizes?.[0],
				color: selectedColor || product.colors?.[0],
				quantity: 1,
			});
		} finally {
			setAddingToCart(false);
		}
	};

	if (isLoading) {
		return (
			<div className='min-h-screen bg-white'>
				<Header />
				<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse'>
						<div className='aspect-[3/4] bg-gray-100 rounded-2xl' />
						<div className='space-y-6 py-4'>
							<div className='h-4 bg-gray-100 rounded w-1/3' />
							<div className='h-8 bg-gray-100 rounded w-3/4' />
							<div className='h-6 bg-gray-100 rounded w-1/4' />
							<div className='h-24 bg-gray-100 rounded' />
						</div>
					</div>
				</main>
				<Footer />
			</div>
		);
	}

	if (error || !product) {
		return (
			<div className='min-h-screen bg-white'>
				<Header />
				<main className='max-w-7xl mx-auto px-4 py-20 text-center'>
					<h2 className='text-lg font-medium text-gray-900 mb-2'>
						{error ? 'Error loading product' : 'Product not found'}
					</h2>
					<p className='text-sm text-gray-500'>
						{error instanceof Error ? error.message : 'The product you\'re looking for doesn\'t exist.'}
					</p>
					<Button asChild variant='outline' className='mt-6 rounded-full'>
						<Link to='/products'>Back to Shop</Link>
					</Button>
				</main>
				<Footer />
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-white flex flex-col'>
			<Header />
			<main id='main-content' className='flex-1'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
					<nav className='flex items-center gap-1 text-sm text-gray-400 mb-8'>
						<Link to='/' className='hover:text-gray-600 transition-colors'>Home</Link>
						<ChevronRight className='w-3.5 h-3.5' />
						<Link to='/products' className='hover:text-gray-600 transition-colors'>Shop</Link>
						<ChevronRight className='w-3.5 h-3.5' />
						<span className='text-gray-900 font-medium truncate'>{product.name}</span>
					</nav>

					<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16'>
						<div className='space-y-3'>
							<div className='aspect-[3/4] rounded-2xl overflow-hidden bg-gray-50'>
								<img
									src={imageUrl}
									alt={product.name}
									className='w-full h-full object-cover'
								/>
							</div>
							{product.images?.length > 1 && (
								<div className='flex gap-2 overflow-x-auto pb-1'>
									{product.images.map((img, i) => (
										<button
											key={i}
											onClick={() => setImageIndex(i)}
											className={`flex-shrink-0 w-16 h-20 rounded-xl overflow-hidden transition-all ${
												imageIndex === i
													? 'ring-2 ring-gray-900 ring-offset-2'
													: 'opacity-60 hover:opacity-100'
											}`}
										>
											<img
												src={img}
												alt={`${product.name} ${i + 1}`}
												className='w-full h-full object-cover'
											/>
										</button>
									))}
								</div>
							)}
						</div>

						<div className='py-2'>
							<div className='mb-6'>
								<p className='text-sm text-gray-400 uppercase tracking-wider font-medium mb-2'>
									{product.brand}
								</p>
								<h1 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-4'>
									{product.name}
								</h1>
								<div className='flex items-baseline gap-3'>
									<span className='text-2xl font-bold text-gray-900'>
										${product.price.toFixed(2)}
									</span>
									{hasDiscount && (
										<>
											<span className='text-lg text-gray-400 line-through'>
												${product.compare_at_price!.toFixed(2)}
											</span>
											<span className='text-sm font-medium text-red-500 bg-red-50 px-2 py-0.5 rounded-full'>
												-{discountPercent}%
											</span>
										</>
									)}
								</div>
							</div>

							<p className='text-gray-500 leading-relaxed mb-8'>
								{product.description}
							</p>

							{product.sizes?.length > 0 && (
								<div className='mb-6'>
									<h3 className='text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3'>
										Size
									</h3>
									<div className='flex flex-wrap gap-2'>
										{product.sizes.map((s) => (
											<button
												key={s}
												onClick={() => setSelectedSize(s)}
												className={`min-w-[3rem] px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
													selectedSize === s
														? 'bg-gray-900 text-white shadow-md'
														: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
												}`}
											>
												{s}
											</button>
										))}
									</div>
								</div>
							)}

							{product.colors?.length > 0 && (
								<div className='mb-8'>
									<h3 className='text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3'>
										Color
									</h3>
									<div className='flex flex-wrap gap-2'>
										{product.colors.map((c) => (
											<button
												key={c}
												onClick={() => setSelectedColor(c)}
												className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
													selectedColor === c
														? 'bg-gray-900 text-white shadow-md'
														: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
												}`}
											>
												{c}
											</button>
										))}
									</div>
								</div>
							)}

							<div className='flex gap-3'>
								<Button
									size='lg'
									className='flex-1 h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-full font-medium transition-all shadow-md hover:shadow-lg'
									onClick={handleAddToCart}
									disabled={!isAuthenticated || addingToCart}
								>
									<ShoppingCart className='w-4 h-4 mr-2' />
									{addingToCart ? 'Adding...' : 'Add to Cart'}
								</Button>
								{isAuthenticated && (
									<Button
										size='lg'
										variant='outline'
										onClick={toggleSave}
										className={`h-12 w-12 rounded-full shrink-0 ${
											isSaved
												? 'text-red-500 border-red-200 bg-red-50 hover:bg-red-100'
												: 'border-gray-200 hover:bg-gray-50'
										}`}
									>
										<Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
									</Button>
								)}
							</div>

							{product.tags?.length > 0 && (
								<div className='mt-8 pt-8 border-t border-gray-100'>
									<div className='flex flex-wrap gap-2'>
										{product.tags.map((t) => (
											<span
												key={t}
												className='text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full'
											>
												{t}
											</span>
										))}
									</div>
								</div>
							)}
						</div>
					</div>

					<div className='mt-20'>
						<PersonalizedProducts />
					</div>
				</div>

				<ChatBot productId={product._id} productName={product.name} />
			</main>
			<Footer />
		</div>
	);
}
