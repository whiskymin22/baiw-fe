import type { IProduct } from "@/types/product.type";
import ProductCard from "./ProductCard";
import { cn } from "@/lib/utils";

interface ProductGridProps {
	products: IProduct[];
	title?: string;
	className?: string;
}

export default function ProductGrid({
	products,
	title,
	className,
}: ProductGridProps) {
	return (
		<section
			className={cn("py-8 px-4 bg-stone-50 scroll-mt-24", className)}
			id="products"
			data-testid="section-product-grid"
		>
			{title && (
				<div className="max-w-7xl mx-auto mb-8">
					<h2 className="text-2xl md:text-3xl font-bold tracking-tight text-stone-900">
						{title}
					</h2>
				</div>
			)}
			<div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{products.map((product) => (
					<ProductCard key={product._id} product={product} />
				))}
			</div>
		</section>
	);
}
