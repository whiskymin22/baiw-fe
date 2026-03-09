import { useNavigate, Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { authService } from '@/services/auth.service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '@/components/header';
import Footer from '@/components/footer';
import type { ApiErrorResponse } from '@/types/api';

const signupSchema = z
	.object({
		username: z.string().min(1, 'Username is required'),
		email: z.string().email('Please enter a valid email address.'),
		password: z
			.string()
			.min(8, 'Password must be at least 8 characters.')
			.max(50, 'Password must be at most 50 characters.'),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
	const navigate = useNavigate();
	const form = useForm<SignupFormValues>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});
	const {
		formState: { isSubmitting },
	} = form;

	const onSubmit = async (data: SignupFormValues) => {
		try {
			await authService.signup({
				username: data.username,
				email: data.email,
				password: data.password,
			});
			toast.success('Account created successfully! Please log in.');
			navigate('/login');
		} catch (error) {
			const _error = error as ApiErrorResponse;
			toast.error(
				_error.response?.data?.message || 'Failed to create account',
			);
		}
	};

	const fields = [
		{ name: 'username' as const, label: 'Username', type: 'text', placeholder: 'jane_doe', autoComplete: 'username' },
		{ name: 'email' as const, label: 'Email', type: 'email', placeholder: 'name@example.com', autoComplete: 'email' },
		{ name: 'password' as const, label: 'Password', type: 'password', placeholder: 'Create a password', autoComplete: 'new-password' },
		{ name: 'confirmPassword' as const, label: 'Confirm Password', type: 'password', placeholder: 'Confirm password', autoComplete: 'new-password' },
	];

	return (
		<div className='min-h-screen bg-white flex flex-col'>
			<Header />
			<main
				className='flex-1 flex items-center justify-center p-4 py-12'
				id='main-content'
			>
				<div className='w-full max-w-sm'>
					<div className='text-center mb-8'>
						<h1
							className='text-2xl font-bold text-gray-900 tracking-tight'
							data-testid='text-signup-title'
						>
							Create account
						</h1>
						<p className='text-sm text-gray-500 mt-2'>
							Join us and start shopping your style
						</p>
					</div>

					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-4'
					>
						{fields.map(({ name, label, type, placeholder, autoComplete }) => (
							<Controller
								key={name}
								name={name}
								control={form.control}
								render={({ field, fieldState }) => (
									<div className='space-y-2'>
										<Label htmlFor={name} className='text-sm font-medium text-gray-700'>
											{label}
										</Label>
										<Input
											{...field}
											id={name}
											type={type}
											placeholder={placeholder}
											className='h-11 rounded-xl border-gray-200 focus:border-gray-400 focus:ring-gray-400'
											data-testid={`input-${name === 'confirmPassword' ? 'confirm-password' : name}`}
											aria-invalid={fieldState.invalid}
											autoComplete={autoComplete}
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
						))}

						<Button
							type='submit'
							className='w-full h-11 rounded-full font-medium bg-gray-900 hover:bg-gray-800 mt-2'
							data-testid='button-signup'
							disabled={isSubmitting}
							aria-busy={isSubmitting}
						>
							{isSubmitting ? 'Creating account...' : 'Create Account'}
						</Button>
					</form>

					<p className='mt-8 text-center text-sm text-gray-500'>
						Already have an account?{' '}
						<Link
							to='/login'
							data-testid='link-login'
							className='font-medium text-gray-900 hover:text-gray-700 transition-colors'
						>
							Sign in
						</Link>
					</p>
				</div>
			</main>
			<Footer />
		</div>
	);
}
