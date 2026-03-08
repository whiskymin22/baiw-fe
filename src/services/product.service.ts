import type { AxiosInstance, AxiosRequestConfig } from 'axios';

import { BaseService, baseService } from './base.service';

import type { IProduct } from '@/types/product.type';
import type { ListResponse } from '@/types/list.type';

export class ProductService {
	private static instance: ProductService;
	private readonly api: AxiosInstance;

	private readonly baseService: BaseService;

	constructor(baseService: BaseService) {
		this.baseService = baseService;
		this.api = this.baseService.getClient();
	}

	public static getInstance(baseService: BaseService): ProductService {
		if (!ProductService.instance) {
			ProductService.instance = new ProductService(baseService);
		}
		return ProductService.instance;
	}

	getListAllProducts = async <T extends ListResponse<IProduct>>(
		url = '/products',
		configs?: AxiosRequestConfig,
	) => {
		const { data } = await this.api.get<T>(url, configs);
		return data;
	};

	getProductById = async (
		id: string,
		url = `/products/${id}`,
		configs?: AxiosRequestConfig,
	): Promise<IProduct> => {
		const { data } = await this.api.get(url, configs);
		return data.data;
	};

	getWishlist = async (
		params: { page?: number; limit?: number } = {},
		configs?: AxiosRequestConfig,
	): Promise<ListResponse<IProduct>> => {
		const { data } = await this.api.get('/wishlist', {
			params,
			...configs,
		});
		return data;
	};

	addToWishlist = async (
		productId: string,
	): Promise<{ saved: boolean }> => {
		const { data } = await this.api.post(
			`/wishlist/${productId}`,
		);
		return data.data;
	};

	removeFromWishlist = async (
		productId: string,
	): Promise<{ saved: boolean }> => {
		const { data } = await this.api.delete(
			`/wishlist/${productId}`,
		);
		return data.data;
	};

	isInWishlist = async (
		productId: string,
	): Promise<{ saved: boolean }> => {
		const { data } = await this.api.get(
			`/wishlist/${productId}/status`,
		);
		return data.data;
	};

	addToCart = async (
		productId: string,
		options?: { size?: string; color?: string; quantity?: number },
	): Promise<{ success: boolean }> => {
		const { data } = await this.api.post(
			`/cart/${productId}`,
			options,
		);
		return data.data;
	};

	getCart = async () => {
		const { data } = await this.api.get('/cart');
		return data.data;
	};

	getPopularProducts = async (
		params: { limit?: number } = {},
		configs?: AxiosRequestConfig,
	): Promise<ListResponse<IProduct>> => {
		const { data } = await this.api.get('/recommendations/popular', {
			params,
			...configs,
		});
		return data;
	};

	getPersonalizedProducts = async (
		params: { userId: string; limit?: number },
		configs?: AxiosRequestConfig,
	): Promise<ListResponse<IProduct>> => {
		const { data } = await this.api.get(
			`/recommendations/personalized/${params.userId}`,
			{
				params,
				...configs,
			},
		);
		return data;
	};
}

const productService = ProductService.getInstance(baseService);

export default productService;
