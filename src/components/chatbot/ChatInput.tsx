import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
	value: string;
	isLoading: boolean;
	onChange: (value: string) => void;
	onSend: () => void;
}

export const ChatInput = React.memo(function ChatInput({
	value,
	isLoading,
	onChange,
	onSend,
}: ChatInputProps) {
	const textareaRef = React.useRef<HTMLTextAreaElement>(null);

	const handleChange = React.useCallback(
		(e: React.ChangeEvent<HTMLTextAreaElement>) => {
			onChange(e.target.value);
			if (textareaRef.current) {
				textareaRef.current.style.height = 'auto';
				textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
			}
		},
		[onChange],
	);

	const handleKeyDown = React.useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === 'Enter' && !e.shiftKey) {
				e.preventDefault();
				onSend();
			}
		},
		[onSend],
	);

	// Reset textarea height when value is cleared
	React.useEffect(() => {
		if (!value && textareaRef.current) {
			textareaRef.current.style.height = 'auto';
		}
	}, [value]);

	return (
		<div className='border-t-2 border-border p-3 bg-background'>
			<div className='flex gap-2 items-end'>
				<Textarea
					ref={textareaRef}
					value={value}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					placeholder='Type your question... '
					className='resize-none min-h-10 max-h-[120px] text-sm'
					data-testid='input-chat-message'
					aria-label='Chat message'
					name='chatMessage'
					autoComplete='off'
					disabled={isLoading}
					rows={1}
				/>
				<Button
					size='icon'
					onClick={onSend}
					data-testid='button-send-message'
					aria-label='Send message'
					disabled={!value.trim() || isLoading}
					className='shrink-0 h-10 w-10'
				>
					{isLoading ? (
						<Loader2 className='w-5 h-5 animate-spin' />
					) : (
						<Send aria-hidden='true' className='w-5 h-5' />
					)}
				</Button>
			</div>
		</div>
	);
});
