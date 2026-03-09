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
		<div className='min-h-screen bg-white flex flex-col'>
			<Header />
			<main
				className='flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full'
				id='main-content'
			>
				<div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
					<div className='lg:col-span-1'>
						<div className='bg-gray-50 rounded-2xl p-6 lg:sticky lg:top-24 h-fit'>
							<div className='flex flex-col items-center text-center'>
								<div className='w-20 h-20 rounded-full bg-gray-900 flex items-center justify-center mb-4'>
									<User className='w-9 h-9 text-white' />
								</div>
								<h2 className='text-lg font-bold text-gray-900 mb-0.5'>
									{user.username}
								</h2>
								<p className='text-sm text-gray-400 mb-1'>@{user.username}</p>
								<p className='text-xs text-gray-400 break-all'>{user.email}</p>
							</div>
						</div>
					</div>

					<div className='lg:col-span-3'>
						<div className='bg-gray-50 rounded-2xl p-6 md:p-8'>
							<h3 className='text-lg font-bold text-gray-900 mb-6'>
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
