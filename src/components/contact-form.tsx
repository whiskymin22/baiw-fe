import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function ContactForm() {
	const [formData, setFormData] = React.useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	});
	const [isSubmitting, setIsSubmitting] = React.useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		console.log('Contact form submitted:', formData);
		toast('Message Sent!', {
			description: "We'll get back to you within 24 hours.",
		});
		setFormData({ name: '', email: '', subject: '', message: '' });
		await new Promise((resolve) => window.setTimeout(resolve, 400));
		setIsSubmitting(false);
	};

	const handleChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<form onSubmit={handleSubmit} className='space-y-5'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
				<div className='space-y-2'>
					<Label htmlFor='name' className='text-sm font-medium text-gray-700'>
						Name
					</Label>
					<Input
						id='name'
						name='name'
						type='text'
						value={formData.name}
						onChange={(e) => handleChange('name', e.target.value)}
						placeholder='Your name'
						className='h-11 rounded-xl border-gray-200 focus:border-gray-400 focus:ring-gray-400'
						data-testid='input-name'
						autoComplete='name'
						required
					/>
				</div>

				<div className='space-y-2'>
					<Label htmlFor='email' className='text-sm font-medium text-gray-700'>
						Email
					</Label>
					<Input
						id='email'
						name='email'
						type='email'
						value={formData.email}
						onChange={(e) => handleChange('email', e.target.value)}
						placeholder='name@example.com'
						className='h-11 rounded-xl border-gray-200 focus:border-gray-400 focus:ring-gray-400'
						data-testid='input-email'
						autoComplete='email'
						inputMode='email'
						spellCheck={false}
						required
					/>
				</div>
			</div>

			<div className='space-y-2'>
				<Label htmlFor='subject' className='text-sm font-medium text-gray-700'>
					Subject
				</Label>
				<Input
					id='subject'
					name='subject'
					type='text'
					value={formData.subject}
					onChange={(e) => handleChange('subject', e.target.value)}
					placeholder="What's this about?"
					className='h-11 rounded-xl border-gray-200 focus:border-gray-400 focus:ring-gray-400'
					data-testid='input-subject'
					autoComplete='off'
					required
				/>
			</div>

			<div className='space-y-2'>
				<Label htmlFor='message' className='text-sm font-medium text-gray-700'>
					Message
				</Label>
				<Textarea
					id='message'
					name='message'
					value={formData.message}
					onChange={(e) => handleChange('message', e.target.value)}
					placeholder='Tell us what you need...'
					className='rounded-xl border-gray-200 focus:border-gray-400 focus:ring-gray-400 min-h-32'
					data-testid='textarea-message'
					autoComplete='off'
					required
				/>
			</div>

			<Button
				type='submit'
				size='lg'
				className='w-full h-11 rounded-full font-medium bg-gray-900 hover:bg-gray-800'
				data-testid='button-submit-contact'
				disabled={isSubmitting}
				aria-busy={isSubmitting}
			>
				{isSubmitting ? 'Sending...' : 'Send Message'}
			</Button>
		</form>
	);
}
