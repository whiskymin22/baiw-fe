import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import productService from '@/services/product.service';

interface CartItem {
	product_id: {
		_id: string;
		name: string;
		price: number;
		compare_at_price?: number;
		images: string[];
		brand: string;
	};
	size: string;
	color: string;
	quantity: number;
}

interface Cart {
	_id: string;
	user_id: string;
	items: CartItem[];
}

export default function CartPage() {
	const queryClient = useQueryClient();

	const { data: cart, isLoading } = useQuery<Cart>({
		queryKey: ['cart'],
		queryFn: () => productService.getCart(),
	});

	const updateMutation = useMutation({
		mutationFn: ({
			productId,
			size,
			color,
			quantity,
		}: {
			productId: string;
			size: string;
			color: string;
			quantity: number;
		}) =>
			productService.updateCartItem(productId, { size, color, quantity }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['cart'] });
		},
	});

	const removeMutation = useMutation({
		mutationFn: ({
			productId,
			size,
			color,
		}: {
			productId: string;
			size: string;
			color: string;
		}) => productService.removeFromCart(productId, { size, color }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['cart'] });
			toast.success('Item removed from cart');
		},
	});

	const items = cart?.items || [];
	const subtotal = items.reduce(
		(sum, item) => sum + item.product_id.price * item.quantity,
		0,
	);

	if (isLoading) {
		return (
			<div className='min-h-screen bg-white'>
				<Header />
				<main className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
					<div className='space-y-4'>
						{[1, 2, 3].map((i) => (
							<div
								key={i}
								className='h-24 bg-gray-50 rounded-xl animate-pulse'
							/>
						))}
					</div>
				</main>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-white flex flex-col'>
			<Header />
			<main className='flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				<div className='mb-8'>
					<h1 className='text-2xl font-bold text-gray-900'>Shopping Cart</h1>
					<p className='text-sm text-gray-500 mt-1'>
						{items.length} {items.length === 1 ? 'item' : 'items'}
					</p>
				</div>

				{items.length === 0 ? (
					<div className='text-center py-24'>
						<div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-5'>
							<ShoppingBag className='w-7 h-7 text-gray-400' />
						</div>
						<h2 className='text-lg font-semibold text-gray-900 mb-2'>
							Your cart is empty
						</h2>
						<p className='text-sm text-gray-500 mb-8'>
							Discover something you love and add it to your cart.
						</p>
						<Button asChild className='rounded-full h-11 px-8'>
							<Link to='/products'>
								<ArrowLeft className='w-4 h-4 mr-2' />
								Continue Shopping
							</Link>
						</Button>
					</div>
				) : (
					<div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
						<div className='lg:col-span-2 divide-y divide-gray-100'>
							{items.map((item, index) => (
								<div
									key={`${item.product_id._id}-${item.size}-${item.color}-${index}`}
									className='flex gap-4 py-6 first:pt-0'
								>
									<Link
										to={`/products/${item.product_id._id}`}
										className='shrink-0'
									>
										<img
											src={
												item.product_id.images?.[0] ||
												'https://placehold.co/120x150?text=No+Image'
											}
											alt={item.product_id.name}
											className='w-24 h-28 object-cover rounded-xl bg-gray-50'
										/>
									</Link>

									<div className='flex-1 min-w-0'>
										<div className='flex items-start justify-between'>
											<div>
												<Link
													to={`/products/${item.product_id._id}`}
													className='text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors line-clamp-1'
												>
													{item.product_id.name}
												</Link>
												<p className='text-xs text-gray-400 mt-0.5'>
													{item.product_id.brand}
												</p>
												<div className='flex gap-3 mt-1'>
													{item.size && (
														<span className='text-xs text-gray-500'>
															Size: {item.size}
														</span>
													)}
													{item.color && (
														<span className='text-xs text-gray-500'>
															Color: {item.color}
														</span>
													)}
												</div>
											</div>
											<button
												onClick={() =>
													removeMutation.mutate({
														productId: item.product_id._id,
														size: item.size,
														color: item.color,
													})
												}
												className='text-gray-300 hover:text-red-500 transition-colors ml-2'
												aria-label='Remove item'
											>
												<Trash2 className='w-4 h-4' />
											</button>
										</div>

										<div className='flex items-center justify-between mt-4'>
											<div className='flex items-center bg-gray-100 rounded-full'>
												<button
													onClick={() =>
														updateMutation.mutate({
															productId: item.product_id._id,
															size: item.size,
															color: item.color,
															quantity: item.quantity - 1,
														})
													}
													disabled={item.quantity <= 1}
													className='w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors'
												>
													<Minus className='w-3 h-3' />
												</button>
												<span className='w-8 text-center text-sm font-medium text-gray-900'>
													{item.quantity}
												</span>
												<button
													onClick={() =>
														updateMutation.mutate({
															productId: item.product_id._id,
															size: item.size,
															color: item.color,
															quantity: item.quantity + 1,
														})
													}
													className='w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors'
												>
													<Plus className='w-3 h-3' />
												</button>
											</div>
											<span className='text-sm font-semibold text-gray-900'>
												${(item.product_id.price * item.quantity).toFixed(2)}
											</span>
										</div>
									</div>
								</div>
							))}
						</div>

						<div className='lg:col-span-1'>
							<div className='sticky top-24 bg-gray-50 rounded-2xl p-6'>
								<h2 className='text-sm font-semibold text-gray-900 uppercase tracking-wider mb-5'>
									Order Summary
								</h2>
								<div className='space-y-3 text-sm'>
									<div className='flex justify-between text-gray-500'>
										<span>Subtotal</span>
										<span>${subtotal.toFixed(2)}</span>
									</div>
									<div className='flex justify-between text-gray-500'>
										<span>Shipping</span>
										<span className='text-green-600 font-medium'>Free</span>
									</div>
									<div className='border-t border-gray-200 pt-3 mt-3'>
										<div className='flex justify-between font-semibold text-gray-900'>
											<span>Total</span>
											<span>${subtotal.toFixed(2)}</span>
										</div>
									</div>
								</div>
								<Button className='w-full mt-6 h-11 rounded-full font-medium bg-gray-900 hover:bg-gray-800'>
									Checkout
								</Button>
								<Button
									asChild
									variant='ghost'
									className='w-full mt-2 text-sm text-gray-500'
								>
									<Link to='/products'>Continue Shopping</Link>
								</Button>
							</div>
						</div>
					</div>
				)}
			</main>
			<Footer />
		</div>
	);
}
