import type { ICourse } from './course.type';

export interface IChatMessage {
	id: string;
	role: 'user' | 'assistant';
	content: string;
	referenced_courses?: Partial<ICourse>[];
	createdAt?: string;
}

export interface IChatSession {
	session_id: string;
	title?: string;
	user_id?: string;
	course_id?: string;
	createdAt: string;
	updatedAt: string;
}

export interface IChatResponse {
	session_id: string;
	message: {
		role: 'assistant';
		content: string;
		referenced_courses?: Partial<ICourse>[];
	};
}

export interface IChatHistory {
	session: IChatSession;
	messages: IChatMessage[];
}

export interface IStreamEvent {
	token?: string;
	done?: boolean;
	session_id?: string;
	referenced_courses?: Partial<ICourse>[];
	error?: string;
}
