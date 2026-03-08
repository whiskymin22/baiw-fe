import { useMutation, useQueryClient } from "@tanstack/react-query";
import productService from "@/services/product.service";
import { useAuth } from "@/context/auth-context";
import { useQuery } from "@tanstack/react-query";

export function useWishlistProduct(productId: string | undefined) {
	const { isAuthenticated } = useAuth();
	const queryClient = useQueryClient();

	const { data: statusData } = useQuery({
		queryKey: ["wishlist-status", productId],
		queryFn: () => productService.isInWishlist(productId!),
		enabled: !!productId && isAuthenticated,
	});

	const addMutation = useMutation({
		mutationFn: (id: string) => productService.addToWishlist(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["wishlist-status", productId] });
			queryClient.invalidateQueries({ queryKey: ["wishlist"] });
		},
	});

	const removeMutation = useMutation({
		mutationFn: (id: string) => productService.removeFromWishlist(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["wishlist-status", productId] });
			queryClient.invalidateQueries({ queryKey: ["wishlist"] });
		},
	});

	const isSaved = !!statusData?.saved;

	const toggleSave = () => {
		if (!productId || !isAuthenticated) return;
		if (isSaved) {
			removeMutation.mutate(productId);
		} else {
			addMutation.mutate(productId);
		}
	};

	return {
		isSaved,
		toggleSave,
		isAuthenticated,
	};
}
