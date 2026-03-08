import * as React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
	Sparkles,
	Copy,
	Check,
	BookOpen,
	Loader2,
} from 'lucide-react';
import { MarkdownMessage } from '@/components/MarkdownMessage';
import type { Message } from './types';

interface ChatMessageProps {
	message: Message;
	copiedId: string | null;
	onCopy: (content: string, messageId: string) => void;
	isStreaming?: boolean;
}

export const ChatMessage = React.memo(function ChatMessage({
	message,
	copiedId,
	onCopy,
	isStreaming = false,
}: ChatMessageProps) {
	return (
		<div
			className={`flex ${
				message.role === 'user' ? 'justify-end' : 'justify-start'
			}`}
			data-testid={`message-${message.role}-${message.id}`}
		>
			<div
				className={`flex gap-2 max-w-[90%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
			>
				{/* Avatar */}
				<Avatar className='h-7 w-7 mt-1 shrink-0'>
					{message.role === 'assistant' ? (
						<AvatarFallback className='bg-muted text-xs'>
							<Sparkles className='w-3 h-3' />
						</AvatarFallback>
					) : (
						<AvatarFallback className='bg-primary text-primary-foreground text-xs font-medium'>
							U
						</AvatarFallback>
					)}
				</Avatar>

				{/* Message Content */}
				<div className='flex-1'>
					<div
						className={`p-3 rounded-lg border-2 ${
							message.role === 'user'
								? 'bg-primary text-primary-foreground border-primary'
								: 'bg-card border-border'
						}`}
					>
						{message.role === 'assistant' && !isStreaming ? (
							<MarkdownMessage
								content={message.content}
								className='text-sm'
							/>
						) : (
							<p className='text-sm whitespace-pre-wrap'>
								{message.content}
								{isStreaming && (
									<div className='flex items-center gap-2 text-sm text-muted-foreground'>
										<Loader2 className='w-4 h-4 animate-spin' />
										<span className='flex gap-1'>
											<span className='w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce' />
											<span className='w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.15s]' />
											<span className='w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.3s]' />
										</span>
									</div>
								)}
							</p>
						)}

						{/* Referenced Products */}
						{message.referenced_courses &&
							message.referenced_courses.length > 0 && (
								<>
									<Separator className='my-3 bg-border/50' />
									<div>
										<Badge
											variant='secondary'
											className='text-xs mb-2'
										>
											<BookOpen className='w-3 h-3 mr-1' />
											Related Products
										</Badge>
										<div className='space-y-2 mt-2'>
											{message.referenced_courses
												.slice(0, 3)
												.map((item: any) => (
													<a
														key={item._id}
														href={`/products/${item._id}`}
														className='block text-xs p-2.5 rounded-md border border-border bg-muted/50 hover:bg-muted transition-colors'
													>
														<span className='font-medium text-foreground'>
															{item.name || item.title}
														</span>
														{(item.brief_description || item.brief_summary) && (
															<p className='text-muted-foreground mt-1 line-clamp-2'>
																{item.brief_description || item.brief_summary}
															</p>
														)}
														{item.price != null && (
															<p className='text-foreground font-medium mt-1'>
																${item.price.toFixed(2)}
															</p>
														)}
													</a>
												))}
										</div>
									</div>
								</>
							)}
					</div>

					{/* Message Footer */}
					<div className='flex items-center justify-between mt-1 px-1'>
						{message.timestamp && (
							<span className='text-[10px] text-muted-foreground'>
								{message.timestamp.toLocaleTimeString('vi-VN', {
									hour: '2-digit',
									minute: '2-digit',
								})}
							</span>
						)}
						{message.role === 'assistant' &&
							message.id !== 'welcome' && (
								<Button
									size='icon'
									variant='ghost'
									className='h-6 w-6 text-muted-foreground hover:text-foreground'
									onClick={() => onCopy(message.content, message.id)}
									title='Copy'
								>
									{copiedId === message.id ? (
										<Check className='w-3 h-3 text-green-500' />
									) : (
										<Copy className='w-3 h-3' />
									)}
								</Button>
							)}
					</div>
				</div>
			</div>
		</div>
	);
});
