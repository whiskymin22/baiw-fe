import { Link } from 'react-router-dom';

export default function Footer() {
	return (
		<footer className='bg-gray-950 text-gray-400'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<div className='grid grid-cols-1 md:grid-cols-4 gap-10'>
					<div className='md:col-span-1'>
						<Link to='/' className='inline-block'>
							<h2 className='text-xl font-bold text-white font-serif tracking-tight'>
								STYLE STORE
							</h2>
						</Link>
						<p className='mt-4 text-sm leading-relaxed'>
							Curated fashion for every occasion. AI-powered recommendations to help you discover your perfect style.
						</p>
					</div>

					<div>
						<h3 className='text-xs font-semibold text-white uppercase tracking-wider mb-4'>
							Shop
						</h3>
						<ul className='space-y-3'>
							{['All Products', 'Shirts', 'Pants', 'Jackets', 'Dresses', 'Accessories'].map((item) => (
								<li key={item}>
									<Link
										to='/products'
										className='text-sm hover:text-white transition-colors'
									>
										{item}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className='text-xs font-semibold text-white uppercase tracking-wider mb-4'>
							Company
						</h3>
						<ul className='space-y-3'>
							{['About', 'Careers', 'Blog', 'Sustainability'].map((item) => (
								<li key={item}>
									<span className='text-sm hover:text-white transition-colors cursor-pointer'>
										{item}
									</span>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className='text-xs font-semibold text-white uppercase tracking-wider mb-4'>
							Support
						</h3>
						<ul className='space-y-3'>
							{['Help Center', 'Shipping', 'Returns', 'Size Guide', 'Contact'].map((item) => (
								<li key={item}>
									<span className='text-sm hover:text-white transition-colors cursor-pointer'>
										{item}
									</span>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className='mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4'>
					<p className='text-xs'>
						&copy; {new Date().getFullYear()} Style Store. All rights reserved.
					</p>
					<div className='flex gap-6'>
						<span className='text-xs hover:text-white transition-colors cursor-pointer'>Privacy</span>
						<span className='text-xs hover:text-white transition-colors cursor-pointer'>Terms</span>
						<span className='text-xs hover:text-white transition-colors cursor-pointer'>Cookies</span>
					</div>
				</div>
			</div>
		</footer>
	);
}
