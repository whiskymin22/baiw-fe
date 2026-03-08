import type { IProduct } from "@/types/product.type";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Tag, ShoppingBag } from "lucide-react";

interface ProductCardProps {
	product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
	const imageUrl = product.images?.[0] || "https://placehold.co/400x500?text=No+Image";
	const hasDiscount = product.compare_at_price && product.compare_at_price > product.price;
	const discountPercent = hasDiscount
		? Math.round((1 - product.price / product.compare_at_price!) * 100)
		: 0;

	return (
		<Link
			to={`/products/${product._id}`}
			data-testid={`link-product-${product._id}`}
		>
			<div className="group bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
				<div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
					<img
						src={imageUrl}
						alt={product.name}
						className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
					/>
					{hasDiscount && (
						<Badge className="absolute top-3 left-3 bg-rose-500 text-white border-0">
							-{discountPercent}%
						</Badge>
					)}
					<div className="absolute top-3 right-3">
						<Badge
							variant="secondary"
							className="bg-white/90 text-stone-700 border-0 px-2 py-1 text-xs font-medium flex items-center gap-1"
						>
							<Tag className="w-3 h-3" />
							{product.category}
						</Badge>
					</div>
				</div>

				<div className="p-4 space-y-2">
					<p className="text-xs font-medium text-stone-500 uppercase tracking-wider">
						{product.brand}
					</p>
					<h3
						className="font-semibold text-stone-900 line-clamp-2 group-hover:text-rose-600 transition-colors"
						data-testid={`text-title-${product._id}`}
					>
						{product.name}
					</h3>
					<p
						className="text-sm text-stone-600 line-clamp-2"
						data-testid={`text-summary-${product._id}`}
					>
						{product.brief_description}
					</p>
					<div className="flex items-center justify-between pt-2">
						<div className="flex items-center gap-2">
							<span className="font-bold text-stone-900">
								${product.price.toFixed(2)}
							</span>
							{hasDiscount && (
								<span className="text-sm text-stone-400 line-through">
									${product.compare_at_price!.toFixed(2)}
								</span>
							)}
						</div>
						<Badge variant="outline" className="text-xs">
							<ShoppingBag className="w-3 h-3 mr-1" />
							View
						</Badge>
					</div>
				</div>
			</div>
		</Link>
	);
}
