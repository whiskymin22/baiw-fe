import { useQuery } from '@tanstack/react-query';
import courseService from '@/services/course.service';
import type { ICourse } from '@/types/course.type';
import type { ListResponse } from '@/types/list.type';
import { useAuth } from '@/context/auth-context';

interface UseCoursesParams {
	page?: number;
	limit?: number;
	search?: string;
	skillLevel?: string;
}

export const useCourses = (params: UseCoursesParams = {}) => {
	const {
		page = 1,
		limit = 10,
		search = '',
		skillLevel = 'all',
	} = params;

	return useQuery<ListResponse<ICourse>>({
		queryKey: ['courses', page, limit, search, skillLevel],
		queryFn: async () => {
			const queryParams = new URLSearchParams();

			if (page > 1) {
				queryParams.append('page', page.toString());
			}
			if (limit !== 10) {
				queryParams.append('limit', limit.toString());
			}
			if (search) {
				queryParams.append('search', search);
			}
			if (skillLevel && skillLevel !== 'all') {
				queryParams.append('skillLevel', skillLevel);
			}

			const url = `/courses${
				queryParams.toString() ? `?${queryParams.toString()}` : ''
			}`;
			return courseService.getListAllCourses(url);
		},
		placeholderData: (previousData) => previousData,
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
	});
};

export const useCourseById = (id: string | undefined) => {
	return useQuery<ICourse>({
		queryKey: ['course', id],
		queryFn: async () => {
			if (!id) {
				throw new Error('Course ID is required');
			}
			return courseService.getCourseById(id);
		},
		enabled: !!id, // Only run query if id exists
		// staleTime: 5 * 60 * 1000, // 5 minutes
		// gcTime: 10 * 60 * 1000, // 10 minutes
	});
};

export const usePopularCourses = ({
	limit = 10,
}: {
	limit?: number;
}) => {
	return useQuery<ListResponse<ICourse>>({
		queryKey: ['popular-courses'],
		queryFn: async () => {
			return courseService.getPopularCourses({ limit });
		},
		placeholderData: (previousData) => previousData,
		// staleTime: 5 * 60 * 1000, // 5 minutes
		// gcTime: 10 * 60 * 1000, // 10 minutes
	});
};

export const usePersonalizedCourses = ({
	userId,
	limit = 10,
}: {
	userId: string;
	limit?: number;
}) => {
	return useQuery<ListResponse<ICourse>>({
		queryKey: ['personalized-courses', userId, limit],
		queryFn: async () => {
			return courseService.getPersonalizedCourses({ userId, limit });
		},
		placeholderData: (previousData) => previousData,
		// staleTime: 5 * 60 * 1000, // 5 minutes
		// gcTime: 10 * 60 * 1000, // 10 minutes
	});
};

export const useSavedCourses = (params: {
	page?: number;
	limit?: number;
	enabled?: boolean;
}) => {
	const {
		page = 1,
		limit = 10,
		enabled: enabledProp = true,
	} = params;
	const { isAuthenticated } = useAuth();

	const queryKey = ['saved-courses-list', page, limit];

	return useQuery<ListResponse<ICourse>>({
		queryKey,
		queryFn: async () => {
			return courseService.getSavedCourses({ page, limit });
		},
		enabled: isAuthenticated && enabledProp,
		placeholderData: (previousData) => previousData,
	});
};

export const useEnrolledCourses = (params: {
	page?: number;
	limit?: number;
	enabled?: boolean;
}) => {
	const {
		page = 1,
		limit = 10,
		enabled: enabledProp = true,
	} = params;
	const { isAuthenticated } = useAuth();

	const queryKey = ['enrolled-courses-list', page, limit];

	return useQuery<ListResponse<ICourse>>({
		queryKey,
		queryFn: async () => {
			return courseService.getEnrolledCourses({ page, limit });
		},
		enabled: isAuthenticated && enabledProp,
		placeholderData: (previousData) => previousData,
	});
};
