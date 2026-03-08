import { Truck, Shield, RotateCcw, Sparkles } from "lucide-react";

const features = [
	{
		icon: Truck,
		title: "FREE SHIPPING",
		description:
			"Free delivery on orders over $50. Fast and reliable shipping nationwide.",
	},
	{
		icon: Shield,
		title: "SECURE PAYMENT",
		description:
			"Your payment information is protected with industry-standard encryption.",
	},
	{
		icon: RotateCcw,
		title: "EASY RETURNS",
		description:
			"30-day hassle-free returns. Not satisfied? We've got you covered.",
	},
	{
		icon: Sparkles,
		title: "AI STYLING",
		description:
			"Get personalized outfit recommendations powered by AI. Ask our StyleBot!",
	},
];

export default function FeaturesSection() {
	return (
		<section
			className="py-16 px-4 bg-stone-100 border-y border-stone-200"
			data-testid="section-features"
		>
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-900 mb-4">
						WHY SHOP WITH US
					</h2>
					<p className="text-lg text-stone-600 max-w-2xl mx-auto">
						Quality fashion, exceptional service
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{features.map((feature, index) => (
						<div
							key={index}
							className="bg-white border border-stone-200 p-6 rounded-xl hover:shadow-md transition-shadow"
							data-testid={`feature-${index}`}
						>
							<div className="w-14 h-14 bg-stone-900 rounded-lg flex items-center justify-center mb-4">
								<feature.icon className="w-7 h-7 text-white" />
							</div>
							<h3 className="text-xl font-bold mb-2 text-stone-900">
								{feature.title}
							</h3>
							<p className="text-stone-600">{feature.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
