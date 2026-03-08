export interface IProduct {
	_id: string;
	name: string;
	description: string;
	brief_description: string;
	category: string;
	subcategory?: string;
	brand: string;
	price: number;
	compare_at_price?: number;
	images: string[];
	sizes: string[];
	colors: string[];
	tags: string[];
	material?: string;
	gender?: string;
	stock: number;
	sku: string;
	url_slug: string;
	views?: number;
	createdAt?: Date;
	updatedAt?: Date;
}
