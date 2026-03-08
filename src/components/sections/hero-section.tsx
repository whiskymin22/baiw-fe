import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
	return (
		<section
			className="relative min-h-[80vh] flex items-center justify-center overflow-hidden border-b border-stone-200"
			data-testid="section-hero"
		>
			<div className="absolute inset-0 bg-gradient-to-br from-stone-100 via-rose-50/30 to-stone-100" />
			<div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_30%,rgba(251,207,232,0.3),transparent_70%)]" />

			<div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
				<h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-stone-900 mb-8">
					DISCOVER YOUR STYLE
				</h1>
				<p className="text-xl md:text-2xl font-medium text-stone-600 mb-12 max-w-3xl mx-auto">
					Curated fashion for every occasion
					<br />
					AI-powered recommendations just for you
				</p>
				<Button
					size="lg"
					className="font-bold text-base px-12 min-h-14 sm:text-lg bg-stone-900 hover:bg-stone-800 text-white transition-all duration-200"
					onClick={() => {
						document
							.getElementById("products")
							?.scrollIntoView({
								behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
							});
					}}
				>
					SHOP NOW
					<ArrowRight className="ml-2 w-5 h-5" />
				</Button>
			</div>
		</section>
	);
}
