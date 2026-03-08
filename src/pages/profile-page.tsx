import { useSearchParams } from 'react-router-dom';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { User } from 'lucide-react';
import ProfileWishlistTabs from '@/components/profile/profile-wishlist-tabs';
import { useAuth } from '@/context/auth-context';

export default function ProfilePage() {
	const { user } = useAuth();
	const [searchParams, setSearchParams] = useSearchParams();

	const page = parseInt(searchParams.get('page') || '1');

	if (!user) return null;

	const handlePageChange = (newPage: number) => {
		setSearchParams((prev) => {
			prev.set('page', newPage.toString());
			return prev;
		});
	};

	return (
		<div className='min-h-screen bg-stone-50 flex flex-col'>
			<Header />
			<main
				className='flex-1 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full'
				id='main-content'
			>
				<div className='grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8'>
					<div className='lg:col-span-1'>
						<div className='bg-white border border-stone-200 rounded-xl p-6 md:p-8 lg:sticky lg:top-24 h-fit shadow-sm'>
							<div className='flex flex-col items-center text-center'>
								<div className='w-20 h-20 md:w-24 md:h-24 rounded-full bg-stone-900 flex items-center justify-center mb-4'>
									<User className='w-10 h-10 md:w-12 md:h-12 text-white' />
								</div>
								<h2 className='text-xl md:text-2xl font-bold mb-1 text-stone-900'>
									{user.username}
								</h2>
								<p className='text-stone-600 mb-2 text-sm'>@{user.username}</p>
								<p className='text-xs text-stone-500 break-all'>{user.email}</p>
							</div>
						</div>
					</div>

					<div className='lg:col-span-3'>
						<div className='bg-white border border-stone-200 rounded-xl p-6 md:p-8 shadow-sm'>
							<h3 className='text-lg font-bold text-stone-900 mb-6'>
								My Wishlist
							</h3>
							<ProfileWishlistTabs
								page={page}
								onPageChange={handlePageChange}
							/>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}
