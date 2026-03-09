import {
	Pagination as PaginationRoot,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	className?: string;
}

export default function Pagination({
	currentPage,
	totalPages,
	onPageChange,
	className = '',
}: PaginationProps) {
	const getVisiblePages = () => {
		const pages: (number | string)[] = [];
		const startPage = Math.max(2, currentPage - 1);
		const endPage = Math.min(totalPages - 1, currentPage + 1);

		pages.push(1);
		if (startPage > 2) pages.push('...');
		for (let i = startPage; i <= endPage; i++) pages.push(i);
		if (endPage < totalPages - 1) pages.push('...');
		if (totalPages > 1 && !pages.includes(totalPages)) pages.push(totalPages);

		return pages;
	};

	if (totalPages <= 1) return null;

	return (
		<div className={`${className} w-full`}>
			<PaginationRoot className='w-full'>
				<PaginationContent className='gap-1 justify-center'>
					<PaginationItem>
						<PaginationPrevious
							onClick={() =>
								currentPage > 1 && onPageChange(currentPage - 1)
							}
							disabled={currentPage === 1}
							className={`
								rounded-full text-sm font-medium h-9 px-4
								${currentPage === 1
									? 'text-gray-300 cursor-not-allowed pointer-events-none'
									: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 cursor-pointer'
								}
								transition-colors border-0 shadow-none
							`}
						/>
					</PaginationItem>

					{getVisiblePages().map((page, index) => (
						<PaginationItem key={index}>
							{page === '...' ? (
								<span className='w-9 h-9 flex items-center justify-center text-sm text-gray-400'>
									...
								</span>
							) : (
								<PaginationLink
									onClick={() => onPageChange(page as number)}
									isActive={page === currentPage}
									className={`
										w-9 h-9 rounded-full text-sm font-medium border-0 shadow-none
										${page === currentPage
											? 'bg-gray-900 text-white'
											: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
										}
										transition-colors
									`}
								>
									{page}
								</PaginationLink>
							)}
						</PaginationItem>
					))}

					<PaginationItem>
						<PaginationNext
							onClick={() =>
								currentPage < totalPages &&
								onPageChange(currentPage + 1)
							}
							disabled={currentPage === totalPages}
							className={`
								rounded-full text-sm font-medium h-9 px-4
								${currentPage === totalPages
									? 'text-gray-300 cursor-not-allowed pointer-events-none'
									: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 cursor-pointer'
								}
								transition-colors border-0 shadow-none
							`}
						/>
					</PaginationItem>
				</PaginationContent>
			</PaginationRoot>
		</div>
	);
}
