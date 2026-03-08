import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/header';
import Footer from '@/components/footer';
import CourseGrid from '@/components/CourseGrid';
import SearchInput from '@/components/SearchInput';
import SkillLevelFilter from '@/components/SkillLevelFilter';
import type { SkillLevel } from '@/components/SkillLevelFilter';
import Pagination from '@/components/Pagination';
import PerPageSelector from '@/components/PerPageSelector';
import { useCourses } from '@/hooks/use-courses';
import { CourseGridSkeleton } from '@/components/skeletons/CourseGridSkeleton';
import { Button } from '@/components/ui/button';

const DEFAULT_COURSES_PER_PAGE = 12;

export default function CourseListPage() {
	const [searchParams, setSearchParams] = useSearchParams();

	const urlParams = searchParams;
	const urlPage = parseInt(urlParams.get('page') || '1');
	const urlPerPage = parseInt(
		urlParams.get('perPage') || DEFAULT_COURSES_PER_PAGE.toString(),
	);
	const urlSearch = urlParams.get('search') || '';
	const urlSkillLevel =
		(urlParams.get('skillLevel') as SkillLevel) || 'all';

	const [searchQuery, setSearchQuery] = React.useState(urlSearch);
	const [debouncedSearch, setDebouncedSearch] =
		React.useState(urlSearch);
	const [skillLevel, setSkillLevel] =
		React.useState<SkillLevel>(urlSkillLevel);
	const [currentPage, setCurrentPage] = React.useState(urlPage);
	const [coursesPerPage, setCoursesPerPage] =
		React.useState(urlPerPage);

	const updateURL = React.useCallback(
		(params: {
			page?: number;
			perPage?: number;
			search?: string;
			skillLevel?: SkillLevel;
		}) => {
			const newParams = new URLSearchParams(searchParams);

			if (params.page !== undefined) {
				if (params.page === 1) {
					newParams.delete('page');
				} else {
					newParams.set('page', params.page.toString());
				}
			}

			if (params.perPage !== undefined) {
				if (params.perPage === DEFAULT_COURSES_PER_PAGE) {
					newParams.delete('perPage');
				} else {
					newParams.set('perPage', params.perPage.toString());
				}
			}

			if (params.search !== undefined) {
				if (params.search === '') {
					newParams.delete('search');
				} else {
					newParams.set('search', params.search);
				}
			}

			if (params.skillLevel !== undefined) {
				if (params.skillLevel === 'all') {
					newParams.delete('skillLevel');
				} else {
					newParams.set('skillLevel', params.skillLevel);
				}
			}

			setSearchParams(newParams);
		},
		[searchParams, setSearchParams],
	);

	const {
		data: coursesResponse,
		isLoading,
		isFetching,
		error,
		refetch,
	} = useCourses({
		page: currentPage,
		limit: coursesPerPage,
		search: debouncedSearch,
		skillLevel: skillLevel === 'all' ? undefined : skillLevel,
	});

	const courses = coursesResponse?.data || [];
	const totalPages = coursesResponse?.meta?.totalPages || 0;
	const totalItems = coursesResponse?.meta?.totalItems || 0;
	const hasResults = courses.length > 0;
	const isUpdating = isFetching && !isLoading;
	const hasActiveFilters =
		searchQuery.trim().length > 0 ||
		skillLevel !== 'all' ||
		coursesPerPage !== DEFAULT_COURSES_PER_PAGE;

	React.useEffect(() => {
		setSearchQuery(urlSearch);
		setSkillLevel(urlSkillLevel);
		setCurrentPage(urlPage);
		setCoursesPerPage(urlPerPage);
		setDebouncedSearch(urlSearch);
	}, [urlSearch, urlSkillLevel, urlPage, urlPerPage]);

	React.useEffect(() => {
		const trimmedSearch = searchQuery.trim();
		const debounceTimer = window.setTimeout(() => {
			setDebouncedSearch(trimmedSearch);

			if (trimmedSearch !== urlSearch) {
				setCurrentPage(1);
				updateURL({ search: trimmedSearch, page: 1 });
			}
		}, 400);

		return () => window.clearTimeout(debounceTimer);
	}, [searchQuery, updateURL, urlSearch]);

	const handleSearchChange = (value: string) => {
		setSearchQuery(value);
		setCurrentPage(1);
	};

	const handleSkillLevelChange = (value: SkillLevel) => {
		setSkillLevel(value);
		setCurrentPage(1);
		updateURL({ skillLevel: value, page: 1 });
	};

	const handleClearFilters = () => {
		setSearchQuery('');
		setSkillLevel('all');
		setCurrentPage(1);
		setCoursesPerPage(DEFAULT_COURSES_PER_PAGE);
		updateURL({
			search: '',
			skillLevel: 'all',
			page: 1,
			perPage: DEFAULT_COURSES_PER_PAGE,
		});
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		updateURL({ page });
		const prefersReducedMotion = window.matchMedia(
			'(prefers-reduced-motion: reduce)',
		).matches;
		window.scrollTo({
			top: 0,
			behavior: prefersReducedMotion ? 'auto' : 'smooth',
		});
	};

	const handlePerPageChange = (perPage: number) => {
		setCoursesPerPage(perPage);
		setCurrentPage(1); // Reset to first page when changing per-page
		updateURL({ perPage, page: 1 });
	};

	return (
		<div className='min-h-screen bg-white flex flex-col'>
			<Header />
			<main className='flex-1' id='main-content'>
				<div className='bg-white border-b border-gray-200'>
					<div className='max-w-7xl mx-auto px-4 py-6'>
						<div className='mb-6'>
							<SearchInput
								value={searchQuery}
								onChange={handleSearchChange}
								placeholder='Search courses…'
								className='w-full max-w-2xl'
							/>
						</div>

						<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
							<div className='flex items-center gap-4'>
								<button
									onClick={handleClearFilters}
									className='text-sm text-gray-600 hover:text-gray-900 font-medium disabled:text-gray-400 disabled:cursor-not-allowed'
									disabled={!hasActiveFilters}
									aria-disabled={!hasActiveFilters}
								>
									Clear filters
								</button>
								<SkillLevelFilter
									value={skillLevel}
									onChange={handleSkillLevelChange}
								/>
							</div>

							<div className='flex flex-col sm:flex-row sm:items-center gap-4'>
								{!isLoading &&
									!error &&
									coursesResponse &&
									totalItems > 0 && (
										<div className='text-sm text-gray-600'>
											Showing {(currentPage - 1) * coursesPerPage + 1}{' '}
											to{' '}
											{Math.min(
												currentPage * coursesPerPage,
												coursesResponse.meta.totalItems,
											)}{' '}
											of {coursesResponse.meta.totalItems} courses
										</div>
									)}
								{isUpdating && (
									<div className='text-sm text-gray-500'>
										Updating results…
									</div>
								)}
								<PerPageSelector
									value={coursesPerPage}
									onChange={handlePerPageChange}
								/>
							</div>
						</div>
					</div>
				</div>

				{isLoading ? (
					<div className='max-w-7xl mx-auto py-12'>
						<CourseGridSkeleton count={coursesPerPage} />
					</div>
				) : error ? (
					<div className='container mx-auto py-12'>
						<div className='text-center'>
							<h3 className='text-lg font-medium text-gray-900 mb-2'>
								Error loading courses
							</h3>
							<p className='text-gray-600'>
								{error instanceof Error
									? error.message
									: 'Something went wrong'}
							</p>
							<Button className='mt-4' onClick={() => refetch()}>
								Try again
							</Button>
						</div>
					</div>
				) : hasResults ? (
					<CourseGrid courses={courses} className='bg-transparent' />
				) : (
					<div className='container mx-auto py-12'>
						<div className='text-center'>
							<h3 className='text-lg font-medium text-gray-900 mb-2'>
								No courses found
							</h3>
							<p className='text-gray-600'>
								Try adjusting your search or filters.
							</p>
							{hasActiveFilters && (
								<Button className='mt-4' onClick={handleClearFilters}>
									Clear filters
								</Button>
							)}
						</div>
					</div>
				)}

				{/* Pagination */}
				{!isLoading && !error && totalPages > 1 && (
					<div className='container mx-auto py-12'>
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={handlePageChange}
						/>
					</div>
				)}
			</main>
			<Footer />
		</div>
	);
}
