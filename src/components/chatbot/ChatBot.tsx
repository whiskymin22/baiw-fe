import * as React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { ChatWindow } from './ChatWindow';
import { useChatSession } from './hooks/useChatSession';
import { useChatResize } from './hooks/useChatResize';
import { getSessionStorageKey } from './constants';
import type { ChatBotProps } from './types';

export default function ChatBot({
	courseId,
	courseName,
	productId,
	productName,
}: ChatBotProps) {
	const contextId = courseId || productId;
	const contextName = courseName || productName;

	const sessionStorageKey = React.useMemo(
		() => getSessionStorageKey(contextId),
		[contextId],
	);

	const [isOpen, setIsOpen] = React.useState(false);
	const [input, setInput] = React.useState('');

	const { messages, streamingMessage, isLoading, sendMessage, resetSession } =
		useChatSession({
		sessionStorageKey,
		courseId: contextId,
		courseName: contextName,
	});

	const {
		size,
		isResizing,
		handleResizeStart,
		resetSize,
		isDefaultSize,
	} = useChatResize();

	const handleSend = React.useCallback(
		async (messageText?: string) => {
			const textToSend = messageText || input;
			if (!textToSend.trim()) return;

			setInput('');
			await sendMessage(textToSend);
		},
		[input, sendMessage],
	);

	const handleClose = React.useCallback(() => {
		setIsOpen(false);
	}, []);

	const handleNewChat = React.useCallback(() => {
		resetSession();
		setInput('');
	}, [resetSession]);

	if (!isOpen) {
		return (
			<div
				className='fixed bottom-6 right-6 z-50'
				data-testid='chatbot-container'
			>
				<Button
					size='icon'
					className='w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gray-900 hover:bg-gray-800 text-white'
					onClick={() => setIsOpen(true)}
					data-testid='button-open-chat'
					aria-label='Open chat'
				>
					<MessageCircle aria-hidden='true' className='w-6 h-6' />
				</Button>
			</div>
		);
	}

	return (
		<div
			className='fixed bottom-6 right-6 z-50'
			data-testid='chatbot-container'
		>
			<ChatWindow
				messages={messages}
				streamingMessage={streamingMessage}
				isLoading={isLoading}
				input={input}
				size={size}
				isResizing={isResizing}
				isDefaultSize={isDefaultSize}
				onInputChange={setInput}
				onSendMessage={handleSend}
				onNewChat={handleNewChat}
				onResetSize={resetSize}
				onClose={handleClose}
				onResizeStart={handleResizeStart}
			/>
		</div>
	);
}
