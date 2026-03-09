import * as React from 'react';
import { Card } from '@/components/ui/card';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { ResizeHandles } from './ResizeHandles';
import type { Message, ChatSize } from './types';

interface ChatWindowProps {
	messages: Message[];
	streamingMessage?: Message | null;
	isLoading: boolean;
	input: string;
	size: ChatSize;
	isResizing: boolean;
	isDefaultSize: boolean;
	onInputChange: (value: string) => void;
	onSendMessage: (text?: string) => void;
	onNewChat: () => void;
	onResetSize: () => void;
	onClose: () => void;
	onResizeStart: (
		e: React.MouseEvent | React.TouchEvent,
		direction: 'left' | 'top' | 'corner',
	) => void;
}

export const ChatWindow = React.memo(function ChatWindow({
	messages,
	streamingMessage,
	isLoading,
	input,
	size,
	isResizing,
	isDefaultSize,
	onInputChange,
	onSendMessage,
	onNewChat,
	onResetSize,
	onClose,
	onResizeStart,
}: ChatWindowProps) {
	const [copiedId, setCopiedId] = React.useState<string | null>(null);

	const handleCopy = React.useCallback(
		async (content: string, messageId: string) => {
			await navigator.clipboard.writeText(content);
			setCopiedId(messageId);
			setTimeout(() => setCopiedId(null), 2000);
		},
		[],
	);

	const handleSend = React.useCallback(() => {
		onSendMessage();
	}, [onSendMessage]);

	const handleSelectPrompt = React.useCallback(
		(prompt: string) => {
			onSendMessage(prompt);
		},
		[onSendMessage],
	);

	return (
		<Card
			className='border border-gray-200 flex flex-col overflow-hidden relative pt-0 rounded-2xl shadow-2xl bg-white'
			style={{
				width: `${size.width}px`,
				height: `${size.height}px`,
			}}
			data-testid='chat-window'
		>
			<ResizeHandles
				isResizing={isResizing}
				size={size}
				onResizeStart={onResizeStart}
			/>

			<ChatHeader
				isLoading={isLoading}
				isDefaultSize={isDefaultSize}
				onNewChat={onNewChat}
				onResetSize={onResetSize}
				onClose={onClose}
			/>

			<ChatMessages
				messages={messages}
				streamingMessage={streamingMessage}
				isLoading={isLoading}
				copiedId={copiedId}
				onCopy={handleCopy}
				onSelectPrompt={handleSelectPrompt}
			/>

			<ChatInput
				value={input}
				isLoading={isLoading}
				onChange={onInputChange}
				onSend={handleSend}
			/>
		</Card>
	);
});
