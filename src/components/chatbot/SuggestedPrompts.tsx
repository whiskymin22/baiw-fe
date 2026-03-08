import * as React from 'react';
import { Button } from '@/components/ui/button';
import { SUGGESTED_PROMPTS } from './constants';

interface SuggestedPromptsProps {
	onSelectPrompt: (prompt: string) => void;
}

export const SuggestedPrompts = React.memo(function SuggestedPrompts({
	onSelectPrompt,
}: SuggestedPromptsProps) {
	return (
		<div className='flex flex-wrap gap-2 mt-3'>
			{SUGGESTED_PROMPTS.map((prompt) => (
				<Button
					key={prompt}
					size='sm'
					variant='outline'
					className='text-xs h-7'
					onClick={() => onSelectPrompt(prompt)}
				>
					{prompt}
				</Button>
			))}
		</div>
	);
});
