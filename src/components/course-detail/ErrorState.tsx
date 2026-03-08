import * as React from 'react';
import { Button } from '@/components/ui/button';
import Header from '@/components/header';
import Footer from '@/components/footer';

interface ErrorStateProps {
	title: string;
	message: string;
	showRetry?: boolean;
}

export const ErrorState = React.memo(function ErrorState({
	title,
	message,
	showRetry = false,
}: ErrorStateProps) {
	return (
		<div className='min-h-screen bg-background flex flex-col'>
			<Header />
			<main
				className='flex-1 max-w-7xl mx-auto p-4 py-12 text-center'
				id='main-content'
			>
				<h1
					className={`text-3xl font-bold mb-4 ${showRetry ? 'text-red-600' : ''}`}
				>
					{title}
				</h1>
				<p className='text-gray-600 mb-4'>{message}</p>
				{showRetry && (
					<Button onClick={() => window.location.reload()}>
						Try Again
					</Button>
				)}
			</main>
			<Footer />
		</div>
	);
});
