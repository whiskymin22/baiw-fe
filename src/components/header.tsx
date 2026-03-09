import { Link, useLocation } from 'react-router-dom';
import { User, Menu, LogOut, ShoppingCart, X, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as React from 'react';
import { useAuth } from '@/context/auth-context';

export default function Header() {
	const location = useLocation();
	const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
	const [scrolled, setScrolled] = React.useState(false);

	const isActive = (path: string) => location.pathname === path;
	const { isAuthenticated, logout, isLoading } = useAuth();

	React.useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 20);
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const handleLogout = async () => {
		await logout();
		setMobileMenuOpen(false);
	};

	return (
		<header
			className={`sticky top-0 z-50 transition-all duration-300 ${
				scrolled
					? 'bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-100'
					: 'bg-white border-b border-gray-100'
			}`}
		>
			<a
				href='#main-content'
				className='sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-gray-900 focus:px-3 focus:py-2 focus:text-white'
			>
				Skip to main content
			</a>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16'>
					<Link to='/' className='flex items-center gap-2 group'>
						<span className='text-xl font-bold tracking-tight text-gray-900 group-hover:text-gray-600 transition-colors font-serif'>
							STYLE STORE
						</span>
					</Link>

					<nav className='hidden md:flex items-center gap-1'>
						{[
							{ to: '/products', label: 'Shop' },
						].map(({ to, label }) => (
							<Link
								key={to}
								to={to}
								className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
									isActive(to)
										? 'text-gray-900 bg-gray-100'
										: 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
								}`}
							>
								{label}
							</Link>
						))}
					</nav>

					<div className='flex items-center gap-1'>
						{isAuthenticated && (
							<>
								<Button
									asChild
									variant='ghost'
									size='icon'
									className='text-gray-600 hover:text-gray-900 rounded-full'
								>
									<Link to='/profile' aria-label='Wishlist'>
										<Heart className='w-5 h-5' />
									</Link>
								</Button>
								<Button
									asChild
									variant='ghost'
									size='icon'
									className='text-gray-600 hover:text-gray-900 rounded-full'
								>
									<Link to='/cart' aria-label='Shopping cart'>
										<ShoppingCart className='w-5 h-5' />
									</Link>
								</Button>
							</>
						)}

						{isLoading ? (
							<div className='flex items-center gap-2 ml-2'>
								<div className='h-9 w-20 bg-gray-100 rounded-lg animate-pulse' />
							</div>
						) : isAuthenticated ? (
							<div className='hidden md:flex items-center gap-1 ml-1'>
								<Button
									asChild
									variant='ghost'
									size='icon'
									className='text-gray-600 hover:text-gray-900 rounded-full'
								>
									<Link to='/profile' data-testid='link-nav-profile'>
										<User className='w-5 h-5' />
									</Link>
								</Button>
								<Button
									onClick={handleLogout}
									variant='ghost'
									size='icon'
									className='text-gray-600 hover:text-red-600 rounded-full'
								>
									<LogOut className='w-5 h-5' />
								</Button>
							</div>
						) : (
							<Button
								asChild
								variant='ghost'
								className='ml-2 text-sm font-medium text-gray-600 hover:text-gray-900'
							>
								<Link to='/login' data-testid='link-login'>
									Sign In
								</Link>
							</Button>
						)}

						<Button
							size='icon'
							variant='ghost'
							className='md:hidden text-gray-600 rounded-full'
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
						>
							{mobileMenuOpen ? (
								<X className='w-5 h-5' />
							) : (
								<Menu className='w-5 h-5' />
							)}
						</Button>
					</div>
				</div>

				{mobileMenuOpen && (
					<nav className='md:hidden py-4 border-t border-gray-100 animate-[fade-in_0.2s_ease-out]'>
						<div className='flex flex-col gap-1'>
							<Link
								to='/products'
								onClick={() => setMobileMenuOpen(false)}
								className='px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors'
							>
								Shop
							</Link>
							{isAuthenticated ? (
								<>
									<Link
										to='/profile'
										onClick={() => setMobileMenuOpen(false)}
										className='px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors'
									>
										Profile
									</Link>
									<Link
										to='/cart'
										onClick={() => setMobileMenuOpen(false)}
										className='px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors'
									>
										Cart
									</Link>
									<button
										onClick={handleLogout}
										className='px-4 py-3 text-sm font-medium text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors'
									>
										Sign Out
									</button>
								</>
							) : (
								<Link
									to='/login'
									onClick={() => setMobileMenuOpen(false)}
									className='px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors'
								>
									Sign In
								</Link>
							)}
						</div>
					</nav>
				)}
			</div>
		</header>
	);
}
