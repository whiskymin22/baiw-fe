export const SESSION_STORAGE_KEY_BASE = 'chatbot_session_id';
export const CHAT_SIZE_STORAGE_KEY = 'chatbot_size';

export const MIN_WIDTH = 320;
export const MAX_WIDTH = 600;
export const MIN_HEIGHT = 400;
export const MAX_HEIGHT = 800;
export const DEFAULT_WIDTH = 400;
export const DEFAULT_HEIGHT = 650;

export const SUGGESTED_PROMPTS = [
	'What styles do you have?',
	'Recommend something for me',
	'Show me casual outfits',
];

export const getSessionStorageKey = (productId?: string) =>
	productId
		? `${SESSION_STORAGE_KEY_BASE}_product_${productId}`
		: SESSION_STORAGE_KEY_BASE;

export const getWelcomeMessage = (
	productId?: string,
	productName?: string,
): string => {
	if (productId) {
		return `Hello! 👋 I can help you with the product **"${productName || 'this'}"**.\n\n**You can ask me about:**\n- Sizing & fit\n- Styling tips\n- Similar products`;
	}
	return `Hello! 👋 I'm **StyleBot**, your fashion assistant.\n\n**I can help you with:**\n- Finding the perfect outfit\n- Product recommendations\n- Styling advice\n\n**How can I help you?**`;
};
