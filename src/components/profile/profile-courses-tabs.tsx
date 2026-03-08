import { BookOpen, Bookmark, Loader2 } from 'lucide-react';
import {
	Tabs,
	TabsList,
	TabsTrigger,
	TabsContent,
} from '@/components/ui/tabs';
import CourseCard from '@/components/CourseCard';
import Pagination from '@/components/Pagination';
import {
	useEnrolledCourses,
	useSavedCourses,
} from '@/hooks/use-courses';
import type { ICourse } from '@/types/course.type';
import type { ListResponse } from '@/types/list.type';

interface ProfileCoursesTabsProps {
	activeTab: 'enrolled' | 'saved';
	page: number;
	onTabChange: (tab: string) => void;
	onPageChange: (page: number) => void;
}

interface CourseGridProps {
	data: ListResponse<ICourse> | undefined;
	isLoading: boolean;
	emptyIcon: React.ReactNode;
	emptyTitle: string;
	emptyDescription: string;
	page: number;
	onPageChange: (page: number) => void;
}

function CourseGrid({
	data,
	isLoading,
	emptyIcon,
	emptyTitle,
	emptyDescription,
	page,
	onPageChange,
}: CourseGridProps) {
	if (isLoading) {
		return (
			<div className='flex-1 flex items-center justify-center'>
				<Loader2 className='w-8 h-8 md:w-10 md:h-10 animate-spin text-primary' />
			</div>
		);
	}

	if (!data?.data || data.data.length === 0) {
		return (
			<div className='flex-1 flex flex-col items-center justify-center text-center p-8 text-muted-foreground'>
				<div className='w-14 h-14 md:w-16 md:h-16 bg-muted rounded-full flex items-center justify-center mb-4'>
					{emptyIcon}
				</div>
				<p className='text-base md:text-lg font-bold mb-2'>
					{emptyTitle}
				</p>
				<p className='text-sm md:text-base max-w-xs mx-auto'>
					{emptyDescription}
				</p>
			</div>
		);
	}

	return (
		<>
			<div className='space-y-6 flex-1'>
				<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6'>
					{data.data.map((course) => (
						<CourseCard key={course._id} course={course} />
					))}
				</div>
			</div>

			{data?.meta && data.meta.totalPages > 1 && (
				<div className='mt-8 pt-4 border-t border-border'>
					<Pagination
						currentPage={page}
						totalPages={data.meta.totalPages}
						onPageChange={onPageChange}
					/>
				</div>
			)}
		</>
	);
}

interface EnrolledCoursesContentProps {
	page: number;
	onPageChange: (page: number) => void;
	enabled: boolean;
}

function EnrolledCoursesContent({
	page,
	onPageChange,
	enabled,
}: EnrolledCoursesContentProps) {
	const { data, isLoading } = useEnrolledCourses({
		page,
		limit: 6,
		enabled,
	});

	return (
		<CourseGrid
			data={data}
			isLoading={isLoading}
			emptyIcon={<BookOpen className='w-6 h-6 md:w-8 md:h-8' />}
			emptyTitle='No enrolled courses yet'
			emptyDescription='Browse our catalog and start learning today!'
			page={page}
			onPageChange={onPageChange}
		/>
	);
}

interface SavedCoursesContentProps {
	page: number;
	onPageChange: (page: number) => void;
	enabled: boolean;
}

function SavedCoursesContent({
	page,
	onPageChange,
	enabled,
}: SavedCoursesContentProps) {
	const { data, isLoading } = useSavedCourses({
		page,
		limit: 6,
		enabled,
	});

	return (
		<CourseGrid
			data={data}
			isLoading={isLoading}
			emptyIcon={<Bookmark className='w-6 h-6 md:w-8 md:h-8' />}
			emptyTitle='No saved courses yet'
			emptyDescription="Save courses you're interested in to view them later."
			page={page}
			onPageChange={onPageChange}
		/>
	);
}

export default function ProfileCoursesTabs({
	activeTab,
	page,
	onTabChange,
	onPageChange,
}: ProfileCoursesTabsProps) {
	return (
		<div
			className='bg-card border-3 border-foreground p-4 md:p-8 min-h-[500px] md:min-h-[600px] flex flex-col'
			style={{ boxShadow: 'var(--shadow-xl)' }}
		>
			<Tabs
				value={activeTab}
				onValueChange={onTabChange}
				className='flex flex-col flex-1'
			>
				<TabsList className='bg-transparent h-auto p-0 mb-6 md:mb-8 border-b-2 border-border rounded-none w-full justify-start gap-4 overflow-x-auto scrollbar-hide'>
					<TabsTrigger
						value='enrolled'
						className='flex items-center gap-2 pb-3 md:pb-4 px-2 border-b-4 border-transparent rounded-none bg-transparent h-auto text-sm md:text-base text-muted-foreground whitespace-nowrap data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:font-bold data-[state=active]:bg-transparent data-[state=active]:shadow-none hover:text-foreground'
					>
						<BookOpen className='w-4 h-4 md:w-5 md:h-5' />
						ENROLLED COURSES
					</TabsTrigger>
					<TabsTrigger
						value='saved'
						className='flex items-center gap-2 pb-3 md:pb-4 px-2 border-b-4 border-transparent rounded-none bg-transparent h-auto text-sm md:text-base text-muted-foreground whitespace-nowrap data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:font-bold data-[state=active]:bg-transparent data-[state=active]:shadow-none hover:text-foreground'
					>
						<Bookmark className='w-4 h-4 md:w-5 md:h-5' />
						SAVED COURSES
					</TabsTrigger>
				</TabsList>

				<TabsContent
					value='enrolled'
					className='flex-1 flex flex-col'
				>
					<EnrolledCoursesContent
						page={page}
						onPageChange={onPageChange}
						enabled={activeTab === 'enrolled'}
					/>
				</TabsContent>

				<TabsContent value='saved' className='flex-1 flex flex-col'>
					<SavedCoursesContent
						page={page}
						onPageChange={onPageChange}
						enabled={activeTab === 'saved'}
					/>
				</TabsContent>
			</Tabs>
		</div>
	);
}
