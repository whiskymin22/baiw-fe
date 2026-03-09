import { Truck, Shield, RotateCcw, Sparkles } from 'lucide-react';

const features = [
	{
		icon: Truck,
		title: 'Free Shipping',
		description: 'Free delivery on orders over $50. Fast and reliable shipping nationwide.',
	},
	{
		icon: Shield,
		title: 'Secure Payment',
		description: 'Your payment information is protected with industry-standard encryption.',
	},
	{
		icon: RotateCcw,
		title: 'Easy Returns',
		description: '30-day hassle-free returns. Not satisfied? We\'ve got you covered.',
	},
	{
		icon: Sparkles,
		title: 'AI Styling',
		description: 'Get personalized outfit recommendations powered by AI. Ask our StyleBot!',
	},
];

export default function FeaturesSection() {
	return (
		<section
			className='py-20 px-4 bg-white border-y border-gray-100'
			data-testid='section-features'
		>
			<div className='max-w-7xl mx-auto'>
				<div className='text-center mb-14'>
					<p className='text-sm font-medium text-gray-500 uppercase tracking-wider mb-3'>
						Why choose us
					</p>
					<h2 className='text-3xl md:text-4xl font-bold tracking-tight text-gray-900'>
						Shopping made better
					</h2>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
					{features.map((feature, index) => (
						<div
							key={index}
							className='group relative p-6 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-lg transition-all duration-300'
							data-testid={`feature-${index}`}
						>
							<div className='w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300'>
								<feature.icon className='w-5 h-5 text-white' />
							</div>
							<h3 className='text-base font-semibold mb-2 text-gray-900'>
								{feature.title}
							</h3>
							<p className='text-sm text-gray-500 leading-relaxed'>
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
