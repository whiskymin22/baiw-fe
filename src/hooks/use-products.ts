import { useQuery } from '@tanstack/react-query';
import productService from '@/services/product.service';
import type { IProduct } from '@/types/product.type';
import type { ListResponse } from '@/types/list.type';
import { useAuth } from '@/context/auth-context';

interface UseProductsParams {
	page?: number;
	limit?: number;
	search?: string;
	category?: string;
	gender?: string;
}

export const useProducts = (params: UseProductsParams = {}) => {
	const {
		page = 1,
		limit = 10,
		search = '',
		category = 'all',
		gender = 'all',
	} = params;

	return useQuery<ListResponse<IProduct>>({
		queryKey: ['products', page, limit, search, category, gender],
		queryFn: async () => {
			const queryParams = new URLSearchParams();

			if (page > 1) {
				queryParams.append('page', page.toString());
			}
			if (limit !== 10) {
				queryParams.append('limit', limit.toString());
			}
			if (search) {
				queryParams.append('search', search);
			}
			if (category && category !== 'all') {
				queryParams.append('category', category);
			}
			if (gender && gender !== 'all') {
				queryParams.append('gender', gender);
			}

			const url = `/products${
				queryParams.toString() ? `?${queryParams.toString()}` : ''
			}`;
			return productService.getListAllProducts(url);
		},
		placeholderData: (previousData) => previousData,
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
	});
};

export const useProductById = (id: string | undefined) => {
	return useQuery<IProduct>({
		queryKey: ['product', id],
		queryFn: async () => {
			if (!id) {
				throw new Error('Product ID is required');
			}
			return productService.getProductById(id);
		},
		enabled: !!id,
	});
};

export const usePopularProducts = ({
	limit = 10,
}: {
	limit?: number;
}) => {
	return useQuery<ListResponse<IProduct>>({
		queryKey: ['popular-products'],
		queryFn: async () => {
			return productService.getPopularProducts({ limit });
		},
		placeholderData: (previousData) => previousData,
	});
};

export const usePersonalizedProducts = ({
	userId,
	limit = 10,
}: {
	userId: string;
	limit?: number;
}) => {
	return useQuery<ListResponse<IProduct>>({
		queryKey: ['personalized-products', userId, limit],
		queryFn: async () => {
			return productService.getPersonalizedProducts({ userId, limit });
		},
		placeholderData: (previousData) => previousData,
	});
};

export const useWishlist = (params: {
	page?: number;
	limit?: number;
	enabled?: boolean;
}) => {
	const {
		page = 1,
		limit = 10,
		enabled: enabledProp = true,
	} = params;
	const { isAuthenticated } = useAuth();

	const queryKey = ['wishlist', page, limit];

	return useQuery<ListResponse<IProduct>>({
		queryKey,
		queryFn: async () => {
			return productService.getWishlist({ page, limit });
		},
		enabled: isAuthenticated && enabledProp,
		placeholderData: (previousData) => previousData,
	});
};
