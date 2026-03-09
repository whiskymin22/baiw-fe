import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { useAuth } from '@/context/auth-context';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '@/components/header';
import Footer from '@/components/footer';
import type { ApiErrorResponse } from '@/types/api';

const formSchema = z.object({
	email: z.string().email('Please enter a valid email address.'),
	password: z
		.string()
		.min(8, 'Password must be at least 8 characters.')
		.max(50, 'Password must be at most 50 characters.'),
});

export default function LoginPage() {
	const navigate = useNavigate();
	const { login } = useAuth();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: { email: '', password: '' },
	});
	const {
		formState: { isSubmitting },
	} = form;

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		try {
			await login(data);
			navigate('/');
			toast.success('Login successful!');
		} catch (error) {
			const apiError = error as ApiErrorResponse;
			toast.error(
				apiError.response?.data?.message || 'Login failed. Please try again.',
			);
		}
	};

	return (
		<div className='min-h-screen bg-white flex flex-col'>
			<Header />
			<main
				className='flex-1 flex items-center justify-center p-4 min-h-[70vh]'
				id='main-content'
			>
				<div className='w-full max-w-sm'>
					<div className='text-center mb-8'>
						<h1
							className='text-2xl font-bold text-gray-900 tracking-tight'
							data-testid='text-login-title'
						>
							Welcome back
						</h1>
						<p className='text-sm text-gray-500 mt-2'>
							Sign in to your account to continue
						</p>
					</div>

					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-5'
					>
						<Controller
							name='email'
							control={form.control}
							render={({ field, fieldState }) => (
								<div className='space-y-2'>
									<Label htmlFor='email' className='text-sm font-medium text-gray-700'>
										Email
									</Label>
									<Input
										{...field}
										id='email'
										type='email'
										placeholder='name@example.com'
										className='h-11 rounded-xl border-gray-200 focus:border-gray-400 focus:ring-gray-400'
										data-testid='input-email'
										aria-invalid={fieldState.invalid}
										autoComplete='email'
										inputMode='email'
										spellCheck={false}
									/>
									{fieldState.error && (
										<p className='text-xs text-red-500' role='alert'>
											{fieldState.error.message}
										</p>
									)}
								</div>
							)}
						/>

						<Controller
							name='password'
							control={form.control}
							render={({ field, fieldState }) => (
								<div className='space-y-2'>
									<Label htmlFor='password' className='text-sm font-medium text-gray-700'>
										Password
									</Label>
									<Input
										{...field}
										id='password'
										type='password'
										placeholder='Enter password'
										className='h-11 rounded-xl border-gray-200 focus:border-gray-400 focus:ring-gray-400'
										data-testid='input-password'
										aria-invalid={fieldState.invalid}
										autoComplete='current-password'
									/>
									{fieldState.error && (
										<p className='text-xs text-red-500' role='alert'>
											{fieldState.error.message}
										</p>
									)}
								</div>
							)}
						/>

						<Button
							type='submit'
							className='w-full h-11 rounded-full font-medium bg-gray-900 hover:bg-gray-800'
							data-testid='button-login'
							disabled={isSubmitting}
							aria-busy={isSubmitting}
						>
							{isSubmitting ? 'Signing in...' : 'Sign In'}
						</Button>
					</form>

					<p className='mt-8 text-center text-sm text-gray-500'>
						Don't have an account?{' '}
						<Link
							to='/signup'
							data-testid='link-signup'
							className='font-medium text-gray-900 hover:text-gray-700 transition-colors'
						>
							Create account
						</Link>
					</p>
				</div>
			</main>
			<Footer />
		</div>
	);
}
