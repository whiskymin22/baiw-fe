import * as React from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ChatBot } from "@/components/chatbot";
import { useProductById } from "@/hooks/use-products";
import { useWishlistProduct } from "@/hooks/use-wishlist";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Tag } from "lucide-react";
import productService from "@/services/product.service";
import { useAuth } from "@/context/auth-context";
import PersonalizedProducts from "@/components/recommendation-products/personalize-products";

export default function ProductDetailPage() {
	const params = useParams();
	const { user, isAuthenticated } = useAuth();
	const {
		data: product,
		isLoading,
		error,
	} = useProductById(params?.id);
	const { isSaved, toggleSave } = useWishlistProduct(product?._id);

	const [selectedSize, setSelectedSize] = React.useState<string>("");
	const [selectedColor, setSelectedColor] = React.useState<string>("");
	const [addingToCart, setAddingToCart] = React.useState(false);
	const [imageIndex, setImageIndex] = React.useState(0);

	const imageUrl =
		product?.images?.[imageIndex] || "https://placehold.co/600x700?text=No+Image";
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
			<div className="min-h-screen bg-stone-50">
				<Header />
				<main className="max-w-7xl mx-auto px-4 py-12">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
						<div className="aspect-[4/5] bg-stone-200 rounded-xl" />
						<div className="space-y-4">
							<div className="h-8 bg-stone-200 rounded w-3/4" />
							<div className="h-4 bg-stone-200 rounded w-1/2" />
							<div className="h-24 bg-stone-200 rounded" />
						</div>
					</div>
				</main>
				<Footer />
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-stone-50">
				<Header />
				<main className="max-w-7xl mx-auto px-4 py-12 text-center">
					<h2 className="text-xl font-semibold text-stone-900 mb-2">
						Error loading product
					</h2>
					<p className="text-stone-600">
						{error instanceof Error ? error.message : "Something went wrong"}
					</p>
				</main>
				<Footer />
			</div>
		);
	}

	if (!product) {
		return (
			<div className="min-h-screen bg-stone-50">
				<Header />
				<main className="max-w-7xl mx-auto px-4 py-12 text-center">
					<h2 className="text-xl font-semibold text-stone-900">
						Product not found
					</h2>
				</main>
				<Footer />
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-stone-50 flex flex-col">
			<Header />
			<main id="main-content" className="flex-1">
				<div className="max-w-7xl mx-auto px-4 py-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
						{/* Image gallery */}
						<div className="space-y-4">
							<div className="aspect-[4/5] rounded-xl overflow-hidden bg-white border border-stone-200">
								<img
									src={imageUrl}
									alt={product.name}
									className="w-full h-full object-cover"
								/>
							</div>
							{product.images?.length > 1 && (
								<div className="flex gap-2 overflow-x-auto">
									{product.images.map((img, i) => (
										<button
											key={i}
											onClick={() => setImageIndex(i)}
											className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
												imageIndex === i
													? "border-stone-900"
													: "border-stone-200"
											}`}
										>
											<img
												src={img}
												alt={`${product.name} ${i + 1}`}
												className="w-full h-full object-cover"
											/>
										</button>
									))}
								</div>
							)}
						</div>

						{/* Product info */}
						<div>
							<div className="flex items-center gap-2 mb-4">
								<Badge variant="secondary" className="text-xs">
									{product.brand}
								</Badge>
								<Badge variant="outline" className="text-xs">
									{product.category}
								</Badge>
								{hasDiscount && (
									<Badge className="bg-rose-500 text-white border-0">
										-{discountPercent}% OFF
									</Badge>
								)}
							</div>

							<h1 className="text-3xl font-bold text-stone-900 mb-4">
								{product.name}
							</h1>

							<div className="flex items-center gap-4 mb-6">
								<span className="text-2xl font-bold text-stone-900">
									${product.price.toFixed(2)}
								</span>
								{hasDiscount && (
									<span className="text-lg text-stone-400 line-through">
										${product.compare_at_price!.toFixed(2)}
									</span>
								)}
							</div>

							<p className="text-stone-600 mb-6">{product.description}</p>

							{product.sizes?.length > 0 && (
								<div className="mb-6">
									<h3 className="text-sm font-semibold text-stone-900 mb-2">
										Size
									</h3>
									<div className="flex flex-wrap gap-2">
										{product.sizes.map((s) => (
											<button
												key={s}
												onClick={() => setSelectedSize(s)}
												className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
													selectedSize === s
														? "border-stone-900 bg-stone-900 text-white"
														: "border-stone-300 hover:border-stone-400"
												}`}
											>
												{s}
											</button>
										))}
									</div>
								</div>
							)}

							{product.colors?.length > 0 && (
								<div className="mb-6">
									<h3 className="text-sm font-semibold text-stone-900 mb-2">
										Color
									</h3>
									<div className="flex flex-wrap gap-2">
										{product.colors.map((c) => (
											<button
												key={c}
												onClick={() => setSelectedColor(c)}
												className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
													selectedColor === c
														? "border-stone-900 bg-stone-900 text-white"
														: "border-stone-300 hover:border-stone-400"
												}`}
											>
												{c}
											</button>
										))}
									</div>
								</div>
							)}

							<div className="flex gap-4">
								<Button
									size="lg"
									className="flex-1 bg-stone-900 hover:bg-stone-800"
									onClick={handleAddToCart}
									disabled={!isAuthenticated || addingToCart}
								>
									<ShoppingCart className="w-5 h-5 mr-2" />
									{addingToCart ? "Adding…" : "Add to Cart"}
								</Button>
								{isAuthenticated && (
									<Button
										size="lg"
										variant="outline"
										onClick={toggleSave}
										className={isSaved ? "text-rose-600 border-rose-600" : ""}
									>
										<Heart
											className={`w-5 h-5 mr-2 ${isSaved ? "fill-current" : ""}`}
										/>
										{isSaved ? "Saved" : "Save"}
									</Button>
								)}
							</div>

							{product.tags?.length > 0 && (
								<div className="mt-6 flex flex-wrap gap-2">
									<Tag className="w-4 h-4 text-stone-400 mt-0.5" />
									{product.tags.map((t) => (
										<Badge key={t} variant="secondary" className="text-xs">
											{t}
										</Badge>
									))}
								</div>
							)}
						</div>
					</div>

					<div className="mt-16">
						<PersonalizedProducts />
					</div>
				</div>

				<ChatBot productId={product._id} productName={product.name} />
			</main>
			<Footer />
		</div>
	);
}
