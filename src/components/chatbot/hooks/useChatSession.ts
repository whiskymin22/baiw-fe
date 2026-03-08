import * as React from 'react';
import { flushSync } from 'react-dom';
import chatService from '@/services/chat.service';
import type { Message } from '../types';
import { getWelcomeMessage } from '../constants';

interface UseChatSessionProps {
	sessionStorageKey: string;
	courseId?: string;
	courseName?: string;
}

const STREAM_INTERVAL_MS = 200;

export function useChatSession({
	sessionStorageKey,
	courseId,
	courseName,
}: UseChatSessionProps) {
	const [messages, setMessages] = React.useState<Message[]>([]);
	const [isLoading, setIsLoading] = React.useState(false);
	const [streamingMessage, setStreamingMessage] =
		React.useState<Message | null>(null);
	const [sessionId, setSessionId] = React.useState<string | null>(
		() => {
			return localStorage.getItem(sessionStorageKey);
		},
	);
	const cleanupRef = React.useRef<(() => void) | null>(null);
	const streamingContentRef = React.useRef('');
	const tokenQueueRef = React.useRef<string[]>([]);
	const streamTimerRef = React.useRef<ReturnType<
		typeof setInterval
	> | null>(null);

	const splitTokenForStreaming = React.useCallback(
		(token: string) => {
			const parts = token.match(/\S+\s*|\s+/g);
			if (!parts) return [token];
			return parts;
		},
		[],
	);

	React.useEffect(() => {
		const storedSessionId = localStorage.getItem(sessionStorageKey);
		setSessionId(storedSessionId);
		setMessages([]);
	}, [sessionStorageKey]);

	React.useEffect(() => {
		if (messages.length === 0) {
			const welcomeMessage = getWelcomeMessage(courseId, courseName);
			setMessages([
				{
					id: 'welcome',
					content: welcomeMessage,
					role: 'assistant',
					timestamp: new Date(),
				},
			]);
		}
	}, [courseId, courseName, messages.length]);

	React.useEffect(() => {
		return () => {
			if (cleanupRef.current) {
				cleanupRef.current();
			}
			if (streamTimerRef.current) {
				clearInterval(streamTimerRef.current);
				streamTimerRef.current = null;
			}
		};
	}, []);

	const sendMessage = React.useCallback(
		(text: string) => {
			if (!text.trim() || isLoading) return;

			const userMessage: Message = {
				id: Date.now().toString(),
				content: text,
				role: 'user',
				timestamp: new Date(),
			};

			const botMessageId = (Date.now() + 1).toString();
			streamingContentRef.current = '';
			tokenQueueRef.current = [];
			setMessages((prev) => [...prev, userMessage]);
			setStreamingMessage({
				id: botMessageId,
				content: '',
				role: 'assistant',
				timestamp: new Date(),
			});
			setIsLoading(true);

			const cleanup = chatService.sendMessageStream(
				text,
				sessionId || undefined,
				courseId,
				(token) => {
					tokenQueueRef.current.push(
						...splitTokenForStreaming(token),
					);

					if (!streamTimerRef.current) {
						streamTimerRef.current = setInterval(() => {
							const nextToken = tokenQueueRef.current.shift();
							if (!nextToken) {
								if (streamTimerRef.current) {
									clearInterval(streamTimerRef.current);
									streamTimerRef.current = null;
								}
								return;
							}

							streamingContentRef.current += nextToken;
							flushSync(() => {
								setStreamingMessage((prev) =>
									prev
										? {
												...prev,
												content: streamingContentRef.current,
											}
										: prev,
								);
							});
						}, STREAM_INTERVAL_MS);
					}
				},
				(newSessionId, courses) => {
					if (streamTimerRef.current) {
						clearInterval(streamTimerRef.current);
						streamTimerRef.current = null;
					}
					if (tokenQueueRef.current.length > 0) {
						streamingContentRef.current +=
							tokenQueueRef.current.join('');
						tokenQueueRef.current = [];
						flushSync(() => {
							setStreamingMessage((prev) =>
								prev
									? {
											...prev,
											content: streamingContentRef.current,
										}
									: prev,
							);
						});
					}

					if (newSessionId && newSessionId !== sessionId) {
						setSessionId(newSessionId);
						localStorage.setItem(sessionStorageKey, newSessionId);
					}
					const finalMessage: Message = {
						id: botMessageId,
						content: streamingContentRef.current,
						role: 'assistant',
						referenced_courses: courses,
						timestamp: new Date(),
					};
					setMessages((prev) => [...prev, finalMessage]);
					setStreamingMessage(null);
					setIsLoading(false);
					cleanupRef.current = null;
				},
				(error) => {
					if (streamTimerRef.current) {
						clearInterval(streamTimerRef.current);
						streamTimerRef.current = null;
					}
					tokenQueueRef.current = [];

					setMessages((prev) => [
						...prev,
						{
							id: botMessageId,
							content: error,
							role: 'assistant',
							timestamp: new Date(),
						},
					]);
					setStreamingMessage(null);
					setIsLoading(false);
					cleanupRef.current = null;
				},
			);

			cleanupRef.current = cleanup;
		},
		[
			isLoading,
			sessionId,
			courseId,
			sessionStorageKey,
			splitTokenForStreaming,
		],
	);

	const resetSession = React.useCallback(() => {
		if (cleanupRef.current) {
			cleanupRef.current();
			cleanupRef.current = null;
		}
		localStorage.removeItem(sessionStorageKey);
		setSessionId(null);
		setMessages([]);
	}, [sessionStorageKey]);

	return {
		messages,
		streamingMessage,
		isLoading,
		sendMessage,
		resetSession,
	};
}
