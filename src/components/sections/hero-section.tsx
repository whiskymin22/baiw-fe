import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
	return (
		<section
			className='relative min-h-[90vh] flex items-center overflow-hidden'
			data-testid='section-hero'
		>
			<div className='absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100' />
			<div className='absolute inset-0 opacity-[0.03]' style={{
				backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
			}} />

			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
				<div className='grid lg:grid-cols-2 gap-12 items-center'>
					<div className='space-y-8'>
						<div className='inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-600'>
							<span className='w-2 h-2 bg-green-500 rounded-full animate-pulse' />
							AI-Powered Styling
						</div>

						<h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1]'>
							Discover
							<br />
							<span className='font-serif italic font-normal text-gray-600'>
								Your Style
							</span>
						</h1>

						<p className='text-lg text-gray-500 max-w-lg leading-relaxed'>
							Curated fashion for every occasion. Our AI learns your preferences
							to recommend pieces you'll love.
						</p>

						<div className='flex flex-wrap gap-4'>
							<Button
								asChild
								size='lg'
								className='h-12 px-8 text-sm font-medium bg-gray-900 hover:bg-gray-800 text-white rounded-full transition-all duration-200 shadow-md hover:shadow-lg'
							>
								<Link to='/products'>
									Shop Collection
									<ArrowRight className='ml-2 w-4 h-4' />
								</Link>
							</Button>
							<Button
								variant='outline'
								size='lg'
								className='h-12 px-8 text-sm font-medium rounded-full border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200'
								onClick={() => {
									document.getElementById('products')?.scrollIntoView({
										behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
									});
								}}
							>
								Trending Now
							</Button>
						</div>

						<div className='flex items-center gap-8 pt-4'>
							<div>
								<p className='text-2xl font-bold text-gray-900'>2K+</p>
								<p className='text-xs text-gray-500'>Products</p>
							</div>
							<div className='w-px h-10 bg-gray-200' />
							<div>
								<p className='text-2xl font-bold text-gray-900'>50+</p>
								<p className='text-xs text-gray-500'>Brands</p>
							</div>
							<div className='w-px h-10 bg-gray-200' />
							<div>
								<p className='text-2xl font-bold text-gray-900'>AI</p>
								<p className='text-xs text-gray-500'>Powered</p>
							</div>
						</div>
					</div>

					<div className='hidden lg:block relative'>
						<div className='aspect-[3/4] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 shadow-2xl'>
							<img
								src='https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80'
								alt='Fashion collection'
								className='w-full h-full object-cover'
							/>
						</div>
						<div className='absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 border border-gray-100'>
							<p className='text-xs text-gray-500 mb-1'>This season</p>
							<p className='text-sm font-semibold text-gray-900'>New Arrivals</p>
							<p className='text-xs text-gray-500'>200+ items added</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
