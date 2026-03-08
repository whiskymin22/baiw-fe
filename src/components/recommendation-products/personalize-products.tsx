import { useAuth } from "@/context/auth-context";
import { usePersonalizedProducts } from "@/hooks/use-products";
import ProductGrid from "../ProductGrid";

function PersonalizeProducts() {
	const { user } = useAuth();
	const { data: relatedProducts } = usePersonalizedProducts({
		userId: user?._id || "",
		limit: 12,
	});

	if (!relatedProducts) {
		return null;
	}

	return (
		<>
			{relatedProducts?.data?.length > 0 && (
				<ProductGrid
					products={relatedProducts.data}
					title="You Might Also Like"
					className="bg-transparent"
				/>
			)}
		</>
	);
}

export default PersonalizeProducts;
