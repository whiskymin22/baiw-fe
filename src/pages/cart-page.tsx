import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

import Header from '@/components/header';
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
			<>
				<Header />
				<main className='max-w-4xl mx-auto px-4 py-12'>
					<div className='space-y-4'>
						{[1, 2, 3].map((i) => (
							<div
								key={i}
								className='h-28 bg-stone-100 rounded-lg animate-pulse'
							/>
						))}
					</div>
				</main>
			</>
		);
	}

	return (
		<>
			<Header />
			<main className='max-w-4xl mx-auto px-4 py-8'>
				<div className='flex items-center gap-3 mb-8'>
					<ShoppingBag className='w-6 h-6 text-stone-700' />
					<h1 className='text-2xl font-bold text-stone-900'>
						Shopping Cart
					</h1>
					<span className='text-stone-500'>
						({items.length} {items.length === 1 ? 'item' : 'items'})
					</span>
				</div>

				{items.length === 0 ? (
					<div className='text-center py-20'>
						<ShoppingBag className='w-16 h-16 text-stone-300 mx-auto mb-4' />
						<h2 className='text-xl font-semibold text-stone-700 mb-2'>
							Your cart is empty
						</h2>
						<p className='text-stone-500 mb-6'>
							Looks like you haven't added anything to your cart
							yet.
						</p>
						<Button asChild>
							<Link to='/products'>
								<ArrowLeft className='w-4 h-4 mr-2' />
								Continue Shopping
							</Link>
						</Button>
					</div>
				) : (
					<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
						<div className='lg:col-span-2 space-y-4'>
							{items.map((item, index) => (
								<div
									key={`${item.product_id._id}-${item.size}-${item.color}-${index}`}
									className='flex gap-4 p-4 bg-white border border-stone-200 rounded-lg'
								>
									<Link
										to={`/products/${item.product_id._id}`}
										className='shrink-0'
									>
										<img
											src={
												item.product_id.images?.[0] ||
												'https://placehold.co/120x120?text=No+Image'
											}
											alt={item.product_id.name}
											className='w-24 h-24 object-cover rounded-md'
										/>
									</Link>

									<div className='flex-1 min-w-0'>
										<Link
											to={`/products/${item.product_id._id}`}
											className='font-semibold text-stone-900 hover:text-rose-600 transition-colors line-clamp-1'
										>
											{item.product_id.name}
										</Link>
										<p className='text-sm text-stone-500'>
											{item.product_id.brand}
										</p>
										<div className='flex gap-3 mt-1 text-sm text-stone-600'>
											{item.size && (
												<span>Size: {item.size}</span>
											)}
											{item.color && (
												<span>
													Color: {item.color}
												</span>
											)}
										</div>

										<div className='flex items-center justify-between mt-3'>
											<div className='flex items-center gap-2'>
												<button
													onClick={() =>
														updateMutation.mutate({
															productId:
																item.product_id
																	._id,
															size: item.size,
															color: item.color,
															quantity:
																item.quantity -
																1,
														})
													}
													disabled={
														item.quantity <= 1
													}
													className='w-8 h-8 flex items-center justify-center rounded-md border border-stone-300 text-stone-600 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed'
												>
													<Minus className='w-3 h-3' />
												</button>
												<span className='w-8 text-center font-medium text-stone-900'>
													{item.quantity}
												</span>
												<button
													onClick={() =>
														updateMutation.mutate({
															productId:
																item.product_id
																	._id,
															size: item.size,
															color: item.color,
															quantity:
																item.quantity +
																1,
														})
													}
													className='w-8 h-8 flex items-center justify-center rounded-md border border-stone-300 text-stone-600 hover:bg-stone-50'
												>
													<Plus className='w-3 h-3' />
												</button>
											</div>

											<div className='flex items-center gap-4'>
												<span className='font-semibold text-stone-900'>
													$
													{(
														item.product_id.price *
														item.quantity
													).toFixed(2)}
												</span>
												<button
													onClick={() =>
														removeMutation.mutate({
															productId:
																item.product_id
																	._id,
															size: item.size,
															color: item.color,
														})
													}
													className='text-stone-400 hover:text-rose-600 transition-colors'
													aria-label='Remove item'
												>
													<Trash2 className='w-4 h-4' />
												</button>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>

						<div className='lg:col-span-1'>
							<div className='sticky top-24 bg-stone-50 border border-stone-200 rounded-lg p-6'>
								<h2 className='text-lg font-semibold text-stone-900 mb-4'>
									Order Summary
								</h2>
								<div className='space-y-2 text-sm'>
									<div className='flex justify-between text-stone-600'>
										<span>Subtotal</span>
										<span>${subtotal.toFixed(2)}</span>
									</div>
									<div className='flex justify-between text-stone-600'>
										<span>Shipping</span>
										<span className='text-green-600'>
											Free
										</span>
									</div>
									<div className='border-t border-stone-200 pt-2 mt-2'>
										<div className='flex justify-between font-semibold text-stone-900 text-base'>
											<span>Total</span>
											<span>${subtotal.toFixed(2)}</span>
										</div>
									</div>
								</div>
								<Button className='w-full mt-6' size='lg'>
									Checkout
								</Button>
								<Button
									asChild
									variant='ghost'
									className='w-full mt-2'
								>
									<Link to='/products'>
										Continue Shopping
									</Link>
								</Button>
							</div>
						</div>
					</div>
				)}
			</main>
		</>
	);
}
