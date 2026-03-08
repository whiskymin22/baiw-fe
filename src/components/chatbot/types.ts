import type { IProduct } from '@/types/product.type';

export interface Message {
	id: string;
	content: string;
	role: 'user' | 'assistant';
	referenced_courses?: Partial<IProduct>[];
	timestamp?: Date;
}

export interface ChatBotProps {
	courseId?: string;
	courseName?: string;
	productId?: string;
	productName?: string;
}

export interface ChatSize {
	width: number;
	height: number;
}
