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
				{}
			);
		}
	};

	return (
		<div className='min-h-screen bg-background flex flex-col'>
			<Header />
			<main
				className='relative flex-1 flex items-center justify-center p-4 overflow-hidden py-12'
				id='main-content'
			>
				<div
					className='absolute top-10 right-10 w-32 h-32 bg-chart-3 border-3 border-foreground -rotate-12 hidden lg:block'
					style={{ boxShadow: 'var(--shadow-lg)' }}
				/>
				<div
					className='absolute bottom-32 left-20 w-40 h-40 rounded-full bg-chart-1 border-3 border-foreground hidden lg:block'
					style={{ boxShadow: 'var(--shadow-xl)' }}
				/>

				<div className='relative z-10 w-full max-w-md'>
					<div
						className='bg-card border-3 border-foreground p-8'
						style={{ boxShadow: 'var(--shadow-2xl)' }}
					>
						<div className='mb-8'>
							<h1
								className='text-3xl font-bold tracking-tight mb-2'
								data-testid='text-signup-title'
							>
								SIGN UP
							</h1>
							<p className='text-muted-foreground'>
								Create your account to start learning
							</p>
						</div>

						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='space-y-4'
						>
							<Controller
								name='username'
								control={form.control}
								render={({ field, fieldState }) => (
									<div className='space-y-2'>
										<Label
											htmlFor='username'
											className='uppercase font-bold text-sm'
										>
											Username
										</Label>
										<Input
											{...field}
											id='username'
											name='username'
											type='text'
											placeholder='jane_doe'
											className='border-3'
											data-testid='input-username'
											aria-invalid={fieldState.invalid}
											autoComplete='username'
											autoCapitalize='none'
											spellCheck={false}
										/>
										{fieldState.error && (
											<p
												className='text-sm text-destructive'
												role='alert'
												aria-live='polite'
											>
												{fieldState.error.message}
											</p>
										)}
									</div>
								)}
							/>

							<Controller
								name='email'
								control={form.control}
								render={({ field, fieldState }) => (
									<div className='space-y-2'>
										<Label
											htmlFor='email'
											className='uppercase font-bold text-sm'
										>
											Email
										</Label>
										<Input
											{...field}
											id='email'
											name='email'
											type='email'
											placeholder='name@example.com'
											className='border-3'
											data-testid='input-email'
											aria-invalid={fieldState.invalid}
											autoComplete='email'
											inputMode='email'
											spellCheck={false}
										/>
										{fieldState.error && (
											<p
												className='text-sm text-destructive'
												role='alert'
												aria-live='polite'
											>
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
										<Label
											htmlFor='password'
											className='uppercase font-bold text-sm'
										>
											Password
										</Label>
										<Input
											{...field}
											id='password'
											name='password'
											type='password'
											placeholder='Create a password…'
											className='border-3'
											data-testid='input-password'
											aria-invalid={fieldState.invalid}
											autoComplete='new-password'
										/>
										{fieldState.error && (
											<p
												className='text-sm text-destructive'
												role='alert'
												aria-live='polite'
											>
												{fieldState.error.message}
											</p>
										)}
									</div>
								)}
							/>

							<Controller
								name='confirmPassword'
								control={form.control}
								render={({ field, fieldState }) => (
									<div className='space-y-2'>
										<Label
											htmlFor='confirmPassword'
											className='uppercase font-bold text-sm'
										>
											Confirm Password
										</Label>
										<Input
											{...field}
											id='confirmPassword'
											name='confirmPassword'
											type='password'
											placeholder='Confirm password…'
											className='border-3'
											data-testid='input-confirm-password'
											aria-invalid={fieldState.invalid}
											autoComplete='new-password'
										/>
										{fieldState.error && (
											<p
												className='text-sm text-destructive'
												role='alert'
												aria-live='polite'
											>
												{fieldState.error.message}
											</p>
										)}
									</div>
								)}
							/>

							<Button
								type='submit'
								className='w-full font-bold uppercase mt-6'
								data-testid='button-signup'
								disabled={isSubmitting}
								aria-busy={isSubmitting}
							>
								{isSubmitting
									? 'Creating account…'
									: 'Create Account'}
							</Button>
						</form>

						<div className='mt-6 text-center'>
							<p className='text-sm text-muted-foreground'>
								Already have an account?{' '}
								<Link to='/login' data-testid='link-login'>
									<span className='font-bold underline cursor-pointer hover-elevate'>
										Log In
									</span>
								</Link>
							</p>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}
