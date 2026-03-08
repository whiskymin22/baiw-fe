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
		const pages = [];
		const numPagesToShowAroundCurrent = 1; // Show currentPage-1, currentPage, currentPage+1
		const startPage = Math.max(
			2,
			currentPage - numPagesToShowAroundCurrent,
		);
		const endPage = Math.min(
			totalPages - 1,
			currentPage + numPagesToShowAroundCurrent,
		);

		// Always add the first page
		pages.push(1);

		// Add ellipsis if there's a gap between 1 and startPage
		if (startPage > 2) {
			pages.push('…');
		}

		// Add pages around the current page
		for (let i = startPage; i <= endPage; i++) {
			pages.push(i);
		}

		// Add ellipsis if there's a gap between endPage and totalPages
		if (endPage < totalPages - 1) {
			pages.push('…');
		}

		// Always add the last page if totalPages > 1 and it's not already included
		if (totalPages > 1 && !pages.includes(totalPages)) {
			pages.push(totalPages);
		}

		// Remove duplicate '...' if they appear consecutively
		const uniquePages = [];
		for (let i = 0; i < pages.length; i++) {
			if (
				pages[i] === '…' &&
				uniquePages[uniquePages.length - 1] === '…'
			) {
				continue;
			}
			uniquePages.push(pages[i]);
		}

		return uniquePages;
	};

	if (totalPages <= 1) return null;

	return (
		<div className={`${className} w-full`}>
			<PaginationRoot className='w-full'>
				<PaginationContent className='gap-3 justify-center flex-wrap'>
					{/* Previous Button */}
					<PaginationItem>
						<PaginationPrevious
							onClick={() =>
								currentPage > 1 && onPageChange(currentPage - 1)
							}
							disabled={currentPage === 1}
							className={`
              ${
								currentPage === 1
									? 'bg-gray-100 text-gray-400 border-gray-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] cursor-not-allowed pointer-events-none'
									: 'bg-white text-black border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 md:hover:-translate-y-1 active:translate-y-0 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] md:active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer'
							}
              border-2 md:border-3 font-bold uppercase text-xs md:text-sm px-3 py-2 md:px-6 md:py-3 min-h-[40px] md:min-h-[56px]
              transition-all duration-150 ease-out
              flex items-center gap-1 md:gap-2
            `}
						/>
					</PaginationItem>

					{/* Page Numbers */}
					{getVisiblePages().map((page, index) => (
						<PaginationItem key={index}>
							{page === '…' ? (
								<span
									aria-hidden='true'
									className='
                  bg-white border-2 md:border-3 border-gray-300 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)]
                  font-bold text-sm md:text-lg px-2 md:px-4 py-2 md:py-3 text-gray-500
                  w-10 h-10 md:w-14 md:h-14 min-h-[40px] md:min-h-[56px] flex items-center justify-center
                  rounded-none cursor-default
                  hover:border-gray-400 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.4)] md:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)]
                  transition-all duration-150 ease-out
                '
									title='More pages available'
								>
									…
								</span>
							) : (
								<PaginationLink
									onClick={() => onPageChange(page as number)}
									isActive={page === currentPage}
									className={`
                  ${
										page === currentPage
											? 'bg-[hsl(48,100%,50%)] text-black border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] scale-105'
											: 'bg-white text-black border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 md:hover:-translate-y-1 active:translate-y-0 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] md:active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
									}
                  border-2 md:border-3 font-bold text-sm md:text-lg w-10 h-10 md:w-14 md:h-14 min-h-[40px] md:min-h-[56px]
                  transition-all duration-150 ease-out
                  flex items-center justify-center
                  rounded-none
                `}
								>
									{page}
								</PaginationLink>
							)}
						</PaginationItem>
					))}

					{/* Next Button */}
					<PaginationItem>
						<PaginationNext
							onClick={() =>
								currentPage < totalPages &&
								onPageChange(currentPage + 1)
							}
							disabled={currentPage === totalPages}
							className={`
              ${
								currentPage === totalPages
									? 'bg-gray-100 text-gray-400 border-gray-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] cursor-not-allowed pointer-events-none'
									: 'bg-white text-black border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 md:hover:-translate-y-1 active:translate-y-0 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] md:active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer'
							}
              border-2 md:border-3 font-bold uppercase text-xs md:text-sm px-3 py-2 md:px-6 md:py-3 min-h-[40px] md:min-h-[56px]
              transition-all duration-150 ease-out
              flex items-center gap-1 md:gap-2
            `}
						/>
					</PaginationItem>
				</PaginationContent>
			</PaginationRoot>
		</div>
	);
}
