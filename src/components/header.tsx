import { Link, useLocation } from 'react-router-dom';
import { User, Menu, LogOut, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as React from 'react';
import { useAuth } from '@/context/auth-context';

export default function Header() {
	const location = useLocation();
	const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

	const isActive = (path: string) => location.pathname === path;

	const { isAuthenticated, logout, isLoading } = useAuth();

	const handleLogout = async () => {
		await logout();
		setMobileMenuOpen(false);
	};

	return (
		<header className='border-b border-stone-200 bg-white sticky top-0 z-50'>
			<a
				href='#main-content'
				className='sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-stone-900 focus:px-3 focus:py-2 focus:text-white'
			>
				Skip to main content
			</a>
			<div className='max-w-7xl mx-auto px-4 py-4'>
				<div className='flex items-center justify-between gap-4'>
					<Link to='/' data-testid='link-home'>
						<h1 className='hidden sm:block text-2xl md:text-3xl font-bold tracking-tight text-stone-900 cursor-pointer hover:text-rose-600 transition-colors px-2'>
							STYLE STORE
						</h1>
						<h1 className='sm:hidden text-2xl text-stone-900 cursor-pointer hover:text-rose-600 transition-colors px-2'>
							STYLE
						</h1>
					</Link>

					<nav className='hidden md:flex items-center gap-2'>
						<Button asChild variant='ghost' className='font-medium'>
							<Link to='/products'>Shop</Link>
						</Button>
					</nav>

					<div className='flex items-center gap-2'>
						{isLoading ? (
							<div className='flex items-center gap-2'>
								<div className='h-9 w-20 bg-stone-200 rounded-md animate-pulse' />
								<div className='h-9 w-24 bg-stone-200 rounded-md animate-pulse' />
							</div>
						) : isAuthenticated ? (
							<>
								<Button
									asChild
									variant={isActive('/profile') ? 'secondary' : 'ghost'}
									className='font-medium'
								>
									<Link to='/profile' data-testid='link-nav-profile'>
										Profile
									</Link>
								</Button>
								<Button
									onClick={handleLogout}
									variant='ghost'
									className='font-medium'
								>
									Sign Out
									<LogOut className='w-4 h-4 ml-2' />
								</Button>
							</>
						) : (
							<Button asChild size='default' variant='ghost'>
								<Link to='/login' data-testid='link-login'>
									Sign In
									<User className='w-5 h-5' />
								</Link>
							</Button>
						)}
						<Button
							size='icon'
							variant='ghost'
							className='md:hidden'
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
						>
							<Menu className='w-5 h-5' />
						</Button>
					</div>
				</div>

				{mobileMenuOpen && (
					<nav className='md:hidden mt-4 flex flex-col gap-2 pb-2'>
						<Button asChild variant='ghost' className='w-full justify-start'>
							<Link to='/products' onClick={() => setMobileMenuOpen(false)}>
								<ShoppingBag className='w-4 h-4 mr-2' />
								Shop
							</Link>
						</Button>
						{isAuthenticated ? (
							<>
								<Button
									asChild
									variant='ghost'
									className='w-full justify-start'
								>
									<Link to='/profile' onClick={() => setMobileMenuOpen(false)}>
										Profile
									</Link>
								</Button>
								<Button
									onClick={handleLogout}
									variant='ghost'
									className='w-full justify-start'
								>
									Sign Out
								</Button>
							</>
						) : (
							<Button
								asChild
								variant='ghost'
								className='w-full justify-start'
							>
								<Link to='/login' onClick={() => setMobileMenuOpen(false)}>
									Sign In
								</Link>
							</Button>
						)}
					</nav>
				)}
			</div>
		</header>
	);
}
