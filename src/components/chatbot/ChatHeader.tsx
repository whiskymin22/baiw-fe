import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { X, RotateCcw, Sparkles, Maximize2 } from 'lucide-react';

interface ChatHeaderProps {
	isLoading: boolean;
	isDefaultSize: boolean;
	onNewChat: () => void;
	onResetSize: () => void;
	onClose: () => void;
}

export const ChatHeader = React.memo(function ChatHeader({
	isLoading,
	isDefaultSize,
	onNewChat,
	onResetSize,
	onClose,
}: ChatHeaderProps) {
	return (
		<div className='bg-primary border-b-3 border-foreground p-4 flex items-center justify-between'>
			<div className='flex items-center gap-3'>
				<Avatar className='h-9 w-9 border-2 border-primary-foreground/20'>
					<AvatarFallback className='bg-primary-foreground text-primary'>
						<Sparkles className='w-4 h-4' />
					</AvatarFallback>
				</Avatar>
				<div>
					<h3
						className='font-bold text-sm text-primary-foreground'
						data-testid='text-chat-title'
					>
						DS Assistant
					</h3>
					<div className='flex items-center gap-1.5'>
						<span className='w-2 h-2 rounded-full bg-green-400 animate-pulse' />
						<span className='text-xs text-primary-foreground/70'>
							Online
						</span>
					</div>
				</div>
			</div>
			<div className='flex items-center gap-1'>
				<Button
					size='icon'
					variant='ghost'
					onClick={onNewChat}
					data-testid='button-new-chat'
					aria-label='Start new chat'
					title='New conversation'
					disabled={isLoading}
					className='h-8 w-8 hover:bg-primary-foreground/20 text-primary-foreground'
				>
					<RotateCcw aria-hidden='true' className='w-4 h-4' />
				</Button>
				{!isDefaultSize && (
					<Button
						size='icon'
						variant='ghost'
						onClick={onResetSize}
						data-testid='button-reset-size'
						aria-label='Reset window size'
						title='Reset to default size'
						className='h-8 w-8 hover:bg-primary-foreground/20 text-primary-foreground'
					>
						<Maximize2 aria-hidden='true' className='w-4 h-4' />
					</Button>
				)}
				<Button
					size='icon'
					variant='ghost'
					onClick={onClose}
					data-testid='button-close-chat'
					aria-label='Close chat'
					className='h-8 w-8 hover:bg-primary-foreground/20 text-primary-foreground'
				>
					<X aria-hidden='true' className='w-5 h-5' />
				</Button>
			</div>
		</div>
	);
});
