import { usePopularProducts } from "@/hooks/use-products";
import LoadingSpinner from "../LoadingSpinner";
import { Button } from "@/components/ui/button";
import ProductGrid from "../ProductGrid";

function PopularProducts() {
	const {
		data: productsResponse,
		isLoading,
		error,
		refetch,
	} = usePopularProducts({ limit: 9 });

	const products = productsResponse?.data || [];

	return isLoading ? (
		<div className="py-16 px-4 bg-stone-50">
			<div className="max-w-7xl mx-auto text-center">
				<LoadingSpinner size="md" />
				<p className="mt-4 text-stone-600">Loading featured products…</p>
			</div>
		</div>
	) : error ? (
		<div className="py-16 px-4 bg-stone-50">
			<div className="max-w-7xl mx-auto text-center">
				<p className="text-stone-600">
					Unable to load featured products right now.
				</p>
				<Button className="mt-4" onClick={() => refetch()}>
					Try again
				</Button>
			</div>
		</div>
	) : (
		<ProductGrid products={products} title="TRENDING NOW" />
	);
}

export default PopularProducts;
