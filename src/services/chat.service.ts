import type { AxiosInstance } from 'axios';

import { BaseService, baseService } from './base.service';
import type {
	IChatResponse,
	IChatHistory,
	IChatSession,
	IStreamEvent,
} from '@/types/chat.type';
import type { ListResponse } from '@/types/list.type';
import type { ICourse } from '@/types/course.type';
import { getAccessToken } from '@/lib/auth-store';

export class ChatService {
	private static instance: ChatService;
	private readonly api: AxiosInstance;
	private readonly baseUrl: string;

	constructor(baseService: BaseService) {
		this.api = baseService.getClient();
		this.baseUrl = import.meta.env.VITE_API_URL + '/v1/api';
	}

	public static getInstance(baseService: BaseService): ChatService {
		if (!ChatService.instance) {
			ChatService.instance = new ChatService(baseService);
		}
		return ChatService.instance;
	}

	sendMessage = async (
		message: string,
		sessionId?: string,
		courseId?: string,
	): Promise<IChatResponse> => {
		const { data } = await this.api.post('/chat', {
			message,
			session_id: sessionId,
			course_id: courseId,
		});
		return data.data;
	};

	sendMessageStream = (
		message: string,
		sessionId: string | undefined,
		courseId: string | undefined,
		onToken: (token: string) => void,
		onDone: (sessionId: string, courses?: Partial<ICourse>[]) => void,
		onError: (error: string) => void,
	): (() => void) => {
		let bufferedData = '';

		const params = new URLSearchParams();
		params.set('message', message);
		if (sessionId) params.set('session_id', sessionId);
		if (courseId) params.set('course_id', courseId);

		const token = getAccessToken();
		if (token) params.set('token', token);

		const eventSource = new EventSource(
			`${this.baseUrl}/chat/stream?${params.toString()}`,
		);

		const handleStreamPayload = (payload: string): boolean => {
			const trimmed = payload.trim();
			if (!trimmed) return true;

			if (trimmed === '[DONE]') {
				eventSource.close();
				return true;
			}

			const normalized = trimmed.startsWith('data:')
				? trimmed.replace(/^data:\s*/, '')
				: trimmed;

			try {
				const data: IStreamEvent = JSON.parse(normalized);

				if (data.error) {
					onError(data.error);
					eventSource.close();
					return true;
				}

				if (data.token) {
					onToken(data.token);
				}

				if (data.done && data.session_id) {
					onDone(data.session_id, data.referenced_courses);
				}

				return true;
			} catch {
				return false;
			}
		};

		eventSource.onmessage = (event) => {
			const combined = bufferedData
				? `${bufferedData}${event.data}`
				: event.data;
			const parts = combined
				.split('\n')
				.map((part: string) => part.trim())
				.filter(Boolean);
			bufferedData = '';

			if (parts.length === 0) {
				return;
			}

			for (let index = 0; index < parts.length; index += 1) {
				const part = parts[index];
				const parsed = handleStreamPayload(part);

				if (!parsed) {
					if (index === parts.length - 1) {
						bufferedData = part;
					} else {
						console.error('Failed to parse SSE data:', part);
					}
				}
			}
		};

		eventSource.onerror = () => {
			onError('Connection error. Please try again.');
			eventSource.close();
		};

		return () => eventSource.close();
	};

	getHistory = async (sessionId: string): Promise<IChatHistory> => {
		const { data } = await this.api.get(`/chat/${sessionId}`);
		return data.data;
	};

	getSessions = async (
		params: { page?: number; limit?: number } = {},
	): Promise<ListResponse<IChatSession>> => {
		const { data } = await this.api.get('/chat/sessions', { params });
		return data;
	};
}

const chatService = ChatService.getInstance(baseService);

export default chatService;
