import * as React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Sparkles, Loader2 } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { SuggestedPrompts } from './SuggestedPrompts';
import type { Message } from './types';

interface ChatMessagesProps {
	messages: Message[];
	streamingMessage?: Message | null;
	isLoading: boolean;
	copiedId: string | null;
	onCopy: (content: string, messageId: string) => void;
	onSelectPrompt: (prompt: string) => void;
}

export const ChatMessages = React.memo(function ChatMessages({
	messages,
	streamingMessage,
	isLoading,
	copiedId,
	onCopy,
	onSelectPrompt,
}: ChatMessagesProps) {
	const scrollAreaRef = React.useRef<HTMLDivElement>(null);

	// Auto-scroll to bottom when messages change
	React.useEffect(() => {
		if (scrollAreaRef.current) {
			const scrollElement = scrollAreaRef.current.querySelector(
				'[data-radix-scroll-area-viewport]',
			);
			if (scrollElement) {
				scrollElement.scrollTop = scrollElement.scrollHeight;
			}
		}
	}, [messages]);

	return (
		<ScrollArea className='flex-1 p-4' ref={scrollAreaRef}>
			<div className='space-y-4'>
				{messages.map((message) => (
					<ChatMessage
						key={message.id}
						message={message}
						copiedId={copiedId}
						onCopy={onCopy}
					/>
				))}
				{streamingMessage && (
					<>
						<ChatMessage
							key={streamingMessage.id}
							message={streamingMessage}
							copiedId={copiedId}
							onCopy={onCopy}
							isStreaming
						/>
						<div className='ml-9 text-[10px] text-muted-foreground'>
							Streaming reply... {streamingMessage.content.length} chars
						</div>
					</>
				)}

				{/* Loading indicator */}
				{isLoading && !streamingMessage && (
					<div className='flex justify-start'>
						<div className='flex gap-2'>
							<Avatar className='h-7 w-7 shrink-0'>
								<AvatarFallback className='bg-muted text-xs'>
									<Sparkles className='w-3 h-3' />
								</AvatarFallback>
							</Avatar>
							<div className='p-3 rounded-lg border-2 border-border bg-card'>
								<div className='flex items-center gap-2 text-sm text-muted-foreground'>
									<Loader2 className='w-4 h-4 animate-spin' />
									<span className='flex gap-1'>
										<span className='w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce' />
										<span className='w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.15s]' />
										<span className='w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.3s]' />
									</span>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Suggested Prompts - show only after welcome message */}
				{messages.length === 1 && !isLoading && (
					<SuggestedPrompts onSelectPrompt={onSelectPrompt} />
				)}
			</div>
		</ScrollArea>
	);
});
